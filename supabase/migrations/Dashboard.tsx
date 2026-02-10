import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather } from "@/lib/weather";
import RoomGrid from "@/components/RoomGrid";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Thermometer, CloudSun } from "lucide-react";

export default function Dashboard() {
  const { user, signOut } = useAuth();

  const { data: weather } = useQuery({
    queryKey: ["current_weather"],
    queryFn: fetchCurrentWeather,
    refetchInterval: 600000, // 10 min
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Thermometer className="h-6 w-6 text-foreground" />
            <h1 className="font-serif text-xl font-semibold">Håll koll på Tempen</h1>
          </div>
          <div className="flex items-center gap-4">
            {weather && (
              <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                <CloudSun className="h-4 w-4" />
                <span>Ute: {weather.temperature.toFixed(1)}°C</span>
              </div>
            )}
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs defaultValue="log" className="space-y-6">
          <TabsList>
            <TabsTrigger value="log">Logga temperatur</TabsTrigger>
            <TabsTrigger value="stats">Statistik</TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Registrera dagens temperatur för varje rum. Varje rum kan loggas en gång per dag.
              </p>
              <RoomGrid />
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <Statistics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
