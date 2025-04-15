export interface Specification {
  vehicleType: string;
  colour: string;
  fuel: string;
  transmission: string;
  numberOfDoors: number;
  co2Emissions: string;
  noxEmissions: number;
  numberOfKeys: number;
}

export interface Ownership {
  logBook: string;
  numberOfOwners?: number;
  dateOfRegistration: string;
}

export interface Details {
  specification: Specification;
  ownership: Ownership;
  equipment: string[];
}

export interface Vehicle {
  id: string; // Id is added here since there no id in the json file
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite: boolean;
  details: Details;
}

export enum SortOptionEnum {
  MAKE = "make",
  STARTING_BID = "startingBid",
  MILEAGE = "mileage",
  AUCTION_DATE_TIME = "auctionDateTime",
}

export enum SortDirectionEnum {
  ASC = "asc",
  DESC = "desc",
}

export type SortOption = "make" | "startingBid" | "mileage" | "auctionDateTime";
export type SortDirection = "asc" | "desc";

// Filter types

export interface FilterOptions {
  make: string;
  model: string;
  minBid: number;
  maxBid: number;
  showFavoritesOnly: boolean;
}

// Component Props types
export interface VehicleCardProps {
  vehicle: Vehicle;
}

// Constants
export const PAGINATION_CONSTANTS = {
  DEFAULT_ITEMS_PER_PAGE: 6,
  ITEMS_PER_PAGE_OPTIONS: [3, 6, 9, 12],
  DEFAULT_PAGE: 1,
};

export const FILTER_CONSTANTS = {
  DEFAULT_MIN_BID: 0,
  DEFAULT_MAX_BID: 20000,
  BID_STEP: 100,
};

export const DEBOUNCE_DELAY = 300;
