import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Extract response and request types from the login endpoint
type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"].$delete({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted successfully");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });
  return mutation;
};
