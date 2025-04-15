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
import { usePagination } from "../hooks/usePagination";
import { useFiltering } from "../hooks/useFiltering";
import { useFavorites } from "../hooks/useFavorite";

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
  currentPageVehicles: Vehicle[];
}

const VehicleContext = createContext<VehicleContextProps | undefined>(
  undefined,
);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(processedVehiclesData);

  // Use the favorite hook
  const { toggleFavorite } = useFavorites(setVehicles);

  // Use the filtering hook
  const {
    filters,
    setFilters: updateFilters,
    sortOption,
    setSortOption,
    sortDirection,
    setSortDirection,
    filteredVehicles,
    uniqueMakes,
    uniqueModels,
  } = useFiltering(vehicles);

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
