import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/ResumeBuilder";

export default async function ResumePage() {
  const resume = await getResume();
  return <ResumeBuilder initialContent={resume?.[0]?.content} />;
}