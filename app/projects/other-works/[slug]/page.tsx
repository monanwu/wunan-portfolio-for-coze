"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./gallery.css";
import { toProjectWebpPath } from "../../../project-image";

type Gallery = {
  no: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  images: string[];
};

const galleries: Record<string, Gallery> = {
  "project-1": {
    no: "05.1",
    title: "Lenovo Research PPT Template",
    titleZh: "联想研究院 PPT 模板",
    description: "A unified PPT template designed for Lenovo Research, with systematic layouts, colors, and content guidelines for project presentations, technical sharing, and research showcases. It strengthens brand consistency while making communication clearer and more efficient.",
    descriptionZh: "为联想研究院组织打造统一的 PPT 视觉模板，通过系统化的版式、色彩与内容规范，覆盖项目汇报、技术分享与成果展示等场景，在提升品牌一致性的同时，让内容表达更加清晰、高效。",
    images: [
      "/projects/other-works/project-1/1.png",
      "/projects/other-works/project-1/2.png",
      "/projects/other-works/project-1/3.png",
      "/projects/other-works/project-1/4.png",
      "/projects/other-works/project-1/5.png",
      "/projects/other-works/project-1/6.png",
      "/projects/other-works/project-1/7.png",
    ],
  },
  "project-2": {
    no: "05.2",
    title: "AIPC Creator Zone",
    titleZh: "联想AI画师",
    description: `AIPC Creator Zone is an AI-powered creative application that combines New Chinese aesthetics with artificial intelligence, designed for designers, artists, and creative enthusiasts to explore efficient, flexible, and personalized visual creation.

Inspired by traditional Eastern aesthetics, the design reinterprets cultural elements through a modern visual language and integrates AI image generation into an intuitive creative workflow, enabling users to quickly transform ideas into visual works. Powered by local AI capabilities on AIPC, core models can run directly on the device, improving efficiency, reducing reliance on cloud resources, and enhancing the privacy and security of creative content and user data.

By bringing together traditional aesthetics, modern design, and local AI technology, AIPC Creator Zone explores a more secure, efficient, and culturally expressive approach to AI-powered creation.`,
    descriptionZh: `联想 AI 画师是一款融合新中式美学与人工智能技术的 AI 创意应用，面向设计师、艺术家及创意爱好者，为用户提供高效、自由且个性化的视觉创作体验。

设计以传统东方美学为灵感，通过现代视觉语言重新诠释传统文化元素，并将 AI 图像生成能力融入自然、直观的创作流程，让用户能够快速将灵感转化为视觉作品。同时，基于 AIPC 的本地 AI 能力，核心模型可在设备端运行，在提升生成效率的同时减少对云端资源的依赖，并进一步保障创作内容与用户数据的隐私安全。

通过传统美学、现代设计与本地 AI 技术的结合，联想 AI 画师探索了一种更加安全、高效且具有文化表达力的 AI 创作方式。`,
    images: [
      "/projects/other-works/project-2/1.png",
      "/projects/other-works/project-2/2.png",
      "/projects/other-works/project-2/3.png",
      "/projects/other-works/project-2/4.png",
      "/projects/other-works/project-2/5.png",
      "/projects/other-works/project-2/6.png",
    ],
  },
  "project-3": {
    no: "05.3",
    title: "Hyper Reality — Glasses-Free 3D Experience",
    titleZh: "Hyper Reality 裸眼 3D 体验设计",
    description: "Hyper Reality is an immersive digital experience powered by Lenovo’s glasses-free 3D display technology. The project introduces Magic Space 3D UI, a dedicated interface for glasses-free 3D scenarios. Combined with real-time 2D-to-3D conversion and cross-application 3D rendering, it extends traditional 2D interfaces into a more spatial and immersive experience, allowing users to naturally explore rich 3D content without additional devices.",
    descriptionZh: "Hyper Reality 是基于联想裸眼 3D 显示技术打造的沉浸式数字体验。项目围绕裸眼 3D 场景打造专属的 Magic Space 3D UI，结合实时 2D 转 3D 与跨应用 3D 渲染能力，将传统二维界面拓展至更具空间感与层次感的三维体验，让用户无需佩戴额外设备，即可自然探索和体验丰富的 3D 内容。",
    images: [
      "/projects/other-works/project-3/01.png",
      "/projects/other-works/project-3/02.png",
      "/projects/other-works/project-3/03.png",
      "/projects/other-works/project-3/04.png",
      "/projects/other-works/project-3/05.png",
      "/projects/other-works/project-3/06.png",
    ],
  },
  "project-4": {
    no: "05.4",
    title: "AI Router",
    titleZh: "AI Router",
    description: `AI Router is an enterprise AI platform that brings together Developer Platform, Model Router, and Agent Router, integrating AI development, model management, and agent orchestration into one unified and efficient workspace.

The design focuses on information clarity, data-driven decisions, and workflow efficiency. Through clear information architecture, data visualization, modular interfaces, and a unified Design System, AI Router makes complex AI capabilities easier to understand, manage, and use.`,
    descriptionZh: `AI Router 是一个面向企业 AI 开发与管理场景的混合 AI 平台，通过 Developer Platform、Model Router 与 Agent Router 等核心能力，帮助用户完成 AI 应用开发、模型管理与智能体调度。平台将复杂的模型、数据与开发流程整合到统一的产品体验中，让 AI 能力更容易被理解、配置和使用。

项目设计聚焦复杂 AI 系统中的信息组织、数据决策与操作效率，通过清晰的信息架构、数据可视化和模块化设计降低使用门槛。同时建立统一的设计语言与 Design System，让复杂的 AI 能力以更直观、一致且易于管理的方式呈现。`,
    images: [
      "/projects/other-works/project-4/cover.png",
      "/projects/other-works/project-4/1.png",
      "/projects/other-works/project-4/2.png",
      "/projects/other-works/project-4/3.png",
      "/projects/other-works/project-4/4.png",
      "/projects/other-works/project-4/5.png",
      "/projects/other-works/project-4/6.png",
    ],
  },
};

export default function OtherWorksGalleryPage() {
  const params = useParams<{ slug: string }>();
  const gallery = galleries[params.slug] ?? galleries["project-1"];
  const [current, setCurrent] = useState(0);
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const zh = lang === "zh";

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "zh" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    setCurrent(0);
  }, [params.slug]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setCurrent((value) => (value - 1 + gallery.images.length) % gallery.images.length);
      if (event.key === "ArrowRight") setCurrent((value) => (value + 1) % gallery.images.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gallery.images.length]);

  const switchLanguage = (next: "zh" | "en") => {
    setLang(next);
    window.localStorage.setItem("portfolio-language", next);
  };

  const previous = () => setCurrent((value) => (value - 1 + gallery.images.length) % gallery.images.length);
  const next = () => setCurrent((value) => (value + 1) % gallery.images.length);

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <a className="gallery-mark" href="/#work">W</a>
        <a className="gallery-back" href="/projects/other-works"><i>←</i><span>{zh ? "返回其他作品" : "Back to other works"}</span></a>
        <div className="gallery-language">
          <button className={zh ? "active" : ""} onClick={() => switchLanguage("zh")}>中</button><span>/</span>
          <button className={!zh ? "active" : ""} onClick={() => switchLanguage("en")}>EN</button>
        </div>
      </header>

      <section className="gallery-intro">
        <span>{gallery.no} — OTHER WORKS</span>
        <h1>{zh ? gallery.titleZh : gallery.title}</h1>
        <p>
          {zh ? gallery.descriptionZh : gallery.description}
          {params.slug === "project-3" && (
            <>
              {" "}
              {zh ? "该项目凭借创新的裸眼 3D 体验设计，获得 " : "The project received a "}
              <a href="https://ifdesign.com/en/winner-ranking/project/magic-space-3d-ui/641349" target="_blank" rel="noopener noreferrer">
                {zh ? "2024 iF 设计奖" : "2024 iF Design Award"}
              </a>
              {zh ? "。" : " for its innovative glasses-free 3D experience."}
            </>
          )}
        </p>
      </section>

      <section className="gallery-viewer" aria-label={zh ? "图片查看器" : "Image viewer"}>
        <div className="gallery-stage">
          <img src={toProjectWebpPath(gallery.images[current])} alt={`${gallery.title} ${current + 1}`} fetchPriority="high" decoding="async" />
          <button className="gallery-arrow gallery-prev" onClick={previous} aria-label={zh ? "上一张" : "Previous image"}>←</button>
          <button className="gallery-arrow gallery-next" onClick={next} aria-label={zh ? "下一张" : "Next image"}>→</button>
          <div className="gallery-counter"><b>{String(current + 1).padStart(2, "0")}</b><span>/ {String(gallery.images.length).padStart(2, "0")}</span></div>
        </div>

        <div className="gallery-thumbnails" role="list" aria-label={zh ? "图片缩略图" : "Image thumbnails"}>
          {gallery.images.map((image, index) => (
            <button className={index === current ? "active" : ""} onClick={() => setCurrent(index)} key={image} role="listitem" aria-label={`${zh ? "查看第" : "View image"} ${index + 1}`}>
              <img src={toProjectWebpPath(image)} alt="" loading="lazy" decoding="async" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <p className="gallery-hint">{zh ? "点击缩略图或使用键盘 ← → 翻页" : "Select a thumbnail or use the ← → arrow keys"}</p>
      </section>
    </main>
  );
}
