"use client";

import { useEffect, useState } from "react";
import generatedTranslations from "./content/site-translations.json";

export type SiteLocale = "zh-tw" | "en" | "vi";

const PATH_SEPARATOR = String.fromCharCode(47);

const localeLabels: Record<SiteLocale, string> = {
  "zh-tw": "繁中",
  en: "English",
  vi: "Tiếng Việt",
};

const translationOverrides: Record<"en" | "vi", Record<string, string>> = {
  en: {
    "原料網站": "Lead Fair Materials", "產品": "Products", "材料解決方案": "Material Solutions", "定製研發": "Custom R&D", "客製研發": "Custom R&D", "應用行業": "Applications", "應用產業": "Applications", "工廠實力": "Manufacturing", "聯絡工程師 ↗": "Talk to an Engineer ↗",
    "創新材料，": "Advanced materials,", "驅動產品": "engineered to move products", "進化。": "forward.", "面向全球品牌與製造商，提供 TPE 熱塑性彈性體的研發、改性、測試與規模化生產。": "TPE research, modification, testing and scalable manufacturing for global brands and manufacturers.", "探索材料方案": "Explore Materials", "申請免費樣品": "Request a Sample",
    "製造經驗": "Manufacturing experience", "專業研發團隊": "Specialist R&D team", "材料工程師團隊": "Materials engineering team", "定製開發": "Custom development", "全球合作伙伴": "Global partners", "服務國家和地區": "Countries and regions served",
    "為效能而生的": "Advanced material systems", "先進材料體系": "built for performance", "鞋材": "Footwear", "中底": "Midsoles", "鞋墊": "Insoles", "運動護具": "Sports protection",
    "選擇產品型號": "Select a product grade", "點選型號，檢視下方產品詳情": "Select a grade to view product details below", "獲取樣品": "Request a Sample", "諮詢技術引數 ↗": "Ask About Technical Data ↗", "諮詢產品 ↗": "Ask About This Grade ↗",
    "定製材料": "Custom material", "開發服務": "development service", "需求溝通": "Requirements", "材料分析": "Material analysis", "配方開發": "Formulation", "樣品測試": "Sample testing", "試產驗證": "Pilot validation", "批次生產": "Mass production",
    "研發與製造，": "R&D and manufacturing,", "在同一套質量體系內": "under one quality system", "材料洞察與應用指南": "Material Insights & Application Guides", "更多文章": "More Articles", "閱讀全文": "Read Article",
    "合作前，您可能": "What you may want to know", "想了解這些": "before working with us", "讓下一款產品，": "Start your next product", "從更好的材料開始。": "with a better material.", "提交免費樣品申請": "Submit Sample Request",
    "返回首頁": "Back to Home", "檢視材料牌號 ↗": "View Material Grades ↗", "材料知識，": "Material knowledge,", "從應用出發。": "grounded in applications.", "全部文章": "All Articles", "精選閱讀": "Featured Reading", "返回上一頁": "Back", "儲存文章 PDF ↓": "Save Article PDF ↓", "返回全部文章 ↗": "Back to All Articles ↗", "文章大綱（點選跳轉）": "Article outline (select to jump)", "官方對接": "Contact Us", "提交商務詢盤": "Submit an Inquiry", "產品總覽": "Product Portfolio", "產品牌號": "Product Grades", "查看全部牌號": "View All Grades", "查看產品詳情": "View Product Details", "按應用方向選材": "Select by Application", "諮詢適用材料 ↗": "Ask About Materials ↗", "不確定該選哪個牌號？": "Not sure which grade fits?", "提交選材需求": "Send Selection Requirements"
  },
  vi: {
    "原料網站": "Vật liệu Lead Fair", "產品": "Sản phẩm", "材料解決方案": "Giải pháp vật liệu", "定製研發": "R&D tùy chỉnh", "客製研發": "R&D tùy chỉnh", "應用行業": "Ứng dụng", "應用產業": "Ứng dụng", "工廠實力": "Năng lực sản xuất", "聯絡工程師 ↗": "Liên hệ kỹ sư ↗",
    "創新材料，": "Vật liệu tiên tiến,", "驅動產品": "thúc đẩy sản phẩm", "進化。": "phát triển.", "面向全球品牌與製造商，提供 TPE 熱塑性彈性體的研發、改性、測試與規模化生產。": "Nghiên cứu, cải tiến, thử nghiệm và sản xuất TPE quy mô lớn cho các thương hiệu và nhà sản xuất toàn cầu.", "探索材料方案": "Khám phá vật liệu", "申請免費樣品": "Yêu cầu mẫu",
    "製造經驗": "Kinh nghiệm sản xuất", "專業研發團隊": "Đội ngũ R&D chuyên môn", "材料工程師團隊": "Đội ngũ kỹ sư vật liệu", "定製開發": "Phát triển tùy chỉnh", "全球合作伙伴": "Đối tác toàn cầu", "服務國家和地區": "Quốc gia và khu vực phục vụ",
    "為效能而生的": "Hệ vật liệu tiên tiến", "先進材料體系": "được phát triển vì hiệu suất", "鞋材": "Vật liệu giày", "中底": "Đế giữa", "鞋墊": "Lót giày", "運動護具": "Đồ bảo hộ thể thao",
    "選擇產品型號": "Chọn mã vật liệu", "點選型號，檢視下方產品詳情": "Chọn mã để xem thông tin chi tiết bên dưới", "獲取樣品": "Yêu cầu mẫu", "諮詢技術引數 ↗": "Hỏi thông số kỹ thuật ↗", "諮詢產品 ↗": "Tư vấn sản phẩm ↗",
    "定製材料": "Dịch vụ phát triển", "開發服務": "vật liệu tùy chỉnh", "需求溝通": "Trao đổi nhu cầu", "材料分析": "Phân tích vật liệu", "配方開發": "Phát triển công thức", "樣品測試": "Thử nghiệm mẫu", "試產驗證": "Xác nhận sản xuất thử", "批次生產": "Sản xuất hàng loạt",
    "研發與製造，": "R&D và sản xuất,", "在同一套質量體系內": "trong cùng một hệ thống chất lượng", "材料洞察與應用指南": "Kiến thức & hướng dẫn ứng dụng vật liệu", "更多文章": "Thêm bài viết", "閱讀全文": "Đọc bài viết",
    "合作前，您可能": "Những điều bạn có thể", "想了解這些": "muốn biết trước khi hợp tác", "讓下一款產品，": "Bắt đầu sản phẩm tiếp theo", "從更好的材料開始。": "từ vật liệu tốt hơn.", "提交免費樣品申請": "Gửi yêu cầu mẫu",
    "返回首頁": "Về trang chủ", "檢視材料牌號 ↗": "Xem mã vật liệu ↗", "材料知識，": "Kiến thức vật liệu,", "從應用出發。": "bắt đầu từ ứng dụng.", "全部文章": "Tất cả bài viết", "精選閱讀": "Bài viết nổi bật", "返回上一頁": "Quay lại", "儲存文章 PDF ↓": "Lưu bài viết PDF ↓", "返回全部文章 ↗": "Về tất cả bài viết ↗", "文章大綱（點選跳轉）": "Mục lục (nhấp để chuyển)", "官方對接": "Liên hệ chính thức", "提交商務詢盤": "Gửi yêu cầu thương mại", "產品總覽": "Danh mục sản phẩm", "產品牌號": "Mã sản phẩm", "查看全部牌號": "Xem tất cả mã", "查看產品詳情": "Xem chi tiết sản phẩm", "按應用方向選材": "Chọn theo ứng dụng", "諮詢適用材料 ↗": "Tư vấn vật liệu ↗", "不確定該選哪個牌號？": "Chưa chắc nên chọn mã nào?", "提交選材需求": "Gửi yêu cầu chọn vật liệu"
  }
};

// High-visibility navigation, product and inquiry copy is maintained here by
// hand so newly added pages never fall back to awkward machine translations.
const supplementalTranslations: Record<"en" | "vi", Record<string, string>> = {
  en: {
    "企業介紹": "Company", "企業榮譽": "Honors", "聯絡我們": "Contact", "產品總覽": "Product Overview",
    "文章總覽": "Article Overview", "公司簡介": "Company Profile", "歷史沿革": "Company History", "實驗室環境": "Laboratory",
    "主要導航": "Main navigation", "快速聯絡方式": "Quick contact", "產品牌號導航": "Product grade navigation",
    "上一組產品": "Previous products", "下一組產品": "Next products", "其他產品": "Other Products", "更多產品 ↗": "More Products ↗",
    "查看產品詳情 ↗": "View Product Details ↗", "查看更多產品": "View More Products", "探索更多材料牌號與應用方向": "Explore more material grades and applications",
    "產品資訊": "Product Information", "產品詳情": "Product Details", "材料特點": "Material Features", "更多產品詳情將陸續更新。": "More product information will be added soon.",
    "請詢產品與索取樣品": "Product Consultation & Sample Request", "聯絡材料工程師 ↗": "Contact a Materials Engineer ↗",
    "高分散型 TPE": "High-Dispersion TPE", "高回彈 TPE": "High-Rebound TPE", "生質 TPE": "Bio-based TPE", "高耐熱柔軟 TPE": "Soft, Heat-Resistant TPE", "客製材料牌號": "Custom Material Grade",
    "高延伸・低比重・良好回彈": "High Elongation · Low Specific Gravity · Strong Rebound", "柔韌耐磨・回彈穩定": "Flexible & Wear-Resistant · Stable Rebound",
    "生質含量・輕量高回彈": "Bio-based Content · Lightweight High Rebound", "依應用條件進行材料匹配": "Material Matching for Your Application",
    "超柔軟・更高熔點・更穩定加工": "Ultra-Soft · Higher Melting Point · Stable Processing",
    "硬度": "Hardness", "熔融指數": "Melt Flow Index", "比重": "Specific Gravity", "延伸率": "Elongation", "撕裂強度": "Tear Strength", "熔點": "Melting Point",
    "專案": "Item", "外觀": "Appearance", "顏色": "Color", "拉力": "Tensile Strength", "回彈度": "Rebound", "收縮率": "Shrinkage", "壓縮變形": "Compression Set",
    "發泡後物性": "Properties After Foaming", "原料基本特性": "Raw Material Properties", "測試方法": "Test Method", "測試結果": "Test Result", "數值": "Value",
    "告訴我們您的需求，": "Tell us what you need,", "取得可落地的材料方案。": "and receive a practical material solution.", "提交您的專案需求": "Submit Your Project Requirements",
    "目前需求": "Current Need", "材料選型": "Material Selection", "索取樣品": "Request Samples", "客製配方": "Custom Formulation", "製程改善": "Process Improvement", "量產與報價": "Production & Quotation",
    "工作郵箱": "Business Email", "聯絡電話": "Phone", "網站導航": "Site Navigation", "聯絡方式": "Contact Details", "關注與聯絡": "Follow & Contact", "返回頁首 ↑": "Back to Top ↑"
  },
  vi: {
    "企業介紹": "Giới thiệu công ty", "企業榮譽": "Thành tựu", "聯絡我們": "Liên hệ", "產品總覽": "Tổng quan sản phẩm",
    "文章總覽": "Tổng quan bài viết", "公司簡介": "Hồ sơ công ty", "歷史沿革": "Lịch sử phát triển", "實驗室環境": "Phòng thí nghiệm",
    "主要導航": "Điều hướng chính", "快速聯絡方式": "Liên hệ nhanh", "產品牌號導航": "Điều hướng mã sản phẩm",
    "上一組產品": "Sản phẩm trước", "下一組產品": "Sản phẩm tiếp theo", "其他產品": "Sản phẩm khác", "更多產品 ↗": "Thêm sản phẩm ↗",
    "查看產品詳情 ↗": "Xem chi tiết sản phẩm ↗", "查看更多產品": "Xem thêm sản phẩm", "探索更多材料牌號與應用方向": "Khám phá thêm mã vật liệu và ứng dụng",
    "產品資訊": "Thông tin sản phẩm", "產品詳情": "Chi tiết sản phẩm", "材料特點": "Đặc tính vật liệu", "更多產品詳情將陸續更新。": "Thông tin sản phẩm sẽ được cập nhật thêm.",
    "請詢產品與索取樣品": "Tư vấn sản phẩm & yêu cầu mẫu", "聯絡材料工程師 ↗": "Liên hệ kỹ sư vật liệu ↗",
    "高分散型 TPE": "TPE phân tán cao", "高回彈 TPE": "TPE độ nảy cao", "生質 TPE": "TPE sinh học", "高耐熱柔軟 TPE": "TPE mềm chịu nhiệt", "客製材料牌號": "Mã vật liệu tùy chỉnh",
    "高延伸・低比重・良好回彈": "Độ giãn dài cao · Tỷ trọng thấp · Độ nảy tốt", "柔韌耐磨・回彈穩定": "Dẻo dai, chống mài mòn · Độ nảy ổn định",
    "生質含量・輕量高回彈": "Hàm lượng sinh học · Nhẹ, độ nảy cao", "依應用條件進行材料匹配": "Phù hợp vật liệu theo ứng dụng",
    "超柔軟・更高熔點・更穩定加工": "Siêu mềm · Nhiệt độ nóng chảy cao hơn · Gia công ổn định",
    "硬度": "Độ cứng", "熔融指數": "Chỉ số chảy", "比重": "Tỷ trọng", "延伸率": "Độ giãn dài", "撕裂強度": "Độ bền xé", "熔點": "Nhiệt độ nóng chảy",
    "專案": "Hạng mục", "外觀": "Ngoại quan", "顏色": "Màu sắc", "拉力": "Độ bền kéo", "回彈度": "Độ nảy", "收縮率": "Độ co ngót", "壓縮變形": "Biến dạng nén",
    "發泡後物性": "Tính chất sau khi tạo bọt", "原料基本特性": "Tính chất nguyên liệu", "測試方法": "Phương pháp thử", "測試結果": "Kết quả thử", "數值": "Giá trị",
    "告訴我們您的需求，": "Hãy cho chúng tôi biết nhu cầu,", "取得可落地的材料方案。": "và nhận giải pháp vật liệu khả thi.", "提交您的專案需求": "Gửi yêu cầu dự án",
    "目前需求": "Nhu cầu hiện tại", "材料選型": "Lựa chọn vật liệu", "索取樣品": "Yêu cầu mẫu", "客製配方": "Công thức tùy chỉnh", "製程改善": "Cải tiến quy trình", "量產與報價": "Sản xuất & báo giá",
    "工作郵箱": "Email công việc", "聯絡電話": "Điện thoại", "網站導航": "Điều hướng", "聯絡方式": "Thông tin liên hệ", "關注與聯絡": "Theo dõi & liên hệ", "返回頁首 ↑": "Về đầu trang ↑"
  }
};

const translations: Record<"en" | "vi", Record<string, string>> = {
  en: { ...generatedTranslations.en, ...translationOverrides.en, ...supplementalTranslations.en },
  vi: { ...generatedTranslations.vi, ...translationOverrides.vi, ...supplementalTranslations.vi },
};

const traditionalPhrases: Record<string, string> = {
  "產品":"產品", "材料解決方案":"材料解決方案", "客製研發":"客製研發", "應用產業":"應用產業", "工廠實力":"工廠實力", "聯絡工程師 ↗":"聯絡工程師 ↗", "創新材料，":"創新材料，", "驅動產品":"驅動產品", "進化。":"進化。", "申請免費樣品":"申請免費樣品", "選擇產品型號":"選擇產品型號", "點選型號，檢視下方產品詳情":"點選型號，檢視下方產品詳情", "更多文章":"更多文章", "閱讀全文":"閱讀全文", "返回首頁":"返回首頁", "全部文章":"全部文章", "返回上一頁":"返回上一頁", "返回全部文章 ↗":"返回全部文章 ↗", "文章大綱（點選跳轉）":"文章大綱（點選跳轉）", "提交商務詢盤":"提交商務詢盤"
};

function translateText(value: string, locale: SiteLocale) {
  const trimmed = value.trim();
  const translated = locale === "zh-tw" ? traditionalPhrases[trimmed] : translations[locale][trimmed];
  return translated ? value.replace(trimmed, translated) : value;
}

function localeFromPath(): SiteLocale {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const pathname = window.location.pathname;
  const relativePath = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const path = relativePath.split(/\/+/).filter(Boolean)[0];
  return path === "en" || path === "vi" || path === "zh-tw" ? path : "zh-tw";
}

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const [locale, setLocale] = useState<SiteLocale>("zh-tw");
  useEffect(() => {
    const current = localeFromPath();
    // The active locale is derived from the browser URL after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocale(current);
    document.documentElement.lang = current === "zh-tw" ? "zh-Hant" : current;
    document.body.dataset.locale = current;

    // The source technical articles retain their original English paragraphs.
    // When a Chinese paragraph is followed by its English counterpart, hide the
    // counterpart before translating so localized pages do not repeat content.
    if (current === "en" || current === "vi") {
      document.querySelectorAll<HTMLElement>(".journal-body section").forEach(section => {
        const children = Array.from(section.children) as HTMLElement[];
        children.forEach((element, index) => {
          const next = children[index + 1];
          const source = element.textContent?.trim() || "";
          const counterpart = next?.textContent?.trim() || "";
          if (
            next &&
            element.tagName === next.tagName &&
            /[\u3400-\u9fff]/.test(source) &&
            !/[\u3400-\u9fff]/.test(counterpart) &&
            /[A-Za-z]{4}/.test(counterpart)
          ) {
            next.hidden = true;
          }
        });
      });
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script,style") || parent.closest(".language-switcher")) continue;
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
      const route = href.startsWith(base) ? href.slice(base.length) : href;
      if (!route.startsWith(PATH_SEPARATOR) || /^\/(zh-tw|en|vi)(?=\/|$)/.test(route) || /^\/(images|_next|blog-reference)(?=\/)/.test(route)) return;
      anchor.setAttribute("href", `${base}/${current}${route}`.replace(/([^:]\/)\/+/g, "$1"));
    });

    // GitHub Pages serves every localized route as a standalone static page.
    // Use a full page load for route changes so the locale translation pass is
    // applied consistently, including when an older page was browser-cached.
    const forceStaticNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      window.location.assign(url.href);
    };
    document.addEventListener("click", forceStaticNavigation, true);
    return () => document.removeEventListener("click", forceStaticNavigation, true);
  }, []);

  function change(next: SiteLocale) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    const pathname = window.location.pathname;
    let rest = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
    rest = rest || PATH_SEPARATOR;
    rest = rest.replace(/^\/(zh-tw|en|vi)(?=\/|$)/, "") || PATH_SEPARATOR;
    const target = `${base}/${next}${rest === PATH_SEPARATOR ? PATH_SEPARATOR : rest}${window.location.hash}`.replace(/([^:]\/)\/+/g, "$1");
    window.location.assign(target);
  }

  return <label className={`language-switcher${compact ? " compact" : ""}`}>
    <span className="sr-only">Language</span>
    <select value={locale} onChange={event => change(event.target.value as SiteLocale)} aria-label="Language">
      {Object.entries(localeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
    </select>
  </label>;
}
