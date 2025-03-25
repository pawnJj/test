"use client";
import { useLocale } from "next-intl";
import { localeItems, useRouter, usePathname } from '@/i18n/navigation';

// 定义语言项的类型
interface LocaleItem {
	code: string;
	name: string;
}

export default function LangSwitcher() {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();

	console.log(locale);

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		router.push(pathname, { locale: e.target.value });
	};

	return (
		<div>
			<select
				value={locale}
				onChange={handleChange}
				className="h-8 m-2 p-1 rounded border-current"
			>
				<option value={locale}>{GetLangData(locale).name}</option>

				{localeItems.map((item) => {
					if (item.code === locale) return null;
					return (
						<option key={item.code} value={item.code}>
							{item.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}

// 修复 GetLangData 函数
export function GetLangData(defaultLocale: string): LocaleItem {
	let res: LocaleItem | undefined;

	localeItems.forEach((locale: LocaleItem) => {
		if (locale.code === defaultLocale) {
			res = locale;
		}
	});

	if (!res) {
		throw new Error(`No locale data found for code: ${defaultLocale}`);
	}

	return res;
}