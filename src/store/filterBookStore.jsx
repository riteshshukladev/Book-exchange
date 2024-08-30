import { create } from "zustand";

export const useFilterBooks = create((set) => ({
  genres: [],
  authors: [],
  selectedAuthors: [],
  selectedGenres: [],
  searchTerm: "",

  // Loading states
  isAuthorContentArrived: false,
  isGenreContentArrived: false,
  isBookContentArrived: false,

  // Filtered books
  filteredBooks: [],

  // Setters for initial data
  setInitialAuthors: (authors) =>
    set({ authors: authors, isAuthorContentArrived: true }),
  setInitialGenres: (genres) =>
    set({ genres: genres, isGenreContentArrived: true }),
  setFilteredBooks: (books) =>
    set({ filteredBooks: books, isBookContentArrived: true }),
  // setArrivedContent: (filteredBooks) => set({
  //   filteredBooks:filteredBooks, isBookContentArrived:true
  // }),

  // Setters for selected filters
  // setSelectedAuthors: (selectedAuthors) => set({
  //    selectedAuthors }),
  // setSelectedGenres: (selectedGenres) => set({ selectedGenres }),

  // setSelectedAuthors: (selectedAuthors) => {
  //   console.log("Setting selected authors:", selectedAuthors);
  //   set({ selectedAuthors });
  // },

  // setSelectedGenres: (selectedGenres) => {
  //   console.log("Setting selected Genres:", selectedGenres);
  //   set({selectedGenres})
  // },

  setSelectedAuthors: (newSelectedAuthors) => set((state) => {
    const updatedAuthors = typeof newSelectedAuthors === 'function' 
      ? newSelectedAuthors(state.selectedAuthors)
      : newSelectedAuthors;
    console.log("Current selectedAuthors:", state.selectedAuthors);
    console.log("New selectedAuthors:", updatedAuthors);
    return { selectedAuthors: updatedAuthors };
  }),

  setSelectedGenres: (newSelectedGenres) => set((state) => {
    const updatedGenres = typeof newSelectedGenres === 'function'
      ? newSelectedGenres(state.selectedGenres)
      : newSelectedGenres;
    console.log("Current selectedGenres:", state.selectedGenres);
    console.log("New selectedGenres:", updatedGenres);
    return { selectedGenres: updatedGenres };
  }),

  // Setter for search term
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  // Setter for filtered books
  setFilteredBooks: (books) =>
    set({ filteredBooks: books, isBookContentArrived: true }),

  setSearchTerm: (searchTerm) => set({ searchTerm }),

  clearfilterstate: () => set({  selectedAuthors: [],  selectedGenres: [],  searchTerm: ""})
}));
