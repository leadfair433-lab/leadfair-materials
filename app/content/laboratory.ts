export type LaboratoryArticle = {
  slug: string;
  title: string;
  image: string;
  imageFit?: "cover" | "contain";
  summary: string;
  statusLabel?: string;
  imageCaption?: string;
  sections: { title: string; paragraphs: string[] }[];
};

// Preview copy for the laboratory article template. Replace with verified
// instrument names, methods, and specifications when they are available.
export const laboratoryArticles: LaboratoryArticle[] = [
  {
    slug: "panorama-left", title: "實驗室全景・左區", image: "/images/company/laboratory/lab-panorama-left-fast.jpg",
    summary: "從整體空間認識材料研發與測試環境。本文為介紹頁面示例，儀器資料待確認後補充。",
    sections: [
      { title: "環境介紹", paragraphs: ["此區展示實驗室空間與工作動線。後續可在此說明材料處理、樣品準備與設備配置，協助讀者理解研發流程。"] },
      { title: "可補充的設備資訊", paragraphs: ["待確認設備名稱與用途後，可逐一加入儀器照片、測試項目、操作流程及適用材料。本頁目前不列出未核實的型號或測試數值。"] },
    ],
  },
  {
    slug: "panorama-right", title: "實驗室全景・右區", image: "/images/company/laboratory/lab-panorama-right-fast.jpg",
    summary: "以另一個視角呈現材料實驗室。本文為介紹頁面示例，內容可隨設備資料逐步更新。",
    sections: [
      { title: "空間與流程", paragraphs: ["此視角可用於介紹從配方規劃、樣品製備到性能驗證的工作環境。正式內容可依實際設備配置調整。"] },
      { title: "後續內容方向", paragraphs: ["每項設備可另設獨立文章，放入設備用途、樣品條件、測試流程與結果說明，並與此環境介紹互相連結。"] },
    ],
  },
  {
    slug: "equipment-front", title: "實驗室設備正面", image: "/images/company/laboratory/lab-equipment-front-fast.jpg",
    summary: "展示設備區域與材料測試環境。本文示範單項儀器介紹的文章結構。",
    sections: [
      { title: "設備用途", paragraphs: ["此處預留設備名稱與用途介紹。可說明儀器在材料開發、樣品製作或物性評估中的角色；正式資訊需依現場設備確認。"] },
      { title: "測試與應用", paragraphs: ["可依實際儀器加入可測試項目、樣品準備方式、適用的材料類型，以及結果如何協助選材與配方調整。"] },
      { title: "資料更新", paragraphs: ["目前圖片與段落用於展示文章版式，型號、測試標準及性能數據待核實後再發布。"] },
    ],
  },
  {
    slug: "testing-area", title: "實驗室檢測區", image: "/images/company/laboratory/lab-testing-area-fast.jpg",
    summary: "呈現材料檢測區的工作環境。本文示範測試項目文章的內容層次。",
    sections: [
      { title: "檢測區介紹", paragraphs: ["檢測區可用於說明樣品製備與性能驗證的工作方式。具體設備和操作條件將以正式資料為準。"] },
      { title: "文章可呈現的內容", paragraphs: ["未來可加入儀器近照、測試目的、方法與樣品要求，並以圖文方式說明結果如何用於材料研發與品質確認。"] },
    ],
  },
  {
    slug: "servo-computer-tensile-tester",
    title: "伺服控制電腦系統拉力試驗機",
    image: "/images/company/laboratory/instruments/servo-computer-tensile-tester.png",
    imageFit: "contain",
    summary: "以伺服控制與電腦化介面進行材料力學性能測試，適用於橡膠、塑膠、彈性體、紡織與紙板等材料。",
    statusLabel: "材料力學測試 / AI-7000-SU1",
    imageCaption: "GOTECH 台灣高鐵科技 AI-7000-SU1 伺服控制電腦系統拉力試驗機",
    sections: [
      {
        title: "設備用途",
        paragraphs: [
          "伺服控制電腦系統拉力試驗機配備伺服控制技術、電腦化操作介面與多種測試工裝，可對橡膠、塑膠、彈性體等高分子聚合物，以及紡織、紙板等材料的成品、半成品或啞鈴狀試樣進行測試。",
          "設備可用於測量抗拉強度、伸長、撕裂、膠著力、抗拉應力、剝離、剪力與黏接力等性能，支援材料性能評估與品質控制。",
        ],
      },
      {
        title: "設備規格與測試標準",
        paragraphs: [
          "設備型號為 AI-7000-SU1，廠牌為 GOTECH 台灣高鐵科技，荷重元為 5 kN。",
          "測試方案涵蓋 DIN、ASTM、ISO、SATRA 等行業標準；測量單位可切換 kgf、lbf、N、kN、gf、kPa、MPa 等。",
        ],
      },
      {
        title: "控制與數據記錄",
        paragraphs: [
          "伺服控制系統可對測試過程進行高精度控制，協助確保測試結果的準確性與可靠性。",
          "系統能夠即時監控並記錄測試過程中的數據，便於使用者掌握測試進度與結果。",
        ],
      },
    ],
  },
  {
    slug: "yellowing-resistance-test-chamber",
    title: "耐黃變試驗箱",
    image: "/images/company/laboratory/instruments/yellowing-resistance-test-chamber.png",
    imageFit: "contain",
    summary: "模擬淺色與白色材料在太陽光及受熱條件下的長時間照射，評估試樣表面的變色程度與耐黃變能力。",
    statusLabel: "耐黃變測試 / GT-7035-EUA",
    imageCaption: "GOTECH 台灣高鐵科技 GT-7035-EUA 耐黃變試驗箱",
    sections: [
      {
        title: "設備原理與用途",
        paragraphs: [
          "淺色和白色材料或製品在自然太陽光長時間照射下容易發生黃變。耐黃變試驗箱以太陽燈及加熱控溫裝置模擬自然環境，在規定時間內觀察試樣表面顏色變化，藉此判定試樣在太陽光輻射下的耐黃變能力。",
          "設備除適用於鞋材，也可用於評估其他淺色或白色材料的耐黃變性能，協助在產品開發階段提前發現黃變問題。",
        ],
      },
      {
        title: "設備規格與測試規範",
        paragraphs: [
          "設備型號為 GT-7035-EUA，廠牌為 GOTECH 台灣高鐵科技；光源採用 300 W 太陽燈泡，溫度範圍為室溫 +10°C 至 80°C，加熱方式為熱風循環。",
          "測試規範涵蓋 HG/T 3689 Method A 與 HG/T 4905。",
        ],
      },
      {
        title: "均勻照射與環境控制",
        paragraphs: [
          "試驗箱可模擬材料在自然太陽光下的長時間照射，使測試條件更貼近實際使用環境。",
          "設備配備試樣回轉裝置，使試樣受熱與受輻射更均勻，提升試驗的準確性與可靠性；溫度及照射時間等環境參數可依測試需求控制。",
        ],
      },
    ],
  },
  {
    slug: "aging-test-machine",
    title: "老化試驗機",
    image: "/images/company/laboratory/instruments/aging-test-machine.png",
    imageFit: "contain",
    summary: "在規定的溫度與時間條件下使試樣均勻受熱，觀察材料老化前後的耐黃、開膠、收縮、伸長與殘餘率等性能變化。",
    statusLabel: "材料老化與耐熱性能測試",
    imageCaption: "GOTECH 高鐵檢測儀器老化試驗機",
    sections: [
      {
        title: "設備原理與用途",
        paragraphs: [
          "老化試驗機用於測試塑膠、橡膠、皮革與布料等材料在受熱前後的性能變化。設備在規定的溫度和時間條件下使試樣均勻受熱，觀察耐黃、開膠、收縮、伸長與殘餘率等變化，以評估材料的老化特性。",
          "精確的溫度與時間控制可模擬實際應用環境中的受熱變化，協助確認材料的耐用性、穩定性與可靠性。",
        ],
      },
      {
        title: "模擬環境與壽命評估",
        paragraphs: [
          "設備可模擬材料在高溫環境中的老化過程，提供更貼近使用條件的性能評估。",
          "透過長時間高溫暴露，可觀察材料性能的變化趨勢，作為預測產品使用壽命與驗證耐熱穩定性的參考。",
        ],
      },
      {
        title: "性能測試與品質控制",
        paragraphs: [
          "老化試驗可從耐黃度、開膠性、收縮率與伸長性等不同面向評估材料的老化特性。",
          "測試結果可作為產品品質控制與配方改良的依據，協助提升批次一致性及使用可靠性。",
        ],
      },
    ],
  },
];
