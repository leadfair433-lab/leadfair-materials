import styles from "./Ius4065ClosingSections.module.css";

const applications = [
  "超柔軟EVA／POE發泡中底",
  "高回彈運動鞋中底",
  "功能性鞋墊與足部護理產品",
  "緩衝、吸震與能量回饋部件",
  "運動防護與柔性支撐材料",
  "冷熱壓及二次貼合發泡製品",
];

export default function Ius4065ClosingSections() {
  return <div className={styles.modules}>
    <section className={`${styles.panel} ${styles.applications}`} aria-labelledby="ius4065-applications-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="ius4065-applications-title">主要應用領域</h2>
          <ul>{applications.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <img src="/images/ius-reference/visual-05.jpg" alt="IUS-4065顆粒及EVA POE微孔發泡材料" />
      </div>
    </section>

    <section className={`${styles.panel} ${styles.validation}`} aria-labelledby="ius4065-validation-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="ius4065-validation-title">從配方選擇到量產驗證</h2>
          <p>提供現有材料牌號、配方比例、目標硬度、發泡倍率及二次加工條件，可進一步進行起始配方、試樣、機械物性與二次熱收縮評估。</p>
          <p>本頁數據為特定配方與測試條件下的內部典型值，僅供材料篩選與配方開發參考，不構成所有配方、製程或成品的保證規格。</p>
          <a href="/contact/#inquiry">歡迎索取樣品，驗證您的配方與加工條件 <b aria-hidden="true">↗</b></a>
        </div>
        <img src="/images/ius-reference/visual-06.jpg" alt="微孔發泡結構及配方驗證" />
      </div>
    </section>
  </div>;
}
