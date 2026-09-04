"use client";

import type { ReactNode } from "react";

function returnToPreviousPage() {
  if (window.history.length > 1) window.history.back();
  else window.location.assign("/articles");
}

export function ArticleBackButton() {
  return <button type="button" className="journal-back-button" onClick={returnToPreviousPage}>← 返回上一页</button>;
}

export default function ArticleFrame({ children }: { children: ReactNode }) {
  function goBack() {
    returnToPreviousPage();
  }
  return <main className="journal-page" onClick={event => {
    if (event.target === event.currentTarget) goBack();
  }}>
    <button type="button" className="journal-background-back" aria-label="返回上一页" onClick={goBack} />
    {children}
  </main>;
}
