import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { ThemeProvider } from "@/components/ui/theme-provider";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
    // </ThemeProvider>
  );
};

export default Wrapper;
