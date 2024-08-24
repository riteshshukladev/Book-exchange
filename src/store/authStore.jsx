import { create } from "zustand";

export const loginAuth = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,

    email: '',
    password: '',
    
    setUser: (user) => set({ user, isAuthenticated: true, error: null }),
    setError:(error) => set({error}),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),

}));