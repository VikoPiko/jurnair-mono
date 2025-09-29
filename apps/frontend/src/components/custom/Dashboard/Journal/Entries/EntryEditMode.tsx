"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JournalType } from "../JournalContext";
// import { JournalEntry } from "@/lib/actions/journal.actions";

interface EntryEditModeProps {
  entry: any; //JournalEntry;
  onChange: (entry: any) => void;
  visibilityOptions: Array<{
    value: string;
    label: string;
  }>;
}

export default function EntryEditMode({
  entry,
  onChange,
  visibilityOptions,
}: EntryEditModeProps) {
  //fix types
  const updateField = (field: keyof any, value: any) => {
    onChange({ ...entry, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <Input
          value={entry.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter a title for your entry..."
          className="text-xl font-bold"
        />
      </div>

      {/* Location and Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <Input
            value={entry.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Where were you?"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <Input
            type="date"
            value={
              entry.date ? new Date(entry.date).toISOString().split("T")[0] : ""
            }
            onChange={(e) => updateField("date", new Date(e.target.value))}
          />
        </div>
      </div>

      {/* Theme and Visibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme
          </label>
          {/* <select
            value={entry.theme}
            onChange={(e) => updateField("theme", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select> */}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Visibility
          </label>
          <select
            value={entry.visibility}
            onChange={(e) => updateField("visibility", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {visibilityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content
        </label>
        <Textarea
          value={entry.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Write about your experience..."
          className="min-h-[300px] resize-none"
        />
      </div>

      {/* Photos placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Photos ({entry.photos.length})
        </label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Upload Photos (TODO)
          </p>
        </div>
      </div>
    </div>
  );
}
