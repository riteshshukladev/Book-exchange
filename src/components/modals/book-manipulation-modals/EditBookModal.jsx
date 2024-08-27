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
//import the API function

const EditBookModal = () => {
  const {
    isEditModalOpen,
    closeEditModal,
    currentBook,
    setCurrentBookTitle,
    setCurrentBookAuthor,
    setCurrentBookGenre,
  } = useBookList();

  if (!currentBook) return null;

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
            value={currentBook.title}
            onChange={(e) => setCurrentBookGenre(e.target.value)}
            placeholder="Book Author"
          />
        </div>
        <DialogFooter>
          <Button onClick={''}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
