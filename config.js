// ── Launch Future · admin console config ──────────────────────────────
// Edit the addresses below if contracts are redeployed. No build step
// needed — just commit and GitHub Pages will pick it up.

window.LFT_CONFIG = {
  // EVOZ Mainnet
  chainId: 805,

  // Block explorer base URL for "view on explorer" links.
  explorerUrl: "https://evozscan.com",

  // Public read-only RPC endpoint — used so stats load even without a
  // wallet extension installed (e.g. viewing on a phone browser).
  rpcUrl: "https://rpc.evozscan.com",

  contracts: {
    treasury: {
      label: "Treasury",
      address: "0x50Cd30Ff7f0fbBD9d0FDe1F60DE8c52D6F390c5C",
      note: "Wallet, not a contract — shown for reference only."
    },
    token: {
      label: "LFT Token",
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
      address: "0xf65378BdAC0b8028535a3b4b3b6E8585BbB66fA4",
      abiVar: "LFTDeployerABI"
    },
    factory: {
      label: "LFTFactory",
      address: "0x818515991962dd22bE02Aadc4895FCC6366dF9B1",
      abiVar: "LFTFactoryABI"
    }
  }
};
