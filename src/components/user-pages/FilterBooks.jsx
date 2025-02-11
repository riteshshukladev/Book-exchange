// FilterBooks.jsx
import React, { useCallback, useEffect, useMemo } from "react";
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
import { ComboboxDemo } from "../ui/multiSelector";
import { useFilterBooks } from "@/store/filterBookStore";
import { fetchInitialOfFilters, fetchFilteredBooks } from "@/services/fetchBookService";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SelectBookExchange from "../modals/exchange-modal/SelectBookExchange";
import { useExchangeStore } from "@/store/InitiateExchangeStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingOverlay from "../layout/LoadingOverlay";
import { BookIcon, User } from "lucide-react";
import { useBookList } from "@/store/bookListingStore";
import shallow from "zustand/shallow";

const FilterBooks = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const { books } = useBookList(
    (state) => ({ books: state.books }),
    shallow
  );

  const { setExchangeModal } = useExchangeStore(
    (state) => ({ setExchangeModal: state.setExchangeModal }),
    shallow
  );

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
    clearFilterState,
    filteredBooks,
    setInitialAuthors,
    setInitialGenres,
    setFilteredBooks,
  } = useFilterBooks();

  const {
    data: initialFetchData,
    isLoading: filterFetchLoading,
    isError: filterFetchError,
    error: queryError,
  } = useQuery({
    queryKey: ["bookFilters"],
    queryFn: fetchInitialOfFilters,
    onError: (error) => {
      console.error("Filter fetch error:", error);
    },
  });


  useEffect(() => {
    if (initialFetchData) {
      // Invalidate books if none exist.
      if (!books.length) {
        queryClient.invalidateQueries("books");
      }
      const { allAuthors, allGenres, allBooks } = initialFetchData;

      const filteredAllBooks = allBooks.filter(
        (book) => !books.some((userBook) => userBook.id === book.id)
      );
      setInitialAuthors(allAuthors || []);
      setInitialGenres(allGenres || []);
      setFilteredBooks(filteredAllBooks || []);
    }
  }, [
    initialFetchData,
    books,
    queryClient,
    setInitialAuthors,
    setInitialGenres,
    setFilteredBooks,
  ]);


  const applyFilterMutation = useMutation({
    mutationFn: () =>
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


  const handleApplyFilters = useCallback(() => {
    applyFilterMutation.mutate();
  }, [applyFilterMutation]);

  const handleResetFilters = useCallback(() => {
    clearFilterState();
    if (initialFetchData) {
      const { allBooks } = initialFetchData;
      setFilteredBooks(allBooks || []);
    }
  }, [clearFilterState, initialFetchData, setFilteredBooks]);

  const handleExchangeRequest = useCallback(
    (book) => {
      navigate(`/exchange-request/${book.id}`, { state: { book } });
    },
    [navigate]
  );


  const handleSearchChange = useCallback(
    (e) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm]
  );

  const renderedBooks = useMemo(() => {
    return filteredBooks.map((book) => (
      <Card key={book.id} className="p-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-josephine text-xl md:text-2xl text-black">
            <BookIcon className="w-5 h-5" />
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
        <CardFooter className="flex justify-between items-center flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 font-kreon font-normal text-base">
            <User className="w-4 h-4" />
            {book.email}
          </div>
          <Button
            className="font-kreon font-medium border-black hover:bg-gray-100"
            variant="outline"
            onClick={() => handleExchangeRequest(book)}
          >
            Request Exchange
          </Button>
        </CardFooter>
      </Card>
    ));
  }, [filteredBooks, handleExchangeRequest]);

  return (
    <div className="space-y-6 max-w-[1540px] mx-auto">
      <Card className="w-auto bg-slate-50">
        <CardContent className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center pt-4 pb-4 pl-4 pr-4">
          <div className="flex flex-row gap-2">
            <ComboboxDemo
              content={authors}
              selectedContent={selectedAuthors}
              setSelectedContent={setSelectedAuthors}
              isContentArrived={isAuthorContentArrived}
              placeholder="Select authors"
            />
            <ComboboxDemo
              content={genres}
              selectedContent={selectedGenres}
              setSelectedContent={setSelectedGenres}
              isContentArrived={isGenreContentArrived}
              placeholder="Select genres"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              placeholder="Search by book name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="flex-grow font-kreon text-black font-medium text-base"
            />
            <Button
              className="w-full sm:w-auto font-kreon font-medium text-sm tracking-wide"
              onClick={handleApplyFilters}
              disabled={applyFilterMutation.isPending}
            >
              {applyFilterMutation.isPending ? "Applying..." : "Apply Filters"}
            </Button>
            <Button
              className="w-full sm:w-auto font-kreon text-black font-medium text-sm tracking-wide"
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
        <LoadingOverlay />
      ) : filteredBooks.length === 0 ? (
        <div>
          <CardTitle>No books found</CardTitle>
          <CardDescription>Try adjusting your filters</CardDescription>
        </div>
      ) : (
        <ScrollArea className="w-full rounded-md border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {renderedBooks}
          </div>
        </ScrollArea>
      )}

      <SelectBookExchange />
    </div>
  );
};

export default FilterBooks;
