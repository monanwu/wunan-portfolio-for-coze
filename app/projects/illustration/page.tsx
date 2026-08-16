"use client";

import { useEffect, useState } from "react";
import "../other-works/other-works.css";

export default function IllustrationPage() {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "zh" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("portfolio-language", lang);
  }, [lang]);

  const zh = lang === "zh";
  const categories = [
    {
      no: "04.1",
      slug: "hand-drawn",
      nameZh: "手绘",
      nameEn: "Hand-drawn Illustration",
      detailZh: "收录个人手绘插图与编辑视觉作品。",
      detailEn: "A selection of hand-drawn illustrations and editorial visual work.",
      preview: "/projects-webp/illustration/hand-drawn/1.webp",
      typeZh: "手绘插图",
      typeEn: "Hand-drawn",
      tone: "lime",
    },
    {
      no: "04.2",
      slug: "aigc",
      nameZh: "AIGC 作品",
      nameEn: "AIGC Works",
      detailZh: "探索生成式 AI 在插图与视觉创作中的应用。",
      detailEn: "Explorations of generative AI across illustration and visual creation.",
      preview: "/projects-webp/illustration/aigc/1.webp",
      typeZh: "生成式视觉",
      typeEn: "Generative Visuals",
      tone: "cyan",
    },
  ] as const;

  return (
    <main className="other-works-page">
      <header className="ow-header">
        <a className="ow-mark" href="/#work" aria-label={zh ? "返回作品集" : "Back to portfolio"}>W</a>
        <a className="ow-back" href="/#work"><i>←</i><span>{zh ? "返回作品集" : "Back to portfolio"}</span></a>
        <div className="ow-language" aria-label="Language selector">
          <button className={zh ? "active" : ""} onClick={() => setLang("zh")}>中</button><span>/</span>
          <button className={!zh ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
      </header>

      <section className="ow-hero">
        <h1>{zh ? "插图" : "ILLUSTRATION"}</h1>
        <p className="ow-summary">{zh ? "这里收录个人插图与编辑设计实践。" : "A collection of personal illustration and editorial design work."}</p>
      </section>

      <section className="ow-categories" aria-label={zh ? "插图分类" : "Illustration categories"}>
        {categories.map((category, index) => (
          <a className={`ow-category ow-${category.tone}`} href={`/projects/illustration/${category.slug}`} id={`category-${category.no}`} key={category.slug}>
            <div className="ow-category-visual">
              <img className="ow-category-preview" src={category.preview} alt={zh ? category.nameZh : category.nameEn} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} decoding="async" />
              <span className="ow-category-number">{category.no}</span>
              <div className="ow-category-overlay">
                <p>{zh ? category.detailZh : category.detailEn}</p>
                <span className="ow-view">{zh ? "查看项目" : "View project"} <i>↗</i></span>
              </div>
            </div>
            <div className="ow-category-info">
              <div><span className="ow-arrow">↗</span><h2>{zh ? category.nameZh : category.nameEn}</h2></div>
              <p>{zh ? category.typeZh : category.typeEn}</p>
            </div>
          </a>
        ))}
      </section>

      <footer className="ow-footer">
        <span>WUNAN&apos;S PORTFOLIO</span>
        <a href="mailto:wunan0221@icloud.com">{zh ? "联系我" : "Contact"} ↗</a>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
