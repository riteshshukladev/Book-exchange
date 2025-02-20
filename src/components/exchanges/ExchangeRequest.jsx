// ExchangeRequest.jsx
import React, { useEffect, useMemo, useCallback } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useBookList } from "../../store/bookListingStore";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { exchangeBookFunction } from "@/services/userExchangeService";
import { useToast } from "@/hooks/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import shallow from "zustand/shallow";

const ExchangeRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookId } = useParams(); // (if needed later)
  const { toast } = useToast();

  // Use a selector to subscribe only to "books"
  const { books } = useBookList(
    (state) => ({ books: state.books }),
    shallow
  );

  // Extract selectedBook from location state
  const selectedBook = location.state?.book;

  // If there's no selected book, immediately navigate to "/home"
  if (!selectedBook?.id) {
    return <Navigate to="/home" replace />;
  }

  // Memoize the filtered books so that we only re-compute when "books" or "selectedBook" change.
  const filteredBooks = useMemo(() => {
    return books.filter((book) => book.email !== selectedBook.email);
  }, [books, selectedBook]);

  // If "books" is empty, or selectedBook is somehow missing, navigate back home.
  useEffect(() => {
    if (!selectedBook?.id || !books || books.length === 0) {
      navigate("/home", { replace: true });
    }
  }, [selectedBook, books, navigate]);

  // Setup the exchange mutation using React Query.
  const exchangeMutation = useMutation({
    mutationFn: ({ userReplaceBook }) =>
      exchangeBookFunction({ selectedBook, userReplaceBook }),
    onSuccess: (data) => {
      console.log(data);
      toast({
        title: "Success!",
        description: `${data?.message || "success!!"}`,
        variant: "success",
      });
      navigate("/record", { replace: true });
    },
    onError: (error) => {
      toast({
        title: "Error!",
        description: `${error?.message || "failure!!"}`,
        variant: "destructive",
      });
    },
  });

  // Memoize the exchange handler callback
  const handleExchangeSelect = useCallback(
    (book) => {
      exchangeMutation.mutate({ userReplaceBook: book });
    },
    [exchangeMutation]
  );

  // Memoize the carousel items so that they only re-render when filteredBooks or handleExchangeSelect change.
  const carouselItems = useMemo(() => {
    return filteredBooks.map((book) => (
      <CarouselItem key={book.id}>
        <Card className="bg-white">
          <CardContent className="p-4 flex flex-col gap-4">
            <div className="relative w-full">
              <AspectRatio
                ratio={3 / 4}
                className="bg-muted w-full outline-none"
              >
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title || "Book cover"}
                  className="object-cover w-full h-full rounded-md"
                />
              </AspectRatio>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl text-black font-josephine font-medium">
                {book.title}
              </h3>
              <p className="text-gray-800 font-kreon font-normal text-base">
                Author: {book.author}
              </p>
              <Badge className="w-fit font-kreon">{book.genre}</Badge>
              <Button
                className="w-full mt-2 text-black font-kreon font-normal text-lg"
                variant="outline"
                onClick={() => handleExchangeSelect(book)}
              >
                Select for Exchange
              </Button>
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    ));
  }, [filteredBooks, handleExchangeSelect]);

  return (
    <div className="container max-w-[1540px] mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Left Column - Selected Book */}
        <div className="flex flex-col gap-4 h-full">
          <h2 className="text-2xl font-kreon text-center">Selected Book</h2>
          <Card className="bg-gray-50 flex-1 flex flex-col">
            <CardContent className="flex flex-col gap-4 p-6 h-full">
              <div className="relative w-full max-w-sm mx-auto rounded-lg border text-card-foreground shadow-sm bg-white p-4">
                <AspectRatio
                  ratio={3 / 4}
                  className="bg-muted w-full outline-none"
                >
                  <img
                    src={selectedBook.cover || "/placeholder.svg"}
                    alt={selectedBook.title || "Book cover"}
                    className="object-cover w-full h-full rounded-md"
                  />
                </AspectRatio>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl text-black font-josephine font-medium">
                    {selectedBook.title}
                  </h3>
                  <p className="text-gray-800 font-kreon font-normal text-base">
                    Author: {selectedBook.author}
                  </p>
                  <Badge className="w-fit font-kreon">
                    {selectedBook.genre}
                  </Badge>
                  <p className="text-gray-800 font-kreon font-normal text-base">
                    Owner: {selectedBook.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Your Books Carousel */}
        <div className="flex flex-col gap-4 h-full">
          <h2 className="text-2xl font-kreon text-center">Your Books</h2>
          <Card className="bg-gray-50 flex-1 flex flex-col p-6">
            <Carousel className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center">
              <CarouselContent>{carouselItems}</CarouselContent>
              <div className="flex justify-center gap-2 mt-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRequest;
