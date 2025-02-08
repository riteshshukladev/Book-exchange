import React from "react";
import useMatchMakingStore from "@/store/MatchMakingStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import LoadingOverlay from "../layout/LoadingOverlay";

import { ScrollArea } from "../ui/scroll-area";
import { useExchangeStore } from "@/store/InitiateExchangeStore";
import SelectBookExchange from "../modals/exchange-modal/SelectBookExchange";

const MatchMaking = () => {
  const navigate = useNavigate();

  const {
    matchedBooks,
    setMatchedBooks,
    setError,
    fetchMatchMaking,
    redirectToLogin,
    resetRedirect,
  } = useMatchMakingStore();

  const { setExchangeModal } = useExchangeStore();

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

  const handleExchangeRequest = (book) => {
    navigate(`/exchange-request/${book.id}`, { state: { book } });
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <Card className="w-auto bg-slate-50">
        <CardHeader>
          <CardTitle className="">Your Personal Matchmaking</CardTitle>
          <CardDescription className="text-red-500">
            There was an error fetching the matchmaking books.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div>
      <Card className="w-auto bg-slate-50">
        <CardHeader>
          <CardTitle className="font-2xl font-semibold text-black font-josephine p-6">
            The best matches for you!!
          </CardTitle>
        </CardHeader>
      </Card>

      <ScrollArea className="h-screen w-[auto] rounded-md border overflow-y-auto">
        <div className="flex flex-col w-full align-center justify-center p-6">
          {matchedBooks.map((book) => (
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
                <Badge variant="secondary" className="mb-2 font-kreon text-sm ">
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
              {/* <CardFooter className="text-xs text-gray-400">
                ID: {book.id}
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </ScrollArea>

      <SelectBookExchange />
    </div>
  );
};

export default MatchMaking;
