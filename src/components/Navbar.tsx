
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, MessageSquare, User, Users } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <Users className="h-6 w-6 text-hackathon-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-hackathon-600 to-teammate-600 text-transparent bg-clip-text">TeamUp</span>
        </Link>
        
        <div className="flex items-center gap-1 md:gap-4 mx-auto">
          <Link to="/" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/browse" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Users className="h-4 w-4 mr-1" />
            Find Teammates
          </Link>
          <Link to="/messages" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare className="h-4 w-4 mr-1" />
            Messages
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <Link to="/browse">
            <Button className="bg-gradient-to-r from-hackathon-600 to-teammate-600 text-white">
              Find Teammates
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
