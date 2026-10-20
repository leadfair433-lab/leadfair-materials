import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./english-font.css";
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta-sans", display: "swap" });
export const metadata: Metadata = { title: "原料網站｜先進熱塑性材料研發與製造", description: "面向全球品牌與製造商的 TPE 熱塑性彈性體研發、改性、測試與規模化生產服務。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body className={plusJakartaSans.variable}>{children}</body></html>; }
