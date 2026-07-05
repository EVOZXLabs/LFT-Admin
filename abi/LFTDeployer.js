[
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "FactoryAlreadySet",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidDeployer",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotFactory",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "factory",
                "type": "address"
            }
        ],
        "name": "FactoryInitialized",
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
                "internalType": "bool",
                "name": "create2",
                "type": "bool"
            }
        ],
        "name": "TokenDeployed",
        "type": "event"
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
        "name": "deploy",
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
        "inputs": [],
        "name": "deployer",
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
        "name": "factory",
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
                "internalType": "address",
                "name": "newFactory",
                "type": "address"
            }
        ],
        "name": "initializeFactory",
        "outputs": [],
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
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            }
        ],
        "name": "predictAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "predicted",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
