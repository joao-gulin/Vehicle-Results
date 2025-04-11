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
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Vehicle Auctions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1">
          <VehicleFilters />
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Avaible Vehicles</h2>
          <VehicleSort />
        </div>
      </div>
      <div className="lg:col-span-3">
        {currentVehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>

            <Pagination />
          </>
        ) : (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No vehicles found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
