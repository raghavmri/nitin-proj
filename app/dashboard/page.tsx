'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  Clock,
  Users,
  Activity,
} from 'lucide-react';
import { getCurrentProfile, type Profile } from '@/lib/auth';

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const userProfile = await getCurrentProfile();
      setProfile(userProfile);
    }
    loadProfile();
  }, []);

  if (!profile) {
    return null;
  }

  const isDoctorOrAdmin = ['doctor', 'admin'].includes(profile.role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your {profile.role}&apos;s dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isDoctorOrAdmin ? 'Today\'s Appointments' : 'Upcoming Appointments'}
              </p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isDoctorOrAdmin ? 'Completed Today' : 'Recent Visits'}
              </p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
          </div>
        </Card>

        {isDoctorOrAdmin ? (
          <>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Patients
                  </p>
                  <h3 className="text-2xl font-bold">156</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Cases
                  </p>
                  <h3 className="text-2xl font-bold">28</h3>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Prescriptions
                  </p>
                  <h3 className="text-2xl font-bold">2</h3>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Next Appointment
                  </p>
                  <h3 className="text-lg font-bold">Mar 28, 2025</h3>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}