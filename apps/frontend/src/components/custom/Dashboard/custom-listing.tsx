"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star, Bookmark, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ListingType {
  id: string;
  title: string;
  property: string;
  authorId: string;
  images: string[];
  pricePerNight: number;
  description?: string;
  rating?: number;
  location?: string;
}

const SAMPLE_LISTINGS: ListingType[] = [
  {
    id: "1",
    title: "Modern Beachfront Villa",
    property: "Entire villa",
    authorId: "John D.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Beach+Villa+1",
      "/placeholder.svg?height=400&width=400&text=Beach+Villa+2",
      "/placeholder.svg?height=400&width=400&text=Beach+Villa+3",
    ],
    pricePerNight: 250,
    description:
      "Stunning beachfront villa with panoramic ocean views. Enjoy the private pool and direct beach access.",
    location: "Malibu, California",
    rating: 4.95,
  },
  {
    id: "2",
    title: "Cozy Mountain Cabin",
    property: "Entire cabin",
    authorId: "Sarah M.",
    images: ["/boston1.jpg", "/boston1.jpg", "/boston1.jpg"],
    pricePerNight: 120,
    description:
      "Charming cabin nestled in the mountains. Perfect for a peaceful getaway with stunning forest views.",
    location: "Aspen, Colorado",
    rating: 4.87,
  },
  {
    id: "3",
    title: "Downtown Luxury Loft",
    property: "Entire loft",
    authorId: "Michael B.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Luxury+Loft+1",
      "/placeholder.svg?height=400&width=400&text=Luxury+Loft+2",
      "/placeholder.svg?height=400&width=400&text=Luxury+Loft+3",
    ],
    pricePerNight: 180,
    description:
      "Stylish loft in the heart of downtown. Walking distance to restaurants, shops, and attractions.",
    location: "New York City, NY",
    rating: 4.92,
  },
  {
    id: "4",
    title: "Seaside Cottage",
    property: "Entire cottage",
    authorId: "Emma L.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Seaside+Cottage+1",
      "/placeholder.svg?height=400&width=400&text=Seaside+Cottage+2",
      "/placeholder.svg?height=400&width=400&text=Seaside+Cottage+3",
    ],
    pricePerNight: 140,
    description:
      "Charming cottage just steps from the sea. Enjoy beautiful sunsets from the private garden.",
    location: "Cape Cod, Massachusetts",
    rating: 4.89,
  },
  {
    id: "5",
    title: "Desert Oasis Villa",
    property: "Entire villa",
    authorId: "David R.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Desert+Villa+1",
      "/placeholder.svg?height=400&width=400&text=Desert+Villa+2",
      "/placeholder.svg?height=400&width=400&text=Desert+Villa+3",
    ],
    pricePerNight: 320,
    description:
      "Luxurious villa with private pool in the desert. Stunning views and modern amenities.",
    location: "Palm Springs, California",
    rating: 4.96,
  },
  {
    id: "6",
    title: "Lakefront Cabin",
    property: "Entire cabin",
    authorId: "Jessica T.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Lake+Cabin+1",
      "/placeholder.svg?height=400&width=400&text=Lake+Cabin+2",
      "/placeholder.svg?height=400&width=400&text=Lake+Cabin+3",
    ],
    pricePerNight: 160,
    description:
      "Peaceful cabin on the lake with private dock. Perfect for fishing and water activities.",
    location: "Lake Tahoe, Nevada",
    rating: 4.91,
  },
  {
    id: "7",
    title: "Historic Townhouse",
    property: "Entire townhouse",
    authorId: "Robert K.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Townhouse+1",
      "/placeholder.svg?height=400&width=400&text=Townhouse+2",
      "/placeholder.svg?height=400&width=400&text=Townhouse+3",
    ],
    pricePerNight: 200,
    description:
      "Beautifully restored historic townhouse in the heart of the city. Elegant furnishings and modern comforts.",
    location: "Boston, Massachusetts",
    rating: 4.88,
  },
  {
    id: "8",
    title: "Tropical Bungalow",
    property: "Entire bungalow",
    authorId: "Lisa M.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Tropical+Bungalow+1",
      "/placeholder.svg?height=400&width=400&text=Tropical+Bungalow+2",
      "/placeholder.svg?height=400&width=400&text=Tropical+Bungalow+3",
    ],
    pricePerNight: 180,
    description:
      "Tropical paradise bungalow surrounded by lush gardens. Short walk to pristine beaches.",
    location: "Kauai, Hawaii",
    rating: 4.93,
  },
  {
    id: "9",
    title: "City Center Apartment",
    property: "Entire apartment",
    authorId: "Alex P.",
    images: [
      "/placeholder.svg?height=400&width=400&text=City+Apartment+1",
      "/placeholder.svg?height=400&width=400&text=City+Apartment+2",
      "/placeholder.svg?height=400&width=400&text=City+Apartment+3",
    ],
    pricePerNight: 95,
    description:
      "Modern apartment in the city center. Great location with easy access to public transportation.",
    location: "Chicago, Illinois",
    rating: 4.76,
  },
  {
    id: "10",
    title: "Wine Country Estate",
    property: "Entire estate",
    authorId: "Maria S.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Wine+Estate+1",
      "/placeholder.svg?height=400&width=400&text=Wine+Estate+2",
      "/placeholder.svg?height=400&width=400&text=Wine+Estate+3",
    ],
    pricePerNight: 450,
    description:
      "Elegant estate in the heart of wine country. Private vineyard and tasting room included.",
    location: "Napa Valley, California",
    rating: 4.98,
  },
];

const SAMPLE_POSTS: ListingType[] = [
  {
    id: "p1",
    title: "Amazing Weekend in Malibu",
    property: "Travel Story",
    authorId: "Jennifer K.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Malibu+Story+1",
      "/placeholder.svg?height=400&width=400&text=Malibu+Story+2",
      "/placeholder.svg?height=400&width=400&text=Malibu+Story+3",
    ],
    pricePerNight: 0,
    description:
      "Had the most incredible weekend staying at this beachfront villa in Malibu. The views were breathtaking and the host was amazing!",
    location: "Malibu, California",
    rating: 5.0,
  },
  {
    id: "p2",
    title: "Mountain Retreat Experience",
    property: "Travel Story",
    authorId: "Thomas H.",
    images: [
      "/placeholder.svg?height=400&width=400&text=Mountain+Story+1",
      "/placeholder.svg?height=400&width=400&text=Mountain+Story+2",
      "/placeholder.svg?height=400&width=400&text=Mountain+Story+3",
    ],
    pricePerNight: 0,
    description:
      "Our stay at this mountain cabin was unforgettable. Waking up to the sound of birds and the mountain views was pure magic.",
    location: "Aspen, Colorado",
    rating: 4.9,
  },
  {
    id: "p3",
    title: "NYC Adventure",
    property: "Travel Story",
    authorId: "Sophie L.",
    images: [
      "/placeholder.svg?height=400&width=400&text=NYC+Story+1",
      "/placeholder.svg?height=400&width=400&text=NYC+Story+2",
      "/placeholder.svg?height=400&width=400&text=NYC+Story+3",
    ],
    pricePerNight: 0,
    description:
      "Three days in the Big Apple! This loft was perfectly located and we could walk everywhere. Highly recommend!",
    location: "New York City, NY",
    rating: 4.8,
  },
];

function ListingCard({ listing }: { listing: ListingType }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 100;
  const safeDescription = listing.description ?? "";
  const isLong = safeDescription.length > MAX_LENGTH;
  const previewText = isLong
    ? safeDescription.slice(0, MAX_LENGTH) + "..."
    : safeDescription;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-background shadow-md transition-all hover:shadow-lg m-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {listing.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    // src={image || "/boston1.jpg"}
                    src={"/boston1.jpg"}
                    alt={`${listing.title} - image ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 opacity-0 transition-opacity group-hover:opacity-100" />
          <CarouselNext className="right-2 opacity-0 transition-opacity group-hover:opacity-100" />
        </Carousel>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 top-2 z-10 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background",
            isFavorite ? "text-rose-500" : "text-muted-foreground"
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={cn("h-5 w-5", isFavorite && "fill-rose-500")} />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-medium line-clamp-1">{listing.title}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{listing.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{listing.location}</p>
        <p className="text-sm text-muted-foreground">{listing.property}</p>

        {listing.description && (
          <div className="mt-2 text-sm text-muted-foreground">
            <p>{expanded || !isLong ? safeDescription : previewText}</p>
            {isLong && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="mt-1 text-xs font-medium text-primary hover:underline"
              >
                {expanded ? "View less" : "View more"}
              </button>
            )}
          </div>
        )}

        <div className="mt-auto pt-4">
          {listing.pricePerNight > 0 ? (
            <p className="font-medium">
              <span className="text-lg">${listing.pricePerNight}</span>
              <span className="text-sm text-muted-foreground"> night</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              By {listing.authorId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: ListingType }) {
  const [isLiked, setIsLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 150;
  const safeDescription = post.description ?? "";
  const isLong = safeDescription.length > MAX_LENGTH;
  const previewText = isLong
    ? safeDescription.slice(0, MAX_LENGTH) + "..."
    : safeDescription;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border bg-background shadow-sm">
      {/* Post Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white font-medium">
          {post.authorId.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{post.authorId}</p>
          <p className="text-xs text-muted-foreground">{post.location}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </Button>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {post.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${post.title} - image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {post.images.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
      </div>

      {/* Post Actions */}
      <div className="flex items-center gap-4 p-4 pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart
            className={cn(
              "h-6 w-6",
              isLiked ? "fill-red-500 text-red-500" : "text-foreground"
            )}
          />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <MessageSquare className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7 13l3 3 7-7"></path>
            <path d="M13 17l6-6"></path>
            <path d="M3 17l3-3"></path>
          </svg>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ml-auto">
          <Bookmark className="h-6 w-6" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{post.rating}</span>
        </div>
        <h3 className="font-medium mb-1">{post.title}</h3>
        <div className="text-sm text-muted-foreground">
          <p>{expanded || !isLong ? safeDescription : previewText}</p>
          {isLong && (
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="text-primary hover:underline mt-1"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
      </div>
    </div>
  );
}

interface ListingsGridProps {
  activeView: "listings" | "posts";
}

export function ListingsGrid({ activeView }: ListingsGridProps) {
  const data = activeView === "listings" ? SAMPLE_LISTINGS : SAMPLE_POSTS;

  if (activeView === "posts") {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      {data.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
