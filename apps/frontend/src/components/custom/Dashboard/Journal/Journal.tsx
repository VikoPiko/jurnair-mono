import React, { useState } from "react";
import { AuthGuard } from "../../Auth/auth-guard";
import { Button } from "@/components/ui/button";
import JournalGrid from "./JournalGrid";

//implement journal components...
const Journal = () => {
  return (
    <AuthGuard>
      <div className="flex flex-col gap-5 items-center justify-center">
        {/* <Button onClick={signOut}>Sign out</Button> */}
        {/* <div>Protected Content</div> */}
        <JournalGrid />
      </div>
    </AuthGuard>
  );
};

export default Journal;
