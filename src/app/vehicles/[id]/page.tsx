"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import carImage from "../../../../public/Car Placeholder.jpg";
import Image from "next/image";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useVehicles } from "@/contexts/VehiclesContext";

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
          <Tabs defaultValue="auction" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="auction" className="cursor-pointer">
                Auction
              </TabsTrigger>
              <TabsTrigger value="specification" className="cursor-pointer">
                Specification
              </TabsTrigger>
              <TabsTrigger value="ownership" className="cursor-pointer">
                Ownership
              </TabsTrigger>
              <TabsTrigger value="equipment" className="cursor-pointer">
                Equipment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="auction">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg">Auction Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <dl className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Auction Date</dt>
                      <dd className="font-medium">
                        {auctionDate.toLocaleDateString()}
                        {auctionDate.toLocaleTimeString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Mileage</dt>
                      <dd className="font-medium">
                        {vehicle.mileage?.toLocaleString() || "N/A"} miles
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Starting Bid</dt>
                      <dd className="font-medium">
                        {formatCurrency(vehicle.startingBid)}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specification">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg">
                    Vehicle Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Vehicle Type</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.vehicleType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Color</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.colour}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Fuel</dt>
                      <dd className="font-medium capitalize">{vehicle.fuel}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Transmission</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.transmission}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Number Of Doors</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.numberOfDoors}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">CO2 Emissions</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.co2Emissions}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Nox Emissions</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.noxEmissions}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Number of Keys</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.numberOfKeys}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ownership">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg">Ownership History</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Date of Registration</dt>
                      <dd className="font-medium">
                        {registrationDate.toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Previous Owners</dt>
                      <dd className="font-medium">
                        {vehicle.details.ownership.numeberOfOwners}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment">
              <Card>
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-lg">Equipment</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {vehicle.details.equipment &&
                  vehicle.details.equipment.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      {vehicle.details.equipment.map((item) => (
                        <li key={item} className="list-disc ml-4">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No equipment listed for this vehicle.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
