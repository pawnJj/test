'use client';
import { Suspense } from 'react'
import Loading from './loading'
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
// import { useRouter } from '@/i18n/navigation';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from "next/navigation";
import * as echarts from 'echarts';
import MinimalLineChart from '@/components/SVGLineChart'
export default function Home() {


	const chartRef = useRef(null);

  useEffect(() => {
    // 初始化图表
    const chart = echarts.init(chartRef.current);
    
    // 设置图表配置
    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };
    
    // 应用配置
    chart.setOption(option);
    
    // 响应式调整
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

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
	const activityData = [15, 230, 24, 218, 135, 180, 90]
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
			<MinimalLineChart 
          data={activityData}
		  width={800}
		  height={256}
		  lineColor="#8b5cf6" // 紫色
		  areaOpacity={0.15}
		  smooth={true}
		  markers={[
			{
			  index: 1, // 第二个数据点
			  label: '峰值',
			  color: '#10b981',
			  size: 10
			},
			{
			  index: 2,
			  label: '异常',
			  color: '#ef4444'
			}
		  ]}
        />
			<div ref={chartRef} style={{ width: '100%', height: '400px' }} />
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