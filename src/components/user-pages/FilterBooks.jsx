import React, { useEffect } from "react";
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
import { isAuthenticated } from "@/services/authService";
import { useNavigate } from "react-router-dom";

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
    applyFilters,
    resetFilters,
    filteredBooks,
    setInitialAuthors,
    setInitialGenres,
    setFilteredBooks,
  } = useFilterBooks();

  useEffect(() => {
    fetchInitialOfFilters({
      setInitialAuthors,
      setInitialGenres,
      setFilteredBooks,
    });
  }, [fetchInitialOfFilters]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  });

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
            <Button className="w-full sm:w-auto" onClick={applyFilters}>
              Apply Filters
            </Button>
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              onClick={resetFilters}
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
        <div>
          {filteredBooks.map((book) => (
            <div key={book.id}>{book.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBooks;
