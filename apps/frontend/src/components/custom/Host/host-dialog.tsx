"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { createProperty } from "@/lib/actions/property.actions";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Auth/auth-context";
import { toast } from "sonner";
import { apiFetch } from "@/lib/utils";
import { createProperty } from "@/lib/actions/property-listing/property.actions";
import { CreatePropertyDto } from "@/lib/dto/property.dto";

interface HostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HostDialog = ({ isOpen, onClose }: HostDialogProps) => {
  const [propertyName, setPropertyName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [property, SetProperty] = useState<CreatePropertyDto>({
    title: "",
    description: "",
    location: "",
    lat: "",
    lng: "",
    images: [],
    hostId: "",
  });
  // const { user, setUser } = useAuth();
  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   const storedToken = sessionStorage.getItem("token");
  //   if (storedToken) {
  //     console.log("Token found in sessionStorage:", storedToken);
  //     setToken(storedToken);
  //   }
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Property Name:", property.title);
    console.log("Description:", property.description);
    console.log("Location:", property.location);
    console.log("HostId:", property.hostId);
    try {
      const data = await createProperty(property);

      console.log("Property created successfully:", data);
      onClose();
      toast.success("Property created successfully! You're a verified host.");
      // return data;
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Become a Host</DialogTitle>
            <h1>Fill out a simple form to be able to become a host.</h1>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Property Name</Label>
              <Input
                placeholder="ASOC Inn"
                value={property?.title}
                onChange={(e) => setPropertyName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Property Description</Label>
              <Input
                value={property?.description}
                placeholder="A cozy inn located..."
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Location (City & Country)</Label>
              <Input
                placeholder="Sofia, Bulgaria/BG"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Address</Label>
              <Input
                placeholder="123 ASOC St."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default HostDialog;
