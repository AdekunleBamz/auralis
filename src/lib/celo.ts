import type { Address } from "viem";

/** Celo Mainnet USDm token descriptor used by MiniPay stablecoin minting. */
export const CELO_MAINNET_USDM = {
  symbol: "USDm",
  decimals: 18,
  address: "0x765DE816845861e75A25fCA122bb6898B8B1282a" as Address,
} as const;

/** Fee token used for MiniPay stablecoin minting paths. Defaults to USDm. */
export const AURALIS_MINIPAY_FEE_TOKEN = CELO_MAINNET_USDM;

/** Fee descriptor for MiniPay minting: amount in USDm base units and display label. */
export const AURALIS_MINIPAY_FEE = {
  symbol: "USDm",
  decimals: 18,
  amount: "200000000000000",
  display: "0.0002 USDm",
} as const;
