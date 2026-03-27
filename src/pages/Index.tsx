import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TrafficCone, Activity, Shield, Clock, MapPin, Users, Zap } from "lucide-react";
import heroImage from "@/assets/city-intersection.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-tech">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-6">
              <TrafficCone className="h-16 w-16 text-primary mr-4" />
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Smart Traffic Management System using IoT
              </h1>
            </div>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Real-time traffic control system using IoT sensors and smart algorithms to optimize signal timing and prioritize emergency vehicles for efficient urban traffic management.
            </p>
            
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 transition-opacity">
                <Shield className="mr-2 h-5 w-5" />
                Start Live Dashboard
              </Button>
            </Link>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-traffic-red mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Real-time Traffic Control</h3>
                <p className="text-muted-foreground">
                  IoT sensors monitor traffic density and automatically adjust signal timing for optimal flow.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-traffic-amber mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Emergency Vehicle Priority</h3>
                <p className="text-muted-foreground">
                  Automatically prioritize emergency vehicles and optimize their routes through traffic intersections.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <MapPin className="h-12 w-12 text-traffic-green mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Dynamic Signal Timing</h3>
                <p className="text-muted-foreground">
                  Smart algorithms adapt signal cycles based on traffic patterns and peak hours.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Status Bar */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-traffic-green animate-pulse-slow"></div>
                  <span className="text-sm text-muted-foreground">System Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-traffic-amber"></div>
                  <span className="text-sm text-muted-foreground">4 Active Signals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm text-muted-foreground">Ready for Management</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;