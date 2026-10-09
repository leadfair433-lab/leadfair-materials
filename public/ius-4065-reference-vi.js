(() => {
  if (new URLSearchParams(location.search).get("lang") !== "vi") return;

  document.documentElement.lang = "vi";
  const translations = {
    "超柔軟低收縮彈性體": "Vật liệu đàn hồi siêu mềm, độ co thấp",
    "EVA與POE發泡配方的柔軟度、回彈與二次加工尺寸穩定解決方案。": "Giải pháp cân bằng độ mềm, độ đàn hồi và độ ổn định kích thước sau gia công cho công thức xốp EVA và POE.",
    "發泡成品硬度": "Độ cứng sản phẩm xốp", "70°C 40分鐘熱收縮率": "Độ co nhiệt ở 70°C trong 40 phút", "球落回彈率": "Độ nảy bóng rơi",
    "歡迎索取樣品，驗證您的配方與加工條件": "Yêu cầu mẫu để kiểm chứng công thức và điều kiện gia công",
    "超柔軟中底為何容易二次收縮": "Vì sao đế giữa siêu mềm dễ bị co rút lần hai",
    "低硬度POE可改善柔軟度與觸感，但二次加熱可能使發泡結構鬆弛，導致縮邊、翹曲、尺寸超差與貼合錯位。研發真正需要解決的，是降低硬度並維持回彈的同時，控制合貼加熱後的尺寸變化。": "POE độ cứng thấp giúp tăng độ mềm và cảm giác tiếp xúc, nhưng gia nhiệt lần hai có thể làm cấu trúc xốp giãn lỏng, gây co mép, cong vênh, sai lệch kích thước và lệch khi ép dán. Thách thức cốt lõi là giảm độ cứng, duy trì độ đàn hồi và đồng thời kiểm soát biến đổi kích thước sau gia nhiệt và ép dán.",
    "柔軟度": "Độ mềm", "降低成品硬度，提升包覆、緩衝與踩踏舒適性。": "Giảm độ cứng thành phẩm để tăng khả năng ôm chân, đệm và sự thoải mái khi sử dụng.",
    "加工穩定": "Ổn định gia công", "減少烘烤、熱壓與合貼後的二次尺寸變化。": "Giảm biến đổi kích thước lần hai sau sấy, ép nóng và ép dán.",
    "量產良率": "Tỷ lệ đạt khi sản xuất hàng loạt", "降低左右腳差異、貼合錯位與批次外觀波動。": "Giảm sai khác giữa hai bên, lệch ép dán và biến động ngoại quan giữa các lô.",
    "材料選擇的矛盾  更柔軟卻更容易受熱收縮": "Mâu thuẫn khi chọn vật liệu: càng mềm càng dễ co nhiệt",
    "為追求極致柔軟度與高反彈，中底配方常選用TAFMER™或ENGAGE™系列POE。TAFMER™ DF640與ENGAGE™ 8842的典型硬度約為Shore A 54至56，可提供良好的柔軟性與觸感，但其熔融轉變溫度低於50°C；當合貼、烘烤或熱壓溫度高於此區間時，發泡結構可能重新鬆弛，增加二次收縮、縮邊與翹曲風險。": "Để đạt độ mềm cao và độ nảy tốt, công thức đế giữa thường dùng POE TAFMER™ hoặc ENGAGE™. TAFMER™ DF640 và ENGAGE™ 8842 có độ cứng điển hình Shore A 54-56, cho độ mềm và cảm giác tốt, nhưng nhiệt độ chuyển nóng chảy dưới 50°C. Khi ép dán, sấy hoặc ép nóng trên khoảng này, cấu trúc xốp có thể giãn lỏng trở lại, làm tăng nguy cơ co rút lần hai, co mép và cong vênh.",
    "材料": "Vật liệu", "原料硬度": "Độ cứng nguyên liệu", "DSC熔融峰值": "Đỉnh nóng chảy DSC", "主要優勢": "Ưu điểm chính", "配方與加工關注點": "Lưu ý về công thức và gia công",
    "約54至56A": "Khoảng 54-56A", "低於50°C": "Dưới 50°C", "柔軟性與觸感良好": "Độ mềm và cảm giác tốt", "二次加熱尺寸穩定性需驗證": "Cần xác nhận độ ổn định kích thước sau gia nhiệt lần hai", "柔軟性、彈性良好": "Độ mềm và đàn hồi tốt", "合貼與烘烤後可能產生熱收縮": "Có thể co nhiệt sau ép dán và sấy", "約40A": "Khoảng 40A", "約64°C": "Khoảng 64°C", "更低硬度與良好柔韌性": "Độ cứng thấp hơn và độ dẻo tốt", "較寬熱加工窗口；成品收縮仍以配方實測確認": "Cửa sổ gia công nhiệt rộng hơn; độ co thành phẩm vẫn cần xác nhận bằng công thức thực tế",
    "熔融峰值不是決定成品收縮率的唯一因素。EVA比例、交聯系統、發泡倍率與二次加工條件均會影響最終結果；本頁以70°C加熱40分鐘的配方對照測試作為實際驗證。": "Đỉnh nóng chảy không phải yếu tố duy nhất quyết định độ co của thành phẩm. Tỷ lệ EVA, hệ liên kết ngang, tỷ lệ nở và điều kiện gia công lần hai đều ảnh hưởng kết quả cuối cùng; trang này sử dụng thử nghiệm đối chứng ở 70°C trong 40 phút để xác nhận thực tế.",
    "產品優勢": "Ưu điểm sản phẩm", "更低硬度": "Độ cứng thấp hơn", "相同60／40 PHR對照配方下，IUS-4065發泡體硬度達Asker C 35，提供更柔軟的踩踏與緩衝感。": "Trong cùng công thức đối chứng 60/40 PHR, xốp IUS-4065 đạt độ cứng Asker C 35, mang lại cảm giác mềm và đệm tốt hơn.",
    "較寬的二次加工窗口": "Cửa sổ gia công lần hai rộng hơn", "DSC熔融峰值約64°C，可降低材料在合貼、烘烤或熱壓過程中過早軟化與結構鬆弛的風險。": "Đỉnh nóng chảy DSC khoảng 64°C giúp giảm nguy cơ vật liệu mềm quá sớm và cấu trúc bị giãn lỏng trong quá trình ép dán, sấy hoặc ép nóng.",
    "顯著降低熱收縮": "Giảm đáng kể độ co nhiệt", "70°C加熱40分鐘後的熱收縮率為0.92%，較DF610與ENGAGE 8842對照配方降低約71%至74%。": "Sau 40 phút ở 70°C, độ co nhiệt là 0,92%, thấp hơn khoảng 71%-74% so với công thức đối chứng DF610 và ENGAGE 8842.",
    "延展性提升": "Tăng độ giãn dài", "斷裂延伸率達252.36%，較兩組對照配方提高約9%至11%，展現良好的柔韌性。": "Độ giãn dài khi đứt đạt 252,36%, cao hơn khoảng 9%-11% so với hai công thức đối chứng, thể hiện độ dẻo tốt.",
    "回彈性能保持": "Duy trì độ đàn hồi", "在硬度明顯降低後，球落回彈率仍維持60%，兼顧柔軟度與彈性表現。": "Dù độ cứng giảm rõ rệt, độ nảy bóng rơi vẫn duy trì 60%, cân bằng độ mềm và độ đàn hồi.",
    "配方與量產支援": "Hỗ trợ công thức và sản xuất hàng loạt", "可依目標硬度、發泡倍率、密度與尺寸收縮要求，提供起始配方、試樣、物性測試及量產驗證。": "Có thể cung cấp công thức khởi đầu, mẫu thử, kiểm tra tính chất và xác nhận sản xuất theo độ cứng mục tiêu, tỷ lệ nở, mật độ và yêu cầu co kích thước.",
    "為EVA與POE發泡體系設計": "Được thiết kế cho hệ xốp EVA và POE", "IUS-4065是一款高性能彈性體改質材料，材料硬度約Shore A 40，DSC熔融峰值約64°C。透過合理的EVA／POE比例、交聯系統與發泡條件，可提升二次加工後的尺寸保持能力。": "IUS-4065 là vật liệu biến tính đàn hồi hiệu suất cao, có độ cứng khoảng Shore A 40 và đỉnh nóng chảy DSC khoảng 64°C. Tỷ lệ EVA/POE, hệ liên kết ngang và điều kiện tạo xốp phù hợp giúp cải thiện khả năng duy trì kích thước sau gia công lần hai.",
    "它不是只追求低硬度的通用型TPE，而是針對柔軟度、回彈與尺寸穩定性難以兼顧的研發痛點設計。": "Đây không phải TPE thông dụng chỉ tập trung vào độ cứng thấp, mà được thiết kế để giải quyết bài toán cân bằng độ mềm, độ đàn hồi và độ ổn định kích thước.",
    "低熔點材料受熱變形與IUS-4065尺寸穩定對比": "So sánh biến dạng nhiệt của vật liệu nóng chảy thấp với độ ổn định kích thước của IUS-4065", "低熔點材料受熱變形與 IUS-4065 尺寸穩定性對比": "So sánh biến dạng nhiệt của vật liệu nóng chảy thấp và độ ổn định kích thước của IUS-4065",
    "內部實測性能驗證": "Xác nhận hiệu suất bằng thử nghiệm nội bộ", "EVA 7470M／比較材料＝60／40 PHR，發泡倍率160%。數據為特定配方與條件下的典型值。": "EVA 7470M/vật liệu so sánh = 60/40 PHR; tỷ lệ nở 160%. Dữ liệu là giá trị điển hình trong công thức và điều kiện thử nghiệm xác định.",
    "IUS-4065硬度35C，較兩組對照配方降低約15%至17%。": "Độ cứng IUS-4065 là 35C, thấp hơn khoảng 15%-17% so với hai công thức đối chứng.", "熱收縮率0.92%，較兩組對照配方降低約71%至74%。": "Độ co nhiệt 0,92%, thấp hơn khoảng 71%-74% so với hai công thức đối chứng.", "EVA 7470M／比較材料＝60／40 PHR，發泡倍率160%；數值越低越好。": "EVA 7470M/vật liệu so sánh = 60/40 PHR; tỷ lệ nở 160%; giá trị càng thấp càng tốt.",
    "柔軟不代表容易收縮——IUS-4065兼顧柔韌性與耐熱尺寸穩定性": "Mềm không đồng nghĩa với dễ co - IUS-4065 cân bằng độ dẻo và độ ổn định kích thước chịu nhiệt", "IUS-4065在70°C／60分鐘測試後，熱收縮率僅1.38%，展現優異的耐熱尺寸穩定性。歡迎索取樣品，驗證您的配方與加工條件。": "Sau thử nghiệm 60 phút ở 70°C, IUS-4065 chỉ co nhiệt 1,38%, thể hiện độ ổn định kích thước chịu nhiệt vượt trội. Hãy yêu cầu mẫu để xác nhận công thức và điều kiện gia công của bạn.",
    "完整物性比較": "So sánh đầy đủ các tính chất", "測試項目": "Hạng mục thử nghiệm", "單位與條件": "Đơn vị và điều kiện", "結果解讀": "Diễn giải kết quả", "硬度": "Độ cứng", "比重": "Tỷ trọng", "拉伸強度": "Độ bền kéo", "斷裂延伸率": "Độ giãn dài khi đứt", "撕裂強度": "Độ bền xé", "壓縮永久變形": "Biến dạng dư khi nén", "熱收縮率": "Độ co nhiệt", "球落回彈率": "Độ nảy bóng rơi", "發泡倍率": "Tỷ lệ nở", "更柔軟": "Mềm hơn", "最低": "Thấp nhất", "略低但接近": "Thấp hơn nhẹ nhưng tương đương", "最高": "Cao nhất", "需依需求優化": "Cần tối ưu theo yêu cầu", "略高": "Cao hơn nhẹ", "顯著降低": "Giảm đáng kể", "維持": "Duy trì", "相同": "Tương đương",
    "IUS-4065的優勢集中在更低硬度、更高延伸率與顯著降低熱收縮；拉伸與撕裂強度略低，壓縮永久變形略高，應依實際產品要求進一步優化配方。": "Ưu điểm của IUS-4065 tập trung ở độ cứng thấp hơn, độ giãn dài cao hơn và giảm đáng kể độ co nhiệt. Độ bền kéo và xé thấp hơn nhẹ, biến dạng dư khi nén cao hơn nhẹ; công thức cần được tối ưu theo yêu cầu sản phẩm thực tế.",
    "產品特性": "Đặc tính sản phẩm", "項目": "Hạng mục", "IUS-4065典型資料": "Dữ liệu điển hình IUS-4065", "產品類型": "Loại sản phẩm", "超柔軟低收縮彈性體改質材料": "Vật liệu biến tính đàn hồi siêu mềm, độ co thấp", "材料外觀": "Ngoại quan vật liệu", "半透明白色顆粒": "Hạt trắng bán trong suốt", "材料硬度": "Độ cứng vật liệu", "約Shore A 40": "Khoảng Shore A 40", "主要適用體系": "Hệ tương thích chính", "EVA／POE及彈性體發泡配方": "Công thức xốp EVA/POE và vật liệu đàn hồi", "核心功能": "Chức năng cốt lõi", "柔軟化、維持回彈及改善二次加工尺寸穩定性": "Làm mềm, duy trì độ đàn hồi và cải thiện độ ổn định kích thước sau gia công lần hai", "適用製程": "Quy trình phù hợp", "化學發泡、射出發泡、模壓成型、冷熱壓及合貼加工": "Tạo xốp hóa học, ép phun xốp, ép khuôn, ép nóng/lạnh và ép dán", "配方方式": "Phương pháp phối liệu", "依目標硬度、發泡倍率、機械性能與加工條件調整添加比例": "Điều chỉnh tỷ lệ bổ sung theo độ cứng mục tiêu, tỷ lệ nở, tính chất cơ học và điều kiện gia công",
    "主要應用領域": "Lĩnh vực ứng dụng chính", "超柔軟EVA／POE發泡中底": "Đế giữa xốp EVA/POE siêu mềm", "高回彈運動鞋中底": "Đế giữa giày thể thao đàn hồi cao", "功能性鞋墊與足部護理產品": "Lót giày chức năng và sản phẩm chăm sóc bàn chân", "緩衝、吸震與能量回饋部件": "Bộ phận đệm, hấp thụ chấn động và hoàn trả năng lượng", "運動防護與柔性支撐材料": "Vật liệu bảo hộ thể thao và hỗ trợ linh hoạt", "冷熱壓及二次貼合發泡製品": "Sản phẩm xốp ép nóng/lạnh và ép dán lần hai",
    "從配方選擇到量產驗證": "Từ lựa chọn công thức đến xác nhận sản xuất hàng loạt", "提供現有材料牌號、配方比例、目標硬度、發泡倍率及二次加工條件，可進一步進行起始配方、試樣、機械物性與二次熱收縮評估。": "Cung cấp mã vật liệu hiện tại, tỷ lệ công thức, độ cứng mục tiêu, tỷ lệ nở và điều kiện gia công lần hai để đánh giá công thức khởi đầu, mẫu thử, tính chất cơ học và độ co nhiệt lần hai.", "本頁數據為特定配方與測試條件下的內部典型值，僅供材料篩選與配方開發參考，不構成所有配方、製程或成品的保證規格。": "Dữ liệu trên trang là giá trị điển hình nội bộ trong công thức và điều kiện thử nghiệm xác định, chỉ dùng để tham khảo khi sàng lọc vật liệu và phát triển công thức; không phải thông số bảo đảm cho mọi công thức, quy trình hoặc thành phẩm."
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
    "./images/ius-reference/visual-03.png": "./images/ius-reference/visual-03-vi.png",
    "./images/ius-reference/visual-04.png?v=20261009-1": "./images/ius-reference/visual-04-vi.png?v=20261009-1",
    "./images/ius-reference/eva-foam-thermal-shrinkage-ius-4065-comparison.png?v=20261009-1": "./images/ius-reference/eva-foam-thermal-shrinkage-ius-4065-comparison-vi.png?v=20261009-1"
  };
  document.querySelectorAll("img[src]").forEach((image) => {
    const source = image.getAttribute("src");
    if (source && imageTranslations[source]) image.setAttribute("src", imageTranslations[source]);
  });
  document.title = "IUS-4065 - Vật liệu đàn hồi siêu mềm, độ co thấp";
})();
