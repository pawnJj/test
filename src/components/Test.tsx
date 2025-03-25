// 'use client'

// import { useEffect, useState } from 'react';
// import type { Metadata } from 'next'
// const siteUrl = "https://nuxt-gaur-2j71-git-master-nihao-com-bcfa318a.vercel.app";
// export const metadata: Metadata = {
// 	title: '分享标题',
// 	description: '分享描述内容',

// 	// Open Graph 协议 (Facebook/通用分享)
// 	openGraph: {
// 		title: '分享标题',
// 		description: '分享描述内容',
// 		url: `${siteUrl}/share-page`, // 当前页面完整 URL
// 		siteName: '网站名称',
// 		images: [
// 			{
// 				url: `${siteUrl}/api/og`, // 绝对路径图片地址
// 				width: 1200,   // 推荐尺寸
// 				height: 630,
// 				alt: '分享图片描述',
// 			}
// 		],
// 		locale: 'zh_CN',
// 		type: 'website',
// 	},

// 	// Twitter 卡片协议
// 	twitter: {
// 		card: 'summary_large_image', // 显示大图
// 		title: '分享标题',
// 		description: '分享描述内容',
// 		creator: '@你的推特账号',
// 		images: {
// 			url: `${siteUrl}/api/og`, // 必须与 openGraph 一致
// 			alt: '分享图片描述',
// 		},
// 	},
// };
// export default function OgPage() {
// 	return <></>
// }


'use client'
import api from "@/service/api";
import { useEffect, useState } from "react";
import {Button,Input,Alert} from "@heroui/react";
export default function TestTTT() {

	const [a, setA] = useState<any>([])
	const getInfo = async () => {
		let data = {
			// creator: '0xe7a35bd49997e10c51b5e1dea4de366da7f831f3',
			pageIndex: 1,
			pageSize: 10

		}
		const x = await api.getFairLaunchTrade('0xc88df62578e5e9762faabe9c7469cf04967b96e1', data);
		console.log(a)
		setA(x.fairLaunchPool)
	}

	useEffect(() => {
		getInfo()
	}, []);

	return <>
		<div>{a.pool}</div>
		<Button>Click me</Button>
		<Input label="Email" type="email" />
		<div className="flex items-center justify-center w-full">
			<div className="flex flex-col w-full">
				{["default", "primary", "secondary", "success", "warning", "danger"].map((color) => (
				<div key={color} className="w-full flex items-center my-3">
					<Alert color={color as "default"} title={`This is a ${color} alert`} />
				</div>
				))}
			</div>
		</div>
	</>
}