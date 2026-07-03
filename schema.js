// ── Launch Future · admin console schema ───────────────────────────────
// Declarative description of which view functions to display as stats,
// which lookups to expose, and which write functions are owner actions,
// per contract. app.js reads this to generate the UI.
//
// Every action / lookup can carry:
//   group:    "primary" (default) | "advanced" | "danger"
//             primary  -> always visible
//             advanced -> collapsed under "Advanced" (rarely-used / complex)
//             danger   -> collapsed under "Danger zone" (irreversible)
//   confirm:  text shown in a confirm dialog before sending the tx
//   payableValue: { name, label } — adds a native-coin amount field whose
//             value is sent as msg.value instead of a normal call arg
//
// Inputs support nested structs via { type: "tuple", fields: [...] }.

// Shared struct fragments (re-used by the token-deploy related calls) ----
const SUPPLY_CONFIG_FIELDS = [
  { name: "initialSupply", type: "uint256", label: "Initial supply (wei units)" },
  { name: "maxSupply",     type: "uint256", label: "Max supply (wei units)" },
  { name: "mintable",      type: "bool",    label: "Mintable?" },
  { name: "burnable",      type: "bool",    label: "Burnable?" }
];

const SECURITY_CONFIG_FIELDS = [
  { name: "antiBot",             type: "bool",   label: "Anti-bot enabled?" },
  { name: "blacklist",           type: "bool",   label: "Blacklist enabled?" },
  { name: "whitelist",           type: "bool",   label: "Whitelist enabled?" },
  { name: "tradingDelay",        type: "bool",   label: "Trading delay enabled?" },
  { name: "maxWalletEnabled",    type: "bool",   label: "Max wallet limit enabled?" },
  { name: "maxTxEnabled",        type: "bool",   label: "Max tx limit enabled?" },
  { name: "maxWalletPercent",    type: "uint16", label: "Max wallet % of supply (1–100, only if enabled above)" },
  { name: "maxTxPercent",        type: "uint16", label: "Max tx % of supply (1–100, only if enabled above)" },
  { name: "antiBotBlocks",       type: "uint32", label: "Anti-bot blocks" },
  { name: "tradingDelaySeconds", type: "uint32", label: "Trading delay (seconds)" }
];

const TAX_CONFIG_FIELDS = [
  { name: "buyTaxEnabled",      type: "bool",    label: "Buy tax enabled?" },
  { name: "sellTaxEnabled",     type: "bool",    label: "Sell tax enabled?" },
  { name: "transferTaxEnabled", type: "bool",    label: "Transfer tax enabled?" },
  { name: "buyTax",             type: "uint16",  label: "Buy tax % (0–10 max)" },
  { name: "sellTax",            type: "uint16",  label: "Sell tax % (0–10 max)" },
  { name: "transferTax",        type: "uint16",  label: "Transfer tax % (0–10 max)" },
  { name: "burnShare",          type: "uint16",  label: "Burn share % (all 7 shares must total exactly 100)" },
  { name: "marketingShare",     type: "uint16",  label: "Marketing share %" },
  { name: "developmentShare",   type: "uint16",  label: "Development share %" },
  { name: "treasuryShare",      type: "uint16",  label: "Treasury share %" },
  { name: "liquidityShare",     type: "uint16",  label: "Liquidity share %" },
  { name: "buybackShare",       type: "uint16",  label: "Buyback share %" },
  { name: "charityShare",       type: "uint16",  label: "Charity share % (burn+marketing+dev+treasury+liquidity+buyback+charity = 100)" },
  { name: "marketingWallet",    type: "address", label: "Marketing wallet (required if marketing share > 0)" },
  { name: "developmentWallet",  type: "address", label: "Development wallet (required if development share > 0)" },
  { name: "treasuryWallet",     type: "address", label: "Treasury wallet (required if treasury share > 0)" },
  { name: "liquidityWallet",    type: "address", label: "Liquidity wallet (required if liquidity share > 0)" },
  { name: "buybackWallet",      type: "address", label: "Buyback wallet (required if buyback share > 0)" },
  { name: "charityWallet",      type: "address", label: "Charity wallet (required if charity share > 0)" }
];

const TOKEN_CONFIG_FIELD = {
  name: "config", type: "tuple", label: "Token config",
  fields: [
    { name: "name",   type: "string",  label: "Token name" },
    { name: "symbol", type: "string",  label: "Token symbol" },
    { name: "owner",  type: "address", label: "Token owner" },
    { name: "supply",   type: "tuple", label: "Supply", fields: SUPPLY_CONFIG_FIELDS },
    { name: "security", type: "tuple", label: "Security", fields: SECURITY_CONFIG_FIELDS },
    { name: "taxes",    type: "tuple", label: "Taxes", fields: TAX_CONFIG_FIELDS }
  ]
};

const METADATA_CONFIG_FIELD = {
  name: "metadata", type: "tuple", label: "Metadata",
  fields: [
    { name: "website",  type: "string", label: "Website" },
    { name: "telegram", type: "string", label: "Telegram" },
    { name: "twitter",  type: "string", label: "Twitter" },
    { name: "logoURI",  type: "string", label: "Logo URI" }
  ]
};

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
      },
      {
        name: "allowance", label: "Check allowance",
        group: "advanced",
        inputs: [
          { name: "owner", type: "address", label: "Owner address" },
          { name: "spender", type: "address", label: "Spender address" }
        ],
        format: "token"
      },
      {
        name: "nonces", label: "Permit nonce",
        group: "advanced",
        inputs: [{ name: "owner", type: "address", label: "Wallet address" }]
      },
      {
        name: "DOMAIN_SEPARATOR", label: "EIP-712 domain separator",
        group: "advanced",
        inputs: []
      }
    ],
    actions: [
      {
        name: "transfer", label: "Transfer tokens",
        group: "advanced",
        inputs: [
          { name: "to", type: "address", label: "Recipient" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "approve", label: "Approve spender",
        group: "advanced",
        inputs: [
          { name: "spender", type: "address", label: "Spender address" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "transferFrom", label: "Transfer from (using allowance)",
        group: "advanced",
        inputs: [
          { name: "from", type: "address", label: "From" },
          { name: "to", type: "address", label: "To" },
          { name: "amount", type: "uint256", label: "Amount (wei units)" }
        ]
      },
      {
        name: "burn", label: "Burn my tokens",
        group: "advanced",
        inputs: [{ name: "amount", type: "uint256", label: "Amount (wei units)" }]
      },
      {
        name: "burnFrom", label: "Burn from (using allowance)",
        group: "advanced",
        inputs: [
          { name: "account", type: "address", label: "Account" },
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
        group: "danger",
        inputs: [{ name: "newOwner", type: "address", label: "New owner address" }]
      },
      {
        name: "renounceOwnership", label: "Renounce ownership",
        group: "danger",
        confirm: "This permanently removes the owner. This cannot be undone. Continue?",
        inputs: []
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
      },
      {
        name: "hasLiquidity", label: "Has enough liquidity?",
        inputs: [{ name: "amount", type: "uint256", label: "LFT amount (wei units)" }]
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
        group: "danger",
        inputs: [{ name: "newOwner", type: "address", label: "New owner address" }]
      },
      {
        name: "renounceOwnership", label: "Renounce ownership",
        group: "danger",
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
    lookups: [
      {
        name: "predictAddress", label: "Predict CREATE2 token address",
        group: "advanced",
        inputs: [
          TOKEN_CONFIG_FIELD,
          METADATA_CONFIG_FIELD,
          { name: "salt", type: "bytes32", label: "Salt (bytes32, 0x + 64 hex chars)" }
        ]
      }
    ],
    actions: [
      {
        name: "initializeFactory", label: "Set linked factory",
        group: "danger",
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
      { name: "burnPercent", label: "Burn % of deploy fee" },
      { name: "treasuryPercent", label: "Treasury % of deploy fee" },
      { name: "paused", label: "Paused", format: "bool" },
      { name: "totalDeployed", label: "Tokens deployed" },
      { name: "getFactoryTokenCount", label: "Factory token count" },
      { name: "totalCreators", label: "Total creators" },
      { name: "getCreatorCount", label: "Creator count" },
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
        name: "quoteNativeFee", label: "Quote native fee for payment symbol",
        inputs: [{ name: "paymentSymbol", type: "string", label: "Payment symbol" }]
      },
      {
        name: "getPaymentMethod", label: "Get payment method config",
        inputs: [{ name: "symbol", type: "string", label: "Payment symbol" }]
      },
      {
        name: "getStatistics", label: "Get full statistics",
        inputs: []
      },
      {
        name: "getPaymentKeys", label: "Get raw payment method keys",
        group: "advanced",
        inputs: []
      },
      {
        name: "tokenExists", label: "Does token exist?",
        inputs: [{ name: "token", type: "address", label: "Token address" }]
      },
      {
        name: "isTokenFromFactory", label: "Was token deployed by this factory?",
        inputs: [{ name: "token", type: "address", label: "Token address" }]
      },
      {
        name: "getDeployedToken", label: "Get deployed token by index",
        inputs: [{ name: "index", type: "uint256", label: "Index" }]
      },
      {
        name: "getDeployedTokens", label: "Get deployed tokens (paged)",
        inputs: [
          { name: "offset", type: "uint256", label: "Offset" },
          { name: "limit", type: "uint256", label: "Limit" }
        ]
      },
      {
        name: "getCreatorTokens", label: "Get tokens by creator",
        inputs: [{ name: "creator", type: "address", label: "Creator address" }]
      },
      {
        name: "predictTokenAddress", label: "Predict deployed token address",
        group: "advanced",
        inputs: [
          TOKEN_CONFIG_FIELD,
          METADATA_CONFIG_FIELD,
          { name: "salt", type: "bytes32", label: "Salt (bytes32, 0x + 64 hex chars)" }
        ]
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
        name: "setBurnPercent", label: "Set burn / treasury split of deploy fee",
        inputs: [
          { name: "newBurnPercent", type: "uint16", label: "Burn % (must add up to 100 with treasury %)" },
          { name: "newTreasuryPercent", type: "uint16", label: "Treasury % (must add up to 100 with burn %)" }
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
        name: "disablePaymentMethod", label: "Disable a single payment method",
        inputs: [{ name: "symbol", type: "string", label: "Symbol" }]
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
        group: "advanced",
        inputs: [
          { name: "symbol", type: "string", label: "Symbol" },
          {
            name: "payment", type: "tuple", label: "Payment config",
            fields: [
              { name: "enabled", type: "bool", label: "Enabled?" },
              { name: "isNative", type: "bool", label: "Is native coin?" },
              { name: "burnEnabled", type: "bool", label: "Burn enabled?" },
              { name: "token", type: "address", label: "Token address (0x0 if native)" },
              { name: "exchange", type: "address", label: "Exchange address (0x0 if none)" },
              { name: "deployFee", type: "uint256", label: "Deploy fee (wei units)" }
            ]
          }
        ]
      },
      {
        name: "deployWithNative", label: "Deploy a token (pay with native coin)",
        group: "advanced",
        payableValue: { name: "value", label: "Native amount to send (wei)" },
        inputs: [ TOKEN_CONFIG_FIELD, METADATA_CONFIG_FIELD ]
      },
      {
        name: "deployCreate2", label: "Deploy a token (CREATE2, deterministic address)",
        group: "advanced",
        inputs: [
          TOKEN_CONFIG_FIELD,
          METADATA_CONFIG_FIELD,
          { name: "paymentSymbol", type: "string", label: "Payment symbol" },
          { name: "salt", type: "bytes32", label: "Salt (bytes32, 0x + 64 hex chars)" }
        ]
      },
      {
        name: "deployWithPermit", label: "Deploy a token (pay via ERC-20 permit)",
        group: "advanced",
        inputs: [
          TOKEN_CONFIG_FIELD,
          METADATA_CONFIG_FIELD,
          { name: "paymentSymbol", type: "string", label: "Payment symbol" },
          { name: "deadline", type: "uint256", label: "Permit deadline (unix time)" },
          { name: "v", type: "uint8", label: "Signature v" },
          { name: "r", type: "bytes32", label: "Signature r" },
          { name: "s", type: "bytes32", label: "Signature s" }
        ]
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
        group: "danger",
        inputs: [{ name: "newOwner", type: "address", label: "New owner address" }]
      },
      {
        name: "acceptOwnership", label: "Accept ownership (step 2 of 2)",
        group: "danger",
        inputs: []
      }
    ]
  }
};
