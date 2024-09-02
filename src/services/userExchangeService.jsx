import { isAuthenticated } from "./authService"


export const exchangeBookFunction = async ({ selectedBook, userReplaceBook }) => {
    
    const user = isAuthenticated();

    try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/exchange/exchange-books`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token || user}`,
            },
            body: JSON.stringify({selectedBook, userReplaceBook}),
          }
        );
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
          return responseData.message
          
        } catch (error) {
        console.error('Failed to update user profile:', error);
        throw new Error('Failed to update user profile: ' + error.message);
    }
    
}