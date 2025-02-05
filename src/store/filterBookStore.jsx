import { create } from "zustand";

/**
 * @typedef {Object} FilterState
 * @property {Array} genres - List of all available genres
 * @property {Array} authors - List of all available authors
 * @property {Array} selectedAuthors - Currently selected authors
 * @property {Array} selectedGenres - Currently selected genres
 * @property {string} searchTerm - Current search term
 * @property {boolean} isAuthorContentArrived - Authors loading state
 * @property {boolean} isGenreContentArrived - Genres loading state
 * @property {boolean} isBookContentArrived - Books loading state
 * @property {Array} filteredBooks - List of filtered books
 */

export const useFilterBooks = create((set) => ({
  // Initial stateis
  genres: [],
  authors: [],
  selectedAuthors: [],
  selectedGenres: [],
  searchTerm: "",
  filteredBooks: [],

  // Loading states
  isAuthorContentArrived: false,
  isGenreContentArrived: false,
  isBookContentArrived: false,

  // Initial data setters
  setInitialAuthors: (authors) =>
    set({
      authors,
      isAuthorContentArrived: true,
    }),

  setInitialGenres: (genres) =>
    set({
      genres,
      isGenreContentArrived: true,
    }),

  // Filter setters with validation
  setSelectedAuthors: (newSelectedAuthors) =>
    set((state) => {
      const updatedAuthors =
        typeof newSelectedAuthors === "function"
          ? newSelectedAuthors(state.selectedAuthors)
          : newSelectedAuthors;

      console.log({
        previous: state.selectedAuthors,
        updated: updatedAuthors,
      });

      return { selectedAuthors: updatedAuthors };
    }),

  setSelectedGenres: (newSelectedGenres) =>
    set((state) => {
      const updatedGenres =
        typeof newSelectedGenres === "function"
          ? newSelectedGenres(state.selectedGenres)
          : newSelectedGenres;

      console.log({
        previous: state.selectedGenres,
        updated: updatedGenres,
      });

      return { selectedGenres: updatedGenres };
    }),

  // Search and results handling
  setSearchTerm: (searchTerm) => set({ searchTerm }),

  setFilteredBooks: (books) =>
    set({
      filteredBooks: books,
      isBookContentArrived: true,
    }),

  // Reset filters

  clearFilterState: () =>
    set({
      selectedAuthors: [],
      selectedGenres: [],
      searchTerm: "",
      filteredBooks: [],
      isBookContentArrived: true,
    }),

  // Error handling
  setError: (error) =>
    set({
      error,
      isBookContentArrived: true,
    }),

  // Reset store
  resetStore: () =>
    set({
      genres: [],
      authors: [],
      selectedAuthors: [],
      selectedGenres: [],
      searchTerm: "",
      filteredBooks: [],
      isAuthorContentArrived: false,
      isGenreContentArrived: false,
      isBookContentArrived: false,
      error: null,
    }),
}));
