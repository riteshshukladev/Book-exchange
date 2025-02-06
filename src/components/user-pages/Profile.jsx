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
import { useQuery,useMutation } from "@tanstack/react-query";
// import { isAuthenticated } from "@/services/authService";
import { initialFetchUserDetails } from "@/services/profileService";
import { profileUpdationFunction } from "@/services/profileService";
// import { logout } from "@/services/authService";
import { useNavigate } from "react-router-dom";

// import SelectBookExchange from "../modals/exchange-modal/SelectBookExchange";
const Profile = () => {

  
  
  
  const { userProfile, updateProfileField, resetProfile,loadUserProfile,setLoading, setError,changedFields,clearChangedFields,showMessage,messageType,setShowMessage } = useProfileStore();
  
  
  
  const navigate = useNavigate();
//   useEffect(() => {
//     if (!isAuthenticated()) {
//       navigate('/', { replace: true });
//     }
// },[navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProfileField(name, value);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['userProfileInitialFetch'],
    queryFn: () => initialFetchUserDetails(loadUserProfile),
    onError: (err) => {
      setError(err.message);
    },
 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, [showMessage]);


  const updateProfileMutation = useMutation({
    mutationFn:() => profileUpdationFunction({changedFields,loadUserProfile}),
    onSuccess: () => {
      clearChangedFields();
      
    },
    onError: (err) => setError(err.message),
  })


  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(changedFields).length === 0) {
      return;
    }
    updateProfileMutation.mutate(changedFields);
  }


  // const handleLogout = async () => {
  //   await logout();
  //   resetProfile();
  //   navigate('/', { replace: true });
  // };

  if (isLoading ) {
    return (
      <div>
        <Card>
          <CardTitle>Please Wait your details is on the way</CardTitle>
          <CardDescription>Loading</CardDescription>
        </Card>
      </div>
    )
  }


  if (error) {
    return (
      <div>
      <Card>
        <CardTitle>{ `Error while fetching user details :(`}</CardTitle>
          <CardDescription>Their was an error while fetching user details</CardDescription>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto relative">
        <Button onClick={''} className="absolute top-5 right-5">Log Out</Button>
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
              <Label htmlFor="name">phone number</Label>
              <Input
                id="Phone_no"
                name="phone_no"
                type="text"
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch">
          <Button onClick={handleSubmit} className="w-full mb-4" disabled={updateProfileMutation.isLoading}>
            {updateProfileMutation.isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
          {showMessage && messageType === 'error' && (
            <div className="w-full p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">Error:</span> {updateProfileMutation.error.message}
            </div>
          )}
          {showMessage && messageType === 'success' && (
            <div className="w-full p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <span className="font-medium">Success:</span> Profile updated successfully!
            </div>
          )}
        </CardFooter>
      </Card>

      
    </div>
  );
};

export default Profile;
