import { create } from "zustand";
// import { getCurrentUser } from "@/services/authService";
import { refreshToken } from "../services/protectedAuthService.js";
const useMatchMakingStore = create((set) => ({
  matchedBooks: [],
  myBooks: [],
  setMyBooks: (books) =>
    set({
      myBooks: books,
    }),
  error: "",
  redirectToLogin: false,
  isMatchedContentArrived: false,

  setMatchedBooks: (books) =>
    set({
      matchedBooks: books,
    }),

  setError: (error) => set({ error }),

  resetRedirect: () => set({ redirectToLogin: false }),

  fetchMatchMaking: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/matchmaking/matches`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            return fetchMatchMaking();
          }
          throw new Error("Authentication failed");
        }
        throw new Error(data.message || "Failed to fetch matches");
      }

      // Set the matched books directly in the store
      set({ matchedBooks: data.globalBooks });
      return data.globalBooks;
    } catch (error) {
      console.error("Error while matchmaking:", error);
      set({
        error: error.message || "Failed to fetch matches",
        redirectToLogin: error.status === 401,
      });
      throw error; // Re-throw to trigger onError in useQuery
    }
  },
}));

export default useMatchMakingStore;
