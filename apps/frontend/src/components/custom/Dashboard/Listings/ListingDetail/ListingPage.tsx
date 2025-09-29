"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Car,
  Waves,
  Flame,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingCard } from "./BookingCard";
import { ReviewsSection } from "./ReviewsSection";
import { LocationMap } from "./LocationMap";
import { cn } from "@/lib/utils";
// import { like } from "@/lib/actions/serverActions";
import { MapComponent } from "@/components/custom/Map/map";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { useAuth } from "@/components/custom/Auth/auth-context";
import { toast } from "sonner";
import { ListingDto } from "@/lib/dto/listing.dto";

const amenityIcons: Record<string, any> = {
  WiFi: Wifi,
  Parking: Car,
  "Private pool": Waves,
  "Beach access": Waves,
  Fireplace: Flame,
  "Mountain view": MapPin,
  "Ocean view": Waves,
};

const ListingPage = (listing: ListingDto) => {
  const [selectedImage, setSelectedImage] = useState(0);
  // const [isFavorite, setIsFavorite] = useState(listing.is_favorite);
  // const [isFavorite, setIsFavorite] = useState(false);

  // const { user, getToken, setUser } = useAuth();

  const isFavorite = false;
  // user?.favoriteListings?.some((l) => l.id === listing.id) ?? false;

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

  // const handleLike = async (listingId: string) => {
  //   setIsFavorite(!isFavorite);
  //   // like(listingId);
  // };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("gap-2", isFavorite && "text-red-500")}
              // onClick={() => handleLike(listing.id)}
            >
              <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
              {isFavorite ? <span>Saved</span> : <span>Save</span>}
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{listing?.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{listing.rating}</span>
              <span>({listing.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{listing.location}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-xl overflow-hidden">
          <div className="lg:col-span-2 lg:row-span-2">
            <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden">
              <Image
                src={listing.images[selectedImage] || "/boston1.jpg"}
                // src={"/boston1.jpg"}
                alt={listing.title}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>
          {listing.images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden cursor-pointer"
            >
              <Image
                src={image || "/placeholder.svg"}
                // src={"/boston1.jpg"}
                alt={`${listing.title} - ${index + 2}`}
                fill
                className="object-cover transition-all hover:scale-105 hover:brightness-110"
                onClick={() => setSelectedImage(index + 1)}
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl mb-1">
                      Host:{" "}
                      <span className="font-semibold">
                        {listing.property.host.firstName}{" "}
                        {listing.property.host.lastName} fix hostname
                      </span>
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {listing.guests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {listing.bedrooms} bedrooms
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {listing.bathrooms} bathrooms
                      </span>
                    </div>
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback>
                      {listing.property.host.firstName.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Separator className="my-4" />
                <p className="text-muted-foreground leading-relaxed">
                  {listing.description}
                </p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  What this place offers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {listing.amenities &&
                    listing.amenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || MapPin;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
                        >
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">
                            {amenity.charAt(0).toUpperCase() +
                              amenity.slice(1).toLowerCase()}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <ReviewsSection
              rating={listing.rating}
              reviewCount={listing.reviewCount}
            />

            {/* Location */}
            <Card>
              <CardContent className="px-4">
                <h3 className="text-lg font-semibold mb-1">Where you'll be</h3>
                <div className="mb-2">
                  <p className="text-muted-foreground">{listing.location}</p>
                </div>
                {/* <LocationMap
                  coordinates={{ lat: listing.lat, lng: listing.lng }}
                /> */}
                <div className="w-full h-[400px] shadow-lg">
                  <MapComponent
                    coordinates={{
                      lat: Number(listing.property.lat),
                      lng: Number(listing.property.lng),
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">House rules</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Check-in:</span>
                    <span>
                      {/* {new Date(listing.check_in).toLocaleDateString()} */}
                      <span>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger>
                            {format(new Date(listing.checkIn), "dd/MM/yyyy")}
                          </TooltipTrigger>
                          <TooltipContent>Format is: DD/MM/YYYY</TooltipContent>
                        </Tooltip>
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Check-out:</span>
                    <span>
                      {/* {new Date(listing.check_out).toLocaleDateString()} */}
                      <span>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger>
                            {format(new Date(listing.checkOut), "dd/MM/yyyy")}
                          </TooltipTrigger>
                          <TooltipContent>Format is: DD/MM/YYYY</TooltipContent>
                        </Tooltip>
                      </span>
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {listing.houseRules &&
                      listing.houseRules.map((rule, index) => (
                        <li key={index}>• {rule}</li>
                      ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard
                pricePerNight={listing.pricePerNight}
                rating={listing.rating}
                reviewCount={listing.reviewCount}
                listingId={listing.id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingPage;
