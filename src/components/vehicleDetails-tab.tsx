import React, { FC } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Vehicle } from "../types/Vehicle";
import { formatCurrency } from "@/lib/utils"; // Assuming formatDate can handle both auction and registration dates

interface VehicleDetailsTabsProps {
  vehicle: Vehicle;
}

const VehicleDetailsTabs: FC<VehicleDetailsTabsProps> = ({ vehicle }) => {
  const auctionDate = new Date(vehicle.auctionDateTime);
  const registrationDate = new Date(
    vehicle.details.ownership.dateOfRegistration,
  );

  return (
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
                  {auctionDate.toLocaleDateString()}{" "}
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
            <CardTitle className="text-lg">Vehicle Specifications</CardTitle>
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
                  {vehicle.details.ownership.numberOfOwners}
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
  );
};

export default VehicleDetailsTabs;
