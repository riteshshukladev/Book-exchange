import { create } from "zustand";

const useProfileStore = create((set) => ({
  userProfile: {
    name: "",
    email: "",
    password: "",
    address: "",
    phone_no: "",
    bio: "",
  },

  updateProfileField: (name, value) =>
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        [name]: value,
      },
    })),

  isLoading: false,
  error: null,

  loadUserProfile: (userProfile) =>
    set({
      userProfile: userProfile,
      isLoading: false,
      error: null,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error, isLoading: false }),

  resetProfile: () =>
    set({
      userProfile: {
        name: "",
        email: "",
        password: "",
        address: "",
        phone_no: "",
        bio: "",
      },
    }),
}));

export default useProfileStore;
