"use client";
import MeetingIdViewHeader from "@/modules/meetings/ui/components/meeting-id-view-header";
import UpdateMeetingDialog from "@/modules/meetings/ui/components/update-meeting-dialog";
import UpcomingState from "@/modules/meetings/ui/components/upcoming-state";
import ActiveState from "@/modules/meetings/ui/components/active-state";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import ProcessingState from "@/modules/meetings/ui/components/processing-state";
import CancelledState from "@/modules/meetings/ui/components/cancelled-state";

interface Props {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: Props) => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(trpc.meetings.getOne.queryOptions({ id: meetingId }));

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting"
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && <UpcomingState meetingId={meetingId} onCancelMeeting={() => {}} isCancelling={false} />}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return <LoadingState title="Loading Meeting" description="This may take a few seconds" />;
};

export const MeetingIdViewError = () => {
  return <ErrorState title="Error loading Meeting" description="Something went wrong!" />;
};

export default MeetingIdView;
