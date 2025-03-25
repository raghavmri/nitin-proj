"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Calendar,
  FileText,
  Users,
  Settings,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { getCurrentProfile, signOut, type Profile } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const userProfile = await getCurrentProfile();
      // if (!userProfile) {
      //   router.push('/auth/login');
      //   return;
      // }
      setProfile(userProfile);
    }
    loadProfile();
  }, [router]);

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      router.push("/");
    }
  };

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: FileText,
      roles: ["patient", "doctor", "admin", "secretary"],
    },
    {
      href: "/dashboard/appointments",
      label: "Appointments",
      icon: Calendar,
      roles: ["patient", "doctor", "admin", "secretary"],
    },
    {
      href: "/dashboard/patients",
      label: "Patients",
      icon: Users,
      roles: ["doctor", "admin", "secretary"],
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      roles: ["patient", "doctor", "admin", "secretary"],
    },
  ];

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden bg-card border-b px-4 py-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Medical Management</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">Medical Management</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Welcome, {profile.full_name}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            Role: {profile.role}
          </p>
        </div>
        <nav className="space-y-1 px-3">
          {menuItems
            .filter((item) => item.roles.includes(profile.role))
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Sign out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
