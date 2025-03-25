'use client';
import { Suspense } from 'react'
import Loading from './loading'
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
// import { useRouter } from '@/i18n/navigation';
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const t = useTranslations('header');
	const router = useRouter();
	const toDetails = () => {
		setLoading(true);
		router.push('/blog/1');
	}
	const toDetails1 = () => {
		router.push('/test');
	}
	useEffect(() => {
	}, []);

	return (
		<div className="">
			{loading && <p>Loading...</p>}
			<Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
			<h1>AppKit ethers Next.js App Router Example</h1>
			<h1 className="text-3xl font-bold underline text-[red]" onClick={toDetails}>
				{t('title')}
			</h1>
			<h1 className="text-3xl font-bold underline text-[red]" onClick={toDetails1}>
				{t('title')}
			</h1>
			<Link href="/blog/1">
				<button>
					Go to Home
				</button>
			</Link>
			<img src="/api/og?logo=https://newgame.mypinata.cloud/ipfs/QmYmEFzjXL8f4xEGkNNo4MuCz1LY2PotovK2i2MbQa31Bv&name=21" alt="OG Image Preview" />

			<Suspense fallback={<Loading />}>
				<img src="/api/og?logo=https://newgame.mypinata.cloud/ipfs/QmYmEFzjXL8f4xEGkNNo4MuCz1LY2PotovK2i2MbQa31Bv&name=21" alt="OG Image Preview" />
			</Suspense>
			<ActionButtonList />
			<div className="advice">
				<p>
					This projectId only works on localhost. <br />
					Go to <a href="https://cloud.reown.com" target="_blank" className="link-button" rel="Reown Cloud">Reown Cloud</a> to get your own.
				</p>
			</div>
			<InfoList />
		</div>
	);
}