import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const IncomingExchanges = ({ requests }) => {
  if (requests.length === 0) {
    return <h1 className="align-middle">No data</h1>;
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold">Incoming Requests</h2>
      <div className="grid gap-6">
        {requests.incoming.map((request) => (
          <Card key={request.id} className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Incoming Request</h3>
              <p className="text-muted-foreground">
                From: {request.book1.owner.email}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">They want:</h4>
                  <p className="text-muted-foreground">
                    Your Book ID: {request.book2.id}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">They offer:</h4>
                  <p className="text-muted-foreground">
                    Book ID: {request.book1.id}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Badge
                variant={
                  request.status === "pending"
                    ? "outline"
                    : request.status === "accepted"
                    ? "success"
                    : "destructive"
                }
                className={
                  request.status === "pending"
                    ? "text-yellow-500 border-yellow-500"
                    : request.status === "accepted"
                    ? "text-green-500 border-green-500"
                    : "text-red-500 border-red-500"
                }
              >
                {request.status}
              </Badge>

              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500 border-green-500"
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500"
                  >
                    Decline
                  </Button>
                </div>
              )}

              {request.status === "accepted" && (
                <div className="text-green-500">Request Accepted</div>
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
