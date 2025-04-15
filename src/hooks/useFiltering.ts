import {
  FILTER_CONSTANTS,
  FilterOptions,
  SortDirection,
  SortOption,
  Vehicle,
} from "@/types/Vehicle";
import { useCallback, useMemo, useState } from "react";

const defaultFilters: FilterOptions = {
  make: "",
  model: "",
  minBid: FILTER_CONSTANTS.DEFAULT_MIN_BID,
  maxBid: FILTER_CONSTANTS.DEFAULT_MAX_BID,
  showFavoritesOnly: false,
};

export function useFiltering(vehicles: Vehicle[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    make: "",
    model: "",
    minBid: 0,
    maxBid: 20000,
    showFavoritesOnly: false,
  });
  const [sortOption, setSortOption] = useState<SortOption>("auctionDateTime");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Derive unique makes for filter dropdown
  const uniqueMakes = useMemo(
    () => [...new Set(vehicles.map((vehicle) => vehicle.make))].sort(),
    [vehicles],
  );

  // Derive models for the selected make
  const uniqueModels = useMemo(() => {
    // If no make is selected, return an empty array
    if (!filters.make) return [];

    // Get models only for the selected make
    const modelsForMake = vehicles
      .filter((vehicle) => vehicle.make === filters.make)
      .map((vehicle) => vehicle.model);

    // Return unique, sorted models
    return [...new Set(modelsForMake)].sort();
  }, [vehicles, filters.make]);

  const updateFilters = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => {
      // Reset model if make changes
      if (newFilters.make !== undefined && newFilters.make !== prev.make) {
        return { ...prev, ...newFilters, model: "" };
      }
      return { ...prev, ...newFilters };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const toggleSortDirection = useCallback(() => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  }, []);

  // Apply filters and sorting
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((vehicle) => {
        if (filters.showFavoritesOnly && !vehicle.favourite) return false;
        if (filters.make && vehicle.make !== filters.make) return false;
        if (filters.model && vehicle.model !== filters.model) return false;
        if (
          vehicle.startingBid < filters.minBid ||
          vehicle.startingBid > filters.maxBid
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        let valueA, valueB;

        if (sortOption === "make") {
          valueA = a.make.toLowerCase();
          valueB = b.make.toLowerCase();
        } else if (sortOption === "startingBid") {
          valueA = a.startingBid;
          valueB = b.startingBid;
        } else if (sortOption === "mileage") {
          valueA = a.mileage;
          valueB = b.mileage;
        } else {
          // auctionDateTime
          valueA = new Date(a.auctionDateTime).getTime();
          valueB = new Date(b.auctionDateTime).getTime();
        }

        return sortDirection === "asc"
          ? valueA > valueB
            ? 1
            : -1
          : valueA > valueB
            ? -1
            : 1;
      });
  }, [vehicles, filters, sortOption, sortDirection]);

  return {
    filters,
    setFilters: updateFilters,
    resetFilters,
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    toggleSortDirection,
    filteredVehicles,
    uniqueMakes,
    uniqueModels,
  };
}
