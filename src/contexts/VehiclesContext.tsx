import React, { createContext, useState } from "react";
import vehiclesData from "../vehicles_dataset.json";
import { Vehicle } from "../types/Vehicle";

interface VehiclesContextType {
  vehicles: Vehicle[];
  toggleFavourite: (id: number) => void;
}

export const VehiclesContext = createContext<VehiclesContextType>({
  vehicles: [],
  toggleFavourite: () => {},
});

export const VehiclesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load JSON data and add unique IDs
  const [vehicles, setVehicles] = useState<Vehicle[]>(
    vehiclesData.map((vehicle: any, index) => ({
      ...vehicle,
      id: index + 1,
    })),
  );

  // Function to toggle favourite status
  const toggleFavourite = (id: number) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, favourite: !vehicle.favourite }
          : vehicle,
      ),
    );
  };

  return (
    <VehiclesContext.Provider value={{ vehicles, toggleFavourite }}>
      {children}
    </VehiclesContext.Provider>
  );
};
