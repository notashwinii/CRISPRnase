import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    (<header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <span className="text-xl font-semibold">sgRNA Results Viewer</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">How It Works</Button>
            <Button variant="ghost">Contact</Button>
          </nav>
        </div>
      </div>
    </header>)
  );
}

