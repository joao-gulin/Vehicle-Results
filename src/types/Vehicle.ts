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

// Filter types

export interface FilterOptions {
  make: string;
  model: string;
  minBid: number;
  maxBid: number;
  showFavoritesOnly: boolean;
}

export type SortOption = "make" | "startingBid" | "mileage" | "auctionDateTime";
export type SortDirection = "asc" | "desc";
