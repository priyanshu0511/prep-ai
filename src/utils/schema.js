import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
  parsedResume: varchar("parsedResume"),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const Resume=pgTable("resume",{
  id: serial("id").primaryKey(),
  content: varchar("content").notNull(),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
  updatedAt: varchar("updatedAt"),
})

export const Users=pgTable("users",{
  id: serial("id").primaryKey(),
  clerkUserId: varchar("clerkUserId").notNull().unique(),
  email: varchar("email").notNull(),
  name: varchar("name"),
  createdAt: varchar("createdAt"),
})


