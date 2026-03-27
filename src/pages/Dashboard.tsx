import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Car, Ambulance, RotateCcw, Play, Pause } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ImprovedIntersectionViz from '@/components/ImprovedIntersectionViz';

interface LaneData {
  id: number;
  vehicleCount: number;
  greenTime: number;
  currentState: 'red' | 'yellow' | 'green';
  timeRemaining: number;
  hasEmergency: boolean;
}

const Dashboard = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [lanes, setLanes] = useState<LaneData[]>([
    { id: 1, vehicleCount: 15, greenTime: 25, currentState: 'green', timeRemaining: 25, hasEmergency: false },
    { id: 2, vehicleCount: 5, greenTime: 10, currentState: 'red', timeRemaining: 0, hasEmergency: false },
    { id: 3, vehicleCount: 12, greenTime: 20, currentState: 'red', timeRemaining: 0, hasEmergency: false },
    { id: 4, vehicleCount: 8, greenTime: 15, currentState: 'red', timeRemaining: 0, hasEmergency: false },
  ]);
  const [logs, setLogs] = useState<string[]>([
    'System initialized - All lanes ready',
    'Lane 1: Green → Time left 25s',
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const simulateTraffic = (laneId: number, increase: boolean) => {
    setLanes(prev => prev.map(lane => 
      lane.id === laneId 
        ? { ...lane, vehicleCount: Math.max(0, lane.vehicleCount + (increase ? 5 : -5)) }
        : lane
    ));
    addLog(`Lane ${laneId}: Vehicle count ${increase ? 'increased' : 'decreased'}`);
  };

  const simulateEmergency = (laneId: number) => {
    setLanes(prev => prev.map(lane => 
      lane.id === laneId 
        ? { ...lane, hasEmergency: !lane.hasEmergency }
        : { ...lane, hasEmergency: false }
    ));
    addLog(`Emergency vehicle ${lanes.find(l => l.id === laneId)?.hasEmergency ? 'cleared from' : 'detected on'} Lane ${laneId}`);
  };

  const resetAllLanes = () => {
    setLanes(prev => prev.map((lane, index) => ({
      ...lane,
      vehicleCount: [15, 5, 12, 8][index],
      hasEmergency: false,
      currentState: index === 0 ? 'green' : 'red',
      timeRemaining: index === 0 ? 25 : 0,
    })));
    addLog('All lanes reset to default state');
  };

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setLanes(prev => {
        const newLanes = [...prev];
        const emergencyLane = newLanes.find(lane => lane.hasEmergency);
        const greenLane = newLanes.find(lane => lane.currentState === 'green');
        const yellowLane = newLanes.find(lane => lane.currentState === 'yellow');

        if (emergencyLane && emergencyLane.currentState !== 'green') {
          // Emergency override
          newLanes.forEach(lane => {
            if (lane.id === emergencyLane.id) {
              lane.currentState = 'green';
              lane.timeRemaining = 30;
            } else {
              lane.currentState = 'red';
              lane.timeRemaining = 0;
            }
          });
          addLog(`Emergency detected on Lane ${emergencyLane.id} → Switching to Green`);
          return newLanes;
        }

        if (greenLane) {
          if (greenLane.timeRemaining > 1) {
            greenLane.timeRemaining--;
          } else if (greenLane.timeRemaining === 1) {
            greenLane.currentState = 'yellow';
            greenLane.timeRemaining = 3;
            addLog(`Lane ${greenLane.id}: Yellow → Clearing traffic`);
          }
          return newLanes;
        }

        if (yellowLane) {
          if (yellowLane.timeRemaining > 1) {
            yellowLane.timeRemaining--;
          } else {
            const currentIndex = newLanes.findIndex(lane => lane.id === yellowLane.id);
            const nextIndex = (currentIndex + 1) % newLanes.length;

            yellowLane.currentState = 'red';
            yellowLane.timeRemaining = 0;

            // Dynamic green time based on vehicle count
            const nextLane = newLanes[nextIndex];
            const dynamicGreenTime = Math.min(30, Math.max(10, Math.ceil(nextLane.vehicleCount * 1.5)));
            
            nextLane.currentState = 'green';
            nextLane.timeRemaining = dynamicGreenTime;
            nextLane.greenTime = dynamicGreenTime;

            addLog(`Lane ${nextLane.id}: Green → ${dynamicGreenTime}s (${nextLane.vehicleCount} vehicles)`);
          }
          return newLanes;
        }

        return newLanes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const getSignalColor = (state: string) => {
    switch (state) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Live Traffic Dashboard
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <Button 
              onClick={() => setIsSimulating(!isSimulating)}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              {isSimulating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isSimulating ? 'Pause' : 'Start'} Simulation
            </Button>
            <Button variant="outline" onClick={resetAllLanes}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Lanes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Intersection Visualization */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  Intersection Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImprovedIntersectionViz lanes={lanes} />
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Control Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lanes.map(lane => (
                  <div key={lane.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Lane {lane.id}</span>
                      <Badge variant={lane.hasEmergency ? "destructive" : "outline"}>
                        {lane.vehicleCount} vehicles
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => simulateTraffic(lane.id, true)}
                      >
                        +Traffic
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => simulateTraffic(lane.id, false)}
                      >
                        -Traffic
                      </Button>
                      <Button 
                        size="sm" 
                        variant={lane.hasEmergency ? "destructive" : "secondary"}
                        onClick={() => simulateEmergency(lane.id)}
                      >
                        {lane.hasEmergency ? 'Clear' : 'Emergency'}
                      </Button>
                    </div>
                    {lane.currentState !== 'red' && (
                      <Progress value={(lane.timeRemaining / lane.greenTime) * 100} className="h-2" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Logs */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <CardTitle>Live System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-60 overflow-y-auto text-sm">
                  {logs.map((log, index) => (
                    <div key={index} className="text-muted-foreground font-mono text-xs">
                      {log}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Traffic Data Table */}
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle>Traffic Data Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lane</TableHead>
                  <TableHead>Vehicle Count</TableHead>
                  <TableHead>Green Time</TableHead>
                  <TableHead>Current State</TableHead>
                  <TableHead>Time Remaining</TableHead>
                  <TableHead>Emergency Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lanes.map(lane => (
                  <TableRow key={lane.id}>
                    <TableCell className="font-medium">Lane {lane.id}</TableCell>
                    <TableCell>{lane.vehicleCount}</TableCell>
                    <TableCell>{lane.greenTime} sec</TableCell>
                    <TableCell>
                      <Badge variant={
                        lane.currentState === 'green' ? 'default' :
                        lane.currentState === 'yellow' ? 'secondary' : 'destructive'
                      }>
                        {lane.currentState.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {lane.currentState !== 'red' ? `${lane.timeRemaining}s` : '-'}
                    </TableCell>
                    <TableCell>
                      {lane.hasEmergency ? (
                        <Badge variant="destructive">EMERGENCY</Badge>
                      ) : (
                        <Badge variant="outline">Normal</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;