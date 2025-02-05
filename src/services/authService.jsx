import { jwtDecode } from "jwt-decode";

export const AuthHelper = async ({ actionType, data, signal }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/${actionType}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: signal,
      }
    );

    const responseData = await response.json();

    // Check if response is not ok
    if (!response.ok) {
      throw new Error(responseData.message || "An error occurred");
    }

    return responseData;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    if (error instanceof TypeError || error instanceof SyntaxError) {
      throw new Error("Network error or invalid response format");
    }
    // Throw the error message from the server or the error itself
    throw new Error(error.message || "An unexpected error occurred");
  }
};
export const fetchPendingRequests = async () => {
  const user = getCurrentUser();
  console.log(user);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/books/get-exchange-requests`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      }
    );

    if (!response.ok) {
      console.log("in the response checking");
      throw new Error("HTTP error " + response.status + response.message);
    }
    const data = await response.json();
    return data.count; // Return the count directly
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw error;
  }
};

// export const logout = () => {
//   // localStorage.removeItem('email');
//   localStorage.removeItem('token')
// };

// export const getCurrentUser = () => {
//   return localStorage.getItem('token');
// };

// export const getToken = () => {
//   return localStorage.getItem('token');
// }

// export const isAuthenticated = () => {
//   const token = getToken();
//   if (!token) {
//     return false;
//   }
//   return token;
// }

// export const isTokenValid = () => {
//   const token = getToken();
//   if (!token) return false;

//   try {
//     const decodedToken = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decodedToken.exp > currentTime;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return false;
//   }
// };

// export const setupTokenExpirationCheck = (logoutCallback) => {
//   const checkTokenExpiration = () => {
//     if (!isTokenValid()) {
//       removeToken();
//       logoutCallback();
//     }
//   };

//   const intervalId = setInterval(checkTokenExpiration, 60000);

//   checkTokenExpiration();

//   return () => clearInterval(intervalId);
// };

// export const checkInitialToken = (logoutCallback) => {
//   if (!isTokenValid()) {
//     removeToken();
//     logoutCallback();
//     return false;
//   }
//   return true;
// };
