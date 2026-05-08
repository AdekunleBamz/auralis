import type { Address } from "viem";

export const CELO_MAINNET_USDM = {
  symbol: "USDm",
  decimals: 18,
  address: "0x765DE816845861e75A25fCA122bb6898B8B1282a" as Address,
} as const;

export const AURALIS_MINIPAY_FEE_TOKEN = CELO_MAINNET_USDM;

export const AURALIS_MINIPAY_FEE = {
  symbol: "USDm",
  amount: "200000000000000",
  display: "0.0002 USDm",
} as const;
