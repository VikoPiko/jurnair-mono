"use client";

import React, { useState } from "react";
import HostDialog from "./host-dialog";
import { Button } from "@/components/ui/button";

const HostButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Become a host
      </Button>
      <HostDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default HostButton;
