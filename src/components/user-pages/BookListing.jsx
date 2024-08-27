import React, { useState } from "react";
import { useBookList } from "../../store/bookListingStore";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AddBookModal from "../modals/book-manipulation-modals/AddBookModal";
import EditBookModal from "../modals/book-manipulation-modals/EditBookModal";
import DeleteBookModal from "../modals/book-manipulation-modals/DeleteBookModal";

import { Plus, Edit, Trash2 } from "lucide-react";

const BookListing = () => {
  const {
    books,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    currentBook,
    newBooks,
    openAddModal,
    openEditModal,
    openDeleteModal,
  } = useBookList();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Books</h1>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>{book.title}</CardHeader>
            <CardContent>
              <p>{book.author}</p>
              <p>{ book.Genre }</p>
              <div className="flex justify-end mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    openEditModal(book)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    openDeleteModal(book)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddBookModal />
      <EditBookModal />
      <DeleteBookModal />
    </div>
  );
};

export default BookListing;
