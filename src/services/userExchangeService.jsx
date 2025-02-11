import { refreshToken } from "./protectedAuthService";

export const exchangeBookFunction = async ({ selectedBook, userReplaceBook }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/exchange/exchange-books`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedBook, userReplaceBook }),
      }
    );

    const responseData = await response.json();
    if(!response.ok){
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return exchangeBookFunction({ selectedBook, userReplaceBook });
        }
        throw new Error('Authentication failed');
      }
      throw responseData;
    }

    return responseData;
  } catch (error) {
    console.error('Failed to exchange books:', error);
    throw error;
  }
};

export const fetchExchangeDetails = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/exchange/exchanges`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return fetchExchangeDetails();
        }
        throw new Error('Authentication failed');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch exchange details:', error);
    throw error;
  }
};

export const declineBookExchange = async ({ book1, book2 }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/exchange/decline-exchange`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book1, book2 })
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return declineBookExchange(book1, book2);
        }
        throw new Error('Authentication failed');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to decline exchange:', error);
    throw error;
  }
};

export const approveBookExchange = async ({ book1, book2 }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/exchange/accept-exchange`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ book1, book2 })
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          return approveBookExchange(book1, book2);
        }
        throw new Error('Authentication failed');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to approve exchange:', error);
    throw error;
  }
};