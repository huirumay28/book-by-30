"use client";

import { useState } from "react";
import type { Submission } from "@/types/writing-desk";

interface SubmissionListProps {
  submissions: Submission[];
  onUpdate: (id: string, updates: Partial<Submission>) => void;
  onDelete: (id: string) => void;
  onAdd: (submission: Omit<Submission, "id" | "createdAt" | "updatedAt">) => void;
  compact?: boolean;
}

export function SubmissionList({
  submissions,
  onUpdate,
  onDelete,
  onAdd,
  compact = false,
}: SubmissionListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterTier, setFilterTier] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const [newStory, setNewStory] = useState("");
  const [newMagazine, setNewMagazine] = useState("");
  const [newTier, setNewTier] = useState<1 | 2 | 3 | 4>(1);
  const [newWhyItFits, setNewWhyItFits] = useState("");
  const [newSendByDate, setNewSendByDate] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const handleAdd = () => {
    if (!newStory.trim() || !newMagazine.trim() || !newSendByDate) return;

    onAdd({
      story: newStory,
      magazine: newMagazine,
      tier: newTier,
      whyItFits: newWhyItFits,
      sendByDate: newSendByDate,
      status: "queued",
      notes: newNotes,
    });

    setNewStory("");
    setNewMagazine("");
    setNewTier(1);
    setNewWhyItFits("");
    setNewSendByDate("");
    setNewNotes("");
    setShowAddForm(false);
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (filterTier && sub.tier !== filterTier) return false;
    if (filterStatus && sub.status !== filterStatus) return false;
    return true;
  });

  const sortedSubmissions = [...filteredSubmissions].sort(
    (a, b) =>
      new Date(a.sendByDate).getTime() - new Date(b.sendByDate).getTime()
  );

  const getTierLabel = (tier: number) => {
    switch (tier) {
      case 1:
        return "T1";
      case 2:
        return "T2";
      case 3:
        return "T3";
      case 4:
        return "T4";
      default:
        return `T${tier}`;
    }
  };

  const displaySubmissions = compact ? sortedSubmissions.slice(0, 3) : sortedSubmissions;

  return (
    <div className="window-frame">
      <div className="window-title-bar">
        <span>SUBMISSION LADDER</span>
        <div className="window-controls">
          {!compact && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="window-btn text-[10px]"
              title={showAddForm ? "Cancel" : "Add submission"}
            >
              {showAddForm ? "×" : "+"}
            </button>
          )}
          <div className="window-btn">_</div>
        </div>
      </div>
      <div className="window-content space-y-3">
        {!compact && (
          <div className="flex flex-wrap gap-2">
            <select
              value={filterTier ?? ""}
              onChange={(e) =>
                setFilterTier(e.target.value ? parseInt(e.target.value) : null)
              }
              className="input-field text-xs"
            >
              <option value="">All Tiers</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
              <option value="4">Tier 4</option>
            </select>

            <select
              value={filterStatus ?? ""}
              onChange={(e) => setFilterStatus(e.target.value || null)}
              className="input-field text-xs"
            >
              <option value="">All Status</option>
              <option value="queued">Queued</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        )}

        {showAddForm && !compact && (
          <div className="p-3 border border-[var(--border-light)] rounded bg-white space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                placeholder="Story title"
                className="input-field text-xs"
              />
              <input
                type="text"
                value={newMagazine}
                onChange={(e) => setNewMagazine(e.target.value)}
                placeholder="Magazine"
                className="input-field text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <select
                value={newTier}
                onChange={(e) =>
                  setNewTier(parseInt(e.target.value) as 1 | 2 | 3 | 4)
                }
                className="input-field text-xs"
              >
                <option value="1">Tier 1: Open/Match</option>
                <option value="2">Tier 2: Solid Mid</option>
                <option value="3">Tier 3: Selective</option>
                <option value="4">Tier 4: Bigger</option>
              </select>
              <input
                type="date"
                value={newSendByDate}
                onChange={(e) => setNewSendByDate(e.target.value)}
                className="input-field text-xs"
              />
            </div>

            <textarea
              value={newWhyItFits}
              onChange={(e) => setNewWhyItFits(e.target.value)}
              placeholder="Why it fits"
              rows={2}
              className="textarea-field w-full text-xs"
            />

            <button onClick={handleAdd} className="btn-primary text-xs">
              + ADD
            </button>
          </div>
        )}

        {displaySubmissions.length === 0 ? (
          <p className="text-[var(--text-gray)] text-xs py-4 text-center italic">
            {compact ? "No upcoming submissions" : "No submissions match your filters"}
          </p>
        ) : (
          <div className="space-y-2">
            {displaySubmissions.map((sub) => (
              <div
                key={sub.id}
                className="p-3 border border-[var(--border-light)] rounded bg-white hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-xs text-[var(--text-black)] leading-tight">
                      {sub.story} → {sub.magazine}
                    </h3>
                    <p className="text-[10px] text-[var(--text-gray)] mt-1">
                      {getTierLabel(sub.tier)} • {new Date(sub.sendByDate).toLocaleDateString()}
                    </p>
                    {sub.whyItFits && !compact && (
                      <p className="text-[10px] text-[var(--text-gray)] italic mt-1">
                        {sub.whyItFits}
                      </p>
                    )}
                  </div>
                  {!compact && (
                    <button
                      onClick={() => onDelete(sub.id)}
                      className="text-[10px] text-[var(--text-gray)] hover:text-red-600 transition-colors px-1"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {(
                    ["queued", "sent", "accepted", "rejected", "withdrawn"] as const
                  ).map((status) => (
                    <button
                      key={status}
                      onClick={() => onUpdate(sub.id, { status })}
                      className={`status-badge ${
                        sub.status === status
                          ? `status-${status}`
                          : "bg-[#e8e8e8] text-[var(--text-gray)]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {sub.status === "sent" && sub.sentDate && !compact && (
                  <p className="text-[10px] text-[var(--text-gray)] mt-2">
                    Sent: {new Date(sub.sentDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
