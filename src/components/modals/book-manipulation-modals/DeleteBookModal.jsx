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


import { handleDeleteBook } from "@/services/bookManipulation";

const DeleteBookModal = () => {
  const { isDeleteModalOpen, closeDeleteModal, currentBook } = useBookList();

  if (!currentBook) return null;

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={closeDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{currentBook.title}" by {currentBook.author}?</p>
        <DialogFooter>
          <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
          <Button variant="destructive" onClick={handleDeleteBook}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
