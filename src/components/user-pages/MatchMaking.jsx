import React, { useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import LoadingOverlay from "../layout/LoadingOverlay";
import { ScrollArea } from "../ui/scroll-area";
import SelectBookExchange from "../modals/exchange-modal/SelectBookExchange";
import useMatchMakingStore from "@/store/MatchMakingStore";
import { useExchangeStore } from "@/store/InitiateExchangeStore";
import shallow from "zustand/shallow";

const MatchMaking = () => {
  const navigate = useNavigate();

  // Use a selector to subscribe only to the needed parts of the match making store.
  const { matchedBooks, setMatchedBooks, setError, fetchMatchMaking } =
    useMatchMakingStore(
      (state) => ({
        matchedBooks: state.matchedBooks,
        setMatchedBooks: state.setMatchedBooks,
        setError: state.setError,
        fetchMatchMaking: state.fetchMatchMaking,
      }),
      shallow
    );

  // Optionally, subscribe to the exchange store if needed.
  const { setExchangeModal } = useExchangeStore(
    (state) => ({ setExchangeModal: state.setExchangeModal }),
    shallow
  );

  // React Query to fetch matchmaking data.
  const { error, isLoading } = useQuery({
    queryKey: ["matchmaking"],
    queryFn: fetchMatchMaking,
    onSuccess: (data) => {
      console.log("Query success:", data);
      setMatchedBooks(data);
    },
    onError: (err) => {
      console.error("Query error:", err);
      setError(err.message);
    },
    refetchOnWindowFocus: true,
  });

  // Memoize the exchange request handler so its reference doesn't change on every render.
  const handleExchangeRequest = useCallback(
    (book) => {
      navigate(`/exchange-request/${book.id}`, { state: { book } });
    },
    [navigate]
  );

  // Memoize the rendered list of matched books.
  const renderedMatchedBooks = useMemo(() => {
    return matchedBooks.map((book) => (
      <Card key={book.id} className="w-full mb-4 p-4">
        <CardHeader>
          <CardTitle className="font-bold truncate font-josephine text-2xl text-black">
            {book.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-800 font-kreon text-base pb-1">
            by {book.author}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary" className="mb-2 font-kreon text-sm">
            {book.genre}
          </Badge>
          <p className="text-sm text-gray-800 truncate font-kreon">
            {book.email}
          </p>
          <Button
            variant="outline"
            onClick={() => handleExchangeRequest(book)}
            className="font-kreon font-medium border-black hover:bg-gray-100 mt-2"
          >
            Initiate exchange
          </Button>
        </CardContent>
      </Card>
    ));
  }, [matchedBooks, handleExchangeRequest]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <Card className="w-auto bg-slate-50">
        <CardHeader>
          <CardTitle>Your Personal Matchmaking</CardTitle>
          <CardDescription className="text-red-500">
            There was an error fetching the matchmaking books.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="max-w-[1540px] mx-auto">
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="font-2xl font-semibold text-black font-josephine p-6">
            The best matches for you!!
          </CardTitle>
        </CardHeader>
      </Card>

      <ScrollArea className="h-screen w-auto rounded-md border overflow-y-auto">
        <div className="flex flex-col w-full items-center justify-center p-6">
          {renderedMatchedBooks}
        </div>
      </ScrollArea>

      {/* Uncomment if needed */}
      {/* <SelectBookExchange /> */}
    </div>
  );
};

export default MatchMaking;
