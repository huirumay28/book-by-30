"use client";

import type { AppState, DailyLog, WritingTask, Submission, InspoItem } from "@/types/writing-desk";

const STORAGE_KEY = "writing-desk-data";

function getInitialData(): AppState {
  return {
    dailyLogs: [],
    inspoItems: [],
    writingTasks: [
      {
        id: crypto.randomUUID(),
        title: "Name ONE collection story to advance this month",
        status: "todo",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "4 calendar blocks Mon/Wed/Thu/Sat (45–60m)",
        status: "todo",
        notes: "Building the habit: 4 sessions per week minimum",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Create Substack + About",
        status: "todo",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "First Substack post",
        status: "todo",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Sunday log habit",
        status: "todo",
        notes: "Weekly reflection and planning",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    submissions: [
      {
        id: crypto.randomUUID(),
        tier: 1,
        story: "The Apartment",
        magazine: "The Offing",
        whyItFits: "Open/match tier — strong cultural focus",
        sendByDate: "2026-10-03",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 1,
        story: "Love in the Wintertime",
        magazine: "Joyland",
        whyItFits: "Open/match tier — literary fiction focus",
        sendByDate: "2026-10-17",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 1,
        story: "The Pools",
        magazine: "AAWW The Margins",
        whyItFits: "Open/match tier — Asian American voices",
        sendByDate: "2026-10-31",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 2,
        story: "The Pools",
        magazine: "The Common",
        whyItFits: "Solid mid-tier — place-based narratives",
        sendByDate: "2026-11-14",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 2,
        story: "The Dent",
        magazine: "Electric Literature",
        whyItFits: "Solid mid-tier — contemporary voices",
        sendByDate: "2026-11-14",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 2,
        story: "The Dent",
        magazine: "Guernica",
        whyItFits: "Solid mid-tier — art and politics",
        sendByDate: "2026-11-28",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 2,
        story: "Love in the Wintertime",
        magazine: "ZYZZYVA",
        whyItFits: "Solid mid-tier — West Coast literary",
        sendByDate: "2026-12-12",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 2,
        story: "The Apartment",
        magazine: "Epiphany",
        whyItFits: "Solid mid-tier — diverse voices",
        sendByDate: "2026-12-12",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 3,
        story: "The Pools",
        magazine: "One Story",
        whyItFits: "Selective — character-driven shorts",
        sendByDate: "2027-01-09",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 3,
        story: "The Dent",
        magazine: "A Public Space",
        whyItFits: "Selective — experimental literary",
        sendByDate: "2027-01-23",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 3,
        story: "The Translator",
        magazine: "New England Review",
        whyItFits: "Selective — high literary standard",
        sendByDate: "2027-02-06",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 3,
        story: "The Pools",
        magazine: "Missouri Review",
        whyItFits: "Selective — established literary quarterly",
        sendByDate: "2027-02-20",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 4,
        story: "The Dent",
        magazine: "Kenyon Review",
        whyItFits: "Bigger tier — prestigious literary quarterly",
        sendByDate: "2027-03-20",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 4,
        story: "The Pools",
        magazine: "Granta",
        whyItFits: "Bigger tier — international prestige",
        sendByDate: "2027-04-17",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        tier: 4,
        story: "(Optional prestige)",
        magazine: "TBD",
        whyItFits: "Only if ready — top-tier placement",
        sendByDate: "2027-05-15",
        status: "queued",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    lastSync: new Date().toISOString(),
  };
}

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return getInitialData();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const initial = getInitialData();
      saveAppState(initial);
      return initial;
    }
    return JSON.parse(stored) as AppState;
  } catch (error) {
    console.error("Failed to load app state:", error);
    return getInitialData();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === "undefined") return;

  try {
    state.lastSync = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save app state:", error);
  }
}

export function getTodayLog(state: AppState): DailyLog | undefined {
  const today = new Date().toISOString().split("T")[0];
  return state.dailyLogs.find((log) => log.date === today);
}

export function getStreak(state: AppState): number {
  const logs = [...state.dailyLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < logs.length; i++) {
    const logDate = new Date(logs[i].date);
    logDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (logDate.getTime() === expectedDate.getTime() && logs[i].hitTheFloor) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getTodayTasks(state: AppState): {
  writing: WritingTask[];
  submissions: Submission[];
} {
  const today = new Date().toISOString().split("T")[0];

  const writing = state.writingTasks.filter((task) => {
    if (task.status === "done") return false;
    if (!task.dueDate) return task.status === "doing";
    return task.dueDate <= today;
  });

  const submissions = state.submissions.filter((sub) => {
    if (sub.status !== "queued") return false;
    return sub.sendByDate <= today;
  });

  return { writing, submissions };
}
