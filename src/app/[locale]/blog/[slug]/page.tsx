// 'use client'
// import { useEffect, useState } from 'react';
import { Suspense } from "react";
import type { Metadata } from 'next'
const siteUrl = "https://next-gaur-git-master-nihao-com-bcfa318a.vercel.app";
const img = "https://newgame.mypinata.cloud/ipfs/QmYmEFzjXL8f4xEGkNNo4MuCz1LY2PotovK2i2MbQa31Bv"
import TestTTT from "@/components/Test";
import ServerComponentExample from '@/components/Og'
export async function generateMetadata() {
	const data = {
		'mint': "3dHrb7ryfHdBmQuY1C7ck7hV8L8qGJySpq6pSb9qMGZY",
		'chain': "solana"
	};
	const res = await fetch('https://api.game.com/v2/newsupe/collection/show', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	const post = await res.json();
	const dataRes = post.data.collection_info
	// const dataRes = { symbol: '11' }
	console.log(dataRes)

	return {
		title: '分享标题',
		description: '分享描述内容',
		openGraph: {
			title: '分享标题',
			description: '分享描述内容',
			url: `${siteUrl}/share-page`, // 当前页面完整 URL
			siteName: '网站名称',
			images: [
				{
					url: `${siteUrl}/api/og?name=${dataRes.symbol}&logo=${img}`, // 绝对路径图片地址
					width: 1200,   // 推荐尺寸
					height: 630,
					alt: '分享图片描述',
				}
			],
			type: 'website',
		},

		// Twitter 卡片协议
		twitter: {
			card: 'summary_large_image', // 显示大图
			title: '分享标题',
			description: '分享描述内容',
			creator: '@你的推特账号',
			images: {
				url: `${siteUrl}/api/og?name=${dataRes.symbol}&logo=${img}`, // 必须与 openGraph 一致
				alt: '分享图片描述',
			},
		},
	};
}
export default function Page() {

	return <>
		<div className='text-black dark:text-[red]'>Hello, Blog Post Page!</div>
		<TestTTT />
		<ServerComponentExample />
	</>
}