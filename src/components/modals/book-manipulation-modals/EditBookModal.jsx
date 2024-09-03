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

const EditBookModal = () => {

  const { toast } = useToast();
  const {
    isEditModalOpen,
    closeEditModal,
    currentBook,
    setCurrentBookTitle,
    setCurrentBookAuthor,
    setCurrentBookGenre,
    setBooks
  } = useBookList();

  if (!currentBook) return null;

  const changeBook = async () => {
    try {
     await BookManipulation.handleEditBook(currentBook,setBooks,closeEditModal)
     toast({
      title: "Success",
       description: "Change made successfully!",
      className: "bg-green-300 text-black"
    });
  } catch (error) {
    toast({
      title: "Error",
      description: `Failed to change the data`,
      className: "bg-red-300 text-black",
      variant: "destructive",
    });
  }
  }

  return (
    <Dialog open={isEditModalOpen} onOpenChange={closeEditModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <div>
          <Label>Title</Label>
          <Input
            value={currentBook.title}
            onChange={(e) => setCurrentBookTitle(e.target.value)}
            placeholder="Book Title"
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            value={currentBook.author}
            onChange={(e) => setCurrentBookAuthor(e.target.value)}
            placeholder="Book Author"
          />
        </div>
        <div>
          <Label>Genre</Label>
          <Input
            value={currentBook.genre}
            onChange={(e) => setCurrentBookGenre(e.target.value)}
            placeholder="Book Author"
          />
        </div>
        <DialogFooter>
          <Button onClick={changeBook}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
