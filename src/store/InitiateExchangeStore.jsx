import { create } from "zustand";

export const useExchangeStore = create((set) => ({
    
    selectedBook:{ },
    isInitiateExchageModalOpen: false,
    

    setExchangeModal: (selectedBook) => set({
        selectedBook: selectedBook,
        isInitiateExchageModalOpen:true
    }),
    resetExchangeModal: () => set({
        selectedBook: {},
        isInitiateExchageModalOpen: false
    })
}))