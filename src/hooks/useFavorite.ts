import { useCallback } from "react";
import { Vehicle } from "../types/Vehicle";

export function useFavorites(
  setVehicles: React.Dispatch<React.SetStateAction<Vehicle[]>>,
) {
  const toggleFavorite = useCallback(
    (id: string) => {
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) =>
          vehicle.id === id
            ? { ...vehicle, favourite: !vehicle.favourite }
            : vehicle,
        ),
      );
    },
    [setVehicles],
  );

  return {
    toggleFavorite,
  };
}
