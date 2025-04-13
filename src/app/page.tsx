"use client";
import { Pagination } from "@/components/pagination";
import { VehicleCard } from "@/components/vehicle-card";
import { VehicleFilters } from "@/components/vehicle-filters";
import { VehicleSort } from "@/components/vehicle-sort";
import { useVehicles } from "@/contexts/VehiclesContext";

export default function Home() {
  const { filteredVehicles, currentPage, itemsPerPage } = useVehicles();

  // Get current page's vehicles
  const indexOfLastVehicle = currentPage * itemsPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - itemsPerPage;
  const currentVehicles = filteredVehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle,
  );

  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Vehicle Auctions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Vehicle listings on the left (3/4 of the screen) */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Vehicles</h2>
            <VehicleSort />
          </div>

          {currentVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>

              <Pagination />
            </>
          ) : (
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>

        {/* Filters on the right (1/4 of the screen) */}
        <div className="lg:col-span-1 order-1 lg:order-2 mb-4 lg:mb-0">
          <VehicleFilters />
        </div>
      </div>
    </main>
  );
}
