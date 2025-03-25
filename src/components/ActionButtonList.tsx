import { useDisconnect, useAppKit, useAppKitNetwork, useAppKitProvider, useAppKitAccount } from '@reown/appkit/react'
import { BrowserProvider, Eip1193Provider } from 'ethers'
import { networks } from '@/config'
import api from "@/service/api";
import useStore from "@/store/useStore"
export const ActionButtonList = () => {
	const { disconnect } = useDisconnect();
	const { open } = useAppKit();
	const { switchNetwork } = useAppKitNetwork();
	const { walletProvider } = useAppKitProvider('eip155') as { walletProvider: Eip1193Provider };
	const { address } = useAppKitAccount();
	const { bears, addABear } = useStore();

	const handleDisconnect = async () => {
		try {
			await disconnect();
		} catch (error) {
			console.error("Failed to disconnect:", error);
		}
	}

	async function onSignMessage() {
		if (!walletProvider) {
			console.error('Wallet provider is not available');
			return;
		}
		const currentTime = Math.floor(Date.now() / 1000);;
		const encodedMessage = currentTime.toString();
		const provider = new BrowserProvider(walletProvider as Eip1193Provider)
		const signer = await provider.getSigner()
		const signature = await signer?.signMessage(encodedMessage)
		// const a = await api.getFeeList();
		// const res = await fetch('/api/login', {
		// 	headers: { Authorization: 'Bearer user-token' },
		// });
		const params = {
			address: address,
			message: currentTime,
			signature: signature
		};
		console.log(params)
		const response = await api.getUserLP(params);
		console.log(response)
	}
	const getInfo = async () => {
		let data = {
			// creator: '0xe7a35bd49997e10c51b5e1dea4de366da7f831f3',
			pageIndex: 1,
			pageSize: 10

		}
		const a = await api.getFairLaunchTrade('0xc88df62578e5e9762faabe9c7469cf04967b96e1', data);
		console.log(a)
	}


	return (
		<div>
			<button onClick={() => open()}>Open{bears}</button>
			<button onClick={() => onSignMessage()}>sign</button>
			<button onClick={handleDisconnect}>Disconnect</button>
			<button onClick={() => switchNetwork(networks[1])}>Switch</button>
			<button onClick={addABear}>test</button>
			<button onClick={getInfo}>test1</button>
		</div>
	)
}
