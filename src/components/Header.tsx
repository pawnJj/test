'use client';
import Image from 'next/image';
import LangSelect from '@/components/LangSelect'
import { Link } from '@/i18n/navigation';
import { useDisconnect, useAppKit } from '@reown/appkit/react'
import { useTheme } from "next-themes";
export default function MyHeader() {
	const { open } = useAppKit();
	const { disconnect } = useDisconnect();
	const { theme, setTheme } = useTheme();
	const handleDisconnect = async () => {
		try {
			await disconnect();
		} catch (error) {
			console.error("Failed to disconnect:", error);
		}
	}
	const onChange = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	};
	return (
		<>
			<div className="text-red-500 w-[100%] max-w-[1200px] flex justify-between items-center">
				<Link href="/">
					<Image src="/img/common/headerLogo.png" alt="logo" width={42} height={0} style={{ height: 'auto' }} priority />
				</Link>
				<button onClick={() => open()}>Open</button>
				<button onClick={() => { handleDisconnect() }}>Disconnect</button>
				<button onClick={() => { onChange() }}>theme</button>
				<LangSelect />
			</div>
		</>
	)
}