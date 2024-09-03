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
  import { useToast } from "@/hooks/use-toast";
  import { useBookList } from "../../../store/bookListingStore";
import BookManipulation from "@/services/bookManipulation";

const DeleteBookModal = () => {

  const { toast } = useToast();
  const { isDeleteModalOpen, closeDeleteModal, currentBook,setBooks } = useBookList();

  if (!currentBook) return null;
  { console.log(currentBook.id) };
  
  const deleteBook = async () => {
    try {
     await BookManipulation.handleDeleteBook(currentBook.id, setBooks,closeDeleteModal)
     toast({
      title: "Success",
       description: "Book deleted successfully!",
      className: "bg-green-300 text-black"
    });
  } catch (error) {
    toast({
      title: "Error",
      description: `Failed to delete book:`,
      className: "bg-red-300 text-black",
      variant: "destructive",
    });
  }
  }

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={closeDeleteModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{currentBook.title}" by {currentBook.author}?</p>
        <DialogFooter>
          <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
          <Button variant="destructive" onClick={deleteBook}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
