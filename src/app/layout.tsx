import { Providers } from "@/context/providers";
import './globals.css';

export default async function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang='en'>
			<body>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>{children}</Providers>
			</body>
		</html>
	);
}
