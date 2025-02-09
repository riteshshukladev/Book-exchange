import { refreshToken } from "./protectedAuthService";

export const initialFetchUserDetails = async (loadUserProfile) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile/initial-fetch`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return initialFetchUserDetails(loadUserProfile);
        }
        throw new Error('Authentication failed');
      }
      throw new Error(`Problem fetching initial user details. Status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("User data:", responseData);
    loadUserProfile(responseData.data);
    return responseData.data;

  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
};

export const profileUpdationFunction = async ({
  changedFields,
  loadUserProfile,
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile/update-profile`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedFields),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return profileUpdationFunction({ changedFields, loadUserProfile });
        }
        throw new Error('Authentication failed');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    if (typeof responseData === 'object' && responseData !== null) {
      const profileData = responseData.data || responseData;
      loadUserProfile(profileData);
      return profileData;
    } else {
      console.error('Unexpected response format:', responseData);
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw error;
  }
};