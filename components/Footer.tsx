import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary dark:bg-gray-800 p-6 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
