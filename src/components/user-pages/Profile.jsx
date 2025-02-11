// Profile.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, MapPin, Phone, FileText } from "lucide-react";
import useProfileStore from "@/store/ProfileStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  initialFetchUserDetails,
  profileUpdationFunction,
} from "@/services/profileService";
import { useNavigate } from "react-router-dom";
import ProfileUpdateModal from "../modals/profile-modals/ProfileUpdateModal";
import LoadingOverlay from "../layout/LoadingOverlay";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/services/protectedAuthService";

const Profile = () => {
  const { toast } = useToast();
  const { userProfile, loadUserProfile, setError, clearChangedFields } =
    useProfileStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch initial user details
  const { isLoading, error } = useQuery({
    queryKey: ["userProfileInitialFetch"],
    queryFn: () => initialFetchUserDetails(loadUserProfile),
    onError: (err) => {
      setError(err.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  // Mutation for updating the profile
  const updateProfileMutation = useMutation({
    mutationFn: (profileChanges) =>
      profileUpdationFunction({
        changedFields: profileChanges,
        loadUserProfile,
      }),
    onSuccess: () => {
      setIsModalOpen(false);
      clearChangedFields();
      toast({
        title: "Success!",
        description: "Profile updated successfully",
        variant: "success",
      });
    },
    onError: (err) => {
      setError(err.message);
      setIsModalOpen(false);
      clearChangedFields();
      toast({
        title: "Error!",
        description: "Error while updating profile",
        variant: "error",
      });
    },
  });

  // Memoized submit handler for profile updates
  const handleSubmit = useCallback(
    (profileChanges) => {
      const changedFields = {};
      Object.keys(profileChanges).forEach((key) => {
        if (profileChanges[key] !== userProfile[key]) {
          changedFields[key] = profileChanges[key];
        }
      });
      updateProfileMutation.mutate(changedFields);
    },
    [userProfile, updateProfileMutation]
  );

  // Mutation for logging out
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not logout properly",
        variant: "destructive",
      });
    },
    retry: 1,
  });

  // Memoized logout handler
  const logoutHandler = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  // Memoize the rendered profile details so they only recalc when userProfile changes
  const profileContent = useMemo(
    () => (
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <User className="w-6 h-6 text-gray-500" />
          <div>
            <p className="font-kreon text-base md:text-lg font-medium">Name:</p>
            <p className="font-kreon text-base md:text-lg font-normal bg-grey-800">
              {userProfile.name}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Mail className="w-6 h-6 text-gray-500" />
          <div>
            <p className="font-kreon text-base md:text-lg font-medium">
              Email:
            </p>
            <p className="font-kreon text-base md:text-lg font-normal bg-grey-800">
              {userProfile.email}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <MapPin className="w-6 h-6 text-gray-500" />
          <div>
            <p className="font-kreon text-base md:text-lg font-medium">
              Address:
            </p>
            <p className="font-kreon text-base md:text-lg font-normal bg-grey-800">
              {userProfile.address}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Phone className="w-6 h-6 text-gray-500" />
          <div>
            <p className="font-kreon text-base md:text-lg font-medium">
              Phone:
            </p>
            <p className="font-kreon text-base md:text-lg font-normal bg-grey-800">
              {userProfile.phone_no}
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <FileText className="w-6 h-6 text-gray-500 mt-1" />
          <div>
            <p className="font-kreon text-base md:text-lg font-medium">Bio:</p>
            <p className="font-kreon text-base md:text-lg font-normal bg-grey-800">
              {userProfile.bio}
            </p>
          </div>
        </div>
      </CardContent>
    ),
    [userProfile]
  );

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div>
        <Card>
          <CardTitle>Error while fetching user details :(</CardTitle>
          <CardDescription>
            There was an error while fetching user details
          </CardDescription>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="w-full max-w-3xl mx-auto p-4 mt-8">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-josephine font-bold text-black pb-2">
            Profile Dashboard
          </CardTitle>
        </CardHeader>
        {profileContent}
        <CardFooter className="flex justify-between mt-8">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="font-kreon font-normal"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={logoutHandler}
            className="font-kreon font-normal"
          >
            {logoutMutation.isLoading ? "logging out" : "log out"}
          </Button>
        </CardFooter>
        <ProfileUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialProfile={userProfile}
          onSave={handleSubmit}
          isLoading={updateProfileMutation.isLoading}
          error={error}
        />
      </Card>
    </div>
  );
};

export default Profile;
