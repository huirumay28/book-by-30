"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { loadAppState, saveAppState } from "@/lib/storage";
import type { AppState, DailyLog } from "@/types/writing-desk";

export default function LogPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editWordCount, setEditWordCount] = useState("");

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

  const sortedLogs = [...state.dailyLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleEdit = (log: DailyLog) => {
    setEditingId(log.id);
    setEditContent(log.journalEntry);
    setEditWordCount(log.wordCount?.toString() ?? "");
  };

  const handleSaveEdit = (id: string) => {
    const newState = { ...state };
    const index = newState.dailyLogs.findIndex((log) => log.id === id);
    if (index !== -1) {
      newState.dailyLogs[index] = {
        ...newState.dailyLogs[index],
        journalEntry: editContent,
        wordCount: editWordCount ? parseInt(editWordCount, 10) : undefined,
      };
      saveAppState(newState);
      setState(newState);
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this log entry?")) return;
    const newState = { ...state };
    newState.dailyLogs = newState.dailyLogs.filter((log) => log.id !== id);
    saveAppState(newState);
    setState(newState);
  };

  const floorDays = sortedLogs.filter((log) => log.hitTheFloor).length;
  const totalDays = sortedLogs.length;

  return (
    <div className="min-h-screen pb-12">
      <Navigation />

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-black)] mb-6">
          LOG
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="window-frame">
            <div className="window-title-bar">
              <span>TOTAL LOGS</span>
            </div>
            <div className="window-content text-center">
              <div className="text-3xl font-bold font-mono">{totalDays}</div>
            </div>
          </div>

          <div className="window-frame">
            <div className="window-title-bar">
              <span>FLOOR DAYS</span>
            </div>
            <div className="window-content text-center">
              <div className="text-3xl font-bold font-mono text-[var(--accent-green)]">
                {floorDays}
              </div>
            </div>
          </div>

          <div className="window-frame">
            <div className="window-title-bar">
              <span>HIT RATE</span>
            </div>
            <div className="window-content text-center">
              <div className="text-3xl font-bold font-mono">
                {totalDays > 0
                  ? Math.round((floorDays / totalDays) * 100)
                  : 0}
                %
              </div>
            </div>
          </div>
        </div>

        <div className="window-frame">
          <div className="window-title-bar">
            <span>ALL ENTRIES</span>
            <div className="window-controls">
              <div className="window-btn">_</div>
            </div>
          </div>
          <div className="window-content">
            {sortedLogs.length === 0 ? (
              <p className="text-[var(--text-gray)] text-sm italic py-8 text-center">
                No log entries yet. Start writing today!
              </p>
            ) : (
              <div className="space-y-4">
                {sortedLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 border border-[var(--border-light)] rounded bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-sm text-[var(--text-black)] font-mono">
                          {new Date(log.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        {log.hitTheFloor && (
                          <div className="text-xs text-[var(--accent-green)] font-semibold mt-1">
                            🔥 HIT THE FLOOR
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingId !== log.id && (
                          <>
                            <button
                              onClick={() => handleEdit(log)}
                              className="text-xs text-[var(--accent-blue)] hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(log.id)}
                              className="text-xs text-[var(--text-gray)] hover:text-red-600"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingId === log.id ? (
                      <div className="space-y-2">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={4}
                          className="textarea-field w-full"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editWordCount}
                            onChange={(e) => setEditWordCount(e.target.value)}
                            placeholder="Word count"
                            className="input-field w-24 text-xs"
                          />
                          <button
                            onClick={() => handleSaveEdit(log.id)}
                            className="btn-primary text-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="btn-secondary text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-[var(--text-black)] font-mono leading-relaxed whitespace-pre-wrap">
                          {log.journalEntry || "(empty entry)"}
                        </p>
                        {log.wordCount && (
                          <div className="text-xs text-[var(--text-gray)] mt-2">
                            {log.wordCount} words
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
