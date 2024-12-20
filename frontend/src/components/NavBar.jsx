
import React from 'react'
import { Bell } from 'lucide-react'
import {Button} from '@/components/ui/button.jsx'
import {Logo} from '@/components/ui/logo.jsx'

const Navbar = () => {
  return (
    <header className="border-b">
     
      <div className="container flex items-center justify-between h-16">
         <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost">sgRNA Design</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Help</Button>
          <Button variant="ghost">Contact</Button>
        </nav>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
export default Navbar;
