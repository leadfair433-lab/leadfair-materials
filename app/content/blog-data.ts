import technicalArticles from "./technical-articles.json";

export type ArticleBlock = { type: string; text?: string; src?: string; rows?: { text: string; colSpan: number }[][] };
export type JournalArticle = { slug: string; title: string; englishTitle?: string; summary: string; category: string; image: string; alt: string; illustrativeCover?: boolean; sections: { title: string; text: string; blocks?: ArticleBlock[] }[] };

export function articleAssetPath(src: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return basePath && !src.startsWith(`${basePath}/`) ? `${basePath}${src}` : src;
}

const articles = [
  { category: "01 / MATERIAL SELECTION", title: "如何為產品選擇合適的 TPE 材料？", image: "/images/blog-selection-v2-fast.jpg", alt: "TPE 選材樣片、原料顆粒與測量工具", summary: "從應用場景到目標效能，梳理開始選材前需要準備的資訊。", paragraphs: ["選材從實際產品需求開始。產品用途、結構設計、成型方式和使用環境，都是與材料工程師溝通時需要說明的資訊。", "您可以提供產品樣品、圖面或現行材料資料，並列明硬度、密度、回彈性、手感、顏色及其他特殊物性要求。我們會依實際應用推薦材料方案，必要時進一步進行客制配方開發。"] },
  { category: "02 / FOAMING DEVELOPMENT", title: "發泡 TPE 開發，需要關注哪些指標？", image: "/images/blog-foam-v2-fast.jpg", alt: "發泡材料的泡孔結構與樣片截面", summary: "不只關注硬度與密度，也要結合實際成型條件驗證材料表現。", paragraphs: ["發泡材料開發會結合產品需求調整硬度、密度、回彈性、手感及發泡效果。材料配方與實際成型條件需要一起評估。", "驗證專案可包括髮泡倍率、成型密度、泡孔結構、表面品質、尺寸穩定性及成型加工性。透過試料與實際射出成型驗證，再根據結果調整配方，確認材料與製程的匹配性。"] },
  { category: "03 / PROCESS & VALIDATION", title: "從試料到量產，如何推進材料開發？", image: "/images/blog-validation-v2-fast.jpg", alt: "鞋底模具與成型試樣", summary: "明確需求、試料驗證與配方調整，讓開發步驟與產品目標保持一致。", paragraphs: ["開發初期先確認產品用途、目標效能與加工需求，再開展配方開發及小批次試料。實際試料數量、費用及交期，需要依材料與開發專案個別確認。", "試產過程中可針對發泡效果、密度、硬度、回彈性及成型狀況進行分析與調整。涉及特殊效能要求的專案，可能需要多輪試料、成型與再驗證，之後再推進量產匯入。"] },
];

const articleSlugs = ["tpe-material-selection", "foaming-tpe-development", "material-development-validation"];
const sectionTitles = [["從產品應用出發", "準備選材資料與效能需求"], ["讓材料配方與成型條件協同", "透過試料驗證關鍵指標"], ["明確開發目標與試料計劃", "從試產驗證走向量產"]];
const seoSectionPattern = /(?:建議\s*SEO\s*(?:設定|關鍵字)|Recommended SEO Settings|Suggested SEO keywords|Appendix \| Recommended SEO Settings)/i;
const cleanedTechnicalArticles = technicalArticles.map((article) => ({
  ...article,
  sections: article.sections
    .filter((section) => !seoSectionPattern.test(section.title))
    .map((section) => ({ ...section, blocks: section.blocks?.filter((block) => !seoSectionPattern.test(block.text || "")) })),
}));

export const blogArticles: JournalArticle[] = [...cleanedTechnicalArticles, ...articles.map((article, index) => ({ ...article, slug: articleSlugs[index], sections: article.paragraphs.map((text, sectionIndex) => ({ title: sectionTitles[index][sectionIndex], text })) }))];
