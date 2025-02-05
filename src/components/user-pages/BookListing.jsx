import React, { useEffect } from "react";
import { useBookList } from "../../store/bookListingStore";
import { Button } from "../ui/button";
import { Card, CardContent,CardTitle,CardDescription } from "../ui/card";
import AddBookModal from "../modals/book-manipulation-modals/AddBookModal";
import EditBookModal from "../modals/book-manipulation-modals/EditBookModal";
import DeleteBookModal from "../modals/book-manipulation-modals/DeleteBookModal";
import BookManipulation from "@/services/bookManipulation";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";


const BookListing = () => {
  const {
    // books,
    openAddModal,
    openEditModal,
    openDeleteModal,
    
  } = useBookList();

  // useEffect(() => {
  //   BookManipulation.fetchBooks(setBooks);
  // }, []);

  const { data:books, isLoading, error, isError } = useQuery({
    queryKey: ["books"],
    queryFn: BookManipulation.fetchBooks,
    // staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,

  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(books);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Books</h1>
        <Button
          onClick={openAddModal}
          className="bg-gray-900 text-white hover:bg-gray-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books && books.length === 0 ? (
          <div className="w-full flex justify-center items-center py-10">
            <Card className="w-96 p-6 bg-gray-100 shadow-lg rounded-lg">
              <CardTitle className="text-lg font-semibold text-gray-800 mb-2">
                Please Add Some Books :)
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Add some books to initiate the exchange.
              </CardDescription>
            </Card>
          </div>
        ) : (
          books &&
          books.map((book) => (
            <Card
              key={book.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Title: {book.title}
                </h2>
                <p className="text-gray-600 mb-1">Author: {book.author}</p>
                <p className="text-gray-600 mb-4">Genre: {book.genre}</p>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => openEditModal(book)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => openDeleteModal(book)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <AddBookModal />
      <EditBookModal />
      <DeleteBookModal />
    </div>
  );
};

export default BookListing;

