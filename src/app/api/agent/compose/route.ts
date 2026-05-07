import { NextResponse } from "next/server";
import { assertAddress, createAuralisDraft, ERC8004_CELO } from "@auralis/sdk";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      prompt?: string;
      creator?: string;
    };
    const prompt = body.prompt ?? "";
    const creator = body.creator ? assertAddress(body.creator, "creator") : undefined;
    const draft = createAuralisDraft(prompt, {
      creator,
      agentName: "Auralis Agent",
      appName: "Auralis",
      externalUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://auralis.app",
    });

    return NextResponse.json({
      ok: true,
      draft,
      agent: {
        name: "Auralis Agent",
        action: "compose-nft-metadata",
        promptHash: draft.promptHash,
        erc8004: ERC8004_CELO.mainnet,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to compose artifact";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 400 },
    );
  }
}
