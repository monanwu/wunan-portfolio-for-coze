"use client";

import { useEffect, useState } from "react";
import "./other-works.css";

const categories = [
  {
    no: "05.1",
    slug: "project-1",
    nameZh: "联想研究院 PPT 模板",
    nameEn: "Lenovo Research PPT Template",
    detailZh: "为联想研究院组织打造统一的 PPT 视觉模板，通过系统化的版式、色彩与内容规范，覆盖项目汇报、技术分享与成果展示等场景，在提升品牌一致性的同时，让内容表达更加清晰、高效。",
    detailEn: "A unified PPT template designed for Lenovo Research, with systematic layouts, colors, and content guidelines for project presentations, technical sharing, and research showcases. It strengthens brand consistency while making communication clearer and more efficient.",
    preview: "/projects-webp/other-works/project-1/1.webp",
    typeZh: "PPT 模板",
    typeEn: "PPT Template",
    tone: "lime",
  },
  { no: "05.2", slug: "project-2", nameZh: "联想AI画师", nameEn: "AIPC Creator Zone", detailZh: "融合新中式美学与本地 AI 能力的创意应用，提供高效、自由且注重隐私的视觉创作体验。", detailEn: "An AI creative application combining New Chinese aesthetics with private, efficient on-device creation.", preview: "/projects-webp/other-works/project-2/1.webp", typeZh: "AI 创意应用", typeEn: "AI Creative Application", tone: "cyan" },
  { no: "05.3", slug: "project-3", nameZh: "Hyper Reality 裸眼 3D 体验设计", nameEn: "Hyper Reality — Glasses-Free 3D Experience", detailZh: "基于联想裸眼 3D 显示技术打造的沉浸式数字体验，通过 Magic Space 3D UI、实时 2D 转 3D 与跨应用 3D 渲染，拓展更具空间感与层次感的三维体验。", detailEn: "An immersive digital experience powered by Lenovo’s glasses-free 3D display technology, featuring Magic Space 3D UI, real-time 2D-to-3D conversion, and cross-application 3D rendering.", preview: "/projects-webp/other-works/project-3/cover-v2.webp", typeZh: "裸眼 3D 体验设计", typeEn: "Glasses-Free 3D Experience", tone: "orange" },
  { no: "05.4", slug: "project-4", nameZh: "AI Router", nameEn: "AI Router", detailZh: "面向企业 AI 开发与管理场景的混合 AI 平台，整合应用开发、模型管理与智能体调度，并通过统一的设计语言降低复杂系统的使用门槛。", detailEn: "An enterprise AI platform that unifies AI development, model management, and agent orchestration in one clear and efficient workspace.", preview: "/projects-webp/other-works/project-4/cover.webp", typeZh: "企业 AI 平台", typeEn: "Enterprise AI Platform", tone: "violet" },
];

export default function OtherWorksPage() {
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
        <h1>{zh ? "其他作品" : "OTHER WORKS"}</h1>
        <p className="ow-summary">{zh ? "涵盖不同方向的设计实践。" : "Design practices across diverse disciplines."}</p>
      </section>

      <section className="ow-categories" aria-label={zh ? "作品分类" : "Work categories"}>
        {categories.map((category, index) => (
          <a className={`ow-category ow-${category.tone}`} href={`/projects/other-works/${category.slug}`} id={`category-${category.no}`} key={category.no}>
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
