"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import { useQuery } from "@tanstack/react-query";
import { getAllListings } from "@/lib/actions/property-listing/listings.actions";
import { CreateListingDto } from "@/lib/dto/listing.dto";

const TABS = ["Home", "My Journal", "Settings", "History", "Test"] as const;
type TabType = (typeof TABS)[number];

const PageContent = () => {
  const { data, isPending } = useQuery({
    queryKey: ["listings"],
    queryFn: getAllListings,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<TabType>("Home");

  // Load initial tab from URL or localStorage
  useEffect(() => {
    const urlTab = searchParams.get("tab");
    const lsTab =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedTab")
        : null;

    if (urlTab && TABS.includes(urlTab as TabType)) {
      setSelectedTab(urlTab as TabType);
    } else if (lsTab && TABS.includes(lsTab as TabType)) {
      setSelectedTab(lsTab as TabType);
    }
  }, []);

  // Keep URL and localStorage in sync with selected tab
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTab", selectedTab);

      const params = new URLSearchParams(window.location.search);
      params.set("tab", selectedTab);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [selectedTab]);

  return (
    <div className="mx-2">
      <Sidebar
        selectedTab={selectedTab}
        onTabChange={(tab: string) => {
          if (TABS.includes(tab as TabType)) {
            setSelectedTab(tab as TabType);
          }
        }}
      />
      <div className="ml-[205px] p-3">
        {isPending ? (
          <div>Loading....</div>
        ) : (
          <Dashboard listings={data ?? []} selectedTab={selectedTab} />
        )}
      </div>
    </div>
  );
};

export default PageContent;
