'use client'
import { useEffect } from 'react'
import { ethersAdapter, projectId, networks } from '@/config'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { useAppKitAccount } from '@reown/appkit/react'

if (!projectId) {
	throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
	name: 'Gaur.com',
	description: 'Build on-chain Binance 🦬',
	url: 'https://gaur.com',
	icons: []
}

const mainnet = {
	id: 9736,
	caipNetworkId: "eip155:9736",
	chainNamespace: "eip155",
	name: "Bome Mainnet",
	nativeCurrency: {
		decimals: 18,
		name: "BOME",
		symbol: "BOME",
	},
	rpcUrls: {
		default: {
			http: ["https://rpc.bomechain.org"],
		},
	},
	blockExplorers: {
		default: {
			name: "BomeScan",
			url: "https://bomescan.org",
			apiUrl: "https://bomescan.org",
		},
	},
	contracts: {
		// Add the contracts here
	},
}

// Create the modal
export const modal = createAppKit({
	adapters: [ethersAdapter],
	projectId,
	defaultNetwork: mainnet,
	networks,
	metadata,
	themeMode: 'dark',
	featuredWalletIds: [
		"c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
		"971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
	],
	features: {
		analytics: true, // Optional - defaults to your Cloud configuration
		connectMethodsOrder: ['wallet'],
		onramp: false,
		swaps: false
	},
	themeVariables: {
		"--w3m-accent": "hsla(69, 100%, 48%, 0.8)",
		"--w3m-color-mix": "#000",
		"--w3m-color-mix-strength": 20,
		"--w3m-border-radius-master": "1.5px",
	},
	allWallets: 'HIDE'
})

function ContextProvider({ children }: { children: ReactNode }) {
	const { address, isConnected } = useAppKitAccount();

	useEffect(() => {
		console.log("Address: ", address, isConnected);
	}, [address]);

	return (
		<>{children}</>
	)
}

export default ContextProvider
