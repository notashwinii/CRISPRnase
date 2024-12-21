import React from "react";
import { Button } from "@/components/ui/button.jsx";
import { Logo } from "@/components/ui/logo.jsx";

const Navbar = () => {
  return (
    <header className="border-b px-8 py-2 shadow-sm bg-white sticky top-0">
      <div className="container flex items-center justify-between h-16">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-blue-600">
          <Button variant="ghost" className="hover:text-blue-800">
            sgRNA Design
          </Button>
          
          <Button variant="ghost" className="hover:text-blue-800">
           About CRISPR
          </Button>
          <Button variant="ghost" className="hover:text-blue-800">
            How to Use
          </Button>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
