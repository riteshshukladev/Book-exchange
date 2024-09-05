import React from "react";
import useMatchMakingStore from "@/store/MatchMakingStore";
import { useQuery } from "@tanstack/react-query";
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

import { ScrollArea } from "../ui/scroll-area";
import { useExchangeStore } from "@/store/InitiateExchangeStore";
import SelectBookExchange from "../modals/exchange-modal/SelectBookExchange";

const MatchMaking = () => {
  
  const { matchedBooks, setMatchedBooks, setError, fetchMatchMaking, } =
    useMatchMakingStore();

  const { setExchangeModal } = useExchangeStore();
    
  const { error, isLoading } = useQuery({
    queryKey: ["matchmaking"],
    queryFn: () => fetchMatchMaking(setMatchedBooks),
    
    onError: (err) => {
      setError(err.message);
    },
  });

  if (isLoading) {
    return (
      <Card className="w-auto bg-slate-50">
        <CardHeader>
          <CardTitle className="">Your Personal Matchmaking</CardTitle>
          <CardDescription>Please Wait.....</CardDescription>
        </CardHeader>
      </Card>
    );
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
          <CardTitle className="">Your Personal Matchmaking</CardTitle>
          <CardDescription>
            This algorithm is implemented on the basis of user's listed books
            matching genre books!
          </CardDescription>
        </CardHeader>
      </Card>

      <ScrollArea className="h-screen w-[auto] rounded-md border overflow-y-auto">
        <div className="flex flex-col w-full align-center justify-center p-4">
          {matchedBooks.map((book) => (
            <Card key={book.id} className="w-full mb-4">
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
                  onClick={() => setExchangeModal(book)}
                  className="bg-zinc-900 text-white my-2 w-[300px]"
                >
                  Initiate exchange
                </Button>
              </CardContent>
              <CardFooter className="text-xs text-gray-400">
                ID: {book.id}
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <SelectBookExchange />
    </div>
  );
};

export default MatchMaking;
