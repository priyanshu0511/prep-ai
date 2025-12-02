import { BackLink } from "@/components/BackLink";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";
import AddNewCoverLetter from "./_components/AddNewCoverLetter";
import CoverLetterList from "./_components/CoverLetterList";

export default async function CoverLetterPage() {
  return (
    <div className="container py-4 space-y-4 h-screen-header flex flex-col items-start">
      <Suspense
        fallback={<Loader2Icon className="animate-spin size-24 m-auto" />}
      >
        <SuspendedComponent />
      </Suspense>
    </div>
  );
}

const SuspendedComponent = () => {
  return (
    <div className="p-10 -mt-6">
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">
        Start creating polished, job-ready cover letters right now!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewCoverLetter />
      </div>

      <CoverLetterList />
    </div>
  );
};
