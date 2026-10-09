(() => {
  if (new URLSearchParams(location.search).get("lang") !== "en") return;

  document.documentElement.lang = "en";
  const translations = {
    "IUS-4065 超柔軟低收縮彈性體": "IUS-4065 Ultra-Soft, Low-Shrink Elastomer",
    "IUS-4065用於EVA與POE發泡配方，兼顧超柔軟、回彈與二次加工尺寸穩定性。": "IUS-4065 is designed for EVA and POE foam formulations, balancing ultra-softness, rebound and dimensional stability after secondary processing.",
    "超柔軟低收縮彈性體": "Ultra-Soft, Low-Shrink Elastomer",
    "EVA與POE發泡配方的柔軟度、回彈與二次加工尺寸穩定解決方案。": "A solution for softness, rebound and dimensional stability in EVA and POE foam formulations.",
    "發泡成品硬度": "Foamed-product hardness", "70°C 40分鐘熱收縮率": "Thermal shrinkage at 70°C for 40 min", "球落回彈率": "Ball rebound",
    "歡迎索取樣品，驗證您的配方與加工條件": "Request a sample to validate your formulation and processing conditions",
    "超柔軟中底為何容易二次收縮": "Why Ultra-Soft Midsoles Are Prone to Secondary Shrinkage",
    "低硬度POE可改善柔軟度與觸感，但二次加熱可能使發泡結構鬆弛，導致縮邊、翹曲、尺寸超差與貼合錯位。研發真正需要解決的，是降低硬度並維持回彈的同時，控制合貼加熱後的尺寸變化。": "Low-hardness POE improves softness and feel, but secondary heating can relax the foam structure and cause edge shrinkage, warping, dimensional deviation and lamination misalignment. The real development challenge is to reduce hardness while maintaining rebound and controlling dimensional change after heating and lamination.",
    "柔軟度": "Softness", "降低成品硬度，提升包覆、緩衝與踩踏舒適性。": "Lower finished-product hardness for improved cushioning, conformity and underfoot comfort.",
    "加工穩定": "Processing Stability", "減少烘烤、熱壓與合貼後的二次尺寸變化。": "Reduce secondary dimensional change after baking, hot pressing and lamination.",
    "量產良率": "Production Yield", "降低左右腳差異、貼合錯位與批次外觀波動。": "Reduce left-right variation, lamination misalignment and batch-to-batch appearance variation.",
    "材料選擇的矛盾  更柔軟卻更容易受熱收縮": "The Material-Selection Trade-Off: Softer Materials Can Shrink More Under Heat",
    "為追求極致柔軟度與高反彈，中底配方常選用TAFMER™或ENGAGE™系列POE。TAFMER™ DF640與ENGAGE™ 8842的典型硬度約為Shore A 54至56，可提供良好的柔軟性與觸感，但其熔融轉變溫度低於50°C；當合貼、烘烤或熱壓溫度高於此區間時，發泡結構可能重新鬆弛，增加二次收縮、縮邊與翹曲風險。": "To achieve exceptional softness and high rebound, midsole formulations often use TAFMER™ or ENGAGE™ POE. TAFMER™ DF640 and ENGAGE™ 8842 typically measure Shore A 54–56 and offer excellent softness and feel, but their melting transition is below 50°C. Lamination, baking or hot pressing above this range can relax the foam structure and increase the risk of secondary shrinkage, edge contraction and warping.",
    "材料": "Material", "原料硬度": "Raw-material hardness", "DSC熔融峰值": "DSC melting peak", "主要優勢": "Primary advantage", "配方與加工關注點": "Formulation and processing considerations",
    "約54至56A": "Approx. 54–56A", "低於50°C": "Below 50°C", "柔軟性與觸感良好": "Good softness and feel", "二次加熱尺寸穩定性需驗證": "Dimensional stability after reheating must be validated", "柔軟性、彈性良好": "Good softness and elasticity", "合貼與烘烤後可能產生熱收縮": "Thermal shrinkage may occur after lamination and baking", "約40A": "Approx. 40A", "約64°C": "Approx. 64°C", "更低硬度與良好柔韌性": "Lower hardness and good flexibility", "較寬熱加工窗口；成品收縮仍以配方實測確認": "Wider thermal-processing window; finished-product shrinkage must still be validated in the actual formulation",
    "熔融峰值不是決定成品收縮率的唯一因素。EVA比例、交聯系統、發泡倍率與二次加工條件均會影響最終結果；本頁以70°C加熱40分鐘的配方對照測試作為實際驗證。": "Melting peak is not the only factor determining finished-product shrinkage. EVA ratio, crosslinking system, expansion ratio and secondary-processing conditions all affect the final result. This page uses a comparative formulation test at 70°C for 40 minutes for practical validation.",
    "產品優勢": "Product Advantages", "更低硬度": "Lower Hardness", "相同60／40 PHR對照配方下，IUS-4065發泡體硬度達Asker C 35，提供更柔軟的踩踏與緩衝感。": "In the same 60/40 PHR comparative formulation, IUS-4065 foam reaches Asker C 35 for a softer step-in and cushioning feel.",
    "較寬的二次加工窗口": "Wider Secondary-Processing Window", "DSC熔融峰值約64°C，可降低材料在合貼、烘烤或熱壓過程中過早軟化與結構鬆弛的風險。": "A DSC melting peak of approximately 64°C helps reduce premature softening and structural relaxation during lamination, baking or hot pressing.",
    "顯著降低熱收縮": "Significantly Lower Thermal Shrinkage", "70°C加熱40分鐘後的熱收縮率為0.92%，較DF610與ENGAGE 8842對照配方降低約71%至74%。": "Thermal shrinkage is 0.92% after 40 minutes at 70°C, approximately 71–74% lower than the DF610 and ENGAGE 8842 comparative formulations.",
    "延展性提升": "Improved Elongation", "斷裂延伸率達252.36%，較兩組對照配方提高約9%至11%，展現良好的柔韌性。": "Elongation at break reaches 252.36%, approximately 9–11% higher than the two comparative formulations, demonstrating good flexibility.",
    "回彈性能保持": "Rebound Maintained", "在硬度明顯降低後，球落回彈率仍維持60%，兼顧柔軟度與彈性表現。": "Even with substantially lower hardness, ball rebound remains at 60%, balancing softness and elasticity.",
    "配方與量產支援": "Formulation and Production Support", "可依目標硬度、發泡倍率、密度與尺寸收縮要求，提供起始配方、試樣、物性測試及量產驗證。": "Starting formulations, samples, physical-property testing and production validation can be provided according to target hardness, expansion ratio, density and dimensional-shrinkage requirements.",
    "為EVA與POE發泡體系設計": "Designed for EVA and POE Foam Systems", "IUS-4065是一款高性能彈性體改質材料，材料硬度約Shore A 40，DSC熔融峰值約64°C。透過合理的EVA／POE比例、交聯系統與發泡條件，可提升二次加工後的尺寸保持能力。": "IUS-4065 is a high-performance elastomer modifier with a material hardness of approximately Shore A 40 and a DSC melting peak of approximately 64°C. A suitable EVA/POE ratio, crosslinking system and foaming conditions can improve dimensional retention after secondary processing.",
    "它不是只追求低硬度的通用型TPE，而是針對柔軟度、回彈與尺寸穩定性難以兼顧的研發痛點設計。": "It is not a general-purpose TPE focused only on low hardness; it is designed to address the development challenge of balancing softness, rebound and dimensional stability.",
    "低熔點材料受熱變形與IUS-4065尺寸穩定對比": "Comparison of heat deformation in a low-melting material and dimensional stability in IUS-4065", "低熔點材料受熱變形與 IUS-4065 尺寸穩定性對比": "Low-melting material heat deformation versus IUS-4065 dimensional stability",
    "內部實測性能驗證": "Internal Performance Validation", "EVA 7470M／比較材料＝60／40 PHR，發泡倍率160%。數據為特定配方與條件下的典型值。": "EVA 7470M/comparison material = 60/40 PHR; expansion ratio 160%. Data are typical values under the specified formulation and conditions.",
    "IUS-4065發泡成品硬度比較圖": "IUS-4065 foamed-product hardness comparison chart", "IUS-4065熱收縮率比較圖": "IUS-4065 thermal-shrinkage comparison chart", "IUS-4065顆粒及EVA POE微孔發泡材料": "IUS-4065 pellets and EVA/POE microcellular foam materials", "微孔發泡結構及配方驗證": "Microcellular foam structure and formulation validation",
    "IUS-4065硬度35C，較兩組對照配方降低約15%至17%。": "IUS-4065 hardness is 35C, approximately 15–17% lower than the two comparative formulations.", "熱收縮率0.92%，較兩組對照配方降低約71%至74%。": "Thermal shrinkage is 0.92%, approximately 71–74% lower than the two comparative formulations.", "EVA 7470M／比較材料＝60／40 PHR，發泡倍率160%；數值越低越好。": "EVA 7470M/comparison material = 60/40 PHR; expansion ratio 160%; lower values are better.",
    "柔軟不代表容易收縮——IUS-4065兼顧柔韌性與耐熱尺寸穩定性": "Soft Does Not Have to Mean Shrink-Prone — IUS-4065 Balances Flexibility and Heat-Resistant Dimensional Stability", "IUS-4065在70°C／60分鐘測試後，熱收縮率僅1.38%，展現優異的耐熱尺寸穩定性。歡迎索取樣品，驗證您的配方與加工條件。": "After testing at 70°C for 60 minutes, IUS-4065 shows only 1.38% thermal shrinkage and excellent heat-resistant dimensional stability. Request a sample to validate your formulation and processing conditions.",
    "硬度": "Hardness", "比重": "Specific gravity", "拉伸強度": "Tensile strength", "斷裂延伸率": "Elongation at break", "撕裂強度": "Tear strength", "壓縮永久變形": "Compression set", "熱收縮率": "Thermal shrinkage", "發泡倍率": "Expansion ratio", "約Shore A 40": "Approx. Shore A 40",
    "IUS-4065的優勢集中在更低硬度、更高延伸率與顯著降低熱收縮；拉伸與撕裂強度略低，壓縮永久變形略高，應依實際產品要求進一步優化配方。": "IUS-4065 provides lower hardness, higher elongation and substantially reduced thermal shrinkage. Tensile and tear strength are slightly lower and compression set is slightly higher, so the formulation should be optimized for actual product requirements.",
    "完整物性比較": "Complete Property Comparison", "測試項目": "Test item", "單位與條件": "Unit and condition", "結果解讀": "Interpretation", "更柔軟": "Softer", "最低": "Lowest", "略低但接近": "Slightly lower but comparable", "最高": "Highest", "需依需求優化": "Optimize to requirements", "略高": "Slightly higher", "顯著降低": "Significantly lower", "維持": "Maintained", "相同": "Same",
    "產品特性": "Product Characteristics", "項目": "Item", "IUS-4065典型資料": "Typical IUS-4065 Data", "產品類型": "Product type", "超柔軟低收縮彈性體改質材料": "Ultra-soft, low-shrink elastomer modifier", "材料外觀": "Material appearance", "半透明白色顆粒": "Translucent white pellets", "材料硬度": "Material hardness", "主要適用體系": "Primary compatible systems", "EVA／POE及彈性體發泡配方": "EVA/POE and elastomer foam formulations", "核心功能": "Core function", "柔軟化、維持回彈及改善二次加工尺寸穩定性": "Softening, rebound retention and improved dimensional stability after secondary processing", "適用製程": "Applicable processes", "化學發泡、射出發泡、模壓成型、冷熱壓及合貼加工": "Chemical foaming, injection foaming, compression molding, cold/hot pressing and lamination", "配方方式": "Formulation approach", "依目標硬度、發泡倍率、機械性能與加工條件調整添加比例": "Adjust addition ratio according to target hardness, expansion ratio, mechanical properties and processing conditions",
    "主要應用領域": "Main Application Areas", "超柔軟EVA／POE發泡中底": "Ultra-soft EVA/POE foam midsoles", "高回彈運動鞋中底": "High-rebound athletic midsoles", "功能性鞋墊與足部護理產品": "Functional insoles and foot-care products", "緩衝、吸震與能量回饋部件": "Cushioning, shock-absorption and energy-return components", "運動防護與柔性支撐材料": "Sports-protection and flexible-support materials", "冷熱壓及二次貼合發泡製品": "Cold/hot-pressed and secondary-laminated foam products",
    "從配方選擇到量產驗證": "From Formulation Selection to Production Validation", "提供現有材料牌號、配方比例、目標硬度、發泡倍率及二次加工條件，可進一步進行起始配方、試樣、機械物性與二次熱收縮評估。": "Provide the current material grade, formulation ratio, target hardness, expansion ratio and secondary-processing conditions so we can evaluate a starting formulation, trial samples, mechanical properties and secondary thermal shrinkage.", "本頁數據為特定配方與測試條件下的內部典型值，僅供材料篩選與配方開發參考，不構成所有配方、製程或成品的保證規格。": "The data on this page are internal typical values under specified formulation and test conditions. They are for material screening and formulation-development reference only and do not constitute guaranteed specifications for every formulation, process or finished product."
  };

  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    const value = node.nodeValue || "";
    const trimmed = value.trim();
    if (translations[trimmed]) node.nodeValue = value.replace(trimmed, translations[trimmed]);
  });
  document.querySelectorAll("[alt]").forEach((element) => {
    const value = element.getAttribute("alt");
    if (value && translations[value]) element.setAttribute("alt", translations[value]);
  });
  const imageTranslations = {
    "./images/ius-reference/visual-03.png": "./images/ius-reference/visual-03-en.png",
    "./images/ius-reference/visual-04.png?v=20261009-1": "./images/ius-reference/visual-04-en.png?v=20261009-1",
    "./images/ius-reference/eva-foam-thermal-shrinkage-ius-4065-comparison.png?v=20261009-1": "./images/ius-reference/eva-foam-thermal-shrinkage-ius-4065-comparison-en.png?v=20261009-1",
  };
  document.querySelectorAll("img[src]").forEach((image) => {
    const source = image.getAttribute("src");
    if (source && imageTranslations[source]) image.setAttribute("src", imageTranslations[source]);
  });
  document.title = "IUS-4065 Ultra-Soft, Low-Shrink Elastomer";
})();
