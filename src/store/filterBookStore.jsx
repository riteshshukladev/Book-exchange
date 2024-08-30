import { create } from "zustand";

export const useFilterBooks = create((set) => ({
    // Will be used to set in the options
    genres: [],
    authors: [],
    selectedAuthor: [],
    selectedGenres: [], // Changed from selectedGenre to selectedGenres for consistency
    searchTerm: '',
  
    // willDispply PleaseWait state  till the options are filled with the Authors and Genre
    isAuthorContentArrived: false,
    isGenreContendArrived: false,
    // This will be for the FilteredBooks to check if requested books are arrived or not
    isBookContentArrived: false,

    ArrivedContend: [],
    // setAuthors: (authors) => set(authors ),
    // setGenres: (genres) => set(genres ), // 

    setAuthors: (newAuthor) => set((state) => {
        const updatedAuthors = state.selectedAuthor.includes(newAuthor)
          ? state.selectedAuthor.filter((author) => author !== newAuthor)
          : [...state.authors, newAuthor];
      
        return {
          selectedGenres: updatedAuthors,
        };
      }),
      
      setGenres: (newGenre) => set((state) => {
        const updatedGenres = state.selectedGenres.includes(newGenre)
          ? state.selectedGenres.filter((genre) => genre !== newGenre)
          : [...state.genres, newGenre];
      
        return {
          selectedGenres: updatedGenres,
        };
      }),
    

    setSearchTerm :(searchTerm) => set(searchTerm)

}))