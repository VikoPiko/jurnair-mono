"use client";

import { getAllProperties } from "@/lib/actions/property-listing/property.actions";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Data = () => {
  const { data } = useQuery({
    queryKey: ["properties"],
    queryFn: getAllProperties,
    staleTime: 60000,
  });

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {data?.map((property) => (
          <li key={property.title}>
            <h1>{property.title}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;
