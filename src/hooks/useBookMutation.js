import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
const useBookMutation = (mutationFn) => {
    const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess:async (data) => {
      toast({
        title: "Success",
        description: `${data?.message || "success!!"}`,
        className: "bg-green-300 text-black",
      });
      await queryClient.invalidateQueries("books");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error?.message || "failure!!"}`,
        className: "bg-red-300 text-black",
        variant: "destructive",
      });
    },
  });
};

export default useBookMutation;
