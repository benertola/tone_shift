"use client";

import { useState } from "react";
import { TONES, ToneKey } from "@/lib/prompts";

export default function Home() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<ToneKey>("formal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function handleRewrite() {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data.result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8 flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tone Shift</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Paste a message, pick a tone, get it rewritten instantly.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Your message</label>
          <textarea
            className="w-full rounded-xl border border-gray-200 p-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 min-h-[140px]"
            placeholder="Paste your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Tone</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.key}
                onClick={() => setTone(t.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  tone === t.key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRewrite}
          disabled={!message.trim() || loading}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Rewriting…" : "Rewrite →"}
        </button>

        {error && (
          <p className="text-sm text-red-500 rounded-lg bg-red-50 px-4 py-3">{error}</p>
        )}

        {result && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Rewritten message</label>
              <button
                onClick={handleCopy}
                className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors font-medium"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
