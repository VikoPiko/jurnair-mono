"use client";
import { format } from "date-fns";
import { Lock, LockOpen, MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { JournalType, useJournal } from "./JournalContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const JournalGrid = () => {
  const { entries, addEntry, deleteEntry } = useJournal();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  const handleDelete = () => {
    if (!token) {
      toast.error("You must be logged in to delete entries");
      return; // Prevent further execution if token is null
    }
    try {
      if (selectedIds.length === 0) {
        toast.error("No entries selected for deletion");
        return;
      }
      selectedIds.forEach((id) => {
        const entry = entries.find((e) => e.id === id);
        if (entry) deleteEntry(entry, token); // token is guaranteed to be string here
      });

      console.log("Deleting Entries: ", selectedIds);
      setSelectedIds([]);
      setDeleteMode(false);
    } catch (error) {
      console.error("Error deleting entries:", error);
      toast.error("Failed to delete entries");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between w-full items-center gap-4 p-5">
        <h1 className="text-3xl text-gray-950 dark:text-gray-50">My Journal</h1>
        {entries.length > 0 && (
          <div className="flex items-center justify-center gap-x-3">
            {selectedIds.length > 0 && (
              <p>{`Selected ${selectedIds.length} entries`}</p>
            )}
            <Button
              variant={deleteMode ? "destructive" : "outline"}
              onClick={() => {
                if (deleteMode) {
                  handleDelete();
                } else {
                  setDeleteMode(true);
                }
              }}
            >
              {deleteMode ? "Delete" : "Select"}
            </Button>
            {deleteMode && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedIds([]);
                  setDeleteMode(false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {entries.map((entry) => (
          <JournalCard
            key={entry.id}
            entry={entry}
            deleteMode={deleteMode}
            selected={selectedIds.includes(entry.id)}
            onToggleSelect={() => toggleSelect(entry.id)}
          />
        ))}
        <CreateEntryCard />
      </div>
      {/* {deleteMode && selectedIds.length > 0 && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() =>
              selectedIds.forEach((id) => {
                const entry = entries.find((e) => e.id === id);
                if (entry) deleteEntry(entry);
              })
            }
          >
            Delete Selected ({selectedIds.length})
          </button>
        </div>
      )} */}
    </div>
  );
};

const JournalCard = ({
  entry,
  deleteMode,
  selected,
  onToggleSelect,
}: {
  entry: JournalType;
  deleteMode: boolean;
  selected: boolean;
  onToggleSelect: () => void;
}) => {
  const MAX_LENGTH = 90;
  const safeDescription = entry.description ?? "";
  const isLong = safeDescription.length > MAX_LENGTH;
  const previewText = isLong
    ? safeDescription.slice(0, MAX_LENGTH) + "..."
    : safeDescription;

  const router = useRouter();

  const date = format(new Date(entry.date), "MMMM do, yyyy");

  return (
    <div
      className="border hover:shadow-lg rounded-lg p-4 col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 transition-all duration-200 cursor-pointer bg-white dark:bg-[#363636]/50 hover:dark:bg-[#484848]/50 h-[250px] flex flex-col"
      onClick={() => !deleteMode && router.push(`/journal/${entry.id}`)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-x-1">
          {entry.visibility === "PRIVATE" ? (
            <Lock className="w-3 h-3 text-gray-400 dark:text-gray-200" />
          ) : (
            <LockOpen className="w-3 h-3 text-gray-400 dark:text-gray-200" />
          )}
          <p className="text-gray-400 text-sm dark:text-gray-200 capitalize">
            {entry.visibility.toLocaleLowerCase()}
          </p>
        </div>
        <div className="flex items-center justify-center gap-x-3">
          <div className="rounded-xl px-2 py-1 font-semibold text-xs border shadow-sm bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            {entry.photos.length}{" "}
            {entry.photos.length === 1 ? "photo" : "photos"}
          </div>
          {deleteMode && (
            <Checkbox
              checked={selected}
              onCheckedChange={(checked) => onToggleSelect()}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
      </div>

      <h1 className="font-bold text-xl text-stone-950 dark:text-white mb-2 line-clamp-2">
        {entry.title}
      </h1>

      <div className="inline-flex items-center gap-x-1 text-gray-400 dark:text-gray-300 mb-3">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        <h1 className="text-sm truncate">{entry.location}</h1>
      </div>

      {entry.description && (
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-4 leading-relaxed flex-1 overflow-hidden">
          {previewText}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto">
        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
        <span className="px-2 py-1 rounded-lg font-semibold text-xs bg-gray-200 dark:bg-gray-600 dark:text-gray-200">
          {entry.theme}
        </span>
      </div>
    </div>
  );
};

const CreateEntryCard = () => {
  const router = useRouter();
  return (
    <div
      className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2"
      onClick={() => router.push(`/journal/new`)}
    >
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 h-[250px] hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200 cursor-pointer bg-gray-50/50 dark:bg-[#363636]/50 hover:bg-gray-100/50 dark:hover:bg-[#484848]/50">
        <div className="rounded-lg bg-gray-200 dark:bg-[#121212] p-3 mb-3">
          <Plus className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </div>
        <h1 className="text-lg font-semibold text-stone-950 dark:text-white mb-1 text-center">
          Create New Entry
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
          Document your latest adventure
        </p>
      </div>
    </div>
  );
};

export default JournalGrid;
