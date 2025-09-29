"use client";

import { useEffect, useState } from "react";
import { Calendar, Users, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useAuth } from "@/components/custom/Auth/auth-context";
import { toast } from "sonner";
// import { bookListing } from "@/lib/actions/booking.actions";

interface BookingCardProps {
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  listingId: string;
}

export function BookingCard({
  pricePerNight,
  rating,
  reviewCount,
  listingId,
}: BookingCardProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);

  // const { user, getToken } = useAuth();
  // const token = getToken();

  // Calculate nights when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  //   const totalNights = calculateNights();
  const subtotal = nights * pricePerNight;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  const testJava = async () => {
    // try {
    //   // if (!user) return toast("Must be logged in to book.");
    //   // if (!checkIn || !checkOut)
    //   //   return toast("Please select check-in and check-out dates.");
    //   // const data = await bookListing(
    //   //   listingId,
    //   //   user.id,
    //   //   checkIn,
    //   //   checkOut,
    //   //   pricePerNight,
    //   //   guests
    //   // );
    //   // if (data) {
    //   //   toast.success("Listing booked successfully!");
    //   // } else {
    //   //   toast.error("Failed to book listing.");
    //   }
    // } catch (error) {
    //   console.error("Error booking listing:", error);
    // }
  };

  // const handleReservation = async () => {
  //   try {
  //     if (!user || !token) {
  //       return toast("Must be logged in for reservations.");
  //     }
  //     console.log(
  //       JSON.stringify({
  //         checkIn,
  //         checkOut,
  //         guests,
  //         nights,
  //         subtotal,
  //         serviceFee,
  //         total,
  //       })
  //     );
  //     const res = await fetch(`http://localhost:3001/reserve/${listingId}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...(token && { Authorization: `Bearer ${token}` }),
  //       },
  //       body: JSON.stringify({
  //         checkIn,
  //         checkOut,
  //         guests,
  //         nights,
  //         subtotal,
  //         serviceFee,
  //         total,
  //       }),
  //     });
  //     if (!res.ok) {
  //       return toast("Error reserving listing.");
  //     }
  //     return res.json().then((data) => {
  //       toast.success(
  //         `Listing reserved successfully! Reservation ID: ${data.reservationId}`
  //       );
  //     });
  //   } catch (error) {
  //     console.error("Error reserving listing:", error);
  //     toast.error("Error reserving listing.");
  //   }
  // };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">${pricePerNight}</span>
            <span className="text-muted-foreground">night</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="checkin" className="text-xs font-medium">
              CHECK-IN
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkIn ? checkIn.toLocaleDateString() : "Add date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="checkout" className="text-xs font-medium">
              CHECK-OUT
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkOut ? checkOut.toLocaleDateString() : "Add date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => {
                    return (
                      date < new Date() || (checkIn ? date <= checkIn : false)
                    );
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests */}
        <div>
          <Label htmlFor="guests" className="text-xs font-medium">
            GUESTS
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-transparent"
              >
                <Users className="mr-2 h-4 w-4" />
                {guests} guest{guests !== 1 ? "s" : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Adults</p>
                  <p className="text-sm text-muted-foreground">
                    Ages 13 or above
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-transparent"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!checkIn || !checkOut}
          // onClick={() => handleReservation()}
          onClick={() => testJava()}
        >
          Reserve
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          You won't be charged yet
        </p>

        {nights > 0 && (
          <>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>
                  ${pricePerNight} x {nights} nights
                </span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
