"use client";

import { useEffect, useState } from "react";

export type HonorItem = {
  src: string;
  title: string;
  category: string;
};

export default function HonorsGallery({ items }: { items: HonorItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((active - 1 + items.length) % items.length);
      if (event.key === "ArrowRight") setActive((active + 1) % items.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, items.length]);

  return <>
    <div className="certificate-grid">
      {items.map((item, index) => <article key={item.src}>
        <button className="certificate-preview" type="button" onClick={() => setActive(index)} aria-label={`放大查看：${item.title}`}>
          <img src={item.src} alt={item.title}/>
          <span className="certificate-zoom" aria-hidden="true">放大查看 ＋</span>
        </button>
        <div className="certificate-meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{item.category}</small></div>
        <h3>{item.title}</h3>
      </article>)}
    </div>
    {active !== null && <div className="certificate-lightbox" role="dialog" aria-modal="true" aria-label={items[active].title} onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
      <div className="certificate-lightbox-toolbar">
        <div><b>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</b><span>{items[active].title}</span></div>
        <button type="button" onClick={() => setActive(null)} aria-label="關閉放大圖片">×</button>
      </div>
      <button className="lightbox-arrow lightbox-prev" type="button" onClick={() => setActive((active - 1 + items.length) % items.length)} aria-label="上一張">‹</button>
      <img src={items[active].src} alt={items[active].title}/>
      <button className="lightbox-arrow lightbox-next" type="button" onClick={() => setActive((active + 1) % items.length)} aria-label="下一張">›</button>
    </div>}
  </>;
}
