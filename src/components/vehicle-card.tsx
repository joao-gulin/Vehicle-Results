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

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(vehicle.id);
  };

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block h-full">
      <Card className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-bold">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="h-8 w-8 relative z-10"
              aria-label={
                vehicle.favourite ? "Remove from Favorites" : "Add to Favorites"
              }
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
        <CardContent className="pb-2 flex-grow">
          <div className="aspect-video mb-4 rounded-md flex items-center justify-center">
            <Image
              src={carImage}
              width={300}
              height={300}
              alt="Placeholder Picture"
              className="object-cover"
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
              <Badge variant="outline" className="text-xs py-0 h-5">
                {formatAuctionDate(vehicle.auctionDateTime)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
