import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { fetchWeatherHistory } from "@/lib/weather";
import { ROOMS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Statistics() {
  const [selectedRoom, setSelectedRoom] = useState<string>("all");

  // Fetch all logs
  const { data: logs, isLoading } = useQuery({
    queryKey: ["temperature_logs", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("temperature_logs")
        .select("*")
        .order("logged_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Get date range from logs
  const dates = logs?.map((l) => l.logged_date) ?? [];
  const minDate = dates.length ? dates[0] : null;
  const maxDate = dates.length ? dates[dates.length - 1] : null;

  // Fetch weather for date range
  const { data: weather } = useQuery({
    queryKey: ["weather_history", minDate, maxDate],
    queryFn: () => fetchWeatherHistory(minDate!, maxDate!),
    enabled: !!minDate && !!maxDate,
  });

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Laddar statistik...</div>;
  }

  if (!logs || logs.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Inga temperaturer loggade ännu.
        </CardContent>
      </Card>
    );
  }

  // Build chart data
  const allDates = [...new Set(logs.map((l) => l.logged_date))].sort();
  const roomsToShow = selectedRoom === "all" ? ROOMS : ROOMS.filter((r) => r.name === selectedRoom);

  const chartData = allDates.map((date) => {
    const point: Record<string, any> = { date: date.slice(5) }; // MM-DD format
    roomsToShow.forEach((room) => {
      const log = logs.find((l) => l.logged_date === date && l.room_name === room.name);
      if (log) point[room.name] = Number(log.temperature);
    });
    // Add weather
    if (weather) {
      const idx = weather.dates.indexOf(date);
      if (idx >= 0 && weather.temperatures[idx] != null) {
        point["Ute"] = weather.temperatures[idx];
      }
    }
    return point;
  });

  // Stats summary
  const roomLogs = selectedRoom === "all" ? logs : logs.filter((l) => l.room_name === selectedRoom);
  const temps = roomLogs.map((l) => Number(l.temperature));
  const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
  const min = Math.min(...temps);
  const max = Math.max(...temps);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Välj rum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla rum</SelectItem>
            {ROOMS.map((r) => (
              <SelectItem key={r.key} value={r.name}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Medel</p>
            <p className="text-2xl font-serif font-semibold">{avg.toFixed(1)}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Min</p>
            <p className="text-2xl font-serif font-semibold">{min.toFixed(1)}°C</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground">Max</p>
            <p className="text-2xl font-serif font-semibold">{max.toFixed(1)}°C</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">
            Temperatur över tid {selectedRoom !== "all" && `– ${selectedRoom}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} unit="°C" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              {roomsToShow.map((room) => (
                <Line
                  key={room.key}
                  type="monotone"
                  dataKey={room.name}
                  stroke={room.color}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  connectNulls
                />
              ))}
              <Line
                type="monotone"
                dataKey="Ute"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 2 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
