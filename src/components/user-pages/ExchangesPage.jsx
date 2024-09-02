import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useExchange } from "../../store/ExhangeStore";
import { useQuery } from "@tanstack/react-query";
import RequestedExchange from "../exchanges/RequestedExchange";
import IncomingExchanges from "../exchanges/IncomingExchanges";
import { fetchExchangeDetails } from "../../services/userExchangeService";

const ExchangesPage = () => {
  const { currentRadioState, setCurrentRadioState } = useExchange();

  const { data: exchangeData, isLoading, error } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchangeDetails,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-8 flex justify-between flex-wrap">
        <h1 className="text-3xl font-bold">Book Exchange Requests</h1>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-4 text-sm font-medium">
            <span className="text-yellow-500">Pending</span>
            <span className="text-green-500">Accepted</span>
            <span className="text-red-500">Declined</span>
          </div>
        </div>
        <div className="flex gap-2">
          <RadioGroup
            value={currentRadioState}
            onValueChange={(value) => setCurrentRadioState(value)}
            className="flex items-center gap-2"
          >
            <Label
              htmlFor="incoming"
              className="border cursor-pointer rounded-md px-4 py-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
            >
              <RadioGroupItem id="incoming" value="incoming" />
              Incoming
            </Label>
            <Label
              htmlFor="my-requests"
              className="border cursor-pointer rounded-md px-4 py-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
            >
              <RadioGroupItem id="my-requests" value="my-requests" />
              My Requests
            </Label>
          </RadioGroup>
        </div>
      </header>

      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          currentRadioState === "incoming" ? (
            <IncomingExchanges requests={exchangeData} />
          ) : (
            <RequestedExchange requests={exchangeData} />
          )
        )}
      </section>
    </div>
  );
};

export default ExchangesPage;