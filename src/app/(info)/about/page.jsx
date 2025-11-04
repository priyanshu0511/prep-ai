import { BackLink } from "@/components/BackLink";

export default function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-background text-foreground">
      <div className="max-w-3xl mx-auto">
        <BackLink href="/" className="mb-6 inline-block">
          Back to Home
        </BackLink>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">About Prep AI</h1>
        <p className="text-muted-foreground mb-6">
          Prep AI helps you practice technical interviews, improve resumes, and
          track progress using AI-assisted feedback. Designed for speed and
          privacy — your answers and resumes are processed server-side.
        </p>

        <section className="grid gap-4">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-3">Key Features</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1.5">
              <li>
                <span className="font-medium text-foreground">
                  AI-powered mock interviews
                </span>{" "}
                that simulate real-world scenarios across multiple domains.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Adaptive technical question practice
                </span>{" "}
                with personalized difficulty and instant feedback.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Automated resume analysis
                </span>{" "}
                to evaluate structure, keywords, and overall presentation.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Interactive resume builder
                </span>{" "}
                with AI suggestions to refine content and formatting.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Voice interaction support
                </span>{" "}
                for recording, transcribing, and analyzing spoken responses.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Centralized performance dashboard
                </span>{" "}
                to track interview progress, feedback, and improvement over
                time.
              </li>
            </ul>
          </div>

          <div className="bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-2">Technology</h2>
            <p className="text-muted-foreground mb-2">
              Built with Next.js (app router), Clerk for auth, Drizzle ORM for
              database access, and an AI backend for evaluation and suggestions.
            </p>
            <p className="text-sm text-muted-foreground">
              Code, issues or contributions:{" "}
              <a
                href="https://github.com/priyanshu0511/prep-ai"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>

          <div className="bg-card border border-border p-6">
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="text-muted-foreground">
              Feedback or questions? Email{" "}
              <a
                href="mailto:priyanshusingh05112@gmail.com"
                className="text-primary hover:underline"
              >
                priyanshusingh05112@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
