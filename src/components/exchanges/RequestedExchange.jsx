import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { declineBookExchange } from "@/services/userExchangeService";
import { Book } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const RequestedExchange = ({ requests, onExchangeUpdate }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const declineExchange = useMutation({
    mutationFn: declineBookExchange,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `${data.message || "Exchange declined successfully"}`,
        className: "bg-green-300 text-black",
      });
      queryClient.invalidateQueries("exchanges");
      onExchangeUpdate();
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: "Error while declining exchange",
        className: "bg-red-300 text-black",
      });
    },
  });

  const handleRequestCancel = (book1, book2) => {
    declineExchange.mutate({ book1, book2 });
  };

  if (requests.my_requests.length === 0) {
   return (
    <Card className="w-full p-6 bg-slate-50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-black font-josephine">
            No Requests made
          </CardTitle>
          <CardDescription className="text-gray-600 font-kreon text-base">
            You don't have any pending requests
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="flex items-center gap-2">
            <Book className="w-6 h-6 text-gray-400" />
            <p className="font-kreon text-gray-600">
              Check back later for exchange requests
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl sm:text-3xl font-josephine font-bold">
        My Requests
      </h2>
      <div className="grid gap-6">
        {requests.my_requests.map((request) => (
          <Card key={request.id} className="mb-4 p-4">
            <CardHeader>
              <p className="text-base font-kreon font-medium text-black">
                To: {request.book2.owner.email}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between pb-4">
                <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 md:items-center">
                  <h4 className="text-lg font-kreon font-medium text-black">
                    You want:
                  </h4>
                  <p className="font-kreon text-base font-medium text-gray-800">
                    Book ID: {request.book2.id}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-kreon font-medium text-black">
                    You offer:
                  </h4>
                  <p className="font-kreon text-base font-medium text-gray-800">
                    Your Book ID: {request.book1.id}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span
                className={`badge rounded-full py-1 px-2 font-kreon text-black text-sm ${
                  request.status === "pending"
                    ? "border border-yellow-500 text-gray-900"
                    : request.status === "approved"
                    ? "border-green-500 text-grey-900"
                    : "border-red-500 text-grey-900"
                }`}
              >
                {request.status}
              </span>

              {request.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-500 hover:bg-red-50 font-kreon text-lg font-medium"
                  onClick={() =>
                    handleRequestCancel(request.book1.id, request.book2.id)
                  }
                >
                  {declineExchange.isLoading ? "Declining..." : "Decline"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RequestedExchange;
