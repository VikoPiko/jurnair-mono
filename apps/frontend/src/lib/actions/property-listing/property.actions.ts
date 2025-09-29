"use server";

import { CreatePropertyDto, PropertyDto } from "@/lib/dto/property.dto";
import { apiFetch } from "@/lib/utils";
import { logger } from "@/lib/utils";
import { EventType } from "@/lib/utils";

export const createProperty = async (property: CreatePropertyDto) => {
  try {
    logger("PROPERTY", EventType.sent, property);
    const data = await apiFetch<CreatePropertyDto>("/property/create", {
      method: "Post",
      body: JSON.stringify(property),
    });
    logger("PROPERTY-RESPONSE", EventType.received, data);
  } catch (error) {
    logger("PROPERTY-ERROR", EventType.error, error);
    throw error;
  }
};

export const getAllProperties = async () => {
  const data = await apiFetch<PropertyDto[]>("/property/get-all");
  // logger("PROPERTY", EventType.received, data);
  return data;
};
