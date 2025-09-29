import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

const SAMPLE_REVIEWS = [
  {
    id: 1,
    author: "Emily Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=EC",
    rating: 5,
    date: "2 weeks ago",
    content:
      "Absolutely stunning property! The ocean views were breathtaking and the host was incredibly responsive. Would definitely stay here again.",
  },
  {
    id: 2,
    author: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40&text=MR",
    rating: 5,
    date: "1 month ago",
    content:
      "Perfect location and beautifully maintained. The private pool was a highlight and the kitchen had everything we needed.",
  },
  {
    id: 3,
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    rating: 4,
    date: "2 months ago",
    content:
      "Great stay overall. The property is exactly as described and the check-in process was seamless. Highly recommend!",
  },
];

export function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="text-lg font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviewCount} reviews)</span>
        </div>

        <div className="space-y-6">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.author}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
