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

  fetchMatchMaking: async (setMatchedBooks) => {
    

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

      if (!response.ok) {
        // throw new Error('Error in response');
        if (response.status === 401) {
          const refreshed = await refreshToken();
          if (refreshed) {
            return fetchMatchMaking(setMatchedBooks);
            }
            throw new Error({status: response.status, message: "Error in response"});
          }
        throw new Error("Error in response");
      }

      const data = await response.json(); 
      console.log(data);
      setMatchedBooks(data.globalBooks);

      return data;
    } catch (error) {
      console.log("error while matchmaking", error.message);
      if (error.status === 401) {
          set({ error: "Unauthorized",redirectToLogin:true  });
          
      }
    }
  },
}));

export default useMatchMakingStore;
