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
import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import LoadingOverlay from "../layout/LoadingOverlay";
import { BookIcon, User } from "lucide-react";
import { useBookList } from "@/store/bookListingStore";


const FilterBooks = () => {
  const queryClient = useQueryClient();
  const {books} = useBookList();
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
    data: initialFetchData,
    isLoading: filterFetchLoading,
    isError: filterFetchError,
    error: queryError,
  } = useQuery({
    queryKey: ["bookFilters"],
    queryFn: fetchInitialOfFilters,
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Filter fetch error:", error);
    },
  });

  useEffect(() => {
    if (initialFetchData) {
      if (!books.length) { 
        queryClient.invalidateQueries("books");
      }
      const { allAuthors, allGenres, allBooks } = initialFetchData;
      
      
      const filteredAllBooks = allBooks.filter(book => 
        !books.some(userBook => userBook.id === book.id)
      );
  
      setInitialAuthors(allAuthors || []);
      setInitialGenres(allGenres || []);
      setFilteredBooks(filteredAllBooks || []);
    }
  }, [initialFetchData, books, queryClient]);

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
    
    if (initialFetchData) {
      const { allBooks } = initialFetchData;
      setFilteredBooks(allBooks || []);
    }
  };

  const handleExchangeRequest = (book) => {
    navigate(`/exchange-request/${book.id}`, { state: { book } });
  };


  return (
    <div className="space-y-6 max-w-[1540px] mx-auto">
      <Card className="w-auto bg-slate-50">
        {/* <CardHeader>
          <CardTitle className="">Filter according to your need!</CardTitle>
          <CardDescription>
            Filter by authors, genre and name, UP TO YOU!!
          </CardDescription>
        </CardHeader> */}
        <CardContent className="flex flex-row pt-4 pb-4 pl-4 pr-4 justify-between flex !flex-col gap-4 md:!flex-row">
          <div className="flex flex-row gap-2">
            <div>
              <ComboboxDemo
                content={authors}
                selectedContent={selectedAuthors}
                setSelectedContent={setSelectedAuthors}
                isContentArrived={isAuthorContentArrived}
                placeholder="Select authors"
              />
            </div>
            <div>
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
              className="font-kreon text-black font-medium text-base"
            />
            <Button
              className="w-full sm:w-auto"
              onClick={handleApplyFilters}
              disabled={applyFilterMutation.isPending}
              className="font-kreon font-medium text-sm tracking-wide"
            >
              {applyFilterMutation.isPending ? "Applying..." : "Apply Filters"}
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              onClick={handleResetFilters}
              className="font-kreon text-black font-medium text-sm tracking-wide"
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Display filtered books */}
      {!isBookContentArrived ? (
        <LoadingOverlay />
      ) : filteredBooks.length === 0 ? (
        <div>
          <CardTitle>No books found</CardTitle>
          <CardDescription>Try adjusting your filters</CardDescription>
        </div>
      ) : (
        <ScrollArea className=" w-full rounded-md border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="p-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-josephine text-xl md:text-2xl text-blac">
                    <BookIcon className="w-5 h-5 k" />
                    {book.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-800 font-kreon font-medium">
                    {book.author}
                  </p>
                  <p className="text-xs text-gray-800 font-kreon font-medium px-2 py-1 bg-slate-200 rounded-full w-fit">
                    {book.genre}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center flex-row sm:flex-col sm:items-baseline sm:pt-5 sm:gap-1 xl:flex-row">
                  <div className="flex items-center gap-2 font-kreon font-normal text-base">
                    <User className="w-4 h-4" />
                    {book.email}
                  </div>
                  <Button
                    className="font-kreon font-medium border-black hover:bg-gray-100 "
                    variant="outline"
                    onClick={() => handleExchangeRequest(book)}
                  >
                    Request Exchange
                  </Button>
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
