"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Building2, UserPlus, Users } from "lucide-react";
import Wrapper from "@/components/Warp";

export default function Home() {
  return (
    <Wrapper>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
                Medical Management System
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl text-muted-foreground sm:text-2xl md:mt-5 md:max-w-3xl">
                Streamline your healthcare practice with our comprehensive
                management solution.
              </p>
              <div className="mt-10 flex justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/auth/register">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary">
                Comprehensive Healthcare Management
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage your medical practice efficiently
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    Patient Management
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Easily manage patient records, appointments, and medical
                    history
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    Staff Collaboration
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Streamline communication between doctors, staff, and
                    administrators
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">
                    Practice Management
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Comprehensive tools for managing your medical practice
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
}
