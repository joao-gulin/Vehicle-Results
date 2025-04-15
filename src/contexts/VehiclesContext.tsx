"use client";
import { createContext, useState, ReactNode, useContext, useMemo } from "react";
import {
  Vehicle,
  FilterOptions,
  SortOption,
  SortDirection,
  PAGINATION_CONSTANTS,
} from "../types/Vehicle";
import vehiclesData from "../vehicles_dataset.json";
import { usePagination } from "@/hooks/usePagination";

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
  uniqueMakes: string[];
  uniqueModels: string[];

  // Pagination props from usePagination hook
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  pageNumbers: (number | string)[];
  paginatedIndices: { startIndex: number; endIndex: number };
  setItemsPerPage: (items: number) => void;

  setFilters: (filters: Partial<FilterOptions>) => void;
  setSortOption: (option: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  toggleFavorite: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  currentPageVehicles: Vehicle[]; // New property for the current page's vehicles
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

  // Use the pagination hook
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    handlePageChange,
    pageNumbers,
    paginatedIndices,
  } = usePagination({
    totalItems: filteredVehicles.length,
    initialPage: PAGINATION_CONSTANTS.DEFAULT_PAGE,
    initialItemsPerPage: PAGINATION_CONSTANTS.DEFAULT_ITEMS_PER_PAGE,
  });

  // Get the vehicles for the current page
  const currentPageVehicles = useMemo(() => {
    const { startIndex, endIndex } = paginatedIndices;
    return filteredVehicles.slice(startIndex, endIndex);
  }, [filteredVehicles, paginatedIndices]);

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
        uniqueMakes,
        uniqueModels,

        // Pagination props
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalPages,
        handlePageChange,
        pageNumbers,
        paginatedIndices,
        setItemsPerPage,

        // Methods
        setFilters: updateFilters,
        setSortOption,
        setSortDirection,
        toggleFavorite,
        getVehicleById,
        currentPageVehicles,
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
