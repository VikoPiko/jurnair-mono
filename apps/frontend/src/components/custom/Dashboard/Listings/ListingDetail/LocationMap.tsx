"use client";

import { MapPin } from "lucide-react";

interface LocationMapProps {
  coordinates: { lat: number; lng: number };
}

export function LocationMap({ coordinates }: LocationMapProps) {
  return (
    <div className="relative h-64 w-full rounded-lg bg-muted overflow-hidden">
      {/* Placeholder map - in a real app, you'd use Google Maps, Mapbox, etc. */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-sm font-medium">Interactive Map</p>
          <p className="text-xs text-muted-foreground">
            {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
          </p>
        </div>
      </div>
    </div>
  );
}
