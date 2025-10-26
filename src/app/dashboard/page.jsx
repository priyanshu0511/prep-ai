import { checkUser } from "@/lib/checkUser";
import Link from "next/link";
import {
  FileText,
  Brain,
  Code,
  FileSearch,
  PenTool,
  BarChart3,
} from "lucide-react";

const dashboardItems = [
  {
    title: "Interview Preparation",
    desc: "AI-driven mock interviews and personalized feedback.",
    icon: Brain,
    href: "/dashboard/interview",
  },
  {
    title: "Resume Builder",
    desc: "Craft professional resumes with AI suggestions.",
    icon: FileText,
    href: "/dashboard/resume-builder",
  },
  {
    title: "Resume Analyzer",
    desc: "Optimize your resume using recruiter-style analysis.",
    icon: FileSearch,
    href: "/dashboard/resume-analyzer",
  },
  {
    title: "Technical Practice",
    desc: "Practice coding and DSA questions with AI feedback.",
    icon: Code,
    href: "/dashboard/questions",
  },
  {
    title: "Cover Letter Generator",
    desc: "Generate tailored cover letters for your job role.",
    icon: PenTool,
    href: "/dashboard/cover-letter",
  },
  {
    title: "Performance Insights",
    desc: "Track your growth with data-driven AI insights.",
    icon: BarChart3,
    href: "/dashboard/insights",
  },
];

export default async function DashboardPage() {
  const user = await checkUser();
  // console.log(user);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Welcome Section */}
      <section className="px-8 py-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome {user?.found && "back"},{" "}
          {user.loggedInUser?.[0]?.name?.split(" ")[0] ||
            user.newUser?.[0]?.name?.split(" ")[0] ||
            "there"}
          👋
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ready to level up your job preparation? Choose a tool below to get
          started.
        </p>
      </section>

      {/* Dashboard Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 pb-16 max-w-6xl mx-auto w-full">
        {dashboardItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="p-6 bg-card rounded-2xl shadow-md border border-border hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
