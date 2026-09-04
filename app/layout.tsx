import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "原料网站｜先进热塑性材料研发与制造", description: "面向全球品牌与制造商的 TPE 热塑性弹性体研发、改性、测试与规模化生产服务。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
