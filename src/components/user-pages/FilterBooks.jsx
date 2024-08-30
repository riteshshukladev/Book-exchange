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

const FilterBooks = () => {
  useEffect(() => {
    fetchInitialsOfFilters();
  });

  const {
    isAuthorContentArrived,
    isGenreContendArrived,
    isBookContentArrived,
    retrievedAuthors,
    retrivedGenre,
    searchTerm,
    genres,
    authors,
    setSearchTerm,
    selectedGenres,
    setSelectedAuthor,
    setSelectedGenres,
    selectedAuthor,
    setAuthors,
    setGenres
  } = useFilterBooks();
  return (
    <div className="space-y-6">
      <Card className=" w-auto">
        <CardHeader>
          <CardTitle>Filter according to your need!</CardTitle>
          <CardDescription>
            Filter by authors, genre and name, UP TO YOU!!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <Label htmlFor="author-select" className="mb-2 block">
                Filter By Author
              </Label>
              <ComboboxDemo
                content={authors}
                selectedContent={setAuthors}
                isContentArrived = {isAuthorContentArrived}
                
                placeholder="Select authors"
              />
            </div>
            <div>
              <Label htmlFor="genre-select" className="mb-2 block">
                Filter By Genre
              </Label>
              <ComboboxDemo
                content={genres}
                selectedContent={setGenres}
                isContentArrived = {isGenreContendArrived}

                placeholder="Select genres"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              placeholder="Add Book Name"
              className="flex-grow"
              value={searchTerm}
              onChange={() => setSearchTerm(e.target.value)}
            />
            <Button className="w-full sm:w-auto">Add Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Content below the filter */}

      {isBookContentArrived && <></>}
    </div>
  );
};

export default FilterBooks;
