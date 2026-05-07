"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Coins,
  Copy,
  ExternalLink,
  LoaderCircle,
  Radio,
  Sparkles,
  Wallet,
  Wand2,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { createPublicClient, createWalletClient, custom, http, type Address, type Hex } from "viem";
import { celo, celoSepolia } from "viem/chains";
import {
  AURALIS_CHAIN,
  assertAddress,
  mintAuralisNft,
  type AuralisDraft,
} from "@auralis/sdk";

type ComposeResponse =
  | {
      ok: true;
      draft: AuralisDraft;
      agent: {
        name: string;
        action: string;
        promptHash: Hex;
      };
    }
  | {
      ok: false;
      error: string;
    };

type EthereumProvider = {
  isMiniPay?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

const DEFAULT_PROMPT =
  "a radiant market badge for makers who help local merchants accept stablecoin payments";
const EXAMPLES = [
  "a victory crest for a Lagos street football champion",
  "a solar mask for women-led savings circles",
  "a golden pass for early users of a community learning club",
];

const configuredChainId = Number(process.env.NEXT_PUBLIC_CELO_CHAIN_ID ?? "42220");
const selectedChain = configuredChainId === AURALIS_CHAIN.sepolia.id ? celoSepolia : celo;
const chainMeta =
  configuredChainId === AURALIS_CHAIN.sepolia.id ? AURALIS_CHAIN.sepolia : AURALIS_CHAIN.mainnet;
const configuredContract = process.env.NEXT_PUBLIC_AURALIS_NFT_ADDRESS ?? "";
const mintFeeWei = BigInt(process.env.NEXT_PUBLIC_AURALIS_MINT_FEE_WEI ?? "0");

export default function Home() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [account, setAccount] = useState<Address | null>(null);
  const [draft, setDraft] = useState<AuralisDraft | null>(null);
  const [status, setStatus] = useState("Ready");
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState<Hex | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const shortAccount = useMemo(() => {
    if (!account) return "Not connected";
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  }, [account]);

  const contractReady = configuredContract.length > 0;
  const explorerTx = txHash ? `${chainMeta.explorerUrl}/tx/${txHash}` : "";

  async function connectWallet() {
    setError("");
    setStatus("Opening wallet");

    try {
      const provider = getProvider();
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as Address[];

      await switchToCelo(provider);
      setAccount(assertAddress(accounts[0], "wallet"));
      setStatus(isMiniPay(provider) ? "MiniPay connected" : "Wallet connected");
    } catch (connectError) {
      setError(readError(connectError, "Wallet connection failed"));
      setStatus("Ready");
    }
  }

  async function composeArtifact(nextPrompt = prompt) {
    setError("");
    setIsComposing(true);
    setStatus("Agent shaping artifact");

    try {
      const response = await fetch("/api/agent/compose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: nextPrompt,
          creator: account,
        }),
      });
      const payload = (await response.json()) as ComposeResponse;

      if (!payload.ok) {
        throw new Error(payload.error);
      }

      setDraft(payload.draft);
      setPrompt(payload.draft.prompt);
      setStatus("Artifact ready");
      return payload.draft;
    } catch (composeError) {
      setError(readError(composeError, "Agent composition failed"));
      setStatus("Ready");
      return null;
    } finally {
      setIsComposing(false);
    }
  }

  async function mintArtifact() {
    setError("");
    setTxHash(null);

    try {
      const activeDraft = draft ?? (await composeArtifact());
      if (!activeDraft) return;

      if (!configuredContract) {
        throw new Error("Add NEXT_PUBLIC_AURALIS_NFT_ADDRESS after deploying the contract");
      }

      const provider = getProvider();
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as Address[];

      await switchToCelo(provider);
      setAccount(assertAddress(accounts[0], "wallet"));
      setIsMinting(true);
      setStatus("Confirm mint in wallet");

      const walletClient = createWalletClient({
        chain: selectedChain,
        transport: custom(provider),
      });
      const hash = await mintAuralisNft({
        walletClient,
        contractAddress: assertAddress(configuredContract, "Auralis contract"),
        tokenUri: activeDraft.tokenUri,
        promptHash: activeDraft.promptHash,
        value: mintFeeWei,
      });

      setTxHash(hash);
      setStatus("Waiting for Celo confirmation");

      const publicClient = createPublicClient({
        chain: selectedChain,
        transport: http(chainMeta.rpcUrl),
      });
      await publicClient.waitForTransactionReceipt({ hash });

      setStatus("Minted on Celo");
    } catch (mintError) {
      setError(readError(mintError, "Mint failed"));
      setStatus("Artifact ready");
    } finally {
      setIsMinting(false);
    }
  }

  async function copyHash() {
    if (!draft) return;
    await navigator.clipboard.writeText(draft.promptHash);
    setStatus("Prompt hash copied");
  }

  return (
    <main className="min-h-screen px-4 py-4 text-[#151716] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <header className="flex items-center justify-between gap-3 border-b border-black/10 pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/auralis-logo.svg" alt="Auralis" width={52} height={52} priority />
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-black tracking-normal sm:text-3xl">Auralis</h1>
              <p className="truncate text-sm font-semibold text-black/[0.58]">Text-shaped Celo artifacts</p>
            </div>
          </div>
          <button
            type="button"
            onClick={connectWallet}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-black/15 bg-[#151716] text-white shadow-sm transition hover:bg-black"
            aria-label="Connect wallet"
            title={shortAccount}
          >
            <Wallet size={20} />
          </button>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-lg border border-black/10 bg-[#fffdf6]/92 p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <StatusPill icon={<Radio size={14} />} label={status} />
              <StatusPill icon={<Coins size={14} />} label={chainMeta.name} />
              <StatusPill icon={<BadgeCheck size={14} />} label={contractReady ? "Contract set" : "Deploy pending"} />
            </div>

            <label htmlFor="prompt" className="mb-2 block text-sm font-black uppercase tracking-normal">
              Seed phrase
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="min-h-40 w-full resize-none rounded-lg border border-black/15 bg-white px-4 py-3 text-base font-semibold leading-7 outline-none transition focus:border-[#19b885] focus:ring-4 focus:ring-[#19b885]/15"
              maxLength={420}
            />

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => {
                    setPrompt(example);
                    void composeArtifact(example);
                  }}
                  className="min-h-16 rounded-lg border border-black/10 bg-white px-3 py-2 text-left text-xs font-bold leading-5 text-black/70 transition hover:border-[#19b885] hover:text-black"
                >
                  {example}
                </button>
              ))}
            </div>

            {error ? (
              <p className="mt-4 rounded-lg border border-[#ef5f64]/25 bg-[#fff0ee] px-3 py-2 text-sm font-bold text-[#982b30]">
                {error}
              </p>
            ) : null}

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr]">
              <button
                type="button"
                onClick={() => void composeArtifact()}
                disabled={isComposing || prompt.trim().length === 0}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-black/15 bg-white px-4 text-sm font-black transition hover:border-[#f6b847] disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isComposing ? <LoaderCircle className="animate-spin" size={18} /> : <Wand2 size={18} />}
                Shape
              </button>
              <button
                type="button"
                onClick={() => void mintArtifact()}
                disabled={isMinting || isComposing || prompt.trim().length === 0}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#151716] px-4 text-sm font-black text-white shadow-sm transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isMinting ? <LoaderCircle className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Mint
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-[#151716] p-4 text-white shadow-sm sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-normal text-white/[0.52]">Preview</p>
                <h2 className="truncate text-xl font-black">{draft?.name ?? "Unshaped Artifact"}</h2>
              </div>
              <Image src="/auralis-logo.svg" alt="" width={38} height={38} className="rounded-md bg-white/90" />
            </div>

            <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-lg border border-white/10 bg-[#f7f5ee]">
              {draft ? (
                <Image
                  src={draft.image}
                  alt={draft.name}
                  width={1000}
                  height={1000}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#f7f5ee,#dcfff2_48%,#ffe5df)] p-6 text-center text-[#151716]">
                  <Image src="/auralis-logo.svg" alt="" width={132} height={132} />
                  <p className="max-w-xs text-lg font-black leading-7">Your artifact will appear here.</p>
                </div>
              )}
            </div>

            <div className="mt-4 grid gap-2 text-sm">
              <DataRow label="Wallet" value={shortAccount} />
              <DataRow label="Hash" value={draft?.promptHash ?? "Waiting"} action={draft ? copyHash : undefined} />
              <DataRow
                label="Mint"
                value={txHash ? `${txHash.slice(0, 10)}...${txHash.slice(-8)}` : "No transaction yet"}
                href={explorerTx}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-4">
          <Signal label="Agent" value="Compose" />
          <Signal label="Wallet" value="MiniPay" />
          <Signal label="Network" value={chainMeta.name} />
          <Signal label="ERC-8004" value="Ready" />
        </section>
      </div>
    </main>
  );
}

function StatusPill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 rounded-md border border-black/10 bg-white px-3 text-xs font-black text-black/70">
      {icon}
      {label}
    </span>
  );
}

function DataRow({
  label,
  value,
  href,
  action,
}: {
  label: string;
  value: string;
  href?: string;
  action?: () => void;
}) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-3">
      <span className="shrink-0 text-xs font-black uppercase tracking-normal text-white/50">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-w-0 items-center gap-2 truncate text-right font-bold text-[#f6b847]"
        >
          <span className="truncate">{value}</span>
          <ExternalLink size={14} />
        </a>
      ) : action ? (
        <button
          type="button"
          onClick={action}
          className="inline-flex min-w-0 items-center gap-2 truncate text-right font-bold text-[#f6b847]"
        >
          <span className="truncate">{value}</span>
          <Copy size={14} />
        </button>
      ) : (
        <span className="min-w-0 truncate text-right font-bold text-white/[0.78]">{value}</span>
      )}
    </div>
  );
}

function Signal({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white/60 px-4 py-3">
      <p className="text-xs font-black uppercase tracking-normal text-black/45">{label}</p>
      <p className="mt-1 truncate text-lg font-black">{value}</p>
    </div>
  );
}

function getProvider(): EthereumProvider {
  const provider = (window as typeof window & { ethereum?: EthereumProvider }).ethereum;

  if (!provider) {
    throw new Error("Open Auralis in MiniPay or a Celo-compatible wallet browser");
  }

  return provider;
}

function isMiniPay(provider: EthereumProvider): boolean {
  return Boolean(provider.isMiniPay || /MiniPay/i.test(window.navigator.userAgent));
}

async function switchToCelo(provider: EthereumProvider) {
  const chainId = `0x${configuredChainId.toString(16)}`;

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }],
    });
  } catch (switchError) {
    const maybeError = switchError as { code?: number };

    if (maybeError.code !== 4902) {
      throw switchError;
    }

    await provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId,
          chainName: chainMeta.name,
          nativeCurrency: {
            name: "CELO",
            symbol: "CELO",
            decimals: 18,
          },
          rpcUrls: [chainMeta.rpcUrl],
          blockExplorerUrls: [chainMeta.explorerUrl],
        },
      ],
    });
  }
}

function readError(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "object" && error && "message" in error) {
    const message = String((error as { message?: unknown }).message);
    return message || fallback;
  }

  return fallback;
}
