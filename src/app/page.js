"use client";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { BrainIcon, Quote } from "lucide-react";

const links = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];


export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">

      <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 px-8 md:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your <span className="text-primary">AI-powered</span> job
            preparation partner.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Master interviews, craft perfect resumes, analyze your performance,
            and practice technical questions — all in one intelligent platform.
          </p>

          <motion.div
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-xl shadow-md hover:bg-primary/90 transition-all"
            >
              Get Started →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 1, y: 0 }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="flex-1 flex justify-center"
        >
          <Image
            src="/LandingPageBot.png"
            alt="Hero Image"
            width={400}
            height={400}
          />
        </motion.div>
      </section>

      <section className="py-24 bg-card text-card-foreground">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Everything You Need To Land Your Dream Job
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 px-10 max-w-6xl mx-auto">
          {[
            {
              title: "Interview Preparation",
              desc: "AI-driven mock interviews, personalized feedback, and real-world questions.",
            },
            {
              title: "Resume Builder",
              desc: "Generate professional resumes instantly with AI suggestions for improvement.",
            },
            {
              title: "Resume Analyzer",
              desc: "Optimize your resume with keyword matching and recruiter-style analysis.",
            },
            {
              title: "Technical Questions Practice",
              desc: "Practice coding, data structures, and algorithms — guided by AI feedback.",
            },
            {
              title: "Cover Letter Generator",
              desc: "Create tailored cover letters that fit your job description perfectly.",
            },
            {
              title: "And More...",
              desc: "We’re constantly adding new tools to supercharge your job prep journey.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-popover text-popover-foreground shadow-lg hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 bg-primary/20 text-primary flex items-center justify-center rounded-xl mb-4 font-bold text-xl">
                {i + 1}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-10 flex flex-col md:flex-row items-center justify-between gap-16 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl font-bold mb-4">
            Smarter Prep. Faster Results.
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Let AI do the heavy lifting — analyze your performance, recommend
            improvements, and track your readiness for interviews.
          </p>
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-lg font-semibold shadow-md"
          >
            <Link href="/dashboard">Try it Now</Link>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 bg-muted rounded-xl h-72 flex items-center justify-center text-muted-foreground text-lg"
        >
          <Image src="/LandingPageMockInterviewImage.png" alt="Showcase Image" width={550} height={450} />
        </motion.div>
      </section>
      <section className="py-24 bg-muted/40">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          What Our Users Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 px-10 max-w-6xl mx-auto">
          {[
            {
              name: "Aarav Mehta",
              feedback:
                "Prep.ai made interview practice feel natural. The AI feedback helped me refine my answers and gain confidence before the big day.",
            },
            {
              name: "Priya Sharma",
              feedback:
                "The resume analyzer was a game-changer. I landed more interviews after optimizing my resume based on its suggestions!",
            },
            {
              name: "Rohan Gupta",
              feedback:
                "I loved how everything from mock interviews to technical prep was in one place. It's like having a personal mentor guiding you.",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-card text-card-foreground rounded-2xl shadow-lg hover:scale-105 transition-transform flex flex-col gap-4"
            >
              <Quote className="text-primary w-8 h-8" />
              <p className="text-muted-foreground italic">“{t.feedback}”</p>
              <div className="flex flex-col mt-4">
                <h4 className="font-semibold text-lg">{t.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-primary text-primary-foreground text-center"
      >
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Career?
        </h2>
        <p className="text-lg mb-8">
          Join thousands of learners using Prep.ai to prepare smarter and get
          hired faster.
        </p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white text-primary font-semibold px-10 py-3 rounded-full shadow-lg"
        >
          <Link href="/dashboard">Get Started for Free</Link>
        </motion.button>
      </motion.section>

      <footer className="py-10 text-center text-muted-foreground text-sm border-t border-border">
        <p>© {new Date().getFullYear()} Prep.ai — All rights reserved.</p>
      </footer>
    </div>
  );
}
