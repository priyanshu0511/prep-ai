"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import moment from "moment";

export default function ProfileStatsPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const userEmail = user?.primaryEmailAddress?.emailAddress;

      const interviews = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, userEmail));

      const answers = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.userEmail, userEmail));

      const totalQuestions = answers.length;

      let totalTechnicalScore = 0;
      answers.forEach((ans) => {
        totalTechnicalScore += Number(ans.rating) || 0;
      });

      const avgTechnicalScore =
        totalQuestions > 0
          ? (totalTechnicalScore / totalQuestions).toFixed(2)
          : 0;

      const interviewScoreMap = {};

      answers.forEach((ans) => {
        const mockId = ans.mockIdRef;
        const score = Number(ans.rating) || 0;

        if (!interviewScoreMap[mockId]) {
          interviewScoreMap[mockId] = [];
        }
        interviewScoreMap[mockId].push(score);
      });

      let totalInterviewScore = 0;
      let bestScore = 0;
      let lowestScore = 10;

      Object.values(interviewScoreMap).forEach((scores) => {
        const avg =
          scores.reduce((a, b) => a + b, 0) / scores.length;

        totalInterviewScore += avg;
        if (avg > bestScore) bestScore = avg;
        if (avg < lowestScore) lowestScore = avg;
      });

      const totalInterviews = Object.keys(interviewScoreMap).length;

      const avgInterviewScore =
        totalInterviews > 0
          ? (totalInterviewScore / totalInterviews).toFixed(2)
          : 0;

      if (totalInterviews === 0) lowestScore = 0;

      const today = moment();
      const startDate = moment().subtract(365, "days");

      const activityMap = {};

      answers.forEach((ans) => {
        const date = moment(ans.createdAt).format("YYYY-MM-DD");
        activityMap[date] = (activityMap[date] || 0) + 1;
      });

      interviews.forEach((interview) => {
        const date = moment(interview.createdAt).format("YYYY-MM-DD");
        activityMap[date] = (activityMap[date] || 0) + 1;
      });

      const heatData = [];

      for (
        let m = startDate.clone();
        m.isSameOrBefore(today);
        m.add(1, "days")
      ) {
        const dateStr = m.format("YYYY-MM-DD");
        heatData.push({
          date: dateStr,
          count: activityMap[dateStr] || 0,
        });
      }

      let streak = 0;
      for (let i = heatData.length - 1; i >= 0; i--) {
        if (heatData[i].count > 0) {
          streak++;
        } else {
          break;
        }
      }

      setHeatmapData(heatData);

      setStats({
        totalInterviews,
        avgInterviewScore,
        bestScore: bestScore.toFixed(2),
        lowestScore: lowestScore.toFixed(2),
        totalQuestions,
        avgTechnicalScore,
        streak,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 bg-black text-white">
        Loading...
      </div>
    );

  const getPerformanceLevel = () => {
    const score = Number(stats.avgInterviewScore);
    if (score < 4) return "Beginner";
    if (score < 6) return "Improving";
    if (score < 8) return "Strong";
    return "Interview Ready";
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">
        Profile Insights
      </h1>

      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-full bg-green-600 text-sm font-semibold">
          {getPerformanceLevel()}
        </div>
        <div className="text-gray-400 text-sm">
          🔥 Current Streak: {stats.streak} days
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard title="Total Interviews" value={stats.totalInterviews} />
        <StatCard title="Avg Interview Score" value={stats.avgInterviewScore} />
        <StatCard title="Best Interview Score" value={stats.bestScore} />
        <StatCard title="Lowest Interview Score" value={stats.lowestScore} />
        <StatCard title="Total Questions" value={stats.totalQuestions} />
        <StatCard title="Avg Technical Score" value={stats.avgTechnicalScore} />
      </div>

      {/* Heatmap */}
      <div className="bg-[#0d1117] p-6 rounded-xl border border-gray-800">
        <h2 className="text-xl font-semibold mb-6">
          Activity (Last 365 Days)
        </h2>

        <div className="overflow-x-auto">
          <div
            className="grid gap-[3px]"
            style={{
              gridAutoFlow: "column",
              gridAutoColumns: "14px",
              gridTemplateRows: "repeat(7, 14px)",
            }}
          >
            {heatmapData.map((day, index) => (
              <div
                key={index}
                title={`${day.date} - ${day.count} activities`}
                className={`w-[14px] h-[14px] rounded-sm border border-gray-800 ${
                  day.count === 0
                    ? "bg-[#161b22]"
                    : day.count < 3
                    ? "bg-green-400"
                    : day.count < 6
                    ? "bg-green-500"
                    : day.count < 10
                    ? "bg-green-600"
                    : "bg-green-700"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 space-x-2 text-sm text-gray-400">
          <span>Less</span>
          <div className="w-4 h-4 bg-[#161b22] border border-gray-800 rounded-sm" />
          <div className="w-4 h-4 bg-green-400 rounded-sm" />
          <div className="w-4 h-4 bg-green-500 rounded-sm" />
          <div className="w-4 h-4 bg-green-600 rounded-sm" />
          <div className="w-4 h-4 bg-green-700 rounded-sm" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#161b22] border border-gray-800 rounded-xl p-6 hover:scale-105 transition-transform duration-200">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
