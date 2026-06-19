import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { TONE_PROMPTS } from "@/lib/prompts";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { message, tone } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const systemPrompt = TONE_PROMPTS[tone];
  if (!systemPrompt) {
    return NextResponse.json({ error: "Invalid tone." }, { status: 400 });
  }

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: message.trim() }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  return NextResponse.json({ result: text });
}
