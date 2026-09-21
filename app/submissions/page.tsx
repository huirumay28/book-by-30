"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { SubmissionList } from "@/components/SubmissionList";
import { loadAppState, saveAppState } from "@/lib/storage";
import type { AppState } from "@/types/writing-desk";

export default function SubmissionsPage() {
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

  const handleUpdate = (id: string, updates: any) => {
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

  const handleDelete = (id: string) => {
    const newState = { ...state };
    newState.submissions = newState.submissions.filter((s) => s.id !== id);
    saveAppState(newState);
    setState(newState);
  };

  const handleAdd = (sub: any) => {
    const newState = { ...state };
    newState.submissions.push({
      ...sub,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    saveAppState(newState);
    setState(newState);
  };

  const stats = {
    total: state.submissions.length,
    queued: state.submissions.filter((s) => s.status === "queued").length,
    sent: state.submissions.filter((s) => s.status === "sent").length,
    accepted: state.submissions.filter((s) => s.status === "accepted").length,
    rejected: state.submissions.filter((s) => s.status === "rejected").length,
  };

  return (
    <div className="min-h-screen pb-12">
      <Navigation />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-black)] mb-6">
          SUBMISSIONS
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <SubmissionList
              submissions={state.submissions}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onAdd={handleAdd}
            />
          </div>

          <div className="space-y-4">
            <div className="window-frame">
              <div className="window-title-bar">
                <span>STATS</span>
                <div className="window-controls">
                  <div className="window-btn">_</div>
                </div>
              </div>
              <div className="window-content">
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-gray)]">Total:</span>
                    <span className="font-bold">{stats.total}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-gray)]">Queued:</span>
                    <span>{stats.queued}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-gray)]">Sent:</span>
                    <span>{stats.sent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-gray)]">Accepted:</span>
                    <span className="text-[var(--accent-green)] font-bold">
                      {stats.accepted}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-gray)]">Rejected:</span>
                    <span>{stats.rejected}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="window-frame">
              <div className="window-title-bar">
                <span>LADDER GUIDE</span>
                <div className="window-controls">
                  <div className="window-btn">_</div>
                </div>
              </div>
              <div className="window-content">
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="font-bold text-[var(--text-black)] mb-1">
                      Tier 1: Open/Match
                    </div>
                    <p className="text-[var(--text-gray)]">
                      Strong thematic fit, lower barrier to entry
                    </p>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <div className="font-bold text-[var(--text-black)] mb-1">
                      Tier 2: Solid Mid
                    </div>
                    <p className="text-[var(--text-gray)]">
                      Established reputation, competitive
                    </p>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <div className="font-bold text-[var(--text-black)] mb-1">
                      Tier 3: Selective
                    </div>
                    <p className="text-[var(--text-gray)]">
                      High literary standard, careful curation
                    </p>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <div className="font-bold text-[var(--text-black)] mb-1">
                      Tier 4: Bigger
                    </div>
                    <p className="text-[var(--text-gray)]">
                      Prestige placement, when ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
