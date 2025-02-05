import React, { useCallback, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ComboboxDemo } from "../ui/multiSelector";
import { useFilterBooks } from "@/store/filterBookStore";
import { fetchInitialOfFilters } from "@/services/fetchBookService";
// import { isAuthenticated } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";
import { fetchFilteredBooks } from "@/services/fetchBookService";
import SelectBookExchange from "../modals/exchange-modal/SelectBookExchange";
import { useExchangeStore } from "@/store/InitiateExchangeStore";
import { useQuery, useMutation } from "@tanstack/react-query";

const FilterBooks = () => {
  const navigate = useNavigate();
  const {
    isAuthorContentArrived,
    isGenreContentArrived,
    isBookContentArrived,
    authors,
    genres,
    selectedAuthors,
    selectedGenres,
    searchTerm,
    setSelectedAuthors,
    setSelectedGenres,
    setSearchTerm,
    resetFilters,
    filteredBooks,
    setInitialAuthors,
    setInitialGenres,
    setFilteredBooks,
    clearFilterState,
    unSetBookContentArrived,
  } = useFilterBooks();

  const { setExchangeModal } = useExchangeStore();


  const {
    data:initialFetchData,
    isLoading: filterFetchLoading,
    isError: filterFetchError,
    error: queryError
  } = useQuery({
    queryKey: ["bookFilters"],
    queryFn: fetchInitialOfFilters,
    onSuccess: (data) => {
      
    },
    onError: (error) => {
      console.error("Filter fetch error:", error);
    },
  
  });


  useEffect(()=>{
    if(initialFetchData){
      console.log(initialFetchData)
      const { allAuthors, allGenres, allBooks } = initialFetchData;
      setInitialAuthors(allAuthors || []);
      setInitialGenres(allGenres || []);
      setFilteredBooks(allBooks || []);
    }
  },[initialFetchData])

  const applyFilterMutation = useMutation({
    mutationFn: (filters) =>
      fetchFilteredBooks({
        authors: selectedAuthors,
        genres: selectedGenres,
        searchTerm: searchTerm,
      }),
    onSuccess: (data) => {
      setFilteredBooks(data);
    },
    onError: (error) => {
      console.error("Filter application failed:", error);
    },
  });

  // Usage in component
  const handleApplyFilters = () => {
    applyFilterMutation.mutate();
  };

  const handleResetFilters = async () => {
    clearFilterState();
    // Refetch initial data
    if (initialFetchData) {
      const { allBooks } = initialFetchData;
      setFilteredBooks(allBooks || []);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-auto bg-slate-50">
        <CardHeader>
          <CardTitle className="">Filter according to your need!</CardTitle>
          <CardDescription>
            Filter by authors, genre and name, UP TO YOU!!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="author-select" className="mb-2 block">
                Filter By Author
              </Label>
              <ComboboxDemo
                content={authors}
                selectedContent={selectedAuthors}
                setSelectedContent={setSelectedAuthors}
                isContentArrived={isAuthorContentArrived}
                placeholder="Select authors"
              />
            </div>
            <div>
              <Label htmlFor="genre-select" className="mb-2 block">
                Filter By Genre
              </Label>
              <ComboboxDemo
                content={genres}
                selectedContent={selectedGenres}
                setSelectedContent={setSelectedGenres}
                isContentArrived={isGenreContentArrived}
                placeholder="Select genres"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              placeholder="Search by book name"
              className="flex-grow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="w-full sm:w-auto"
              onClick={handleApplyFilters}
              disabled={applyFilterMutation.isPending}
            >
              {applyFilterMutation.isPending ? "Applying..." : "Apply Filters"}
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display filtered books */}
      {!isBookContentArrived ? (
        <div>Loading books...</div>
      ) : filteredBooks.length === 0 ? (
        <div>
          <CardTitle>No books found</CardTitle>
          <CardDescription>Try adjusting your filters</CardDescription>
        </div>
      ) : (
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg font-bold truncate">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-2">
                    {book.genre}
                  </Badge>
                  <p className="text-sm text-gray-600 truncate">{book.email}</p>

                  <Button
                    onClick={() => setExchangeModal(book)}
                    className="bg-zinc-900	text-white my-2"
                  >
                    Initiate exchange
                  </Button>
                </CardContent>
                <CardFooter className="text-xs text-gray-400">
                  ID: {book.id}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <SelectBookExchange />
    </div>
  );
};

export default FilterBooks;
