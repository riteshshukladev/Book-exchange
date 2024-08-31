import { getCurrentUser } from "./authService"

export const initialFetchUserDetails = async (loadUserProfile) => {
    const user = getCurrentUser();
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile/initial-fetch`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token || user}` 
            }
        })

        if (!response.ok) {
            throw new Error(`Problem fetching initial user details. Status: ${response.status}`);
        }
        const responseData = await response.json();
        
        // Directly update the user profile with the fetched data
        loadUserProfile(responseData.data);
        
        return responseData.data; // Still return the data for any other use
    }
    catch (err) {
        console.error("Error fetching user details:", err);
        throw err; 
    }
}