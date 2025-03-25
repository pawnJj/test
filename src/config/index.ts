import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { defineChain } from "@reown/appkit/networks";
const customNetwork = defineChain({
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
});

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"; // this is a public projectId only to use on localhost

if (!projectId) {
    throw new Error("Project ID is not defined");
}

export const networks = [mainnet, arbitrum, customNetwork] as [AppKitNetwork, ...AppKitNetwork[]];

export const ethersAdapter = new EthersAdapter();
