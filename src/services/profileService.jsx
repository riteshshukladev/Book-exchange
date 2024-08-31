import { getCurrentUser, isAuthenticated } from "./authService";

export const initialFetchUserDetails = async (loadUserProfile) => {
  const user = getCurrentUser();
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile/initial-fetch`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token || user}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Problem fetching initial user details. Status: ${response.status}`
      );
    }
    const responseData = await response.json();

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
  const user = getCurrentUser();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/profile/update-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token || user}`,
        },
        body: JSON.stringify(changedFields),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    if (typeof responseData === 'object' && responseData !== null) {
        console.log('Profile update success');
        // If responseData has a 'data' property, use that; otherwise, use responseData itself
        const profileData = responseData.data || responseData;
        loadUserProfile(profileData);
        return profileData;
    } else {
        console.error('Unexpected response format:', responseData);
        throw new Error('Unexpected response format');
    }
} catch (error) {
    console.error('Failed to update user profile:', error);
    throw new Error('Failed to update user profile: ' + error.message);
}
};
