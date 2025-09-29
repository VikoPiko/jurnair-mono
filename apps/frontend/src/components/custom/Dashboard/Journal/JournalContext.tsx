"use client";
// import { deleteJournalEntry } from "@/lib/actions/journal.actions";
import { createContext, useContext, useEffect, useState } from "react";

export type JournalType = {
  id: string;
  title: string;
  location: string;
  description?: string;
  date: Date;
  theme: string;
  photos: string[];
  visibility: "PUBLIC" | "PRIVATE";
};

type JournalContextType = {
  entries: JournalType[];
  addEntry: (entry: JournalType) => void;
  deleteEntry: (entry: JournalType, token: string) => void;
  updateEntry: (entry: JournalType) => void;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

const initialEntries: JournalType[] = [
  {
    id: "1a2b3c4d",
    title: "Sunset at Cappadocia",
    location: "Göreme, Turkey",
    description:
      "Today was magical. We woke up at dawn to catch the hot air balloons rise over the rocky landscape. The view was unlike anything I’ve ever seen — surreal, peaceful, and vibrant. I felt like I was floating even from the ground.",
    date: new Date("2025-08-01"),
    theme: "Travel",
    photos: [
      "https://example.com/photos/cappadocia1.jpg",
      "https://example.com/photos/cappadocia2.jpg",
      "https://example.com/photos/cappadocia2.jpg",
      "https://example.com/photos/cappadocia2.jpg",
      "https://example.com/photos/cappadocia2.jpg",
      "https://example.com/photos/cappadocia2.jpg",
      "https://example.com/photos/cappadocia2.jpg",
      "https://example.com/photos/cappadocia2.jpg",
    ],
    visibility: "PUBLIC",
  },
  {
    id: "5e6f7g8h",
    title: "A Quiet Day at Home",
    location: "Sofia, Bulgaria",
    description:
      "Spent the day indoors reflecting and journaling. Brewed some coffee, lit a candle, and read a few chapters of a new book. Sometimes the most ordinary days bring the most clarity.",
    date: new Date("2025-07-28"),
    theme: "Personal",
    photos: [],
    visibility: "PRIVATE",
  },
];

export const JournalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [entries, setEntries] = useState<JournalType[]>(initialEntries);
  const [entries, setEntries] = useState<JournalType[]>([]);

  useEffect(() => {
    const getEntries = async () => {
      const data = await fetch("http://localhost:3001/journal/all");
      if (!data) return;
      const entries = await data.json();
      console.log(entries);
      setEntries(entries);
    };
    getEntries();
  }, []);
  // }, [entries]);

  const addEntry = (entry: JournalType) => {
    setEntries((prev) => [entry, ...prev]);
  };

  const deleteEntry = (entry: JournalType, token: string) => {
    try {
      // if (!token) {
      //   console.error("No token provided for deletion");
      // }
      // deleteJournalEntry(entry, token)
      //   .then(() => {
      //     setEntries((prev) => prev.filter((e) => e.id !== entry.id));
      //   })
      //   .catch((error) => {
      //     console.error("Failed to delete entry:", error);
      //   });
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const updateEntry = (updated: JournalType) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updated.id ? updated : entry))
    );
  };

  return (
    <JournalContext.Provider
      value={{ entries, addEntry, deleteEntry, updateEntry }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) throw new Error("Must be used within a Journal Provider");
  return context;
};
