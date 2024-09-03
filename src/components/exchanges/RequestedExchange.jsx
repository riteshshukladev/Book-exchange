import React,{useState} from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { declineBookExchange } from "@/services/userExchangeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";


const RequestedExchange = ({ requests,onExchangeUpdate }) => {

  const toast = useToast();
  const queryClient = useQueryClient();



  const declineExchange = useMutation({
    mutationFn: declineBookExchange,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `${data}`,
        className: "bg-green-300 text-black" 
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

  if (requests.length === 0) {
    return <h1 className="align-middle">No data</h1>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 mt-4">My Requests</h2>
      <div className="grid gap-4">
        {requests.my_requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <h3 className="text-lg font-semibold">Requested Exchange</h3>
              <p className="text-muted-foreground">
                To: {request.book2.owner.email}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">You want:</h4>
                  <p className="text-muted-foreground">
                    Book ID: {request.book2.id}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">You offer:</h4>
                  <p className="text-muted-foreground">
                    Your Book ID: {request.book1.id}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Badge
                variant={
                  request.status === "pending"
                    ? "outline"
                    : request.status === "approved"
                    ? "success"
                    : "destructive"
                }
              >
                {request.status}
              </Badge>

              {request.status === "pending" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() =>
                    handleRequestCancel(request.book1.id, request.book2.id)
                  }
                >
                  Cancel Request
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
