"use client";

import { Button } from "@/components/ui/button";
import { useVehicles } from "@/contexts/VehiclesContext";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import carImage from "../../../../public/Car Placeholder.jpg";
import Image from "next/image";
import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <main className="container mx-auto py-8 px-4">
      <Button
        className="mb-6 pl-0"
        variant="ghost"
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back To Results
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video mb-6 rounded-lg flex items-center justify-center">
            <Image
              src={carImage}
              width={300}
              height={300}
              alt="Placeholder Picture"
            />
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-600 text-lg">
                {vehicle.engineSize} {vehicle.fuel}
              </p>
            </div>

            <Button>
              <Heart
                className={vehicle.favourite ? "fill-white" : ""}
                size={18}
              />
              {vehicle.favourite ? "Favorited" : "Add to Favorites"}
            </Button>
          </div>

          <Tabs defaultValue="specification">
            <TabsList className="grid grid-cols-3 mb-6">
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

            <TabsContent value="specification" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Vehicle Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Vehicle Type</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.vehicleType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Color</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.colour}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Fuel</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.fuel}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Transmission</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.transmission}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Number Of Doors</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.numberOfDoors}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">CO2 Emissions</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.co2Emissions}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Nox Emissions</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.noxEmissions}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Number of Keys</dt>
                      <dd className="font-medium">
                        {vehicle.details.specification.numberOfKeys}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
