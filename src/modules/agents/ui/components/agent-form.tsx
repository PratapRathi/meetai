import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GeneratedAvatar from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { agentsInsertSchema } from "@/modules/agents/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgentGetOne } from "@/modules/agents/types";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useTRPC } from "@/trpc/client";
import { z } from "zod";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onError?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

const AgentForm = ({ initialValues, onCancel, onSuccess }: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
            trpc.agents.getMany.queryOptions({})
        );
        if(initialValues?.id) {
            await queryClient.invalidateQueries(
                trpc.agents.getOne.queryOptions({id: initialValues.id})
            )
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      console.log("TODO: updateAgent");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. English Tutor" />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="You are a helpful English assistent that can help me in practicing english"
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button variant="ghost" disabled={isPending} type="button" onClick={() => onCancel()}>
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AgentForm;
