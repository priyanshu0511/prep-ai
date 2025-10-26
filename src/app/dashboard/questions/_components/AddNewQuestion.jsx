"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { Question } from "@/utils/schema";
import moment from "moment";
import { fetchAIResponse } from "@/utils/GeminiAIModal";
import { useUser } from "@clerk/clerk-react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function AddNewQuestion() {
  const [openDialog, setOpenDialog] = useState(false);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return alert("Please enter a topic or technology.");

    setLoading(true);
    try {
      // AI prompt to generate question + answer in JSON format
      const prompt = `Generate one ${difficulty.toLowerCase()} interview coding or machine round question about "${topic}" and provide the answer. The question should not be that easy that even a beginner is able to do it. Respond in JSON format like: {"question": "...","questionTitle":"...", "answer": "..."}. questionTitle should be a short title for the question.`;
      const responseText = await fetchAIResponse(prompt);

      const cleanResponse = responseText
        .trim()
        .replace(/```json/g, "")
        .replace(/```/g, "");

      const output=await db.insert(Question).values({
        question: cleanResponse,
        difficulty,
        createdBy: user?.primaryEmailAddress?.emailAddress || "AI",
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        topic,
        questionId: uuidv4()
      }).returning({ questionId: Question.questionId });

      if (output) {
        setOpenDialog(false);
        router.push(`/dashboard/questions/${output[0].questionId}`);
      }
      setTopic("");
      setDifficulty("Easy");
    } catch (error) {
      console.error("Error generating question:", error);
      alert("Failed to generate question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Add New Button */}
      <div
        className="p-10 border border-border dark:border-gray-600 rounded-[var(--radius)]
                   bg-card dark:bg-gray-800 text-card-foreground hover:scale-105 hover:shadow-lg 
                   cursor-pointer transition-transform duration-200 flex items-center justify-center"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg font-semibold">+ Generate AI Question</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-card dark:bg-gray-800 max-w-2xl rounded-[var(--radius)] shadow-xl border border-border dark:border-gray-600 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground">
              Generate a New Question
            </DialogTitle>

            <DialogDescription asChild>
              <div className="mt-5">
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* Topic Input */}
                  <Input
                    placeholder="Enter topic or technology (e.g., ReactJS, SQL)"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border border-border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-card-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                  />

                  {/* Difficulty Selection */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">
                      Difficulty Level
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full border border-border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-card-foreground px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 mt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                    >
                      {loading ? (
                        <LoaderCircle className="animate-spin" />
                      ) : (
                        "Generate Question"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewQuestion;
