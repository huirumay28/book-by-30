"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { loadAppState, saveAppState } from "@/lib/storage";
import type { AppState, InspoItem } from "@/types/writing-desk";

export default function InspoPage() {
  const [state, setState] = useState<AppState | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newSource, setNewSource] = useState("");
  const [newTags, setNewTags] = useState("");
  const [newNote, setNewNote] = useState("");
  const [filterTag, setFilterTag] = useState<string | null>(null);

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

  const handleAdd = () => {
    if (!newContent.trim()) return;

    const newState = { ...state };
    const tags = newTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    newState.inspoItems.push({
      id: crypto.randomUUID(),
      content: newContent,
      source: newSource || undefined,
      tags,
      note: newNote || undefined,
      createdAt: new Date().toISOString(),
    });

    saveAppState(newState);
    setState(newState);

    setNewContent("");
    setNewSource("");
    setNewTags("");
    setNewNote("");
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    const newState = { ...state };
    newState.inspoItems = newState.inspoItems.filter((item) => item.id !== id);
    saveAppState(newState);
    setState(newState);
  };

  const filteredItems = filterTag
    ? state.inspoItems.filter((item) => item.tags.includes(filterTag))
    : state.inspoItems;

  const sortedItems = [...filteredItems].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const allTags = Array.from(
    new Set(state.inspoItems.flatMap((item) => item.tags))
  ).sort();

  return (
    <div className="min-h-screen pb-12">
      <Navigation />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-black)] mb-2">
            INSPO
          </h1>
          <p className="text-xs text-[var(--text-gray)]">
            Digital corkboard for quotes, excerpts, and fragments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="window-frame mb-4">
              <div className="window-title-bar">
                <span>ADD NEW</span>
                <div className="window-controls">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="window-btn text-[10px]"
                  >
                    {showAddForm ? "×" : "+"}
                  </button>
                  <div className="window-btn">_</div>
                </div>
              </div>
              {showAddForm && (
                <div className="window-content space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-gray)] mb-1 uppercase tracking-wide">
                      Quote / Excerpt
                    </label>
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Paste your quote or excerpt here..."
                      rows={4}
                      className="textarea-field w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-gray)] mb-1 uppercase tracking-wide">
                        Source (optional)
                      </label>
                      <input
                        type="text"
                        value={newSource}
                        onChange={(e) => setNewSource(e.target.value)}
                        placeholder="Author, Book, etc."
                        className="input-field w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text-gray)] mb-1 uppercase tracking-wide">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={newTags}
                        onChange={(e) => setNewTags(e.target.value)}
                        placeholder="dialogue, voice, structure"
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--text-gray)] mb-1 uppercase tracking-wide">
                      Note (optional)
                    </label>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Why this resonates..."
                      rows={2}
                      className="textarea-field w-full"
                    />
                  </div>

                  <button onClick={handleAdd} className="btn-primary">
                    + ADD TO BOARD
                  </button>
                </div>
              )}
            </div>

            {sortedItems.length === 0 ? (
              <div className="window-frame">
                <div className="window-content py-12 text-center">
                  <p className="text-[var(--text-gray)] text-sm italic">
                    Your scrapbook is empty. Add your first quote or excerpt above.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedItems.map((item) => (
                  <div key={item.id} className="scrapbook-item relative group">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-2 right-2 text-xs text-[var(--text-gray)] hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>

                    <blockquote className="text-sm text-[var(--text-black)] font-mono leading-relaxed mb-3 italic">
                      "{item.content}"
                    </blockquote>

                    {item.source && (
                      <div className="text-xs text-[var(--text-gray)] mb-2">
                        — {item.source}
                      </div>
                    )}

                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 bg-[var(--bg-main)] border border-[var(--border-light)] rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.note && (
                      <p className="text-xs text-[var(--text-gray)] italic mt-2 pt-2 border-t border-[var(--border-light)]">
                        {item.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="window-frame h-fit">
            <div className="window-title-bar">
              <span>TAGS</span>
              <div className="window-controls">
                <div className="window-btn">_</div>
              </div>
            </div>
            <div className="window-content">
              {allTags.length === 0 ? (
                <p className="text-xs text-[var(--text-gray)] italic">
                  No tags yet
                </p>
              ) : (
                <div className="space-y-1">
                  <button
                    onClick={() => setFilterTag(null)}
                    className={`block w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                      filterTag === null
                        ? "bg-[var(--accent-blue)] text-white"
                        : "text-[var(--text-gray)] hover:bg-[var(--bg-main)]"
                    }`}
                  >
                    All ({state.inspoItems.length})
                  </button>
                  {allTags.map((tag) => {
                    const count = state.inspoItems.filter((item) =>
                      item.tags.includes(tag)
                    ).length;
                    return (
                      <button
                        key={tag}
                        onClick={() => setFilterTag(tag)}
                        className={`block w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                          filterTag === tag
                            ? "bg-[var(--accent-blue)] text-white"
                            : "text-[var(--text-gray)] hover:bg-[var(--bg-main)]"
                        }`}
                      >
                        {tag} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
