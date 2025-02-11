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
import { Book } from "lucide-react";
import { approveBookExchange } from "@/services/userExchangeService";
import { declineBookExchange } from "@/services/userExchangeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const IncomingExchanges = ({ requests, onExchangeUpdate }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const approveExchange = useMutation({
    mutationFn: approveBookExchange,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `${data}`,
      });
      queryClient.invalidateQueries("exchanges");
      onExchangeUpdate();
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: "Error while approving exchange",
      });
    },
  });

  const declineExchange = useMutation({
    mutationFn: declineBookExchange,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `${data}`,
        className: "bg-green-300 text-black",
      });
      queryClient.invalidateQueries("exchanges");
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: "Error while declining exchange",
        className: "bg-red-300 text-black",
      });
    },
  });

  const handleIncomingRequestApprove = (book1, book2) => {
    approveExchange.mutate({ book1, book2 });
  };

  const handleIncomingRequestCancel = (book1, book2) => {
    declineExchange.mutate({ book1, book2 });
  };

  if (requests.incoming.length === 0) {
    return (
      <Card className="w-full p-6 bg-slate-50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-black font-josephine">
            No Incoming Requests
          </CardTitle>
          <CardDescription className="text-gray-600 font-kreon text-base">
            You don't have any incoming exchange requests yet
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
        Incoming Requests
      </h2>
      <div className="grid gap-6">
        {requests.incoming.map((request) => (
          <Card key={request.id} className="mb-4 p-4">
            <CardHeader>
              {/* <h3 className="text-lg font-semibold">Incoming Request</h3> */}
              <p className="text-base font-kreon font-medium text-black">
                From: {request.book1.owner.email}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between pb-4">
                <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 md:items-center">
                  <h4 className="text-lg font-kreon font-medium text-black">
                    Request for:
                  </h4>
                  <p className="font-kreon text-base font-medium text-gray-800">
                    Book ID-{request.book2.id}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row gap-0.5 md:gap-2 md:items-center">
                  <h4 className="text-lg font-kreon font-medium text-black">
                    In Exchange:
                  </h4>
                  <p className="font-kreon text-base font-medium text-gray-800">
                    Book ID-{request.book1.id}
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500 border-green-500 hover:bg-green-50 font-kreon text-lg font-medium"
                    onClick={() =>
                      handleIncomingRequestApprove(
                        request.book1.id,
                        request.book2.id
                      )
                    }
                    disabled={approveExchange.isLoading}
                  >
                    {approveExchange.isLoading ? "Approving..." : "Approve"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500 hover:bg-red-50 font-kreon text-lg font-medium"
                    onClick={() =>
                      handleIncomingRequestCancel(
                        request.book1.id,
                        request.book2.id
                      )
                    }
                  >
                    {declineExchange.isLoading ? "Declining..." : "Decline"}
                  </Button>
                </div>
              )}

              {request.status === "approved" && (
                <div className="text-green-500">Request Approved</div>
              )}

              {request.status === "declined" && (
                <div className="text-red-500">Request Declined</div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default IncomingExchanges;
