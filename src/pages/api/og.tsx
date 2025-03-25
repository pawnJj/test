import { ImageResponse } from '@vercel/og';
export const config = {
	runtime: 'edge',
};

export default async function (params: any) {
	console.log(params)
	const { searchParams } = new URL(params.url);
	const title = searchParams.get('name') || 'Default Title';
	const imgUrl = searchParams.get('logo')
	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'white',
				}}
			>
				<div tw="bg-gray-50 flex">
					<div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
						<h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
							<span>{title}</span>
							<span tw="text-indigo-600">👋, 🌎111 </span>
						</h2>
						<div tw="mt-8 flex md:mt-0">
							<img
								height="256"
								src={`https://gaur.com/_nuxt/bigGaur.GFWxNF-t.png`}

							/>
							<img src={imgUrl as string} alt="Logo" width={100} height={100} />
						</div>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
		},
	);
}