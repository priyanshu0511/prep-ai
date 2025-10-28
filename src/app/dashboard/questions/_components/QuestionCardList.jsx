import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const QuestionCardList = ({ questionItem }) => {
  const router = useRouter();

  // Parse the question JSON safely
  let someQuestion = {};
  try {
    someQuestion =
      typeof questionItem.question === "string"
        ? JSON.parse(questionItem.question)
        : questionItem.question;
  } catch {
    someQuestion = { question: questionItem.question, answer: "" };
  }

  // Determine title to display
  const displayTitle =
    someQuestion.questionTitle ||
    (someQuestion.question.length > 25
      ? someQuestion.question.substring(0, 25) + "..."
      : someQuestion.question);

  return (
    <div className="border border-border rounded-xl p-4 shadow-md bg-card text-card-foreground">
      <h2 className="font-bold text-primary text-lg">{displayTitle}</h2>
      <h2 className="text-sm text-muted-foreground">
        Topic: {questionItem.topic}
      </h2>
      <h2 className="text-sm text-muted-foreground">
        Difficulty: {questionItem.difficulty}
      </h2>
      <h2 className="text-sm text-muted-foreground mt-1">
        Created At: {questionItem.createdAt?.slice(0, 10)}
      </h2>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">

        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all"
          onClick={() =>
            router.push(`/dashboard/questions/${questionItem.questionId}`)
          }
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default QuestionCardList;
