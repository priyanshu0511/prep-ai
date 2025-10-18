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
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { fetchAIResponse } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import pdfToText from "react-pdftotext";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState("job"); // "job" or "resume"
  const [Jobpost, setJobpost] = useState("");
  const [JobDescription, setJobDescription] = useState("");
  const [Experience, setExperience] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedResume, setParsedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const extractText = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLoading(true);
    pdfToText(file)
      .then((text) => {
        setParsedResume(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to extract text from pdf", error);
        setLoading(false);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let Inputprompt = "";

    if (mode === "job") {
      Inputprompt = `Job position: ${Jobpost}, Job Description: ${JobDescription}, Experience: ${Experience}. Based on the Job position, Job Description, and Experience, give me 5 interview questions along with answers in JSON format. Provide both question and answer fields in the JSON.`;
    } else if (mode === "resume") {
      if (!parsedResume) {
        alert("Please upload and parse your resume first.");
        setLoading(false);
        return;
      }
      Inputprompt = `Resume content: ${parsedResume}. Based on this resume, generate 5 interview questions along with answers in JSON format tailored to the candidate's skills. Provide both question and answer fields in the JSON.`;
    }

    try {
      const responseText = await fetchAIResponse(Inputprompt);

      const cleanResponse = responseText
        .trim()
        .replace(/```json/g, "")
        .replace(/```/g, "");

      const output = await db
        .insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: cleanResponse,
          jobPosition: Jobpost || "Resume-based Interview",
          jobDesc: JobDescription || "N/A",
          jobExperience: Experience || "N/A",
          parsedResume: parsedResume || null,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .returning({ mockId: MockInterview.mockId });

      if (output) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${output[0].mockId}`);
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      alert(
        "There was an error fetching interview questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      <div
        className="p-10 border border-border rounded-[var(--radius)] 
                   bg-card text-card-foreground hover:scale-105 hover:shadow-lg 
                   cursor-pointer transition-transform duration-200 flex items-center justify-center"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg font-semibold">+ Add new</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-card max-w-2xl rounded-[var(--radius)] shadow-xl border border-border p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-card-foreground">
              Create a new Mock Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-5 mt-5">
                {/* Mode selection */}
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="job"
                      checked={mode === "job"}
                      onChange={() => setMode("job")}
                    />
                    Job-based
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="resume"
                      checked={mode === "resume"}
                      onChange={() => setMode("resume")}
                    />
                    Resume-based
                  </label>
                </div>

                {mode === "job" && (
                  <>
                    <Input
                      placeholder="Job Title"
                      required
                      onChange={(e) => setJobpost(e.target.value)}
                    />
                    <Textarea
                      placeholder="Job Description / Tech Stack"
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <Input
                      placeholder="Experience (years)"
                      type="number"
                      max="50"
                      required
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </>
                )}

                {mode === "resume" && (
                  <div className="space-y-3">
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={extractText}
                    />
                    {loading && (
                      <p className="text-muted-foreground animate-pulse">
                        Parsing resume...
                      </p>
                    )}
                    {parsedResume && (
                      <div className="p-3 border border-border bg-muted/20 rounded text-sm max-h-40 overflow-auto">
                        <strong>Parsed Resume Preview:</strong>
                        <p>
                          {parsedResume.substring(0, 500)}
                          {parsedResume.length > 500 ? "..." : ""}
                        </p>
                      </div>
                    )}
                  </div>
                )}

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
                    disabled={loading || (mode === "resume" && !parsedResume)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                  >
                    {loading ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
