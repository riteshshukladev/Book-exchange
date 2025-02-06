import React,{useEffect} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useBookList } from "../../../store/bookListingStore";
import BookManipulation from "@/services/bookManipulation";

import useBookMutation from "@/hooks/useBookMutation";

const AddBookModal = () => {
  const {
    isAddModalOpen,
    closeAddModal,
    newBooks,
    setNewBookTitle,
    setNewBookAuthor,
    setNewBookGenre,
    setBooks,
    clearNewBook,
  } = useBookList();

  const bookAddHandler = useBookMutation(
    () =>
      BookManipulation.handleAddBook(
        newBooks,
        setBooks,
        closeAddModal,
        clearNewBook
      ),
    {
      onSuccess: () => {
        closeAddModal();
        clearNewBook();
        
      },
      
    }
  );

  const addBook = () => {
    bookAddHandler.mutate();
  };

  const handleCloseModal = () =>{
    bookAddHandler.reset()
    closeAddModal()
  }

  useEffect(() =>{
    if(isAddModalOpen){
      bookAddHandler.reset();
    } 
  },[isAddModalOpen])

  return (
    <Dialog open={isAddModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-josephine font-xl text-black font-medium">Add New Book</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Title</Label>
          <Input
            value={newBooks.title}
            onChange={(e) => setNewBookTitle(e.target.value)}
            placeholder="Book Title"
            required
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            value={newBooks.author}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            placeholder="Book Author"
            required
          />
        </div>

        <div>
          <Label>Genre</Label>
          <Input
            value={newBooks.genre}
            onChange={(e) => setNewBookGenre(e.target.value)}
            placeholder="Book Genre"
          />
        </div>
        <DialogFooter>
          <Button onClick={addBook}>{bookAddHandler.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding Book...
              </div>
            ) : (
              "Add Book"
            )}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
