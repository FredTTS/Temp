import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Thermometer } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
      <div className="flex items-center gap-3">
        <Thermometer className="h-10 w-10 text-primary" />
        <h1 className="font-serif text-3xl font-bold">Temperaturloggen</h1>
      </div>
      <p className="max-w-md text-center text-muted-foreground">
        Logga och följ temperaturer i dina rum. Logga in för att komma igång.
      </p>
      <Button asChild size="lg">
        <Link to="/auth">Logga in</Link>
      </Button>
    </div>
  );
};

export default Index;
