import { getAllProperties } from "@/lib/actions/property-listing/property.actions";
import { getQueryClient } from "@/lib/providers/react-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import Data from "./data";

const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <Data />
      </div>
    </HydrationBoundary>
  );
};

export default page;
