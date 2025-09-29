"use server";

import { CreateListingDto, ListingDto } from "@/lib/dto/listing.dto";
import { apiFetch, EventType, logger } from "@/lib/utils";

export const createListing = async (listing: CreateListingDto) => {
  try {
    logger("LISTING", EventType.sent, listing);
    const data = await apiFetch<CreateListingDto>("/listings/create", {
      method: "POST",
      body: JSON.stringify(listing),
    });
    logger("LISTING", EventType.received, data);
    return data;
  } catch (error) {
    logger("LISTING-ERROR", EventType.error, error);
  }
};

export const getAllListings = async () => {
  try {
    const data = await apiFetch<ListingDto[]>("/listings/all");
    logger("Listing", EventType.received, data);
    return data;
  } catch (error) {
    logger("Listing-error", EventType.error, error);
    return [];
  }
};
