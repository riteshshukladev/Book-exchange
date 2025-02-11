// ExchangePage.jsx
import React, { useEffect } from "react";
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
import { useQueryClient } from "@tanstack/react-query";
import LoadingOverlay from "../layout/LoadingOverlay";

const ExchangesPage = () => {
  const { currentRadioState, setCurrentRadioState } = useExchange();
  const queryClient = useQueryClient();

  // Load initial exchange details using react-query
  const { data: exchangeData, isLoading, error } = useQuery({
    queryKey: ["exchanges"],
    queryFn: fetchExchangeDetails,
  });


  return (
    <div className="max-w-[1540px] mx-auto py-4 sm:py-8 px-4 md:px-6">
      <header className="mb-8 flex flex-col justify-center items-center sm:flex-row sm:justify-between flex-wrap gap-2">
        {/* <h1 className="text-3xl font-bold">Book Exchange Requests</h1> */}
        <div className="mt-4 flex items-center justify-between ">
          <div className="flex gap-4 text-sm font-medium">
            <span className="text-yellow-500 font-kreon text-base font-medium">Pending</span>
            <span className="text-green-500 font-kreon text-base font-medium">Accepted</span>
            <span className="text-red-500 font-kreon text-base font-medium">Declined</span>
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
              className="border cursor-pointer rounded-md px-4 py-2 flex items-center gap-2 [&:has(:checked)]:bg-muted font-kreon text-base font-medium"
            >
              <RadioGroupItem id="incoming" value="incoming" className=""/>
              Incoming
            </Label>
            <Label
              htmlFor="my-requests"
              className="border cursor-pointer rounded-md px-4 py-2 flex items-center gap-2 [&:has(:checked)]:bg-muted font-kreon text-base font-medium"
            >
              <RadioGroupItem id="my-requests" value="my-requests" />
              My Requests
            </Label>
          </RadioGroup>
        </div>
      </header>

      <section>
        {isLoading ? (
          <LoadingOverlay/>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : currentRadioState === "incoming" ? (
          <IncomingExchanges requests={exchangeData} />
        ) : (
          <RequestedExchange requests={exchangeData} />
        )}
      </section>
    </div>
  );
};

export default ExchangesPage;
