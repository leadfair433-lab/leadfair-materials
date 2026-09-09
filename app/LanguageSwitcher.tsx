"use client";

import { useEffect, useState } from "react";

export type SiteLocale = "zh-tw" | "en" | "vi";

const localeLabels: Record<SiteLocale, string> = {
  "zh-tw": "繁中",
  en: "English",
  vi: "Tiếng Việt",
};

const translations: Record<"en" | "vi", Record<string, string>> = {
  en: {
    "原料网站": "Lead Fair Materials", "材料解决方案": "Material Solutions", "定制研发": "Custom R&D", "应用行业": "Applications", "工厂实力": "Manufacturing", "联系工程师 ↗": "Talk to an Engineer ↗",
    "创新材料，": "Advanced materials,", "驱动产品": "engineered to move products", "进化。": "forward.", "面向全球品牌与制造商，提供 TPE 热塑性弹性体的研发、改性、测试与规模化生产。": "TPE research, modification, testing and scalable manufacturing for global brands and manufacturers.", "探索材料方案": "Explore Materials", "申请免费样品": "Request a Sample",
    "制造经验": "Manufacturing experience", "专业研发团队": "Specialist R&D team", "材料工程师团队": "Materials engineering team", "定制开发": "Custom development", "全球合作伙伴": "Global partners", "服务国家和地区": "Countries and regions served",
    "为性能而生的": "Advanced material systems", "先进材料体系": "built for performance", "鞋材": "Footwear", "中底": "Midsoles", "鞋垫": "Insoles", "运动护具": "Sports protection",
    "选择产品型号": "Select a product grade", "点击型号，查看下方产品详情": "Select a grade to view product details below", "获取样品": "Request a Sample", "咨询技术参数 ↗": "Ask About Technical Data ↗", "咨询产品 ↗": "Ask About This Grade ↗",
    "定制材料": "Custom material", "开发服务": "development service", "需求沟通": "Requirements", "材料分析": "Material analysis", "配方开发": "Formulation", "样品测试": "Sample testing", "试产验证": "Pilot validation", "批量生产": "Mass production",
    "研发与制造，": "R&D and manufacturing,", "在同一套质量体系内": "under one quality system", "材料洞察与应用指南": "Material Insights & Application Guides", "更多文章": "More Articles", "阅读全文": "Read Article",
    "合作前，您可能": "What you may want to know", "想了解这些": "before working with us", "让下一款产品，": "Start your next product", "从更好的材料开始。": "with a better material.", "提交样品申请": "Submit Sample Request",
    "返回首页": "Back to Home", "查看材料牌号 ↗": "View Material Grades ↗", "材料知识，": "Material knowledge,", "从应用出发。": "grounded in applications.", "全部文章": "All Articles", "精选阅读": "Featured Reading", "返回上一页": "Back", "保存文章 PDF ↓": "Save Article PDF ↓", "返回全部文章 ↗": "Back to All Articles ↗", "文章大纲（点击跳转）": "Article outline (select to jump)", "官方对接": "Contact Us", "提交商务询盘": "Submit an Inquiry"
  },
  vi: {
    "原料网站": "Vật liệu Lead Fair", "材料解决方案": "Giải pháp vật liệu", "定制研发": "R&D tùy chỉnh", "应用行业": "Ứng dụng", "工厂实力": "Năng lực sản xuất", "联系工程师 ↗": "Liên hệ kỹ sư ↗",
    "创新材料，": "Vật liệu tiên tiến,", "驱动产品": "thúc đẩy sản phẩm", "进化。": "phát triển.", "面向全球品牌与制造商，提供 TPE 热塑性弹性体的研发、改性、测试与规模化生产。": "Nghiên cứu, cải tiến, thử nghiệm và sản xuất TPE quy mô lớn cho các thương hiệu và nhà sản xuất toàn cầu.", "探索材料方案": "Khám phá vật liệu", "申请免费样品": "Yêu cầu mẫu",
    "制造经验": "Kinh nghiệm sản xuất", "专业研发团队": "Đội ngũ R&D chuyên môn", "材料工程师团队": "Đội ngũ kỹ sư vật liệu", "定制开发": "Phát triển tùy chỉnh", "全球合作伙伴": "Đối tác toàn cầu", "服务国家和地区": "Quốc gia và khu vực phục vụ",
    "为性能而生的": "Hệ vật liệu tiên tiến", "先进材料体系": "được phát triển vì hiệu suất", "鞋材": "Vật liệu giày", "中底": "Đế giữa", "鞋垫": "Lót giày", "运动护具": "Đồ bảo hộ thể thao",
    "选择产品型号": "Chọn mã vật liệu", "点击型号，查看下方产品详情": "Chọn mã để xem thông tin chi tiết bên dưới", "获取样品": "Yêu cầu mẫu", "咨询技术参数 ↗": "Hỏi thông số kỹ thuật ↗", "咨询产品 ↗": "Tư vấn sản phẩm ↗",
    "定制材料": "Dịch vụ phát triển", "开发服务": "vật liệu tùy chỉnh", "需求沟通": "Trao đổi nhu cầu", "材料分析": "Phân tích vật liệu", "配方开发": "Phát triển công thức", "样品测试": "Thử nghiệm mẫu", "试产验证": "Xác nhận sản xuất thử", "批量生产": "Sản xuất hàng loạt",
    "研发与制造，": "R&D và sản xuất,", "在同一套质量体系内": "trong cùng một hệ thống chất lượng", "材料洞察与应用指南": "Kiến thức & hướng dẫn ứng dụng vật liệu", "更多文章": "Thêm bài viết", "阅读全文": "Đọc bài viết",
    "合作前，您可能": "Những điều bạn có thể", "想了解这些": "muốn biết trước khi hợp tác", "让下一款产品，": "Bắt đầu sản phẩm tiếp theo", "从更好的材料开始。": "từ vật liệu tốt hơn.", "提交样品申请": "Gửi yêu cầu mẫu",
    "返回首页": "Về trang chủ", "查看材料牌号 ↗": "Xem mã vật liệu ↗", "材料知识，": "Kiến thức vật liệu,", "从应用出发。": "bắt đầu từ ứng dụng.", "全部文章": "Tất cả bài viết", "精选阅读": "Bài viết nổi bật", "返回上一页": "Quay lại", "保存文章 PDF ↓": "Lưu bài viết PDF ↓", "返回全部文章 ↗": "Về tất cả bài viết ↗", "文章大纲（点击跳转）": "Mục lục (nhấp để chuyển)", "官方对接": "Liên hệ chính thức", "提交商务询盘": "Gửi yêu cầu thương mại"
  }
};

const traditionalPhrases: Record<string, string> = {
  "材料解决方案":"材料解決方案", "定制研发":"客製研發", "应用行业":"應用產業", "工厂实力":"工廠實力", "联系工程师 ↗":"聯繫工程師 ↗", "创新材料，":"創新材料，", "驱动产品":"驅動產品", "进化。":"進化。", "申请免费样品":"申請免費樣品", "选择产品型号":"選擇產品型號", "点击型号，查看下方产品详情":"點擊型號，查看下方產品詳情", "更多文章":"更多文章", "阅读全文":"閱讀全文", "返回首页":"返回首頁", "全部文章":"全部文章", "返回上一页":"返回上一頁", "返回全部文章 ↗":"返回全部文章 ↗", "文章大纲（点击跳转）":"文章大綱（點擊跳轉）", "提交商务询盘":"提交商務詢盤"
};

function translateText(value: string, locale: SiteLocale) {
  const trimmed = value.trim();
  const translated = locale === "zh-tw" ? traditionalPhrases[trimmed] : translations[locale][trimmed];
  return translated ? value.replace(trimmed, translated) : value;
}

function localeFromPath(): SiteLocale {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const path = window.location.pathname.slice(base.length).split("/").filter(Boolean)[0];
  return path === "en" || path === "vi" || path === "zh-tw" ? path : "zh-tw";
}

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [locale, setLocale] = useState<SiteLocale>("zh-tw");
  useEffect(() => {
    const current = localeFromPath();
    setLocale(current);
    document.documentElement.lang = current === "zh-tw" ? "zh-Hant" : current;
    document.body.dataset.locale = current;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script,style,select,option") || parent.classList.contains("language-switcher")) continue;
      if (node.nodeValue) node.nodeValue = translateText(node.nodeValue, current);
    }
    document.querySelectorAll<HTMLElement>("[placeholder],[aria-label],[title]").forEach(element => {
      ["placeholder", "aria-label", "title"].forEach(attribute => {
        const value = element.getAttribute(attribute);
        if (value) element.setAttribute(attribute, translateText(value, current));
      });
    });
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(anchor => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let route = href.startsWith(base) ? href.slice(base.length) : href;
      if (!route.startsWith("/") || /^\/(zh-tw|en|vi)(?=\/|$)/.test(route) || /^\/(images|_next|blog-reference)(?=\/)/.test(route)) return;
      anchor.setAttribute("href", `${base}/${current}${route}`.replace(/([^:]\/)\/+/g, "$1"));
    });
  }, []);

  function change(next: SiteLocale) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    let rest = window.location.pathname.slice(base.length) || "/";
    rest = rest.replace(/^\/(zh-tw|en|vi)(?=\/|$)/, "") || "/";
    const target = `${base}/${next}${rest === "/" ? "/" : rest}${window.location.hash}`.replace(/([^:]\/)\/+/g, "$1");
    window.location.assign(target);
  }

  return <label className={`language-switcher${compact ? " compact" : ""}`}>
    <span className="sr-only">Language</span>
    <select value={locale} onChange={event => change(event.target.value as SiteLocale)} aria-label="Language">
      {Object.entries(localeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
    </select>
  </label>;
}
