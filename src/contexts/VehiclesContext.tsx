"use client";
import { createContext, useState, ReactNode, useContext, useMemo } from "react";
import {
  Vehicle,
  FilterOptions,
  SortOption,
  SortDirection,
} from "../types/Vehicle";
import vehiclesData from "../vehicles_dataset.json";

// Add IDs to each vehicle in the imported data
const processedVehiclesData: Vehicle[] = vehiclesData.map((vehicle, index) => ({
  ...vehicle,
  id: `${index}`,
}));

interface VehicleContextProps {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  filters: FilterOptions;
  sortOption: SortOption;
  sortDirection: SortDirection;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  uniqueMakes: string[];
  uniqueModels: string[];

  setFilters: (filters: Partial<FilterOptions>) => void;
  setSortOption: (option: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (items: number) => void;
  toggleFavorite: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

const VehicleContext = createContext<VehicleContextProps | undefined>(
  undefined,
);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(processedVehiclesData);
  const [filters, setFilters] = useState<FilterOptions>({
    make: "",
    model: "",
    minBid: 0,
    maxBid: 20000,
    showFavoritesOnly: false,
  });
  const [sortOption, setSortOption] = useState<SortOption>("auctionDateTime");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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

  // Apply filters and sorting
  const getFilteredVehicles = () => {
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
  };

  const filteredVehicles = getFilteredVehicles();
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => {
      // If the make is being updated, reset the model filter
      if (newFilters.make !== undefined && newFilters.make !== prev.make) {
        return { ...prev, ...newFilters, model: "" }; // Reset model here
      }
      return { ...prev, ...newFilters };
    });
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleFavorite = (id: string) => {
    setVehicles(
      vehicles.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, favourite: !vehicle.favourite }
          : vehicle,
      ),
    );
  };

  const getVehicleById = (id: string) => {
    return vehicles.find((vehicle) => vehicle.id === id);
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        filteredVehicles,
        filters,
        sortOption,
        sortDirection,
        currentPage,
        itemsPerPage,
        totalPages,
        uniqueMakes,
        uniqueModels,

        setFilters: updateFilters,
        setSortOption,
        setSortDirection,
        setCurrentPage,
        setItemsPerPage,
        toggleFavorite,
        getVehicleById,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error("useVehicles must be used within a VehicleProvider");
  }
  return context;
};
