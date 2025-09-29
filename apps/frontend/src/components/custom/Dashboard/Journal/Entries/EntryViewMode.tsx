"use client";

import { Calendar, MapPin, Lock, Users, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { JournalType } from "../JournalContext";
// import { JournalEntry } from "@/lib/actions/journal.actions";

interface EntryViewModeProps {
  entry: any;
}

export default function EntryViewMode({ entry }: EntryViewModeProps) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(entry.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        {entry.location && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {entry.location}
          </div>
        )}
        {/* <div className="flex items-center gap-1"> */}
        {/* <VisibilityIcon className="w-4 h-4" />
          {visibilityOption?.label}
        </div> */}
        <Badge variant="secondary">{entry.theme}</Badge>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
        {entry.title}
      </h1>

      {/* Photos */}
      {entry.photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entry.photos.slice(0, 4).map((photo: any, index: any) => (
            <div
              key={index}
              className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden"
            >
              <img
                src={photo || "/placeholder.svg"}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {entry.photos.length > 4 && (
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                +{entry.photos.length - 4} more photos
              </p>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-gray dark:prose-invert overflow-hidden">
        {entry.description?.split("\n").map((paragraph: any, index: any) => (
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
