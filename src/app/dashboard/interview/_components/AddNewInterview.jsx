"use client";
import React from "react";
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
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [Jobpost, setJobpost] = React.useState("");
  const [JobDescription, setJobDescription] = React.useState("");
  const [Experience, setExperience] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();
  const Router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const Inputprompt = `Job position: ${Jobpost}, Job Description: ${JobDescription}, Experience: ${Experience}. Based on the Job position, Job Description, and Experience, give me 5 interview questions along with answers in JSON format. Provide both question and answer fields in the JSON.`;

    try {
      const result = await chatSession.sendMessage(Inputprompt);
      let responseText = await result.response.text();
      responseText = responseText.trim().replace(/```json/g, "").replace(/```/g, "");

      let jsonResponse;
      try {
        jsonResponse = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        alert("Error parsing AI response. Please try again.");
        setLoading(false);
        return;
      }

      const output = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: responseText,
        jobPosition: Jobpost,
        jobDesc: JobDescription,
        jobExperience: Experience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      }).returning({ mockId: MockInterview.mockId });

      if (output) {
        setOpenDialog(false);
        Router.push(`/dashboard/interview/${output[0].mockId}`);
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      alert("There was an error fetching interview questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans">
      {/* Add New Card */}
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
              Tell us more about your Job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} className="space-y-5 mt-5">
                <div>
                  <label className="block mb-1 font-semibold text-foreground">
                    Job Title
                  </label>
                  <Input
                    placeholder="Ex. Full stack developer"
                    required
                    className="border border-border focus:ring-2 focus:ring-primary/50"
                    onChange={(e) => setJobpost(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-foreground">
                    Job Description / Tech Stack
                  </label>
                  <Textarea
                    placeholder="Ex. React, Node.js, etc."
                    required
                    className="border border-border focus:ring-2 focus:ring-primary/50"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-foreground">
                    Experience (years)
                  </label>
                  <Input
                    placeholder="5"
                    max="50"
                    type="number"
                    required
                    className="border border-border focus:ring-2 focus:ring-primary/50"
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>
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
                    {loading ? <LoaderCircle className="animate-spin" /> : "Start Interview"}
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
