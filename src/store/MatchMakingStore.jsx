import { create } from "zustand";
import { getCurrentUser } from "@/services/authService";
const useMatchMakingStore = create((set) => ({
    matchedBooks: [],
    myBooks: [],
    setMyBooks: (books) => set({
        myBooks: books
    }),
    error: '',
    isMatchedContentArrived: false,
    
    setMatchedBooks: (books) => set({
        matchedBooks: books,
    }),
    
    setError: (error) => set({ error }),

    fetchMatchMaking : async (setMatchedBooks) => {

        const user = getCurrentUser();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/matchmaking/matches`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user}` 
                }
            });

            if (!response.ok) {
                throw new Error('Error in response');
            }

            const data = await response.json();  // Corrected to await the response
            console.log(data)
            setMatchedBooks(data.globalBooks);
            
            return data;
        } catch (error) {
            console.log('error while matchmaking', error.message);
            throw error.message;
        }
    }
}));

export default useMatchMakingStore;

