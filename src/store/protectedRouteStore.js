// src/store/protectedRouteStore.js
import { create } from "zustand";
import { isAuthenticated } from "../services/protectedAuthService";

export const useProtectedRoute = create((set) => ({
  isLoading: true,
  isAuthed: null,
  error: null,

  setLoading: (status) => set({ isLoading: status }),
  setAuthed: (status) => set({ isAuthed: status }),
  setError: (error) => set({ error }),

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const authStatus = await isAuthenticated();
      set({ isAuthed: authStatus });
      return authStatus;
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ 
        isAuthed: false, 
        error: error.message 
      });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  resetState: () => set({
    isLoading: true,
    isAuthed: false,
    error: null
  })
}));