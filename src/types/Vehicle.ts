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
  numeberOfOwners: number;
  dateOfRegistration: string;
}

export interface Details {
  specification: Specification;
  ownership: Ownership;
  equipment: string[];
}

export interface Vehicle {
  id: number;
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
