"use client";

import { useState } from "react";
import type { DailyLog } from "@/types/writing-desk";

interface DailyLogFormProps {
  log?: DailyLog;
  onSave: (data: {
    hitTheFloor: boolean;
    journalEntry: string;
    wordCount?: number;
  }) => void;
}

export function DailyLogForm({ log, onSave }: DailyLogFormProps) {
  const [hitTheFloor, setHitTheFloor] = useState(log?.hitTheFloor ?? false);
  const [journalEntry, setJournalEntry] = useState(log?.journalEntry ?? "");
  const [wordCount, setWordCount] = useState<string>(
    log?.wordCount?.toString() ?? ""
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave({
      hitTheFloor,
      journalEntry,
      wordCount: wordCount ? parseInt(wordCount, 10) : undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="window-frame">
      <div className="window-title-bar-alt">
        <span>DAILY_LOG.TXT</span>
        <div className="window-controls">
          <div className="window-btn">_</div>
          <div className="window-btn">□</div>
        </div>
      </div>
      <div className="window-content space-y-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={hitTheFloor}
            onChange={(e) => setHitTheFloor(e.target.checked)}
            className="checkbox-custom"
          />
          <span className="text-sm font-semibold text-[var(--text-black)] group-hover:text-[var(--accent-blue)] transition-colors">
            Did I hit the floor today?
          </span>
        </label>

        <div>
          <label
            htmlFor="journal"
            className="block text-xs font-semibold text-[var(--text-gray)] mb-2 uppercase tracking-wide"
          >
            Daily Entry
          </label>
          <textarea
            id="journal"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write 3 lines about today even if you only did 15 min..."
            rows={6}
            className="textarea-field w-full"
          />
        </div>

        <div>
          <label
            htmlFor="wordCount"
            className="block text-xs font-semibold text-[var(--text-gray)] mb-2 uppercase tracking-wide"
          >
            Word Count
          </label>
          <input
            id="wordCount"
            type="number"
            value={wordCount}
            onChange={(e) => setWordCount(e.target.value)}
            placeholder="0"
            min="0"
            className="input-field w-24"
          />
        </div>

        <button onClick={handleSave} className="btn-primary">
          {saved ? "✓ SAVED" : ">> SAVE LOG"}
        </button>
      </div>
    </div>
  );
}
