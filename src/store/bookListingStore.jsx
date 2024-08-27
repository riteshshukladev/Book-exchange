import { create } from "zustand";

export const useBookList = create((set) => ({
    books: [],
    isAddModalOpen: false,
    isEditModal: false,
    isDeleteModalOpen: false,
    currentBook: {
        title: '',
        author: '',
        Genre: ''
    },
    currentBook: {
        id:'',
        title: '',
        author: '',
        Genre: ''
    },
    newBooks: {
        title: '',
        author: '',
        Genre: ''
    },

    setNewBookTitle: (title) => set((state) => ({ newBooks: { ...state.newBooks, title } })),
    setNewBookAuthor: (author) => set((state) => ({ newBooks: { ...state.newBooks, author } })),
    setNewBookGenre: (Genre) => set((state) => ({ newBooks: { ...state.newBooks, Genre } })),



    setCurrentBookTitle: (title) => set((state) => ({ currentBook: { ...state.newBooks, title } })),
    setCurrentBookAuthor: (autor) => set((state) => ({ currentBook: { ...state.currentBook, autor } })),
    setCurrentBookGenre: (Genre) => set((state) => ({ currentBook: { ...state.currentBook, Genre } })),
    

    openAddModal: () => set({ isAddModalOpen: true }),
    closeAddModal: () => set({ isAddModalOpen: false }),
  
    openEditModal: (book) => set({ isEditModalOpen: true, currentBook: book }),
    closeEditModal: () => set({ isEditModalOpen: false, currentBook: null }),
  
    
  
    openDeleteModal: (book) => set({ isDeleteModalOpen: true, currentBook: book }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false, currentBook: null }),



}));