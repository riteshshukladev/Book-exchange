import { create } from "zustand";

export const useExchangeStore = create((set) => ({
    
    selectedBook:{ },
    isInitiateExchageModalOpen: false,
    

    setExchangeModal: (selectedBook) => set({
        selectedBook: selectedBook,
        isInitiateExchageModalOpen:true
    }),


    userReplaceBook: {},
    setUserReplaceBook: (userReplaceBook) => set({
        userReplaceBook: userReplaceBook
    }),
    resetExchangeModal: () => set({
        selectedBook: {},
        isInitiateExchageModalOpen: false
    }),
    resetReplaceBook: () => set({
        userReplaceBook: {},
    })
}))