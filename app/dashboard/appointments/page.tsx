"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { getCurrentProfile, type Profile } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  doctorId: z.string().optional(),
});

export default function AppointmentsPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [doctors, setDoctors] = useState<Profile[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: "",
      doctorId: undefined,
    },
  });

  useEffect(() => {
    async function loadData() {
      const userProfile = await getCurrentProfile();
      setProfile(userProfile);

      // Load doctors
      const { data: doctorsData } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "doctor");

      if (doctorsData) {
        setDoctors(doctorsData);
      }

      // Load appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select(
          `
          *,
          doctor:doctor_id(full_name),
          patient:patient_id(full_name)
        `
        )
        .eq(
          userProfile?.role === "patient" ? "patient_id" : "doctor_id",
          userProfile?.id
        );

      if (appointmentsData) {
        setAppointments(appointmentsData);
      }
    }
    loadData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!profile) return;

      const dateTime = new Date(values.date);
      const [hours, minutes] = values.time.split(":");
      dateTime.setHours(parseInt(hours), parseInt(minutes));

      const { error } = await supabase.from("appointments").insert({
        patient_id: profile.role === "patient" ? profile.id : values.doctorId,
        doctor_id: profile.role === "doctor" ? profile.id : values.doctorId,
        date_time: dateTime.toISOString(),
        status: "scheduled",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
      });

      // Refresh appointments
      const { data } = await supabase
        .from("appointments")
        .select(
          `
          *,
          doctor:doctor_id(full_name),
          patient:patient_id(full_name)
        `
        )
        .eq(
          profile.role === "patient" ? "patient_id" : "doctor_id",
          profile.id
        );

      if (data) {
        setAppointments(data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to schedule appointment",
      });
    }
  }

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">Manage your appointments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Schedule Appointment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() ||
                          date.getDay() === 0 ||
                          date.getDay() === 6
                        }
                        className="rounded-md border"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {profile.role === "patient" && (
                  <FormField
                    control={form.control}
                    name="doctorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select doctor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {doctor.full_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button type="submit" className="w-full">
                  Schedule
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">
                  {profile.role === "patient"
                    ? `Dr. ${appointment.doctor?.full_name}`
                    : appointment.patient?.full_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(appointment.date_time), "PPP")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(appointment.date_time), "p")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="capitalize">
                  {appointment.status}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
