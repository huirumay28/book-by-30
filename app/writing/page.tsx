"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { WritingTaskList } from "@/components/WritingTaskList";
import { loadAppState, saveAppState } from "@/lib/storage";
import type { AppState } from "@/types/writing-desk";

export default function WritingPage() {
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

  const sortedTasks = [...state.writingTasks].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const handleUpdate = (id: string, updates: any) => {
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

  const handleDelete = (id: string) => {
    const newState = { ...state };
    newState.writingTasks = newState.writingTasks.filter((t) => t.id !== id);
    saveAppState(newState);
    setState(newState);
  };

  const handleAdd = (task: any) => {
    const newState = { ...state };
    newState.writingTasks.push({
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    saveAppState(newState);
    setState(newState);
  };

  const recentLogs = [...state.dailyLogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen pb-12">
      <Navigation />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-black)] mb-6">
          WRITING
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <WritingTaskList
              tasks={sortedTasks}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onAdd={handleAdd}
              title="All Writing Tasks"
              emptyMessage="Start by adding your first writing task"
            />
          </div>

          <div className="window-frame">
            <div className="window-title-bar">
              <span>RECENT LOGS</span>
              <div className="window-controls">
                <div className="window-btn">_</div>
              </div>
            </div>
            <div className="window-content">
              {recentLogs.length === 0 ? (
                <p className="text-xs text-[var(--text-gray)] italic py-4 text-center">
                  No daily logs yet
                </p>
              ) : (
                <div className="space-y-3">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="scrapbook-item">
                      <div className="text-[10px] text-[var(--text-gray)] mb-1 font-mono">
                        {new Date(log.date).toLocaleDateString()}
                        {log.hitTheFloor && " 🔥"}
                      </div>
                      <p className="text-xs text-[var(--text-black)] line-clamp-3 font-mono leading-relaxed">
                        {log.journalEntry || "(empty log)"}
                      </p>
                      {log.wordCount && (
                        <div className="text-[10px] text-[var(--text-gray)] mt-1">
                          {log.wordCount} words
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
