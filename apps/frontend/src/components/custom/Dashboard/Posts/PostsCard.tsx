"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Bookmark, Heart, MessageSquare, Send, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "../../Auth/auth-context";

type CommentType = {
  content: string;
  author: string;
};

const sample_comments = [
  { content: "Wow great views!", author: "viko@gmail.com" },
  { content: "OHAAA!", author: "nisos@gmail.com" },
  { content: "it's honestly meh", author: "hater@gmail.com" },
];

export function PostCard({ post }: { post: any }) {
  const [isLiked, setIsLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>(sample_comments);

  const { user } = useAuth();

  const MAX_LENGTH = 150;
  const safeDescription = post.description ?? "";
  const isLong = safeDescription.length > MAX_LENGTH;
  const previewText = isLong
    ? safeDescription.slice(0, MAX_LENGTH) + "..."
    : safeDescription;

  const handleLike = () => {
    setIsLiked(!isLiked);
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
  };

  const handleComment = () => {
    if (comment.trim() === "") return;
    if (!user) return;

    const newComment: CommentType = {
      content: comment,
      author: user.email,
    };

    setComments((prev) => [...prev, newComment]);
    setComment("");
    setIsCommenting(false);
  };

  return (
    <div className="flex flex-col h-[95vh] overflow-hidden rounded-2xl border bg-background shadow-xl">
      {/* Post Header */}
      <div className="flex items-center gap-3 p-4 pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white font-medium">
          {post.author_Id.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{post.author_Id}</p>
          <p className="text-xs text-muted-foreground">{post.location}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 border shadow-md hover:bg-stone-200"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start" sideOffset={4}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={() => console.log("Report")}
              className="hover:bg-stone-200 transition-all"
            >
              Report
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => console.log("Copy")}
              className="hover:bg-stone-200 transition-all"
            >
              Copy link
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => console.log("Share")}
              className="hover:bg-stone-200 transition-all"
            >
              Share
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => console.log("Cancel")}
              className="hover:bg-stone-200 transition-all"
            >
              Cancel
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className="font-medium mb-2 ml-2">{post.title}</h3>
      {/* Post Image */}
      <div className="relative aspect-square overflow-hidden p-2">
        <Carousel className="w-full">
          <CarouselContent>
            {post.images.map((image: string, index: number) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${post.title} - image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
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
          onClick={() => handleLike()}
        >
          <p className="font-semibold -translate-y-[1px]">{likes}</p>
          <Heart
            className={cn(
              "h-6 w-6",
              isLiked ? "fill-red-500 text-red-500" : "text-foreground"
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          onClick={() => setIsCommenting(!isCommenting)}
        >
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
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ml-auto">
              <Bookmark className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <h1>Add to saved.</h1>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{post.rating}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-2">
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
        <div>
          {comments &&
            comments.map((comment, idx) => (
              <p key={idx} className="text-sm">
                <span className="font-semibold">{comment.author} </span>
                {comment.content}
              </p>
            ))}
        </div>
        {isCommenting && (
          <div className="inline-flex justify-between items-center w-full gap-2">
            <Input
              placeholder="Write a comment..."
              maxLength={150}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleComment();
                }
              }}
            />
            <Button
              size="icon"
              variant={"outline"}
              className="w-9 h-9 hover:bg-stone-200"
              onClick={() => handleComment()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
      </div>
    </div>
  );
}
