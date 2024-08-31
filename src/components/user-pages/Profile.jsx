import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import useUserProfileStore from './useUserProfileStore';
import useProfileStore from "@/store/ProfileStore";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "@/services/authService";


const Profile = () => {




  const { userProfile, updateProfileField, resetProfile,isLoading, error,loadUserProfile } = useProfileStore();


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProfileField(name, value);
  };

  const { isLoading: isQueryLoading, error: queryError } = useQuery({
    queryKey: ['userProfileInitialFetch'],
    // queryFn:,

    onSuccess: (data) => {
      loadUserProfile(data.returnedInitialProfile)
    },
    onError: (err) => {
      console.log('error while fetching', err.message);
    }
  })

  const handleSubmit = () => {
    
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={userProfile.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                readOnly
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">phone bo</Label>
              <Input
                id="Phone"
                name="phone"
                type="number"
                value={userProfile.phone_no}
                onChange={handleInputChange}
                placeholder="Enter your phone no"
              />
            </div>
            {/* Repeat similar blocks for email, password, address, phone_no */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={userProfile.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={userProfile.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={userProfile.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Update Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
