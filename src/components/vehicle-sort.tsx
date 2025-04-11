import { useVehicles } from "@/contexts/VehiclesContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SortOption } from "@/types/Vehicle";
import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";

export function VehicleSort() {
  const { sortOption, setSortOption, sortDirection, setSortDirection } =
    useVehicles();

  const toggleDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex gap-2">
      <Select
        value={sortOption}
        onValueChange={(value) => setSortOption(value as SortOption)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="make">Make</SelectItem>
          <SelectItem value="startingBid">startingBid</SelectItem>
          <SelectItem value="mileage">Mileage</SelectItem>
          <SelectItem value="auctionDateTime">Auction Date</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDirection}
        title={`Sort ${sortDirection === "asc" ? "Ascending" : "Descending"}`}
      >
        <ArrowUpDown
          className={`h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`}
        />
      </Button>
    </div>
  );
}
