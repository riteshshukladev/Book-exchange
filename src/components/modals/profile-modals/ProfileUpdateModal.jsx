// ProfileUpdateModal.jsx
import React, { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ProfileUpdateModal = ({
  isOpen,
  onClose,
  onSave,
  initialProfile,
  error,
  isLoading,
}) => {
  const [profile, setProfile] = useState(initialProfile);

  // When the initialProfile prop changes, update the local state.
  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  // Memoized change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Memoized submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSave(profile);
    },
    [onSave, profile]
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-josephine font-bold text-black pb-2">
            Edit Profile
          </DialogTitle>
          {error && (
            <p className="text-red-500 font-kreon text-base md:text-lg font-medium">
              {error}
            </p>
          )}
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-end font-kreon text-base md:text-lg font-medium">
                Name:
              </Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="col-span-3 font-kreon text-base md:text-lg font-medium"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-end font-kreon text-base md:text-lg font-medium">
                Email:
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                disabled
                className="col-span-3 font-kreon text-base md:text-lg font-medium"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-end font-kreon text-base md:text-lg font-medium">
                Address:
              </Label>
              <Input
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="col-span-3 font-kreon text-base md:text-lg font-medium"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-end font-kreon text-base md:text-lg font-medium">
                Phone:
              </Label>
              <Input
                id="phone"
                name="phone_no"
                value={profile.phone_no}
                onChange={handleChange}
                className="col-span-3 font-kreon text-base md:text-lg font-medium"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-end font-kreon text-base md:text-lg font-medium">
                Bio:
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="col-span-3 font-kreon text-base md:text-lg font-medium"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
