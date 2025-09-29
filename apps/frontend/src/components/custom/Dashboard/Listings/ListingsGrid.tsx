import { ListCard } from "./ListCard";
import { ArrowRight } from "lucide-react";
import { ListingDto } from "@/lib/dto/listing.dto";

interface ListingsGridProps {
  listings: ListingDto[];
}

export function ListingsGrid({ listings }: ListingsGridProps) {
  return (
    // <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-10">
    //   {listings.map((listing) => (
    //     // <ListingCard key={listing.listing.id} {...listing} />
    //     <ListCard key={listing.listing.id} listing={listing.listing} />
    //   ))}
    // </div>
    <div className="container mx-auto p-4">
      <div className="inline-flex items-baseline gap-x-2">
        <h1 className="text-2xl font-bold mb-6 text text-stone-950 dark:text-gray-50">
          Featured Listings
        </h1>
        <ArrowRight className="w-4 h-4 translate-y-[1px]" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-3">
        {listings && listings.length > 0 ? (
          <div>
            {listings.map((listing) => (
              <ListCard key={listing.id} {...listing} />
            ))}
          </div>
        ) : (
          <div className="text-xl font-bold">No listings yet...</div>
        )}
      </div>
    </div>
  );
}
