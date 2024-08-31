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

  // loadUserProfile: (userProfile) =>
  //   set({
  //     userProfile: userProfile,
  //     isLoading: false,
  //     error: null,
  //   }),

  // loadUserProfile: (profileData) =>
  //   set((state) => ({
  //     userProfile: {
  //       ...state.userProfile,
  //       name: profileData.name || "",
  //       email: profileData.email || "",
  //       address: profileData.address || "",
  //       phone_no: profileData.phone_no || "",
  //       bio: profileData.bio || ""
  //     },
  //     isLoading: false,
  //     error: null,
  //   })),

  loadUserProfile: (profileData) => {
    console.log("Loading user profile with data:", profileData);
    set({
      userProfile: {
        name: profileData.name || "",
        email: profileData.email || "",
        address: profileData.address || "",
        phone_no: profileData.phone_no || "",
        bio: profileData.bio || "",
      },
      isLoading: false,
      error: null,
    });
    console.log("User profile updated in store");
  },


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
