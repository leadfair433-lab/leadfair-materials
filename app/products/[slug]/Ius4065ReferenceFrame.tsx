"use client";

import { useEffect, useRef, useState } from "react";

export default function Ius4065ReferenceFrame() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(6200);
  const src = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/ius-4065-reference.html`;

  const measureFrame = () => {
    try {
      const body = frame.current?.contentWindow?.document.body;
      if (body) setHeight(body.scrollHeight);
    } catch {
      frame.current?.contentWindow?.postMessage({ type: "ius4065:measure" }, window.location.origin);
    }
  };

  useEffect(() => {
    const receiveHeight = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow || event.data?.type !== "ius4065:height") return;
      const next = Number(event.data.height);
      if (Number.isFinite(next) && next > 0 && next < 50000) setHeight(next);
    };
    window.addEventListener("message", receiveHeight);
    window.addEventListener("resize", measureFrame);
    return () => {
      window.removeEventListener("message", receiveHeight);
      window.removeEventListener("resize", measureFrame);
    };
  }, []);

  return <iframe ref={frame} className="ius-reference-frame" src={src} title="IUS-4065 超柔軟低收縮彈性體產品介紹" height={height} scrolling="no" onLoad={measureFrame} />;
}
