import { Github, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    (<footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>)
  );
}

