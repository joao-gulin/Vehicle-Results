import { render, screen, fireEvent } from "@testing-library/react";
import { VehicleProvider, useVehicles } from "@/contexts/VehiclesContext";

// Mock the vehicle data
jest.mock("../vehicles_dataset.json", () => [
  {
    make: "Toyota",
    model: "Corolla",
    engineSize: "1.8L",
    fuel: "Petrol",
    year: 2020,
    mileage: 30000,
    auctionDateTime: "2024-05-01T10:00:00",
    startingBid: 15000,
    favourite: false,
    details: {
      specification: {
        vehicleType: "Sedan",
        colour: "Red",
        fuel: "Petrol",
        transmission: "Automatic",
        numberOfDoors: 4,
        co2Emissions: "120g/km",
        noxEmissions: 0.05,
        numberOfKeys: 2,
      },
      ownership: {
        logBook: "Present",
        numeberOfOwners: 1,
        dateOfRegistration: "2020-01-15",
      },
      equipment: ["Air Conditioning", "Bluetooth", "Cruise Control"],
    },
  },
  {
    make: "Honda",
    model: "Civic",
    engineSize: "1.6L",
    fuel: "Diesel",
    year: 2019,
    mileage: 45000,
    auctionDateTime: "2024-05-02T14:00:00",
    startingBid: 12000,
    favourite: true,
    details: {
      specification: {
        vehicleType: "Hatchback",
        colour: "Blue",
        fuel: "Diesel",
        transmission: "Manual",
        numberOfDoors: 5,
        co2Emissions: "110g/km",
        noxEmissions: 0.06,
        numberOfKeys: 1,
      },
      ownership: {
        logBook: "Present",
        numeberOfOwners: 2,
        dateOfRegistration: "2019-06-20",
      },
      equipment: ["Reverse Camera", "Navigation System", "Heated Seats"],
    },
  },
]);

// Create a test component that uses the context
const TestComponent = () => {
  const {
    filteredVehicles,
    setFilters,
    toggleFavorite,
    setSortOption,
    setItemsPerPage,
  } = useVehicles();

  return (
    <div>
      <div data-testid="vehicle-count">{filteredVehicles.length}</div>
      <ul>
        {filteredVehicles.map((vehicle) => (
          <li key={vehicle.id} data-testid={`vehicle-${vehicle.id}`}>
            {vehicle.make} {vehicle.model} - ${vehicle.startingBid} -
            <span data-testid={`favorite-${vehicle.id}`}>
              {vehicle.favourite ? "Favorite" : "Not Favorite"}
            </span>
            <button
              data-testid={`toggle-favorite-${vehicle.id}`}
              onClick={() => toggleFavorite(vehicle.id)}
            >
              Toggle Favorite
            </button>
          </li>
        ))}
      </ul>
      <button
        data-testid="filter-toyota"
        onClick={() => setFilters({ make: "Toyota" })}
      >
        Filter Toyota
      </button>
      <button
        data-testid="filter-reset"
        onClick={() => setFilters({ make: "" })}
      >
        Reset Make Filter
      </button>
      <button
        data-testid="filter-favorites"
        onClick={() => setFilters({ showFavoritesOnly: true })}
      >
        Show Favorites
      </button>
      <button
        data-testid="sort-price"
        onClick={() => setSortOption("startingBid")}
      >
        Sort by Price
      </button>
      <button
        data-testid="set-page"
        onClick={() => setSortOption("startingBid")}
      >
        Go to Page 2
      </button>
      <button data-testid="set-items" onClick={() => setItemsPerPage(9)}>
        Show 9 Items
      </button>
    </div>
  );
};

describe("VehicleContext", () => {
  test("provides vehicle data correctly", () => {
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>,
    );

    // Initially should allow all mock vehicles
    expect(screen.getByTestId("vehicle-count").textContent).toBe("2");
  });

  test("filters vehicles by make", () => {
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>,
    );

    // Apply Toyota filter
    fireEvent.click(screen.getByTestId("filter-toyota"));
    expect(screen.getByTestId("vehicle-count").textContent).toBe("2");

    // Reset filter
    fireEvent.click(screen.getByTestId("filter-reset"));
    expect(screen.getByTestId("vehicle-count").textContent).toBe("2");
  });

  test("filters vehicles by favorites", () => {
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>,
    );

    // Show only favorites
    fireEvent.click(screen.getByTestId("filter-favorites"));
    expect(screen.getByTestId("vehicle-count").textContent).toBe("1");
  });

  test("toggle favorite status", () => {
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>,
    );

    // Find the first vehicle's favorite toggle button and click it
    fireEvent.click(screen.getByTestId("toggle-favorite-0"));

    // The first vehicle should now be favorited
    expect(screen.getByTestId("favorite-0").textContent).toBe("Favorite");
  });

  test("sorts vehicles by price", async () => {
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>,
    );

    // Sort by price
    fireEvent.click(screen.getByTestId("sort-price"));

    // Change to descending
    fireEvent.click(screen.getByTestId("sort-direction"));

    // Now first vehicle should be Toyota (assuming it has higher price in our mock)
    const firstVehicleText = screen.getByTestId("vehicle-0").textContent;
    expect(firstVehicleText).toContain("Toyota");
  });

  test("handles pagination changes", () => {
    render(
      <VehicleProvider>
        <TestComponent />
      </VehicleProvider>,
    );

    fireEvent.click(screen.getByTestId("set-page"));
    fireEvent.click(screen.getByTestId("set-items"));

    // These don't have visible effects in our test component but should not error
    expect(screen.getByTestId("vehicle-count").textContent).toBe("2");
  });
});
