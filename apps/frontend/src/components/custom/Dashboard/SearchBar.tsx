"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Search, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface SearchBarProps {
  onLocationChange: (location: string) => void;
  onClear: () => void;
}

export function SearchBar({ onLocationChange, onClear }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"location" | "dates" | "guests">(
    "location"
  );

  const [location, setLocation] = useState("");

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  useEffect(() => { 
    sessionStorage.setItem("SQPARAMS", JSON.stringify(
      { location, dateRange, guests }
    ));
  }, [dateRange, guests, location]);

  const resetAll = () => {
    setLocation("");
    setActiveTab("location");
    setGuests({
      adults: 1,
      children: 0,
      infants: 0,
      pets: 0,
    });
    setDateRange({ from: undefined, to: undefined });
    setIsOpen(false);
    onClear();
  };

  const [popularDests, setPopularDests] = useState<string[]>([
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Rome",
  ]);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const filteredListings = popularDests.filter((item) =>
    item.toLowerCase().includes(location.toLowerCase())
  );

  const filteredPopular = popularDests.filter(
    (city) => !recentSearches.includes(city)
  );

  return (
    <div className="relative">
      <div className="flex items-center rounded-full border bg-background px-5 shadow-sm">
        <Popover
          open={isOpen && activeTab === "location"}
          onOpenChange={(open) => {
            if (open) {
              setActiveTab("location");
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-14 flex-1 justify-start gap-2 rounded-full border-0 px-4 text-left shadow-none hover:bg-transparent"
              onClick={() => setIsOpen(true)}
            >
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium">Where</span>
                <span className="text-sm truncate dark:text-gray-200 max-w-[160px]">
                  {location || "Search destinations"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 p-0" side="bottom">
            <div className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium">Search by location</h3>
                <Input
                  placeholder="Search destinations"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    onLocationChange(e.target.value);
                  }}
                  onSubmit={() => {
                    if (location.trim() !== "") {
                      setRecentSearches((prev) => {
                        const updated = [
                          location,
                          ...prev.filter((item) => item !== location),
                        ];
                        return updated.slice(0, 5);
                      });
                    }
                  }}
                  maxLength={35}
                  className="h-9"
                />
              </div>
              {recentSearches.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Recent searches</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {recentSearches.map((city) => (
                      <Button
                        key={city}
                        variant="outline"
                        className="justify-start bg-transparent"
                        onClick={() => {
                          setLocation(city);
                          onLocationChange(city);
                        }}
                      >
                        {city}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Popular destinations</h4>
                <div className="grid grid-cols-2 gap-2">
                  {filteredPopular.map((city) => (
                    <Button
                      key={city}
                      variant="outline"
                      className="justify-start bg-transparent"
                      onClick={() => {
                        setLocation(city);
                        onLocationChange(city);
                      }}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-8" />

        <Popover
          open={isOpen && activeTab === "dates"}
          onOpenChange={(open) => {
            if (open) {
              setActiveTab("dates");
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-14 flex-1 justify-start gap-2 rounded-full border-0 px-4 text-left shadow-none hover:bg-transparent"
              onClick={() => setIsOpen(true)}
            >
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium">When</span>
                <span className="text-sm dark:text-gray-200">
                  {dateRange.from
                    ? dateRange.to
                      ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                      : dateRange.from.toLocaleDateString()
                    : "Add dates"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-auto p-0" side="bottom">
            <CalendarComponent
              mode="range"
              selected={dateRange}
              onSelect={(range) =>
                setDateRange(
                  range as { from: Date | undefined; to: Date | undefined }
                )
              }
              numberOfMonths={2}
              className="border-0"
            />
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="h-8" />

        <Popover
          open={isOpen && activeTab === "guests"}
          onOpenChange={(open) => {
            if (open) {
              setActiveTab("guests");
              setIsOpen(true);
            } else {
              setIsOpen(false);
            }
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-14 flex-1 justify-start gap-2 rounded-full border-0 px-4 text-left shadow-none hover:bg-transparent"
              onClick={() => setIsOpen(true)}
            >
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="text-xs font-medium">Who</span>
                <span className="text-sm dark:text-gray-200">
                  {guests.adults + guests.children > 0
                    ? `${guests.adults + guests.children} guest${
                        guests.adults + guests.children !== 1 ? "s" : ""
                      }`
                    : "Add guests"}
                </span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-4" side="bottom">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Adults</h4>
                  <p className="text-sm text-muted-foreground">
                    Ages 13 or above
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        adults: Math.max(1, guests.adults - 1),
                      })
                    }
                    disabled={guests.adults <= 1}
                  >
                    -
                  </Button>
                  <span className="w-4 text-center">{guests.adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() =>
                      setGuests({ ...guests, adults: guests.adults + 1 })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Children</h4>
                  <p className="text-sm text-muted-foreground">Ages 2-12</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() =>
                      setGuests({
                        ...guests,
                        children: Math.max(0, guests.children - 1),
                      })
                    }
                    disabled={guests.children <= 0}
                  >
                    -
                  </Button>
                  <span className="w-4 text-center">{guests.children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() =>
                      setGuests({ ...guests, children: guests.children + 1 })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          size="icon"
          className="ml-2 h-10 w-10 shrink-0 rounded-full shadow-md"
          onClick={() => {
            if (location.trim() !== "") {
              setRecentSearches((prev) => {
                const updated = [
                  location,
                  ...prev.filter((item) => item !== location),
                ];
                return updated.slice(0, 5);
              });
            }
            setIsOpen(false);
          }}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        <Button
          variant={"outline"}
          //   className="ml-3 h-8 w-15 shrink-0 rounded-full"
          className="ml-3 shrink-0 rounded-full shadow-md"
          onClick={() => {
            setLocation("");
            setActiveTab("location");
            setGuests({
              adults: 1,
              children: 0,
              infants: 0,
              pets: 0,
            });
            setDateRange({ from: undefined, to: undefined });
            setIsOpen(false);
            onClear();
          }}
        >
          <h1>Clear</h1>
        </Button>
      </div>
    </div>
  );
}
