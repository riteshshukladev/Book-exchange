import { create } from "zustand";

export const useBookList = create((set) => ({
    books: [],
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    currentBook: {
        id:'',
        title: '',
        author: '',
        genre: ''
    },
    newBooks: {
        title: '',
        author: '',
        genre: ''
    },

    setNewBookTitle: (title) => set((state) => ({ newBooks: { ...state.newBooks, title } })),
    setNewBookAuthor: (author) => set((state) => ({ newBooks: { ...state.newBooks, author } })),
    setNewBookGenre: (genre) => set((state) => ({ newBooks: { ...state.newBooks, genre } })),



    setCurrentBookTitle: (title) => set((state) => ({ currentBook: { ...state.currentBook, title } })),
    setCurrentBookAuthor: (author) => set((state) => ({ currentBook: { ...state.currentBook, author } })),
    setCurrentBookGenre: (genre) => set((state) => ({ currentBook: { ...state.currentBook, genre } })),
    

    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),
  
    openEditModal: (book) => set({ isEditModalOpen: true, currentBook: book }),
    closeEditModal: () => set({ isEditModalOpen: false, currentBook: null }),
  
    
  
    openDeleteModal: (book) => set({ isDeleteModalOpen: true, currentBook: book }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false, currentBook: null }),

    setBooks: (books) => set((state) => {
        return { books };
    }),
}));