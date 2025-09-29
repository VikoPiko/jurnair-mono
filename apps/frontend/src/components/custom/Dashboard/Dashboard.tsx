"use client";
import React, { useState } from "react";
import TopNav from "./TopNav";
// import { ListingDetailProps, SAMPLE_POSTS } from "@/lib/utils";
import { ViewToggle } from "./ViewToggle";
import { ListingsGrid } from "./Listings/ListingsGrid";
import PostsBox from "./Posts/PostsBox";
import Journal from "./Journal/Journal";
import Settings from "./Settings/Settings";
// import { useTranslation } from "react-i18next";
import { ListingDto } from "@/lib/dto/listing.dto";

type DashboardTest = {
  listings: ListingDto[];
  selectedTab: string;
};

const Dashboard = ({ listings, selectedTab }: DashboardTest) => {
  const [activeView, setActiveView] = useState<"listings" | "posts">(
    "listings"
  );
  const [searchQuery, setSearchQuery] = useState("");
  // const posts = SAMPLE_POSTS;

  const isLoggedIn = false;
  // const { t } = useTranslation();

  const filteredListings = listings.filter((l) =>
    l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-[#242424] rounded-lg px-3 shadow-lg min-h-[95vh]">
      <TopNav
        onSearch={setSearchQuery}
        onClear={() => setSearchQuery("")}
        isLoggedIn={isLoggedIn}
      />
      <div>
        {selectedTab === "Home" && (
          <div>
            <div className="flex items-center justify-end mr-4">
              <ViewToggle onViewChange={setActiveView} />
            </div>
            <div className="flex flex-col items-center justify-center text-2xl gap-2 ">
              {activeView === "listings" ? (
                <ListingsGrid listings={filteredListings} />
              ) : (
                // <PostsBox posts={posts} />
                <div></div>
              )}
            </div>
          </div>
        )}
        {selectedTab === "My Journal" && (
          // <div className="flex items-center justify-center mb-2 h-[75vh]">
          <div className="flex items-center justify-center mb-2">
            {/* <Journal /> */}
            journal
          </div>
        )}
        {selectedTab === "Settings" && (
          <div>
            <Settings />
          </div>
        )}
        {selectedTab === "History" && <div>History</div>}
        {selectedTab === "Test" && <div>Test</div>}
      </div>
    </div>
  );
};

export default Dashboard;
