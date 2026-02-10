import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ROOMS, ROOM_CARD_CLASSES } from "@/lib/constants";
import { Thermometer, Check } from "lucide-react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function RoomGrid() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  // Fetch today's logs
  const { data: todayLogs } = useQuery({
    queryKey: ["temperature_logs", today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("temperature_logs")
        .select("*")
        .eq("logged_date", today);
      if (error) throw error;
      return data;
    },
  });

  const logMutation = useMutation({
    mutationFn: async ({ room, temp }: { room: string; temp: number }) => {
      const { error } = await supabase.from("temperature_logs").insert({
        user_id: user!.id,
        room_name: room,
        temperature: temp,
        logged_date: today,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["temperature_logs"] });
      toast.success("Temperatur sparad!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Kunde inte spara");
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ROOMS.map((room) => {
        const logged = todayLogs?.find((l) => l.room_name === room.name);
        return (
          <RoomCard
            key={room.key}
            room={room}
            logged={logged}
            onLog={(temp) => logMutation.mutate({ room: room.name, temp })}
            isLogging={logMutation.isPending}
          />
        );
      })}
    </div>
  );
}

function RoomCard({
  room,
  logged,
  onLog,
  isLogging,
}: {
  room: (typeof ROOMS)[number];
  logged: any;
  onLog: (temp: number) => void;
  isLogging: boolean;
}) {
  const [temp, setTemp] = useState("");
  const cardClass = ROOM_CARD_CLASSES[room.key];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(temp);
    if (isNaN(val) || val < -50 || val > 60) {
      toast.error("Ange en rimlig temperatur (-50 till 60°C)");
      return;
    }
    onLog(val);
    setTemp("");
  };

  return (
    <Card className={`${cardClass} transition-shadow hover:shadow-md`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 font-serif text-lg">
          <Thermometer className="h-4 w-4" style={{ color: room.color }} />
          {room.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logged ? (
          <div className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-room-gron" />
            <span className="font-medium">{Number(logged.temperature).toFixed(1)}°C</span>
            <span className="text-muted-foreground">idag</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="number"
              step="0.1"
              placeholder="°C"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="h-9"
            />
            <Button type="submit" size="sm" disabled={isLogging || !temp}>
              Logga
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
