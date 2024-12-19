import type { FlightDeal } from "@/types/flight";
import type { SortOption } from "@/components/filters/SortSelect";

export function sortDealsBy(deals: FlightDeal[], sortOption: SortOption): FlightDeal[] {
  const sortedDeals = [...deals];
  
  switch (sortOption) {
    case "price-asc":
      return sortedDeals.sort((a, b) => 
        parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''))
      );
    case "price-desc":
      return sortedDeals.sort((a, b) => 
        parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''))
      );
    case "latest":
    default:
      return sortedDeals.sort((a, b) => {
        const dateA = new Date(a.postedAt);
        const dateB = new Date(b.postedAt);
        return dateB.getTime() - dateA.getTime();
      });
  }
}