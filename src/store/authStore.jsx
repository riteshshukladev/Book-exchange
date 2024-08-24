import { create } from "zustand";

const commonValues = {
    user: null,
    isAuthenticated: false,
    error: null,
}

export const loginAuth = create((set) => ({
    
    ...commonValues,
    email: '',
    password: '',
      
    setUser: (user) => set({ user, isAuthenticated: true, error: null }),
    setError:(error) => set({error}),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),

}));

export const signUpAuth = create((set) => ({
    ...commonValues,

    email: '',
    userName: '',
    password: '',
    confirmPassword: '',

}))