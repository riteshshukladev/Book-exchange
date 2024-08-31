import { getCurrentUser } from "./authService"

export const initialFetchUserDetails = async () => {
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
        const data = await response.json();
        return data.returnedInitialProfile;
    }
    catch (err) {
        console.error("Error fetching user details:", err);
        throw err; 
    }
}