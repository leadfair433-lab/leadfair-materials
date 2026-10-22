"use client";

import { useEffect, useState } from "react";
import generatedTranslations from "./content/site-translations.json";
import { laboratoryTranslations } from "./content/laboratory-translations";

export type SiteLocale = "zh-tw" | "en" | "vi";

const PATH_SEPARATOR = String.fromCharCode(47);

const localeLabels: Record<SiteLocale, string> = {
  "zh-tw": "繁中",
  en: "English",
  vi: "Tiếng Việt",
};

const localeLabelsByInterface: Record<SiteLocale, Record<SiteLocale, string>> = {
  "zh-tw": localeLabels,
  en: { "zh-tw": "Traditional Chinese", en: "English", vi: "Vietnamese" },
  vi: { "zh-tw": "Tiếng Hoa phồn thể", en: "Tiếng Anh", vi: "Tiếng Việt" },
};

const translationOverrides: Record<"en" | "vi", Record<string, string>> = {
  en: {
    "原料網站": "Lead Fair Materials", "產品": "Products", "材料解決方案": "Material Solutions", "定製研發": "Custom R&D", "客製研發": "Custom R&D", "應用行業": "Applications", "應用產業": "Applications", "工廠實力": "Manufacturing", "聯絡工程師 ↗": "Talk to an Engineer ↗",
    "創新材料，": "Advanced materials,", "驅動產品": "engineered to move products ", "進化。": "forward.", "面向全球品牌與製造商，提供 TPE 熱塑性彈性體的研發、改性、測試與規模化生產。": "TPE research, modification, testing and scalable manufacturing for global brands and manufacturers.", "探索材料方案": "Explore Materials", "申請免費樣品": "Request a Sample",
    "製造經驗": "Manufacturing experience", "專業研發團隊": "Specialist R&D team", "材料工程師團隊": "Materials engineering team", "定製開發": "Custom development", "全球合作伙伴": "Global partners", "服務國家和地區": "Countries and regions served",
    "為效能而生的": "Advanced Materials", "先進材料體系": "for Performance", "鞋材": "Footwear", "中底": "Midsoles", "鞋墊": "Insoles", "運動護具": "Sports protection",
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
    "確認電子郵箱": "Confirm Email Address", "複製電子郵箱": "Copy Email Address", "已複製電子郵箱": "Email Address Copied",
    "掃描微信二維碼": "Scan the WeChat QR Code", "使用微信掃描二維碼與我們聯絡": "Scan the QR code in WeChat to contact us.",
    "其他定制材料": "Other Custom Materials", "主要應用領域": "Main Application Areas", "超柔軟EVA／POE發泡中底": "Ultra-soft EVA/POE foam midsoles", "高回彈運動鞋中底": "High-rebound athletic midsoles",
    "功能性鞋墊與足部護理產品": "Functional insoles and foot-care products", "緩衝、吸震與能量回饋部件": "Cushioning, shock-absorption and energy-return components",
    "運動防護與柔性支撐材料": "Sports-protection and flexible-support materials", "冷熱壓及二次貼合發泡製品": "Cold/hot-pressed and secondary-laminated foam products",
    "從配方選擇到量產驗證": "From Formulation Selection to Production Validation",
    "提供現有材料牌號、配方比例、目標硬度、發泡倍率及二次加工條件，可進一步進行起始配方、試樣、機械物性與二次熱收縮評估。": "Provide the current material grade, formulation ratio, target hardness, expansion ratio and secondary-processing conditions so we can evaluate a starting formulation, trial samples, mechanical properties and secondary thermal shrinkage.",
    "本頁數據為特定配方與測試條件下的內部典型值，僅供材料篩選與配方開發參考，不構成所有配方、製程或成品的保證規格。": "The data on this page are internal typical values under specified formulation and test conditions. They are for material screening and formulation-development reference only and do not constitute guaranteed specifications for every formulation, process or finished product.",
    "歡迎索取樣品，驗證您的配方與加工條件": "Request a sample to validate your formulation and processing conditions",
    "文章總覽": "Article Overview", "公司簡介": "Company Profile", "歷史沿革": "Company History", "實驗室環境": "Laboratory",
    "主要導航": "Main navigation", "手機導航": "Mobile navigation", "開啟導航選單": "Open navigation menu", "關閉導航選單": "Close navigation menu", "快速聯絡方式": "Quick contact", "產品牌號導航": "Product grade navigation",
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
    "工作郵箱": "Business Email", "聯絡電話": "Phone & Country Code", "國家程式碼 + 電話號碼": "Country Code + Phone Number", "網站導航": "Site Navigation", "聯絡方式": "Contact Details", "關注與聯絡": "Follow & Contact", "返回頁首 ↑": "Back to Top ↑",
    "我們不只是供應原料，更從應用場景出發解決材料問題。每一個配方，都經過實驗驗證與生產驗證。": "We go beyond supplying raw materials by solving material challenges from the application level. Every formulation is validated in both the laboratory and production.",
    "面向運動鞋結構的高回彈、耐磨與輕量化材料方案": "High-rebound, wear-resistant and lightweight material solutions for athletic footwear",
    "兼顧緩震、回彈與尺寸穩定性的發泡中底材料": "Foamed midsole materials balancing cushioning, rebound and dimensional stability",
    "柔軟貼合、舒適支撐，並保持持久回彈與細膩觸感": "Soft, conforming support with lasting rebound and a refined feel",
    "從產品牌號，找到適合的材料。": "Find the Right Material by Product Grade.", "選擇牌號查看完整物性、應用與技術資料。每種材料的資料依實際內容呈現。": "Select a grade to review its complete properties, applications and technical data.",
    "從原料檢驗、配方混煉到造粒與出廠檢測，全流程資料化管理。讓實驗室效能穩定復現於每一批次產訂單。": "From incoming inspection and compound mixing to pelletizing and final testing, every stage is managed with traceable data so laboratory performance is reproduced consistently in every production batch.",
    "從研發、檢測到定製與協同，我們以工程能力貫穿材料開發全過程，讓每一個專案更快走向穩定量產。": "From R&D and testing to customization and collaboration, our engineering expertise supports the entire material-development process and accelerates every project toward stable mass production.",
    "專業的研發團隊，根據客戶需求開發更優效能，滿足定製化配方要求。": "Our specialist R&D team develops higher-performance materials around each customer's custom formulation requirements.",
    "完整的檢測裝置與測試流程，精準驗證材料效能並縮短研發週期。": "Comprehensive test equipment and procedures verify material performance accurately and shorten development cycles.",
    "從配方設計、樣品測試到量產交付，提供一站式定製開發服務。": "One-stop custom development from formulation design and sample testing through mass-production delivery.",
    "工程師直接對接客戶技術團隊，共同解決真實產品中的材料應用問題。": "Our engineers work directly with customer technical teams to solve material challenges in real products.",
    "可以依目標密度、硬度及回彈性開發發泡材料嗎？": "Can foamed materials be developed to target density, hardness and rebound?",
    "可以。我們可依客戶產品用途、加工製程及效能需求進行 TPE 材料配方開發，並針對硬度、密度、回彈性、手感、顏色及其他物性需求進行調整。": "Yes. We develop TPE formulations around the product application, processing method and performance targets, adjusting hardness, density, rebound, feel, color and other required properties.",
    "若客戶已有現行材料或產品樣品，也可提供樣品及相關物性要求，作為材料分析與配方開發的參考。": "If an existing material or product sample is available, it can be supplied with the relevant property requirements as a reference for material analysis and formulation development.",
    "我們會依產品用途、結構設計、成型方式及目標效能協助客戶進行材料選型。": "We recommend materials based on the product application, structural design, molding method and target performance.",
    "客戶可提供產品樣品、圖面或相關需求，包括硬度、密度、回彈性、外觀、使用環境及其他特殊物性要求，我們將依實際應用推薦合適的材料方案，必要時進一步進行客製配方開發。": "Customers can provide samples, drawings or requirements such as hardness, density, rebound, appearance, service environment and other special properties. We will recommend a suitable material solution for the actual application and develop a custom formulation when needed.",
    "支援。針對新材料開發及客戶前期驗證需求，我們可提供小批次試料及打樣服務，並依產品的硬度、密度、回彈性及加工需求進行配方調整。": "Yes. For new-material development and early-stage validation, we provide small-batch trial material and prototyping, with formulation adjustments for the required hardness, density, rebound and processing conditions.",
    "實際試料與打樣數量、費用及交期，將依材料與開發專案個別確認。": "Trial and prototype quantities, costs and lead times are confirmed individually according to the material and development project.",
    "一般材料配方的初步開發約需 2–4 週，實際時間依材料效能、硬度、密度、加工製程及最終應用要求而定。": "Initial development of a standard material formulation typically takes about 2–4 weeks. Actual timing depends on the required performance, hardness, density, processing method and end-use requirements.",
    "開發初期，我們會依客戶產品用途及目標效能建立材料開發方向，並針對不同應用需求評估與驗證相關物性，包括：硬度、密度、拉伸強度、斷裂伸長率、撕裂強度、回彈性、壓縮永久變形、及其他特定效能要求。": "At the start of development, we define the material direction from the product application and performance targets, then evaluate and validate properties including hardness, density, tensile strength, elongation at break, tear strength, rebound, compression set and other specified requirements.",
    "針對發泡 TPE 材料，我們亦會進一步評估發泡倍率、成型密度、泡孔結構、表面品質、尺寸穩定性及成型加工性，並透過實際射出成型驗證材料與製程的匹配性。": "For foamed TPE, we also evaluate expansion ratio, molded density, cell structure, surface quality, dimensional stability and processability, and verify material–process compatibility through actual injection molding trials.",
    "若產品涉及特殊發泡效能、耐久性或其他特定物性要求，我們會依測試結果進行配方調整、試料、成型及再驗證。因此，部分專案可能需要多輪開發，以確保材料效能與實際產品需求相符。": "When special foaming performance, durability or other specific properties are required, we adjust the formulation, prepare trial material, mold and revalidate based on test results. Some projects therefore require several development rounds to ensure the material meets the actual product requirements.",
    "可以。發泡 TPE 材料是我們重點開發及應用的領域之一，可依不同產品需求調整材料的硬度、密度、回彈性、手感及發泡效果。": "Yes. Foamed TPE is one of our core development areas. We can adjust hardness, density, rebound, feel and foaming performance for different product requirements.",
    "我們會同時考量材料配方與實際成型條件，透過試料及成型驗證，協助客戶取得適合產品需求的材料與製程方案。": "We evaluate the formulation together with actual molding conditions and use material trials and molding validation to establish a material and process solution suited to the product.",
    "我們目前主要專注於 TPE 材料的射出成型與射出發泡應用，並可依產品結構、硬度、密度、回彈性及表面要求進行配方設計與製程調整。": "We currently focus on TPE injection molding and injection-foaming applications, with formulation and process adjustments based on product structure, hardness, density, rebound and surface requirements.",
    "我們具備從材料配方、造粒到實際成型驗證的經驗，可協助客戶解決材料與加工製程之間的匹配問題。": "Our experience spans formulation, pelletizing and molding validation, enabling us to resolve compatibility issues between materials and processing conditions.",
    "可依材料及客戶目標市場需求，提供現有相關材料資料，或配合安排第三方實驗室檢測，包括 REACH、RoHS 及其他指定化學物質測試。": "Depending on the material and target market, we can provide available material documentation or arrange third-party laboratory testing, including REACH, RoHS and other specified chemical-substance tests.",
    "部分生質材料亦可提供 USDA Biobased 相關資料。實際可提供的認證、測試專案及報告，將依材料牌號、最終用途及客戶要求確認。": "USDA Biobased documentation is also available for selected bio-based materials. Available certifications, test programs and reports are confirmed according to the grade, end use and customer requirements.",
    "我們不僅提供材料，也可參與客戶從前期選材、配方開發、試料、打樣到量產匯入的過程。": "Beyond supplying materials, we can support the process from early material selection and formulation development through trials, prototyping and production introduction.",
    "透過材料配方、造粒及實際成型應用經驗，我們可針對試產過程中的發泡效果、密度、硬度、回彈性及成型狀況進行分析與調整，協助客戶將材料方案匯入實際產品。": "Using our formulation, pelletizing and molding experience, we analyze and adjust foaming behavior, density, hardness, rebound and molding performance during trials to help transfer the material solution into the actual product.",
    "留下您的專案需求與聯絡方式，材料工程師將在 24 小時內回覆，並提供適配建議與樣品方案。": "Share your project requirements and contact details. A materials engineer will respond within 24 hours with recommendations and sample options.",
    "專注 TPE 熱塑性彈性體研發、客製配方、測試驗證與穩定量產。": "Focused on TPE elastomer R&D, custom formulations, testing, validation and stable mass production.",
    "傳統低熔點材料的痛點與 IUS-4065 的改善方案": "How IUS-4065 Solves the Limitations of Conventional Low-Melting Materials",
    "傳統低熔點材料在加工及使用過程中常出現多種問題；IUS-4065 對應改善熱收縮、尺寸與加工穩定性。": "Conventional low-melting materials often create processing and performance issues. IUS-4065 improves thermal shrinkage, dimensional stability and processing consistency.",
    "傳統材料": "Conventional Material", "二次熱收縮導致翹曲變形": "Secondary heat shrinkage causes warping", "耐熱性不足，產品易變形": "Insufficient heat resistance leads to deformation", "尺寸穩定性差、公差大": "Poor dimensional stability and wide tolerances", "加工波動大、次品率高": "Unstable processing and a high defect rate", "外觀不一致，影響品質": "Inconsistent appearance affects quality",
    "更低熱收縮，減少翹曲": "Lower heat shrinkage reduces warping", "更高熔點，耐熱性更好": "Higher melting point improves heat resistance", "尺寸穩定，公差更可控": "Stable dimensions and tighter tolerances", "加工穩定，效率更高": "Stable processing and higher efficiency", "外觀一致，品質穩定": "Consistent appearance and reliable quality",
    "為什麼選擇 IUS-4065？": "Why Choose IUS-4065?", "許多超柔軟配方會採用 TAFMER 或 ENGAGE 系列 POE 來實現低硬度。然而，這類體系通常存在熱收縮率高、易變形等問題。IUS-4065 兼顧超柔軟硬度、更高熔點與更穩定加工效能，讓產品同時擁有舒適觸感與製造穩定性。": "Many ultra-soft formulations use TAFMER or ENGAGE POE grades to achieve low hardness, but these systems can suffer from high thermal shrinkage and deformation. IUS-4065 combines ultra-soft hardness, a higher melting point and stable processing for both a comfortable feel and dependable manufacturing.",
    "加熱後樣片對照": "Sample Comparison After Heating", "低熔點材料": "Low-Melting Material", "加熱後翹曲的傳統材料樣片示意": "Conventional material sample warped after heating", "容易發生二次熱收縮、翹曲及外觀不一致": "Prone to secondary shrinkage, warping and inconsistent appearance", "IUS-4065（約 64°C）": "IUS-4065 (Approx. 64°C)", "加熱後維持平整的 IUS-4065 樣片示意": "IUS-4065 sample remains flat after heating", "尺寸穩定性優異": "Excellent dimensional stability", "產品品質一致": "Consistent product quality", "良率更高": "Higher yield", "圖片為對照示意；實際表現依材料配方、成型與測試條件而定。": "Images are for comparison only. Actual performance depends on formulation, molding and test conditions.",
    "材料效能對比": "Material Performance Comparison", "效能 / Property": "Property", "測試標準": "Test Standard", "硬度 Shore A": "Hardness (Shore A)", "熔點 °C": "Melting Point (°C)", "熱收縮風險": "Thermal Shrinkage Risk", "內部測試": "Internal Test", "高": "High", "低": "Low", "柔軟觸感": "Soft Touch", "內部評估": "Internal Evaluation",
    "五項核心優勢": "Five Core Advantages", "超柔軟觸感": "Ultra-Soft Touch", "Shore A 40，觸感舒適細膩": "Shore A 40 for a refined, comfortable feel", "更高熔點": "Higher Melting Point", "約 64°C，降低二次熱收縮風險": "Approx. 64°C, reducing the risk of secondary heat shrinkage", "卓越尺寸穩定": "Outstanding Dimensional Stability", "減少翹曲，尺寸更可控": "Less warping and better dimensional control", "更高良率": "Higher Production Yield", "加工視窗穩定，減少次品": "A stable processing window reduces defects", "適用高效能應用": "Suitable for High-Performance Applications", "滿足更高耐熱與穩定性要求": "Meets higher heat-resistance and stability requirements", "鞋材與發泡應用": "Footwear and Foam Applications", "機能性彈性材料": "Functional Elastomer Materials", "客製配方與量產應用": "Custom Formulations and Mass Production", "IUS-4065 顆粒與材料樣片的另一角度": "Alternate view of IUS-4065 pellets and material samples", "IUS-4065 顆粒及樣片細節": "Close-up of IUS-4065 pellets and samples"
  },
  vi: {
    "企業介紹": "Giới thiệu công ty", "企業榮譽": "Thành tựu", "聯絡我們": "Liên hệ", "產品總覽": "Tổng quan sản phẩm",
    "確認電子郵箱": "Xác nhận địa chỉ email", "複製電子郵箱": "Sao chép địa chỉ email", "已複製電子郵箱": "Đã sao chép địa chỉ email",
    "掃描微信二維碼": "Quét mã QR WeChat", "使用微信掃描二維碼與我們聯絡": "Quét mã QR bằng WeChat để liên hệ với chúng tôi.",
    "其他定制材料": "Vật liệu tùy chỉnh khác", "主要應用領域": "Lĩnh vực ứng dụng chính", "超柔軟EVA／POE發泡中底": "Đế giữa xốp EVA/POE siêu mềm", "高回彈運動鞋中底": "Đế giữa giày thể thao có độ nảy cao",
    "功能性鞋墊與足部護理產品": "Lót giày chức năng và sản phẩm chăm sóc bàn chân", "緩衝、吸震與能量回饋部件": "Bộ phận đệm, hấp thụ sốc và hoàn trả năng lượng",
    "運動防護與柔性支撐材料": "Vật liệu bảo hộ thể thao và hỗ trợ linh hoạt", "冷熱壓及二次貼合發泡製品": "Sản phẩm xốp ép nóng/lạnh và cán ghép thứ cấp",
    "從配方選擇到量產驗證": "Từ lựa chọn công thức đến xác nhận sản xuất hàng loạt",
    "提供現有材料牌號、配方比例、目標硬度、發泡倍率及二次加工條件，可進一步進行起始配方、試樣、機械物性與二次熱收縮評估。": "Cung cấp mã vật liệu hiện tại, tỷ lệ công thức, độ cứng mục tiêu, tỷ lệ nở và điều kiện gia công thứ cấp để chúng tôi đánh giá công thức ban đầu, mẫu thử, cơ tính và độ co nhiệt thứ cấp.",
    "本頁數據為特定配方與測試條件下的內部典型值，僅供材料篩選與配方開發參考，不構成所有配方、製程或成品的保證規格。": "Dữ liệu trên trang là giá trị điển hình nội bộ trong điều kiện công thức và thử nghiệm cụ thể, chỉ dùng để tham khảo khi sàng lọc vật liệu và phát triển công thức.",
    "歡迎索取樣品，驗證您的配方與加工條件": "Yêu cầu mẫu để xác nhận công thức và điều kiện gia công của bạn",
    "文章總覽": "Tổng quan bài viết", "公司簡介": "Hồ sơ công ty", "歷史沿革": "Lịch sử phát triển", "實驗室環境": "Phòng thí nghiệm",
    "主要導航": "Điều hướng chính", "手機導航": "Điều hướng di động", "開啟導航選單": "Mở menu điều hướng", "關閉導航選單": "Đóng menu điều hướng", "快速聯絡方式": "Liên hệ nhanh", "產品牌號導航": "Điều hướng mã sản phẩm",
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
  en: { ...generatedTranslations.en, ...translationOverrides.en, ...supplementalTranslations.en, ...laboratoryTranslations.en },
  vi: { ...generatedTranslations.vi, ...translationOverrides.vi, ...supplementalTranslations.vi, ...laboratoryTranslations.vi },
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
    if (current === "en") document.title = "Found Fair Materials | Advanced TPE R&D and Manufacturing";
    if (current === "vi") document.title = "Vật liệu Found Fair | Nghiên cứu, phát triển và sản xuất TPE";

    // The source technical articles retain their original English paragraphs.
    // English pages keep that reviewed English copy and hide the preceding
    // Chinese source. Vietnamese pages translate the Chinese source and hide the
    // English counterpart. This prevents untranslated Chinese/English duplicates.
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
            if (current === "en") element.hidden = true;
            else next.hidden = true;
          }
        });
      });
    }

    const translateSubtree = (root: Node) => {
      const translateNode = (textNode: Node) => {
        const parent = textNode.parentElement;
        if (!parent || parent.closest("script,style") || parent.closest(".language-switcher")) return;
        if (textNode.nodeValue) textNode.nodeValue = translateText(textNode.nodeValue, current);
      };
      if (root.nodeType === Node.TEXT_NODE) translateNode(root);
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) translateNode(node);
      if (root instanceof Element) {
        const elements = [root, ...Array.from(root.querySelectorAll<HTMLElement>("[placeholder],[aria-label],[title],[alt]"))];
        elements.forEach(element => {
          ["placeholder", "aria-label", "title", "alt"].forEach(attribute => {
            const value = element.getAttribute(attribute);
            if (value) element.setAttribute(attribute, translateText(value, current));
          });
        });
      }
    };
    translateSubtree(document.body);
    const translationObserver = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(translateSubtree));
    });
    translationObserver.observe(document.body, { childList: true, subtree: true });
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach(anchor => {
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const route = href.startsWith(base) ? href.slice(base.length) : href;
      if (!route.startsWith(PATH_SEPARATOR) || anchor.hasAttribute("download") || /\.pdf(?:$|[?#])/i.test(route) || /^\/(zh-tw|en|vi)(?=\/|$)/.test(route) || /^\/(images|downloads|_next|blog-reference)(?=\/)/.test(route)) return;
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
    return () => {
      translationObserver.disconnect();
      document.removeEventListener("click", forceStaticNavigation, true);
    };
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
      {Object.entries(localeLabelsByInterface[locale]).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
    </select>
  </label>;
}
