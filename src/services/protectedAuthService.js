const isAuthenticated = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/protected-route`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    // If access token expired, try refreshing before failing
    if (response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request with new access token
        return isAuthenticated();
      }
      return false;
    }

    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to fetch protected route");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching protected data:", error.message);
    return false;
  }
};

const refreshToken = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.log(response);
      // Only logout if refresh token is invalid/expired
      if (response.status === 401) {
        await logout();
        return false;
      }
      throw new Error("Failed to refresh token");
    }

    console.log("Token refreshed successfully");
    return true;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return false;
  }
};

const logout = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Logout failed");

    console.log("User logged out successfully");

    return true;
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export {isAuthenticated, logout, refreshToken}