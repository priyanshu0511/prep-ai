"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQs() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-muted-foreground text-center mb-8">
        Have questions about Prep-AI? Here are some quick answers to help you understand how the platform works.
      </p>

      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Prep-AI?</AccordionTrigger>
          <AccordionContent>
            Prep-AI is an AI-powered interview preparation platform that helps users practice mock interviews,
            solve technical questions, analyze resumes, and build polished resumes — all in one place. It provides
            personalized, real-time feedback to help candidates improve both technical and soft skills.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How are mock interviews conducted?</AccordionTrigger>
          <AccordionContent>
            Users can choose their domain (such as Java, Machine Learning, or Web Development) and experience level.
            Prep-AI then generates relevant questions and simulates an AI-driven mock interview. You can answer 
            through text or voice, and the system analyzes your responses to provide feedback on clarity,
            confidence, and content accuracy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can Prep-AI analyze my resume?</AccordionTrigger>
          <AccordionContent>
            Yes! Prep-AI includes an automated resume analyzer that evaluates your resume structure, keyword
            relevance, and formatting. It also offers AI-generated suggestions to improve your resume for
            applicant tracking systems (ATS) and overall readability.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Is there a resume builder available?</AccordionTrigger>
          <AccordionContent>
            Absolutely. The built-in resume builder allows you to create professional resumes directly within the
            platform. It supports AI enhancements that suggest better phrasing, keyword optimization, and section
            improvements in real time.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>What type of feedback does Prep-AI provide?</AccordionTrigger>
          <AccordionContent>
            Prep-AI gives detailed feedback on both technical and behavioral aspects of your interview performance.
            It analyzes speech clarity, tone, content accuracy, and non-verbal indicators, while also suggesting
            actionable improvements. Your progress can be tracked through a personal performance dashboard.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>Is my data secure?</AccordionTrigger>
          <AccordionContent>
            Yes. Prep-AI prioritizes security and privacy. User authentication is managed via Clerk for robust
            protection, while all data is securely stored using Neon PostgreSQL. Your recordings, resumes, and
            interview data remain confidential and encrypted.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>Who can use Prep-AI?</AccordionTrigger>
          <AccordionContent>
            Prep-AI is designed for students, job seekers, and professionals across different domains who wish to
            enhance their interview preparation. Whether you’re preparing for your first job or a senior-level
            role, the platform adapts to your skill level and goals.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
