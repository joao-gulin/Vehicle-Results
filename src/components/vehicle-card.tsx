import { useVehicles } from "@/contexts/VehiclesContext";
import { formatAuctionDate, formatCurrency } from "@/lib/utils";
import { Vehicle } from "@/types/Vehicle";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import carImage from "../../public/Car Placeholder.jpg";
import Image from "next/image";
import Link from "next/link";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const { toggleFavorite } = useVehicles();

  return (
    <Card className="h-full flex flex-col cursor-pointer hover:shadow-gray-400">
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
      <Link href={`/vehicles/${vehicle.id}`}>
        <CardContent className="pb-2 flex-grow">
          <div className="aspect-video mb-4 rounded-md flex items-center justify-center">
            <Image
              src={carImage}
              width={300}
              height={300}
              alt="Placeholder Picture"
            />
          </div>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Engine:</span>{" "}
              {vehicle.engineSize} {vehicle.fuel}
            </p>
            <p>
              <span className="font-semibold">Mileage:</span>{" "}
              {vehicle.mileage.toLocaleString()} miles
            </p>
            <p>
              <span className="font-semibold">Starting Bid:</span>{" "}
              {formatCurrency(vehicle.startingBid)}
            </p>
            <div>
              <span className="font-semibold">Auction:</span>{" "}
              <Badge variant="outline">
                {formatAuctionDate(vehicle.auctionDateTime)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
