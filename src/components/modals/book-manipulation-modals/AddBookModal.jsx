import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useBookList } from '../../../store/bookListingStore';
import { handleAddBook } from '@/services/bookManipulation';



const AddBookModal = () => {


  const { isAddModalOpen, closeAddModal,newBooks,setNewBookTitle,setNewBookAuthor,setNewBookGenre } = useBookList();

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
            value={newBooks.Genre}
            onChange={(e) => setNewBookGenre(e.target.value)}
            placeholder="Book Genre"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleAddBook}>Add Book</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookModal;
