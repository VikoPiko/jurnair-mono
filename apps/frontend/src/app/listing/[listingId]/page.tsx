import ListingCard from "@/components/custom/Dashboard/Listings/ListingCard";
import ListingPage from "@/components/custom/Dashboard/Listings/ListingDetail/ListingPage";
import { ListingsGrid } from "@/components/custom/Dashboard/Listings/ListingsGrid";
import { getAllListings } from "@/lib/actions/property-listing/listings.actions";
import { ListingDto } from "@/lib/dto/listing.dto";
import { getQueryClient } from "@/lib/providers/react-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getListings } from "@/lib/actions/serverActions";
import React from "react";

const page = async ({ params }: { params: Promise<{ listingId: string }> }) => {
  const listingId = (await params).listingId;

  const queryClient = getQueryClient();
  const listings = await queryClient.fetchQuery({
    queryKey: ["listings"],
    queryFn: getAllListings,
  });

  const filteredListing = listings.find((l) => l.id === listingId);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {filteredListing && <ListingPage {...filteredListing} />}
      </HydrationBoundary>
    </div>
  );
};

export default page;
