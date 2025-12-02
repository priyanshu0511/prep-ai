import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const CoverLetterCard = ({ letterItem }) => {
  const router = useRouter();

  return (
    <div className="border border-border rounded-xl p-4 shadow-md bg-card text-card-foreground">
      {/* Title */}
      <h2 className="font-bold text-primary text-lg">
        {letterItem.jobPosition} @ {letterItem.companyName}
      </h2>

      {/* Experience */}
      <h2 className="text-sm text-muted-foreground">
        Experience: {letterItem.experience}
      </h2>

      {/* Skills */}
      <h2 className="text-sm text-muted-foreground">
        Skills: {letterItem.skills}
      </h2>

      {/* Created At */}
      <h2 className="text-sm text-muted-foreground mt-1">
        Created At: {letterItem.createdAt?.slice(0, 10)}
      </h2>

      {/* Button */}
      <div className="mt-4 flex flex-col gap-2">
        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all"
          onClick={() =>
            router.push(`/dashboard/cover-letter/${letterItem.coverLetterId}`)
          }
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default CoverLetterCard;
