import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
export const localeItems = [
    { name: "中文", code: "zh", iso: "zh-CN", dir: "ltr" },
    { name: "English", code: "en", iso: "en-US", dir: "ltr" },
];
// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
