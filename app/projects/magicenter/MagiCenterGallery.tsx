"use client";

import { useEffect, useState } from "react";
import { projectOrder } from "../../project-order";
import { toWebpFilename } from "../../project-image";

const chineseImages = [
  "01-MagiCenter-cover-中文版.jpg.webp",
  "02-MagiCenter-overview-中文版.jpg.webp",
  "03-MagiCenter-process-中文版.jpg.webp",
  "05-MagiCenter-process-中文版.jpg.webp",
  "06-MagiCenter-process-中文版.jpg.webp",
  "07-MagiCenter-process-中文版.jpg.webp",
  "08-MagiCenter-process-中文版.jpg.webp",
  "09-MagiCenter-process-中文版.jpg.webp",
  "10-MagiCenter-process-中文版.jpg.webp",
  "11-MagiCenter-process-中文版.jpg.webp",
  "12-MagiCenter-process-中文版.jpg.webp",
  "13-MagiCenter-process-中文版.jpg.webp",
  "14-MagiCenter-process-中文版.jpg.webp",
  "15-MagiCenter-process-中文版.jpg.webp",
  "16-MagiCenter-process-中文版.jpg.webp",
  "17-MagiCenter-process-中文版.jpg.webp",
  "18-MagiCenter-process-中文版.jpg.webp",
  "20-MagiCenter-final-中文版.webp",
];

const englishImages = [
  "01-MagiCenter-cover.jpg.webp",
  "02-MagiCenter-overview.jpg.webp",
  "03-MagiCenter-process.jpg.webp",
  "04-MagiCenter-process.jpg.webp",
  "05-MagiCenter-process.jpg.webp",
  "06-MagiCenter-process.jpg.webp",
  "07-MagiCenter-process.jpg.webp",
  "08-MagiCenter-process.jpg.webp",
  "09-MagiCenter-process.jpg.webp",
  "10-MagiCenter-process.jpg.webp",
  "11-MagiCenter-process.jpg.webp",
  "12-MagiCenter-process.jpg.webp",
  "13-MagiCenter-process.jpg.webp",
  "14-MagiCenter-process.jpg.webp",
  "15-MagiCenter-process.jpg.webp",
  "16-MagiCenter-process.jpg.webp",
  "17-MagiCenter-process.jpg.webp",
  "18-MagiCenter-final.jpg.webp",
];

export default function MagiCenterGallery() {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "zh") setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const zh = lang === "zh";
  const images = zh ? chineseImages : englishImages;
  const imageDirectory = zh ? "magicenter-zh" : "magicenter-en";

  return (
    <main className="magicenter-project">
      <a className="magicenter-back" href="/" aria-label={zh ? "返回作品集" : "Back to selected work"}>
        <span>←</span> {zh ? "返回" : "Back"}
      </a>
      <div className="magicenter-language" aria-label="Language selector">
        <button className={zh ? "active" : ""} onClick={() => setLang("zh")} aria-pressed={zh}>中</button>
        <span>/</span>
        <button className={!zh ? "active" : ""} onClick={() => setLang("en")} aria-pressed={!zh}>EN</button>
      </div>

      <div className="magicenter-image-stream">
        {images.map((image, index) => (
          <img
            key={`${lang}-${image}`}
            src={`/projects-webp/${imageDirectory}/${toWebpFilename(image)}`}
            alt={`${zh ? "MagiCenter 项目" : "MagiCenter project"} — ${String(index + 1).padStart(2, "0")}`}
            width="3840"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            draggable="false"
          />
        ))}
      </div>

      <section className="magicenter-return" aria-labelledby="magicenter-return-title">
        <p>{zh ? "项目结束" : "END OF PROJECT"} · {projectOrder.magicenter.position}</p>
        <a href="/" className="magicenter-return-link">
          <span id="magicenter-return-title">
            {zh ? "返回作品集" : "Back to portfolio"}
            <small>{zh ? "Back to portfolio" : "返回作品集"}</small>
          </span>
          <i aria-hidden="true">↗</i>
        </a>
        <div className="magicenter-return-meta">
          <span>MAGICENTER · 2024—2025</span>
          <span>WUNAN&apos;S PORTFOLIO</span>
        </div>
      </section>
    </main>
  );
}
