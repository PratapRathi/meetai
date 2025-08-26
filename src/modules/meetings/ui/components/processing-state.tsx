import { EmptyState } from "@/components/empty-state";

const ProcessingState = () => {
  return (
    <div
      className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center
      justify-center"
    >
      <EmptyState
        image="/processing.svg"
        title="Processing Summary"
        description="We're generating your meeting summary. It will appear here shortly."
      />
    </div>
  );
};

export default ProcessingState;