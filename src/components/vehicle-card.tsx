import { useVehicles } from "@/contexts/VehiclesContext";
import { calculateTimeRemaining } from "@/lib/utils";
import { Vehicle } from "@/types/Vehicle";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { toggleFavorite } = useVehicles();
  const { days, hours } = calculateTimeRemaining(vehicle.auctionDateTime);
  const auctionActive = days === 0 && hours === 0;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(vehicle.id)}
            className="h-8 w-8"
          >
            <Heart
              className={
                vehicle.favourite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }
            />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
