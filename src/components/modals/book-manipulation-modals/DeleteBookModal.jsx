import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBookList } from "../../../store/bookListingStore";
import BookManipulation from "@/services/bookManipulation";
import useBookMutation from "@/hooks/useBookMutation";

const DeleteBookModal = () => {
  const { isDeleteModalOpen, closeDeleteModal, currentBook, setBooks } =
    useBookList();

  const deleteBookHandler = useBookMutation(
    () =>
      BookManipulation.handleDeleteBook(
        currentBook.id,
        setBooks,
        closeDeleteModal
      ),
    {
      onSuccess: () => {
        closeDeleteModal();
      },
    }
  );

  const deleteBook = () => {
    deleteBookHandler.mutate();
  };

  const handleModalClose = () => {
    deleteBookHandler.reset();
    closeDeleteModal();
  };

  useEffect(() => {
    if (isDeleteModalOpen) {
      deleteBookHandler.reset();
    }
  }, [isDeleteModalOpen]);

  if (!isDeleteModalOpen) return null;

  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete "{currentBook.title}" by{" "}
          {currentBook.author}?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={deleteBook}>
            {deleteBookHandler.isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBookModal;
