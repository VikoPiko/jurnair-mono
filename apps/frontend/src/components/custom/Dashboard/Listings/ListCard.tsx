"use client";

import { Button } from "@/components/ui/button";
// import { like } from "@/lib/actions/serverActions";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useAuth } from "../../Auth/auth-context";
// import { toast } from "sonner";
import { format } from "date-fns";
import { ListingDto } from "@/lib/dto/listing.dto";

export const ListCard = (listing: ListingDto) => {
  // const { setUser, user, getToken } = useAuth();
  // const [isFavorite, setIsFavorite] = useState(
  //   user?.favoriteListings?.some((l) => l.id === listing.id) ?? false
  // );
  // const isFavorite =
  //   user?.favoriteListings?.some((l) => l.id === listing.id) ?? false;
  const isFavorite = false;
  const router = useRouter();

  const [fromStr, setFromStr] = useState("");
  const [toStr, setToStr] = useState("");

  useEffect(() => {
    const paramsString = sessionStorage.getItem("SQPARAMS");
    if (!paramsString) return;

    const params = JSON.parse(paramsString);

    if (params.dateRange?.from) {
      const fromDate = new Date(params.dateRange.from);
      setFromStr(format(fromDate, "MMM dd")); // e.g. "Sep 11"
    }

    if (params.dateRange?.to) {
      const toDate = new Date(params.dateRange.to);
      setToStr(format(toDate, "dd")); // only day, e.g. "12"
    }
  }, []);

  useEffect(() => {
    function handleStorageChange(e: StorageEvent) {
      if (e.key === "SQPARAMS" && e.newValue) {
        const params = JSON.parse(e.newValue);

        if (params.dateRange?.from) {
          setFromStr(format(new Date(params.dateRange.from), "MMM dd"));
        }
        if (params.dateRange?.to) {
          setToStr(format(new Date(params.dateRange.to), "dd"));
        }
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function formatDateRange(from?: Date, to?: Date) {
    if (!from && !to) {
      // default: today + tomorrow
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      return `${format(today, "MMM dd")} - ${format(tomorrow, "dd")}`;
    }

    if (from && !to) {
      // user only selected start
      const tomorrow = new Date(from);
      tomorrow.setDate(from.getDate() + 1);
      return `${format(from, "MMM dd")} - ${format(tomorrow, "dd")}`;
    }

    if (from && to) {
      return `${format(from, "MMM dd")} - ${format(to, "dd")}`;
    }

    return "";
  }

  // const handleLike = async (listingId: string) => {
  //   if (!user) {
  //     toast("You must be logged in to like a listing");
  //     return;
  //   }
  //   const isCurrentlyFavorite = user.favoriteListings.some(
  //     (l) => l.id === listingId
  //   );
  //   const updatedFavorites = isCurrentlyFavorite
  //     ? user.favoriteListings.filter((l) => l.id !== listingId)
  //     : [...user.favoriteListings, { id: listingId } as any];

  //   setUser({ ...user, favoriteListings: updatedFavorites });

  //   const token = getToken();
  //   if (!token) return console.error("No token found");
  //   try {
  //     const updatedUser = await like(listingId, token);
  //     setUser(updatedUser);
  //     sessionStorage.setItem("user", JSON.stringify(updatedUser));
  //   } catch (err) {
  //     toast("Failed to like listing");
  //     setUser(user);
  //   }
  // };

  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/listing/${listing.id}`)}
    >
      <div className="relative w-full aspect-[20/19] rounded-2xl overflow-hidden mb-2">
        {listing.images && listing.images.length > 0 ? (
          <>
            <Image
              src={listing.images[0] || "/placeholder.svg"}
              alt={`${listing.title} listing image`}
              fill
              className="object-cover "
            />
            <div className="absolute top-3 right-3 z-10">
              <Heart
                className={cn(
                  "w-5 h-5 text-white hover:text-red-500 transition-colors cursor-pointer drop-shadow-sm",
                  isFavorite && "fill-rose-500 text-rose-500 hover:text-white"
                )}
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className={cn(
                  "absolute right-0 top-0 z-10 rounded-full backdrop-blur-xs ",
                  isFavorite
                    ? "text-rose-500 hover:text-white"
                    : "text-white hover:text-red-500"
                )}
                onClick={(e) => {
                  // handleLike(listing.id);
                  e.stopPropagation();
                }}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 drop-shadow-sm transition-colors",
                    isFavorite && "fill-rose-500"
                  )}
                />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </div>
          </>
        ) : (
          <Image src={"/placeholder.svg"} alt="placeholder" fill />
        )}
      </div>
      <div className="space-y-1">
        <h2 className="font-semibold text-lg text-stone-950 dark:text-gray-50 truncate">
          {listing.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {fromStr}-{toStr} · {listing.address}, {listing.location}
        </p>
        <p className="text-sm font-medium text-stone-950 dark:text-gray-100">
          {listing.pricePerNight} лв. night · ⭐ {listing.rating}
        </p>
      </div>
    </div>
  );
};
