"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { db } from "@/utils/db";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";
import { chatSession } from "@/utils/GeminiAIModal";

// Dynamically import Webcam so it doesn't load on the server
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [webcamError, setWebcamError] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    interimResults: true,
  });

  // Append speech-to-text results to userAnswer
  useEffect(() => {
    if (results && results.length > 0) {
      results.forEach((result) => {
        if (result?.transcript) {
          setUserAnswer((prev) => prev + " " + result.transcript);
        }
      });
    }
  }, [results]);

  // Save answer automatically after recording ends if length > 10
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      saveUserAnswerToDb();
    }
  }, [userAnswer, isRecording]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      toast("Recording stopped");
    } else {
      startSpeechToText();
      toast("Recording started");
    }
  };

  const saveUserAnswerToDb = async () => {
    if (!interviewData || !interviewData.mockId) {
      toast.error("Interview data is not available.");
      return;
    }

    setLoading(true);

    const questionText =
      mockInterviewQuestions[activeQuestionIndex]?.question || "";
    const correctAnswer =
      mockInterviewQuestions[activeQuestionIndex]?.answer || "";

    // ✅ Fixed variable names in feedbackPrompt
    const feedbackPrompt = `Question:${mockInterviewQuestions[activeQuestionIndex]?.question} Answer:${userAnswer}, Depends on question and user answer for given interview question please give us rating for answer and feedback in JSON format with rating and feedback fields.Make sure that answer is in JSON format only. And also rating should be a number between 1 and 10`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      let responseText = await result.response.text();

      responseText = responseText
        .trim()
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/[\u0000-\u001F]+/g, "");

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        toast.error("Failed to parse feedback. Try again.");
        setLoading(false);
        return;
      }

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: questionText,
        correctAns: correctAnswer,
        userAns: userAnswer,
        feedback: jsonResponse?.feedback || "",
        rating: jsonResponse?.rating || "",
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      });
      console.log(userAnswer);
      toast.success("Answer recorded successfully!");
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error saving answer:", error);
      toast.error("Error saving answer. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleWebcamError = (error) => {
    console.error("Webcam error:", error);
    setWebcamError("Could not access webcam. Please check permissions.");
    toast.error("Could not access webcam. Please check permissions.");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-card relative border border-border shadow-md">
        {webcamError ? (
          <p className="text-destructive">{webcamError}</p>
        ) : (
          <>
            <Image
              src="/webcam.png"
              width={200}
              height={200}
              className="absolute opacity-30"
              alt="Webcam Placeholder"
            />
            <Webcam
              mirrored={true}
              onUserMediaError={handleWebcamError}
              style={{
                width: "100%",
                height: 300,
                zIndex: 10,
                borderRadius: "var(--radius)",
              }}
            />
          </>
        )}
      </div>

      <Button
        variant="outline"
        className="my-10 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        disabled={loading}
        onClick={saveUserAnswer}
      >
        {isRecording ? (
          <h2 className="text-destructive flex gap-2 items-center">
            <Mic /> Recording...
          </h2>
        ) : (
          <h2 className="text-primary-foreground flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
