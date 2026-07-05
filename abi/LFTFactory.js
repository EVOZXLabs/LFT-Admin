[
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_treasury",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "_burnPercent",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "_treasuryPercent",
                "type": "uint16"
            },
            {
                "internalType": "address",
                "name": "_deployer",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "BurnTransferFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "BuyTaxLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "CannotRecoverPaymentToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FactoryPaused",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "FeeTransferFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "IndexOutOfRange",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientNativeFee",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientTokenBalance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidBuybackWallet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidCharityWallet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDeployFee",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDeployer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDevelopmentWallet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidExchange",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidLiquidityWallet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidMarketingWallet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidMaxSupply",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidName",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidPaymentToken",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidPercent",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidSecurityConfig",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidSupply",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidSymbol",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidTaxShares",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidTreasury",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidTreasuryWallet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoNative",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotNativePayment",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotPendingOwner",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "PaymentDisabled",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RecoverFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SellTaxLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "SymbolExists",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TransferTaxLimit",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "TreasuryTransferFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UseDeployFunction",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UseNativeDeploy",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UtilityTokenNotReceived",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ZeroUtilityTokenQuote",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "oldBurnPercent",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "newBurnPercent",
                "type": "uint16"
            }
        ],
        "name": "BurnPercentUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldDeployer",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newDeployer",
                "type": "address"
            }
        ],
        "name": "DeployerUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bool",
                "name": "paused",
                "type": "bool"
            }
        ],
        "name": "FactoryPaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "MetadataURIUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "pendingOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferInitiated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "count",
                "type": "uint256"
            }
        ],
        "name": "PaymentMethodBatchUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "key",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "enabled",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "deployFee",
                "type": "uint256"
            }
        ],
        "name": "PaymentMethodUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "createdAt",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "create2",
                "type": "bool"
            }
        ],
        "name": "TokenDeployed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "oldTreasury",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newTreasury",
                "type": "address"
            }
        ],
        "name": "TreasuryUpdated",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "CHAIN_ID",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEAD",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "acceptOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
            }
        ],
        "name": "batchDisablePayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
            }
        ],
        "name": "batchEnablePayment",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "symbols",
                "type": "string[]"
            },
            {
                "internalType": "uint256[]",
                "name": "fees",
                "type": "uint256[]"
            }
        ],
        "name": "batchUpdateFee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "burnPercent",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "creatorTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "initialSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "maxSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "mintable",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "burnable",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SupplyConfig",
                        "name": "supply",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "antiBot",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "blacklist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "whitelist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "tradingDelay",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxWalletEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxTxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxWalletPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxTxPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint32",
                                "name": "antiBotBlocks",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint32",
                                "name": "tradingDelaySeconds",
                                "type": "uint32"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SecurityConfig",
                        "name": "security",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "buyTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "sellTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "transferTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buyTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "sellTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "transferTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "burnShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "marketingShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "developmentShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "treasuryShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "liquidityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buybackShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "charityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "address",
                                "name": "marketingWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "developmentWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "treasuryWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "liquidityWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "buybackWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "charityWallet",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.TaxConfig",
                        "name": "taxes",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.TokenConfig",
                "name": "config",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "website",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "telegram",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "twitter",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "logoURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.MetadataConfig",
                "name": "metadata",
                "type": "tuple"
            },
            {
                "internalType": "string",
                "name": "paymentSymbol",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            }
        ],
        "name": "deployCreate2",
        "outputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "initialSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "maxSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "mintable",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "burnable",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SupplyConfig",
                        "name": "supply",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "antiBot",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "blacklist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "whitelist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "tradingDelay",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxWalletEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxTxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxWalletPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxTxPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint32",
                                "name": "antiBotBlocks",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint32",
                                "name": "tradingDelaySeconds",
                                "type": "uint32"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SecurityConfig",
                        "name": "security",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "buyTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "sellTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "transferTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buyTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "sellTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "transferTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "burnShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "marketingShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "developmentShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "treasuryShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "liquidityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buybackShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "charityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "address",
                                "name": "marketingWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "developmentWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "treasuryWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "liquidityWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "buybackWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "charityWallet",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.TaxConfig",
                        "name": "taxes",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.TokenConfig",
                "name": "config",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "website",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "telegram",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "twitter",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "logoURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.MetadataConfig",
                "name": "metadata",
                "type": "tuple"
            }
        ],
        "name": "deployWithNative",
        "outputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "initialSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "maxSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "mintable",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "burnable",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SupplyConfig",
                        "name": "supply",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "antiBot",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "blacklist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "whitelist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "tradingDelay",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxWalletEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxTxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxWalletPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxTxPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint32",
                                "name": "antiBotBlocks",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint32",
                                "name": "tradingDelaySeconds",
                                "type": "uint32"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SecurityConfig",
                        "name": "security",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "buyTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "sellTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "transferTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buyTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "sellTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "transferTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "burnShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "marketingShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "developmentShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "treasuryShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "liquidityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buybackShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "charityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "address",
                                "name": "marketingWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "developmentWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "treasuryWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "liquidityWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "buybackWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "charityWallet",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.TaxConfig",
                        "name": "taxes",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.TokenConfig",
                "name": "config",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "website",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "telegram",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "twitter",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "logoURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.MetadataConfig",
                "name": "metadata",
                "type": "tuple"
            },
            {
                "internalType": "string",
                "name": "paymentSymbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "deployWithPermit",
        "outputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "deployedTokens",
        "outputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "initialSupply",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "createdAt",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deployer",
        "outputs": [
            {
                "internalType": "contract ILFTDeployer",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "disablePaymentMethod",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factoryMetadataURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCreatorCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "getCreatorTokens",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "paymentSymbol",
                "type": "string"
            }
        ],
        "name": "getDeployFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "deployFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "burnAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "treasuryAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getDeployedToken",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialSupply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdAt",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.TokenInfo",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "offset",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "name": "getDeployedTokens",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "initialSupply",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "createdAt",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.TokenInfo[]",
                "name": "result",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getFactoryTokenCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPaymentKeys",
        "outputs": [
            {
                "internalType": "bytes32[]",
                "name": "",
                "type": "bytes32[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "getPaymentMethod",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "enabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isNative",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "burnEnabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "exchange",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deployFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.PaymentMethod",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStatistics",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "totalTokens",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalCreators",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalDeployFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalBurnedFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.FactoryStats",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "isFactoryToken",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            }
        ],
        "name": "isSymbolAvailable",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "isTokenFromFactory",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "paymentMethods",
        "outputs": [
            {
                "internalType": "bool",
                "name": "enabled",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isNative",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "burnEnabled",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "exchange",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "deployFee",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pendingOwner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "initialSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "maxSupply",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "mintable",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "burnable",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SupplyConfig",
                        "name": "supply",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "antiBot",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "blacklist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "whitelist",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "tradingDelay",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxWalletEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "maxTxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxWalletPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "maxTxPercent",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint32",
                                "name": "antiBotBlocks",
                                "type": "uint32"
                            },
                            {
                                "internalType": "uint32",
                                "name": "tradingDelaySeconds",
                                "type": "uint32"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.SecurityConfig",
                        "name": "security",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "buyTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "sellTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "transferTaxEnabled",
                                "type": "bool"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buyTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "sellTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "transferTax",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "burnShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "marketingShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "developmentShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "treasuryShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "liquidityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "buybackShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "uint16",
                                "name": "charityShare",
                                "type": "uint16"
                            },
                            {
                                "internalType": "address",
                                "name": "marketingWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "developmentWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "treasuryWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "liquidityWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "buybackWallet",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "charityWallet",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ERC20MaxTypes.TaxConfig",
                        "name": "taxes",
                        "type": "tuple"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.TokenConfig",
                "name": "config",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "website",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "telegram",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "twitter",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "logoURI",
                        "type": "string"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.MetadataConfig",
                "name": "metadata",
                "type": "tuple"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            }
        ],
        "name": "predictTokenAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "paymentSymbol",
                "type": "string"
            }
        ],
        "name": "quoteNativeFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "nativeFee",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "utilityAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "burnAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "treasuryAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "recoverERC20",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "recoverNative",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "newBurnPercent",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "newTreasuryPercent",
                "type": "uint16"
            }
        ],
        "name": "setBurnPercent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newDeployer",
                "type": "address"
            }
        ],
        "name": "setDeployer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "setFactoryMetadataURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "state",
                "type": "bool"
            }
        ],
        "name": "setPaused",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "enabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isNative",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "burnEnabled",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "token",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "exchange",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "deployFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ERC20MaxTypes.PaymentMethod",
                "name": "payment",
                "type": "tuple"
            }
        ],
        "name": "setPaymentMethod",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newTreasury",
                "type": "address"
            }
        ],
        "name": "setTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "symbolExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "tokenExists",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalBurnedFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalCreators",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDeployFeeCollected",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDeployed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalPaymentMethods",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasury",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "treasuryPercent",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
