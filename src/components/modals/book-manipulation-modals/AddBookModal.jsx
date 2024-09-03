import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useBookList } from '../../../store/bookListingStore';
// import { handleAddBook } from '@/services/bookManipulation';
import BookManipulation from '@/services/bookManipulation';



const AddBookModal = () => {


  const { toast } = useToast();
  const { isAddModalOpen, closeAddModal, newBooks, setNewBookTitle, setNewBookAuthor, setNewBookGenre, setBooks, clearNewBook } = useBookList();
  
  const addBook = async () => {
    try {
     await BookManipulation.handleAddBook(newBooks,setBooks,closeAddModal,clearNewBook)
     toast({
      title: "Success",
       description: "Book added successfully!",
      className: "bg-green-300 text-black"
    });
  } catch (error) {
    toast({
      title: "Error",
      description: `Failed to add book`,
      className: "bg-red-300 text-black",
      variant: "destructive",
    });
  }
  }

  return (
    <Dialog open={isAddModalOpen} onOpenChange={closeAddModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Title</Label>
          <Input
            value={newBooks.title}
            onChange={(e) => setNewBookTitle(e.target.value)}
            placeholder="Book Title"
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            value={newBooks.author}
            onChange={(e) => setNewBookAuthor(e.target.value)}
            placeholder="Book Author"
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
          <Button onClick={addBook}>Add Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
