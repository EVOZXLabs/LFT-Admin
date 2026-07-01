// ── Launch Future · admin console schema ───────────────────────────────
// Declarative description of which view functions to display as stats
// and which write functions to expose as owner actions, per contract.
// app.js reads this to generate the UI — no contract-specific code there.

window.LFT_SCHEMA = {

  token: {
    reads: [
      { name: "name", label: "Name" },
      { name: "symbol", label: "Symbol" },
      { name: "decimals", label: "Decimals" },
      { name: "totalSupply", label: "Total supply", format: "token" },
      { name: "MAX_SUPPLY", label: "Max supply", format: "token" },
      { name: "owner", label: "Owner", format: "address" }
    ],
    lookups: [
      {
        name: "balanceOf", label: "Check balance",
        inputs: [{ name: "account", type: "address", label: "Wallet address" }],
        format: "token"
      }
    ],
    actions: [
      {
        name: "transferOwnership", label: "Transfer ownership",
        danger: true,
        inputs: [{ name: "newOwner", type: "address", label: "New owner address" }]
      },
      {
        name: "renounceOwnership", label: "Renounce ownership",
        danger: true,
        confirm: "This permanently removes the owner. This cannot be undone. Continue?",
        inputs: []
      },
      {
        name: "recoverERC20", label: "Recover stuck ERC-20 tokens",
        inputs: [
          { name: "token", type: "address", label: "Token address" },
          { name: "recipient", type: "address", label: "Send to" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "recoverNativeCoin", label: "Recover stuck native coin",
        inputs: [
          { name: "recipient", type: "address", label: "Send to" },
          { name: "amount", type: "uint256", label: "Amount (wei)" }
        ]
      }
    ]
  },

  exchange: {
    reads: [
      { name: "owner", label: "Owner", format: "address" },
      { name: "treasury", label: "Treasury", format: "address" },
      { name: "paymentToken", label: "LFT token address", format: "address" },
      { name: "lftPerNative", label: "LFT per native coin" },
      { name: "availableLiquidity", label: "Available LFT liquidity", format: "token" }
    ],
    lookups: [
      {
        name: "quoteLFT", label: "Quote LFT for native amount",
        inputs: [{ name: "nativeAmount", type: "uint256", label: "Native amount (wei)" }]
      },
      {
        name: "canPurchase", label: "Can purchase?",
        inputs: [{ name: "nativeAmount", type: "uint256", label: "Native amount (wei)" }]
      }
    ],
    actions: [
      {
        name: "setLFTPerNative", label: "Set LFT-per-native rate",
        inputs: [{ name: "newRate", type: "uint256", label: "New rate" }]
      },
      {
        name: "setTreasury", label: "Set treasury address",
        inputs: [{ name: "newTreasury", type: "address", label: "New treasury address" }]
      },
      {
        name: "withdrawReserve", label: "Withdraw LFT reserve",
        inputs: [
          { name: "recipient", type: "address", label: "Send to" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "recoverERC20", label: "Recover stuck ERC-20 tokens",
        inputs: [
          { name: "token", type: "address", label: "Token address" },
          { name: "recipient", type: "address", label: "Send to" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "recoverNativeCoin", label: "Recover stuck native coin",
        inputs: [
          { name: "recipient", type: "address", label: "Send to" },
          { name: "amount", type: "uint256", label: "Amount (wei)" }
        ]
      },
      {
        name: "transferOwnership", label: "Transfer ownership",
        danger: true,
        inputs: [{ name: "newOwner", type: "address", label: "New owner address" }]
      },
      {
        name: "renounceOwnership", label: "Renounce ownership",
        danger: true,
        confirm: "This permanently removes the owner. This cannot be undone. Continue?",
        inputs: []
      }
    ]
  },

  deployer: {
    reads: [
      { name: "deployer", label: "Deployer (CREATE2 signer)", format: "address" },
      { name: "factory", label: "Linked factory", format: "address" }
    ],
    lookups: [],
    actions: [
      {
        name: "initializeFactory", label: "Set linked factory",
        danger: true,
        confirm: "This can usually only be set once. Continue?",
        inputs: [{ name: "newFactory", type: "address", label: "Factory address" }]
      }
    ]
  },

  factory: {
    reads: [
      { name: "owner", label: "Owner", format: "address" },
      { name: "pendingOwner", label: "Pending owner", format: "address" },
      { name: "treasury", label: "Treasury", format: "address" },
      { name: "deployer", label: "Deployer", format: "address" },
      { name: "burnPercent", label: "Burn percent (bps)" },
      { name: "treasuryPercent", label: "Treasury percent (bps)" },
      { name: "paused", label: "Paused", format: "bool" },
      { name: "totalDeployed", label: "Tokens deployed" },
      { name: "totalCreators", label: "Total creators" },
      { name: "totalDeployFeeCollected", label: "Total deploy fees collected", format: "token" },
      { name: "totalBurnedFee", label: "Total fee burned", format: "token" },
      { name: "totalPaymentMethods", label: "Payment methods" },
      { name: "factoryMetadataURI", label: "Metadata URI" }
    ],
    lookups: [
      {
        name: "isSymbolAvailable", label: "Is symbol available?",
        inputs: [{ name: "symbol", type: "string", label: "Token symbol" }]
      },
      {
        name: "getDeployFee", label: "Get deploy fee for payment symbol",
        inputs: [{ name: "paymentSymbol", type: "string", label: "Payment symbol" }]
      },
      {
        name: "getPaymentMethod", label: "Get payment method config",
        inputs: [{ name: "symbol", type: "string", label: "Payment symbol" }]
      }
    ],
    actions: [
      {
        name: "setTreasury", label: "Set treasury address",
        inputs: [{ name: "newTreasury", type: "address", label: "New treasury address" }]
      },
      {
        name: "setDeployer", label: "Set deployer address",
        inputs: [{ name: "newDeployer", type: "address", label: "New deployer address" }]
      },
      {
        name: "setBurnPercent", label: "Set burn / treasury split (bps)",
        inputs: [
          { name: "newBurnPercent", type: "uint16", label: "Burn percent (bps, 100 = 1%)" },
          { name: "newTreasuryPercent", type: "uint16", label: "Treasury percent (bps)" }
        ]
      },
      {
        name: "setPaused", label: "Pause / unpause deployments",
        inputs: [{ name: "state", type: "bool", label: "Paused?" }]
      },
      {
        name: "setFactoryMetadataURI", label: "Set factory metadata URI",
        inputs: [{ name: "uri", type: "string", label: "Metadata URI" }]
      },
      {
        name: "batchEnablePayment", label: "Enable payment methods",
        inputs: [{ name: "symbols", type: "string[]", label: "Symbols (comma-separated)" }]
      },
      {
        name: "batchDisablePayment", label: "Disable payment methods",
        inputs: [{ name: "symbols", type: "string[]", label: "Symbols (comma-separated)" }]
      },
      {
        name: "batchUpdateFee", label: "Batch update deploy fees",
        inputs: [
          { name: "symbols", type: "string[]", label: "Symbols (comma-separated)" },
          { name: "fees", type: "uint256[]", label: "Fees, same order (comma-separated, wei units)" }
        ]
      },
      {
        name: "setPaymentMethod", label: "Add / update a payment method",
        advanced: true,
        inputs: [
          { name: "symbol", type: "string", label: "Symbol" },
          { name: "payment.enabled", type: "bool", label: "Enabled?" },
          { name: "payment.isNative", type: "bool", label: "Is native coin?" },
          { name: "payment.burnEnabled", type: "bool", label: "Burn enabled?" },
          { name: "payment.token", type: "address", label: "Token address (0x0 if native)" },
          { name: "payment.exchange", type: "address", label: "Exchange address (0x0 if none)" },
          { name: "payment.deployFee", type: "uint256", label: "Deploy fee (wei units)" }
        ],
        struct: { payment: ["enabled", "isNative", "burnEnabled", "token", "exchange", "deployFee"] }
      },
      {
        name: "recoverERC20", label: "Recover stuck ERC-20 tokens",
        inputs: [
          { name: "token", type: "address", label: "Token address" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "recoverNative", label: "Recover stuck native coin",
        inputs: []
      },
      {
        name: "transferOwnership", label: "Transfer ownership (step 1 of 2)",
        danger: true,
        inputs: [{ name: "newOwner", type: "address", label: "New owner address" }]
      },
      {
        name: "acceptOwnership", label: "Accept ownership (step 2 of 2)",
        danger: true,
        inputs: []
      }
    ]
  }
};
