import React, { useCallback, useEffect } from "react";
import { useBookList } from "../../store/bookListingStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "../ui/card";
import AddBookModal from "../modals/book-manipulation-modals/AddBookModal";
import EditBookModal from "../modals/book-manipulation-modals/EditBookModal";
import DeleteBookModal from "../modals/book-manipulation-modals/DeleteBookModal";
import BookManipulation from "@/services/bookManipulation";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "../layout/LoadingOverlay";
import shallow from "zustand/shallow";
import BookListingCard from "../cards/BookListingCards";

const BookListing = () => {
  const { openAddModal, openEditModal, openDeleteModal, setBooks } =
    useBookList(
      (state) => ({
        openAddModal: state.openAddModal,
        openEditModal: state.openEditModal,
        openDeleteModal: state.openDeleteModal,
        setBooks: state.setBooks,
      }),
      shallow
    );

  const {
    data: books,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["books"],
    queryFn: BookManipulation.fetchBooks,
    // staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  // To make the state global of the books

  useEffect(() => {
    if (books) {
      setBooks(books);
    }
  }, [books, setBooks]);

  if (isLoading) return <LoadingOverlay />;
  if (error) return <div>Error: {error.message}</div>;

  console.log(books);
  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-medium text-black font-kreon">
          Your Books
        </h1>
        <Button
          onClick={openAddModal}
          className="bg-gray-900 text-white hover:bg-gray-700"
        >
          <Plus className="mr-2 h-4 w-4" />{" "}
          <span className="font-kreon text-sm font-medium">Add</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            // <Card
            //   key={book.id}
            //   className="bg-white shadow-sm hover:shadow-md transition-shadow"
            // >
            //   <CardContent className="p-4 flex gap-4">
            //     {/* Image Section */}
            //     <div className="w-[120px] h-[160px] flex-shrink-0">
            //       <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            //         <svg
            //           className="w-12 h-12 text-gray-400"
            //           xmlns="http://www.w3.org/2000/svg"
            //           fill="none"
            //           viewBox="0 0 24 24"
            //           stroke="currentColor"
            //         >
            //           <path
            //             strokeLinecap="round"
            //             strokeLinejoin="round"
            //             strokeWidth={2}
            //             d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            //           />
            //         </svg>
            //       </div>
            //     </div>

            //     {/* Content Section */}
            //     <div className="flex flex-col justify-end">
            //       <div className="flex-1">
            //         <h2 className="text-xl md:text-2xl font-semibold text-black font-josephine">
            //           {book.title}
            //         </h2>
            //         <p className="text-gray-800 mb-1 font-kreon text-base tracking-wide">
            //           Author: {book.author}
            //         </p>
            //         <p className="text-gray-800 mb-1 font-kreon text-base tracking-wide">
            //           Genre: {book.genre}
            //         </p>
            //       </div>

            //       {/* Buttons */}
            //       <div className="flex justify-end space-x-2 mt-4">
            //         <Button
            //           variant="outline"
            //           size="sm"
            //           className="text-gray-600 hover:text-gray-900"
            //           onClick={() => openEditModal(book)}
            //         >
            //           <Edit className="h-4 w-4" />
            //         </Button>
            //         <Button
            //           variant="destructive"
            //           size="sm"
            //           className="bg-red-500 hover:bg-red-600 text-white"
            //           onClick={() => openDeleteModal(book)}
            //         >
            //           <Trash2 className="h-4 w-4" />
            //         </Button>
            //       </div>
            //     </div>
            //   </CardContent>
            // </Card>
            <BookListingCard
              key={book.id}
              book={book}
              onEdit={openEditModal} 
              onDelete={openDeleteModal} 
            />
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
