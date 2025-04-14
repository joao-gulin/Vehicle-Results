"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import carImage from "../../../../public/Car Placeholder.jpg";
import Image from "next/image";
import { useVehicles } from "@/contexts/VehiclesContext";
import VehicleDetailsTabs from "@/components/vehicleDetails-tab";

type PageParams = {
  id: string;
};

export default function VehicleDetailsPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const unwrappedParams = use(params);
  const { getVehicleById, toggleFavorite } = useVehicles();
  const router = useRouter();

  const vehicle = getVehicleById(unwrappedParams.id);

  // Handle case where vehicle is not found
  useEffect(() => {
    if (!vehicle) {
      router.push("/");
    }
  }, [vehicle, router]);

  if (!vehicle) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  const auctionDate = new Date(vehicle.auctionDateTime);
  const registrationDate = new Date(
    vehicle.details.ownership.dateOfRegistration,
  );

  return (
    <main className="container mx-auto py-4 px-4">
      <Button
        className="mb-4 pl-0"
        variant="ghost"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-xl font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="text-sm text-gray-600">
            {vehicle.engineSize} {vehicle.fuel}
          </p>
        </div>
        <Button size="sm" onClick={() => toggleFavorite(vehicle.id)}>
          <Heart
            className={`mr-1 h-4 w-4 ${vehicle.favourite ? "fill-red-500" : ""}`}
          />
          {vehicle.favourite ? "Favorited" : "Press to Favorite"}
        </Button>
      </div>

      {/* Main layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-15">
        {/* Left side - Vehicle Image and Auction Information */}
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={carImage || "/placeholder.svg"}
              className="w-full h-auto object-cover"
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              priority
            />
          </div>
        </div>

        {/* Right side - Tabs with vehicle details */}
        <div>
          <VehicleDetailsTabs vehicle={vehicle} />
        </div>
      </div>
    </main>
  );
}
