import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InstallAppButton } from "@/components/InstallAppButton";
import { Thermometer } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
      <div className="flex items-center gap-3">
        <Thermometer className="h-10 w-10 text-primary" />
        <h1 className="font-serif text-3xl font-bold">Temperaturloggen</h1>
      </div>
      <p className="max-w-md text-center text-muted-foreground">
        Logga och följ temperaturer i dina rum. Fungerar i webbläsaren – du kan även installera appen om du vill.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link to="/auth">Logga in</Link>
        </Button>
        <InstallAppButton variant="outline" size="lg" className="shrink-0" />
      </div>
    </div>
  );
};

export default Index;
