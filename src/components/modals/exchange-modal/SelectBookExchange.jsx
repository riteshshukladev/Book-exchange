import React from "react";
import { useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBookList } from "@/store/bookListingStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useExchangeStore } from "@/store/InitiateExchangeStore";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import BookManipulation from "@/services/bookManipulation";
import { useMutation } from "@tanstack/react-query";

const SelectBookExchange = () => {


  const { books, setBooks } = useBookList();
  const {
    isInitiateExchageModalOpen,
    resetExchangeModal,
    selectedBook,
    setUserReplaceBook,
    userReplaceBook,
    resetReplaceBook
  } = useExchangeStore();

  useEffect(() => {
    if (books.length === 0) {
      BookManipulation.fetchBooks(setBooks);
      console.log("Fetching books");
    }
  }, [books.length]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => book.email !== selectedBook.email);
  }, [books, selectedBook.id]);



  console.log(selectedBook);
  console.log(userReplaceBook);
  const intiateExchangeMutation = useMutation({
    mutationFn: () => exchangeBookFunction({selectedBook, userReplaceBook}),
    onSuccess: () => {
      
    },
    onError: (err) => {
      
    }
  })

  const handleExchangeSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(userReplaceBook).length === 0) return;

      intiateExchangeMutation.mutate()
  }
  

  

  return (
    <Dialog open={isInitiateExchageModalOpen} onOpenChange={resetExchangeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a book to exchange with!</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border">
          <div className="p-4 space-y-4">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg font-bold truncate">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="mb-2">
                    {book.genre}
                  </Badge>
                  <p className="text-sm text-gray-600 truncate">{book.email}</p>

                  { userReplaceBook.id === book.id ? (
                    <Button className="bg-stone-500 mt-2" onClick= {resetReplaceBook}>Selected</Button>
                  ) : (
                    <Button
                      className="bg-zinc-900 text-white mt-2"
                      onClick={() => setUserReplaceBook(book)}
                    >
                      Select for Exchange
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={handleExchangeSubmit}>Initiate Process</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectBookExchange;
