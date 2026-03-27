import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrafficCone, Shield, Map, Home, Cpu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <TrafficCone className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Smart Traffic</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button 
                variant={isActive("/dashboard") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Dash</span>
              </Button>
            </Link>
            
            <Link to="/analytics">
              <Button 
                variant={isActive("/analytics") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant={isActive("/about") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">About</span>
              </Button>
            </Link>
            
            <Link to="/iot-monitor">
              <Button 
                variant={isActive("/iot-monitor") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Cpu className="h-4 w-4" />
                <span className="hidden sm:inline">IoT Monitor</span>
                <span className="sm:hidden">IoT</span>
              </Button>
            </Link>
            
            <Link to="/admin">
              <Button 
                variant={isActive("/admin") ? "default" : "ghost"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;