import React from "react";
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
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SelectBookExchange = () => {
  const { books } = useBookList();
  const { isInitiateExchageModalOpen, resetExchangeModal, selectedBook } = useExchangeStore();

  const handleExchangeInitiation = (book) => {
    console.log("Initiating exchange between:", selectedBook, "and", book);
    resetExchangeModal();
  };

  return (
    <Dialog open={isInitiateExchageModalOpen} onOpenChange={resetExchangeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a book to exchange with!</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[400px] w-full rounded-md border">
          <div className="p-4 space-y-4">
            {books.map((book) => (
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

                  <Button 
                    className="bg-zinc-900 text-white mt-2"
                    onClick={() => handleExchangeInitiation(book)}
                  >
                    Select for Exchange
                  </Button>
                </CardContent>
                <CardFooter className="text-xs text-gray-400">
                  ID: {book.id}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={resetExchangeModal}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectBookExchange;