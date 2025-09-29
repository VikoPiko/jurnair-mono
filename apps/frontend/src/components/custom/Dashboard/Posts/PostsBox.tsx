"use client";
import React, { useState } from "react";
import { PostCard } from "./PostsCard";
import { PostsType } from "@/lib/utils";

interface PostsProps {
  posts: PostsType[];
}

const PostsBox = ({ posts }: PostsProps) => {
  return (
    <div className="flex flex-1 flex-col max-w-[35vw] gap-10">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsBox;
