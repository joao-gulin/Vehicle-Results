import { useVehicles } from "@/contexts/VehiclesContext";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { formatCurrency } from "@/lib/utils";

export function VehicleFilters() {
  const { filters, setFilters, uniqueMakes, uniqueModels, vehicles } =
    useVehicles();

  const [localMinBid, setLocalMinBid] = useState(filters.minBid);
  const [localMaxBid, setLocalMaxBid] = useState(filters.maxBid);

  // Find global min and max bids from all vehicles
  const minPossibleBid = Math.min(...vehicles.map((v) => v.startingBid));
  const maxPossibleBid = Math.max(...vehicles.map((v) => v.startingBid));

  // Update local state when filters change
  useEffect(() => {
    setLocalMinBid(filters.minBid);
    setLocalMaxBid(filters.maxBid);
  }, [filters.minBid, filters.maxBid]);

  // Apply bid range filter after a short delay to prevent too many updates while sliding
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localMinBid !== filters.minBid || localMaxBid !== filters.maxBid) {
        setFilters({ minBid: localMinBid, maxBid: localMaxBid });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localMinBid, localMaxBid, setFilters, filters.minBid, filters.maxBid]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Filter Vehicles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="make">Make</Label>
          <Select
            value={filters.make || ""}
            onValueChange={(value) =>
              setFilters({ make: value === "all" ? "" : value })
            }
          >
            <SelectTrigger id="make">
              <SelectValue placeholder="All Makes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {uniqueMakes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model</Label>
          <Select
            value={filters.model || ""}
            onValueChange={(value) =>
              setFilters({ model: value === "all" ? "" : value })
            }
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="All Models" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {uniqueModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Price Range</Label>
            <div className="flex justify-between mt-1 text-sm">
              <span>{formatCurrency(localMinBid)}</span>
              <span>{formatCurrency(localMaxBid)}</span>
            </div>
          </div>

          <Slider
            min={minPossibleBid}
            max={maxPossibleBid}
            step={100}
            value={[localMinBid, localMaxBid]}
            onValueChange={([min, max]) => {
              setLocalMinBid(min);
              setLocalMaxBid(max);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
