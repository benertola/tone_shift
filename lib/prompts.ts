export const TONE_PROMPTS: Record<string, string> = {
  formal:
    "Rewrite the following message in a formal, professional tone. Use precise language, complete sentences, and avoid contractions or casual phrasing. Preserve the original meaning exactly.",
  friendly:
    "Rewrite the following message in a warm, friendly, and approachable tone. Feel free to use light conversational language and contractions. Preserve the original meaning exactly.",
  blunt:
    "Rewrite the following message to be direct and concise. Cut unnecessary words, get straight to the point, and avoid softening language. Preserve the original meaning exactly.",
  apologetic:
    "Rewrite the following message with a sincere, apologetic tone. Acknowledge any inconvenience or fault, show empathy, and be respectful. Preserve the original meaning exactly.",
  confident:
    "Rewrite the following message in a confident, assertive tone. Use strong, decisive language and avoid hedging phrases like 'maybe' or 'I think'. Preserve the original meaning exactly.",
};

export const TONES = [
  { key: "formal", label: "Formal" },
  { key: "friendly", label: "Friendly" },
  { key: "blunt", label: "Blunt" },
  { key: "apologetic", label: "Apologetic" },
  { key: "confident", label: "Confident" },
] as const;

export type ToneKey = (typeof TONES)[number]["key"];
