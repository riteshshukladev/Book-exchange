import { create } from "zustand";

export const useExchange = create((set) => ({
    
    currentRadioState: "incoming",
    setCurrentRadioState: (value) => set({ currentRadioState: value }),
    
    // IncomingRequests(()=>)
}))