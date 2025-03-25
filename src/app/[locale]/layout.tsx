import type { Metadata } from "next";

import '../globals.css';
import ContextProvider from '@/context'

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { FirstLoadProvider } from '@/context/first-load-context';
import InitialLoading from '@/components/initial-loading';
import MyHeader from '@/components/Header';


export const metadata: Metadata = {
	title: "Gaur.com",
	description: "Build on-chain Binance 🦬",
};

export default async function LocaleLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		// <html lang={locale}>
		// 	<body>

		// 	</body>
		// </html>
		<NextIntlClientProvider>
			<ContextProvider>
				<FirstLoadProvider>
					<InitialLoading />
					<div className="w-screen min-h-screen">
						<div className="h-[56px] w-screen sm:h-[80px] bg-[#101010] fixed t-0 l-0 flex justify-center">
							<MyHeader />
						</div>
						<div className="w-screen min-h-screen pt-[56px] sm:pt-[80px]">{children}</div>
					</div>
				</FirstLoadProvider>
			</ContextProvider>
		</NextIntlClientProvider>
	);
}