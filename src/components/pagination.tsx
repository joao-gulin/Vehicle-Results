import { useVehicles } from "@/contexts/VehiclesContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Pagination() {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    filteredVehicles,
    itemsPerPage,
    setItemsPerPage,
  } = useVehicles();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // Scroll top of the page after changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "elipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "elipsis",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "elipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "elipsis",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Showing{" "}
          {filteredVehicles.length > 0
            ? (currentPage - 1) * itemsPerPage + 1
            : 0}{" "}
          - {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of{" "}
          {filteredVehicles.length} vehicles
        </span>

        <div className="flex items-center gap-2 ml-4">
          <span className="text-sm whitespace-nowrap">Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="12">12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
