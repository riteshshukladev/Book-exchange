import { create } from "zustand";

export const useFilterBooks = ((set) => ({
    genres: [],
    authors: [],
    selectedAuthor: '',
    selectedGenre: [],
    searchTerm: '',
    
    setAuthors: (authors) => set({ authors }),
    setGenres: (genres) => (state)=> set([...state,genres]),
    
    setSelectedAuthors: (author) => set({
        selectedAuthor:author
    }),
    setSelectedSelectedGenres: (genres) => ({
        selectedGenres: genres
    })
    

}))