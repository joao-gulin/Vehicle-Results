"use client";
import { VehicleCard } from "@/components/vehicle-card";
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
    <div className="lg:col-span-3">
      {currentVehicles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
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
  );
}
