import { BackLink } from "@/components/BackLink";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import ResumePageClient from "./_components/ResumePageClient";


export default async function ResumeAnalyzerPage() {

  return (
    <div className="container py-4 space-y-4 h-screen-header flex flex-col items-start">
      <div className="flex justify-center items-center text-muted-foreground">
      <BackLink href={"/dashboard"} /> {" "}Dashboard
      </div>
      <Suspense fallback={<Loader2Icon className="animate-spin size-24 m-auto" />}>
        <SuspendedComponent />
      </Suspense>
    </div>
  );
}

async function SuspendedComponent() {

  return <ResumePageClient />;
}
