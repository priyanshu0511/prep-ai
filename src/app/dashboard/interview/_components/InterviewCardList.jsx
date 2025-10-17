import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const InterviewCardList = ({ interview }) => {
  const router = useRouter();

  return (
    <div className="border border-border rounded-xl p-4 shadow-md bg-card text-card-foreground">
      <h2 className="font-bold text-primary text-lg">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-muted-foreground">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-sm text-muted-foreground mt-1">
        Created At: {interview?.createdAt?.slice(0, 10)}
      </h2>

      {/* Buttons inside a container */}
      <div className="mt-4 flex flex-col gap-2">
        <Button
          size="sm"
          variant="outline"
          className="w-full border-border text-foreground hover:bg-muted transition-all rounded-lg"
          onClick={() =>
            router.push(`/dashboard/interview/${interview?.mockId}/feedback`)
          }
        >
          Feedback
        </Button>

        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all"
          onClick={() =>
            router.push(`/dashboard/interview/${interview?.mockId}/start`)
          }
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewCardList;
