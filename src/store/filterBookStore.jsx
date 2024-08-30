import { create } from "zustand";

export const useFilterBooks = create((set) => ({
  genres: [],
  authors: [],
  selectedAuthors: [],
  selectedGenres: [],
  searchTerm: '',

  // Loading states
  isAuthorContentArrived: false,
  isGenreContentArrived: false,
  isBookContentArrived: false,

  // Filtered books
  filteredBooks: [],

  // Setters for initial data
  setInitialAuthors: (authors) => set({ authors, isAuthorContentArrived: true }),
  setInitialGenres: (genres) => set({ genres, isGenreContentArrived: true }),

  // Setters for selected filters
  setSelectedAuthors: (selectedAuthors) => set({ selectedAuthors }),
  setSelectedGenres: (selectedGenres) => set({ selectedGenres }),

  // Setter for search term
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  // Setter for filtered books
  setFilteredBooks: (books) => set({ filteredBooks: books, isBookContentArrived: true }),


  setSearchTerm: (searchTerm) => set({searchTerm})

}))