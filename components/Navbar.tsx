import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Home, Settings } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

// Supabase configuration (replace with your actual credentials)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-background dark:bg-gray-900 shadow-md">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="font-bold text-xl text-foreground dark:text-white"
        >
          MyApp
        </Link>
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground dark:hover:text-white"
        >
          Dashboard
        </Link>
        <Link
          href="/about"
          className="text-muted-foreground hover:text-foreground dark:hover:text-white"
        >
          About
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        {/* Theme Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="mr-2"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <img
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={handleSignIn}>Sign In</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
