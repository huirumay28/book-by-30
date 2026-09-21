"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { DailyLogForm } from "@/components/DailyLogForm";
import { WritingTaskList } from "@/components/WritingTaskList";
import { SubmissionList } from "@/components/SubmissionList";
import {
  loadAppState,
  saveAppState,
  getTodayLog,
  getStreak,
  getTodayTasks,
} from "@/lib/storage";
import type { AppState } from "@/types/writing-desk";
import Link from "next/link";

export default function TodayPage() {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    setState(loadAppState());
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8">
          <div className="loading-bar"></div>
        </div>
      </div>
    );
  }

  const todayLog = getTodayLog(state);
  const streak = getStreak(state);
  const { writing, submissions } = getTodayTasks(state);
  const today = new Date().toISOString().split("T")[0];

  const handleSaveLog = (data: {
    hitTheFloor: boolean;
    journalEntry: string;
    wordCount?: number;
  }) => {
    const newState = { ...state };

    if (todayLog) {
      const index = newState.dailyLogs.findIndex((log) => log.id === todayLog.id);
      newState.dailyLogs[index] = {
        ...todayLog,
        ...data,
      };
    } else {
      newState.dailyLogs.push({
        id: crypto.randomUUID(),
        date: today,
        ...data,
        createdAt: new Date().toISOString(),
      });
    }

    saveAppState(newState);
    setState(newState);
  };

  const handleUpdateTask = (id: string, updates: any) => {
    const newState = { ...state };
    const index = newState.writingTasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      newState.writingTasks[index] = {
        ...newState.writingTasks[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveAppState(newState);
      setState(newState);
    }
  };

  const handleUpdateSubmission = (id: string, updates: any) => {
    const newState = { ...state };
    const index = newState.submissions.findIndex((s) => s.id === id);
    if (index !== -1) {
      newState.submissions[index] = {
        ...newState.submissions[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveAppState(newState);
      setState(newState);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-black)]">
              TODAY
            </h1>
            <div className="text-xs text-[var(--text-gray)]">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="streak-display text-base sm:text-xl">
              🔥 {streak} DAY{streak !== 1 ? "S" : ""}
            </div>
            <div className="text-xs text-[var(--text-gray)] max-w-xs leading-tight">
              Soft minimum: 4×/week, 45–60 min<br />
              Miss → 15 min floor
            </div>
          </div>

          <Link
            href="/inspo"
            className="btn-secondary text-xs inline-block"
          >
            ✎ Quick Inspo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <DailyLogForm log={todayLog} onSave={handleSaveLog} />

          <div className="space-y-4">
            <WritingTaskList
              tasks={writing}
              onUpdate={handleUpdateTask}
              onDelete={(id) => {
                const newState = { ...state };
                newState.writingTasks = newState.writingTasks.filter(
                  (t) => t.id !== id
                );
                saveAppState(newState);
                setState(newState);
              }}
              onAdd={(task) => {
                const newState = { ...state };
                newState.writingTasks.push({
                  ...task,
                  id: crypto.randomUUID(),
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
                saveAppState(newState);
                setState(newState);
              }}
              title="Today: Writing"
              emptyMessage="No writing tasks due today"
              compact
            />

            <SubmissionList
              submissions={submissions}
              onUpdate={handleUpdateSubmission}
              onDelete={(id) => {
                const newState = { ...state };
                newState.submissions = newState.submissions.filter(
                  (s) => s.id !== id
                );
                saveAppState(newState);
                setState(newState);
              }}
              onAdd={(sub) => {
                const newState = { ...state };
                newState.submissions.push({
                  ...sub,
                  id: crypto.randomUUID(),
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
                saveAppState(newState);
                setState(newState);
              }}
              compact
            />
          </div>
        </div>
      </div>
    </div>
  );
}
