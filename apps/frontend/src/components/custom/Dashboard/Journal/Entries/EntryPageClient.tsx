"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3, Globe, Save, Users, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EntryEditMode from "./EntryEditMode";
import EntryViewMode from "./EntryViewMode";
// import { createEntry, JournalEntry } from "@/lib/actions/journal.actions";
import { useJournal } from "../JournalContext";
import { useAuth } from "@/components/custom/Auth/auth-context";
import { set } from "date-fns";
import { toast } from "sonner";

type EntryPageProps = {
  entry: any;
  isNewEntry: boolean;
};

const visibilityOptions = [
  { value: "PRIVATE", label: "Private" },
  { value: "PUBLIC", label: "Public" },
];

const EntryPageClient = ({ entry, isNewEntry }: EntryPageProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(isNewEntry);
  const [editedEntry, setEditedEntry] = useState<any>(entry);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { addEntry, updateEntry } = useJournal();
  const { user } = useAuth();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      if (isNewEntry) {
        // const token = sessionStorage.getItem("token");
        if (!token) return;
        // const newEntry = console.log("mockk")
        // await createEntry(
        //   { ...editedEntry, date: new Date(editedEntry.date) },
        //   token
        // );
        // if (!newEntry || !newEntry.id) {
        //   console.error("Invalid new entry returned:", newEntry);
        //   return;
        // }

        // addEntry(newEntry);
        // router.push(`/journal/${newEntry.id}`);
      } else {
        // Handle updating an existing entry
        try {
          if (!token) {
            console.error("No token found");
            return;
          }
          const res = await fetch(
            `http://localhost:3001/journal/update-entry/${entry.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
              },
              body: JSON.stringify({
                ...editedEntry,
                date: new Date(editedEntry.date).toISOString(),
              }),
            }
          );
          if (!res.ok) {
            console.error("Error updating entry:", await res.json());
          }
          const updatedEntry = await res.json();
          toast.success("Entry Updated Successfully!");
          setEditedEntry(updatedEntry);
          updateEntry(updatedEntry);
          router.push("/?tab=My+Journal");
          return updatedEntry;
        } catch (error) {
          console.error("Error updating entry:", error);
        }
        console.log("Updating entry:", editedEntry);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isNewEntry) {
      router.back();
    } else {
      setEditedEntry({ ...entry });
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <div className="flex items-center gap-2">
            {!isNewEntry && !isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            )}

            {isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <Save className="w-4 h-4" />
                  {isLoading ? "Saving..." : isNewEntry ? "Create" : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardContent className="p-8">
            {isEditing ? (
              <EntryEditMode
                entry={editedEntry}
                onChange={setEditedEntry}
                visibilityOptions={visibilityOptions}
              />
            ) : (
              <EntryViewMode entry={editedEntry} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntryPageClient;
