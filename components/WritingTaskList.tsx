"use client";

import { useState } from "react";
import type { WritingTask } from "@/types/writing-desk";

interface WritingTaskListProps {
  tasks: WritingTask[];
  onUpdate: (id: string, updates: Partial<WritingTask>) => void;
  onDelete: (id: string) => void;
  onAdd: (task: Omit<WritingTask, "id" | "createdAt" | "updatedAt">) => void;
  title?: string;
  emptyMessage?: string;
  compact?: boolean;
}

export function WritingTaskList({
  tasks,
  onUpdate,
  onDelete,
  onAdd,
  title = "Writing Tasks",
  emptyMessage = "No tasks yet.",
  compact = false,
}: WritingTaskListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    onAdd({
      title: newTitle,
      status: "todo",
      notes: newNotes,
      dueDate: newDueDate || undefined,
    });

    setNewTitle("");
    setNewNotes("");
    setNewDueDate("");
    setShowAddForm(false);
  };

  return (
    <div className="window-frame">
      <div className="window-title-bar">
        <span>{title.toUpperCase()}</span>
        <div className="window-controls">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="window-btn text-[10px]"
            title={showAddForm ? "Cancel" : "Add task"}
          >
            {showAddForm ? "×" : "+"}
          </button>
          <div className="window-btn">_</div>
        </div>
      </div>
      <div className="window-content space-y-3">
        {showAddForm && (
          <div className="p-3 border border-[var(--border-light)] rounded space-y-2 bg-white">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task title"
              className="input-field w-full text-xs"
            />
            {!compact && (
              <>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Notes (optional)"
                  rows={2}
                  className="textarea-field w-full text-xs"
                />
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="input-field w-full text-xs"
                />
              </>
            )}
            <button onClick={handleAdd} className="btn-primary text-xs">
              + ADD
            </button>
          </div>
        )}

        {tasks.length === 0 ? (
          <p className="text-[var(--text-gray)] text-xs py-4 text-center italic">
            {emptyMessage}
          </p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="p-3 border border-[var(--border-light)] rounded bg-white hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-[var(--text-black)] leading-tight">
                      {task.title}
                    </h3>
                    {task.dueDate && (
                      <p className="text-[10px] text-[var(--text-gray)] mt-1">
                        DUE: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="text-[10px] text-[var(--text-gray)] hover:text-red-600 transition-colors px-1"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                  {(["todo", "doing", "done"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => onUpdate(task.id, { status })}
                      className={`status-badge ${
                        task.status === status
                          ? `status-${status}`
                          : "bg-[#e8e8e8] text-[var(--text-gray)]"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {task.notes && !compact && (
                  <p className="text-xs text-[var(--text-gray)] mt-2 italic">
                    {task.notes}
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
