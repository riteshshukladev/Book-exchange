import { create } from "zustand";

const commonValues = {
    user: null,
    isAuthenticated: false,
    error: {},  // Initialize as an empty object
}

export const loginAuth = create((set) => ({
    ...commonValues,
    email: '',
    password: '',
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    setUser: (user) => set({ user, isAuthenticated: true, error: {}, isLoading: false }),
    setError: (error) => set((state) => ({...state, error})),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
}));

export const signUpAuth = create((set) => ({
    ...commonValues,

    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
    setUser: (user) => set({ user, isAuthenticated: true, error: {}, isLoading: false }),setUser: (user) => set({ user, isAuthenticated: true, error: null }),
    setError: (error) => set((state) => ({...state, error})),
    setEmail: (email) => set({ email }),
    setUserName: (username) => set({username}),
    setPassword: (password) => set({ password }),
    setconfirmpassword: (confirmPassword) => set({ confirmPassword }),

    
}))