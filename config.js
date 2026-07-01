// ── Launch Future · admin console config ──────────────────────────────
// Edit the addresses below if contracts are redeployed. No build step
// needed — just commit and GitHub Pages will pick it up.

window.LFT_CONFIG = {
  // Set this to your chain's numeric ID (e.g. 56 for BNB Chain, 8453 for
  // Base, 1 for Ethereum). Leave as null to skip the network check.
  chainId: null,

  // Optional block explorer base URL for "view on explorer" links,
  // e.g. "https://bscscan.com" or "https://basescan.org". Leave "" to hide.
  explorerUrl: "",

  contracts: {
    treasury: {
      label: "Treasury",
      address: "0x50Cd30Ff7f0fbBD9d0FDe1F60DE8c52D6F390c5C",
      note: "Wallet, not a contract — shown for reference only."
    },
    token: {
      label: "LaunchFutureToken",
      address: "0x62B9559F193d111aF92d9a5604d79024BFB1C847",
      abiVar: "LaunchFutureTokenABI"
    },
    exchange: {
      label: "LaunchFutureExchange",
      address: "0x9680B43F695d5245062e59CCA92ad92DE5aed56e",
      abiVar: "LaunchFutureExchangeABI"
    },
    deployer: {
      label: "LFTDeployer",
      address: "0x3f81E785628D452A8Aae1536D15A3586B490F0c5",
      abiVar: "LFTDeployerABI"
    },
    factory: {
      label: "LFTFactory",
      address: "0xcd86Ca358283f06581365635372E5bF0D30271D3",
      abiVar: "LFTFactoryABI"
    }
  }
};
