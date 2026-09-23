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
    imageCaption: "GOTECH 台灣高鐵科技 AI-7000-SU1 伺服控制電腦系統拉力試驗機。",
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
];
