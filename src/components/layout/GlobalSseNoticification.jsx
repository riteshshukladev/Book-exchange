// GlobalSseNotifications.jsx
import React, { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useExchange } from "@/store/ExhangeStore";

const GlobalSseNotifications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setPendingCount } = useExchange();

  // Refs to hold the current EventSource and the reconnect timeout.
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const initializeEventSource = () => {
    console.log("Initializing SSE connection...");
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/api/exchange/notifications`,
      { withCredentials: true }
    );

    eventSource.onopen = () => {
      console.log("SSE connection opened.");
    };

    eventSource.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        console.log("Global SSE event received:", eventData);

        // Example: if the event is for updated counts, update the global store.
        if (eventData.event === "exchange-counts") {
          setPendingCount(eventData.data.total);
        }

        // Optionally handle other event types and display toasts.
        let message = "";
        switch (eventData.event) {
          case "new-exchange":
            message = "You have received a new exchange request.";
            break;
          case "exchange-approved":
            message = "An exchange has been approved.";
            break;
          case "exchange-declined":
            message = "An exchange has been declined.";
            break;
          default:
            break;
        }
        if (message) {
          toast({
            title: "Exchange Notification",
            description: message,
            duration: 5000,
          });
        }

        // Optionally, invalidate queries to refresh data.
        queryClient.invalidateQueries(["exchanges"]);
      } catch (err) {
        console.error("Error processing SSE event:", err);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);

      // Close the current connection if it's not already closed.
      if (eventSource.readyState !== EventSource.CLOSED) {
        eventSource.close();
      }

      // Clear any existing reconnect timeout.
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Attempt to reconnect after a delay (e.g., 5 seconds).
      reconnectTimeoutRef.current = setTimeout(() => {
        initializeEventSource();
      }, 5000);
    };

    // Store the eventSource instance in the ref.
    eventSourceRef.current = eventSource;
  };

  useEffect(() => {
    initializeEventSource();

    // Clean up on component unmount.
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [toast, queryClient, setPendingCount]);

  return null;
};

export default GlobalSseNotifications;
