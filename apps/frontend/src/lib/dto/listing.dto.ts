export type CreateListingDto = {
  propertyId: string;
  title: string;
  location: string;
  address: string;
  description: string;
  roomType: RoomType;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  checkIn: Date;
  checkOut: Date;
  houseRules: string[];
  rating: number;
  reviewCount: number;
};

export type ListingDto = {
  id: string;
  propertyId: string;
  title: string;
  location: string;
  address: string;
  description: string;
  roomType: RoomType;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  checkIn: Date;
  checkOut: Date;
  houseRules: string[];
  rating: number;
  reviewCount: number;
  isDeleted: boolean;
  favoritedBy: string[];
  property: {
    id: string;
    title: string;
    description: string;
    lat: string;
    lng: string;
    host: {
      firstName: string;
      lastName: string;
      email: string;
      avatarUrl: string;
    };
  };
};

export enum RoomType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  ENTIRE_PLACE = "ENTIRE_PLACE",
  SHARED_ROOM = "SHARED_ROOM",
  PRIVATE_ROOM = "PRIVATE_ROOM",
}
