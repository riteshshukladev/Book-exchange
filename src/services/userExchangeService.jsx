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

export const fetchExchangeDetails = async () => {
  const user = isAuthenticated();

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/exchange/exchanges`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token || user}`,
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }
  catch (error) {
    console.error('Failed to fetch exchange details:', error);
    throw new Error('Failed to fetch exchange details: ' + error.message);
}
}