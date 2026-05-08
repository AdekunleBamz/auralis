import { NextResponse } from "next/server";
import { assertAddress, createAuralisDraft } from "@bamzzstudio/auralis-sdk";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const prompt = url.searchParams.get("p") ?? url.searchParams.get("prompt") ?? "";
    const expectedHash = url.searchParams.get("h") ?? url.searchParams.get("hash");
    const creatorParam = url.searchParams.get("c") ?? url.searchParams.get("creator");
    const creator = creatorParam ? assertAddress(creatorParam, "creator") : undefined;
    const draft = createAuralisDraft(prompt, {
      creator,
      agentName: "Auralis Agent",
      appName: "Auralis",
      externalUrl: url.origin,
    });

    if (expectedHash && expectedHash.toLowerCase() !== draft.promptHash.toLowerCase()) {
      return NextResponse.json({ error: "Prompt hash mismatch" }, { status: 400 });
    }

    return NextResponse.json(draft.metadata, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load NFT metadata";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
