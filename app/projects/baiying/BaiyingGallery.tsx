"use client";

import { useEffect, useState } from "react";
import { projectOrder } from "../../project-order";
import { toWebpFilename } from "../../project-image";

const chineseImages = [
  "01-baiying-cover-中文版.jpg.jpg",
  "02-baiying-overview-中文版.jpg.jpg",
  "03-baiying-process-中文版.jpg.jpg",
  "04-baiying-process-中文版.jpg.jpg",
  "05-baiying-process-中文版.jpg.jpg",
  "06-baiying-process-中文版.jpg.jpg",
  "07-baiying-process-中文版.jpg.jpg",
  "08-baiying-process-中文版.jpg.jpg",
  "09-baiying-process-中文版.jpg.jpg",
  "10-baiying-process-中文版.jpg.jpg",
  "11-baiying-final-中文版.jpg.jpg",
];

const englishImages = [
  "01-baiying-cover.jpg.jpg",
  "02-baiying-overview.jpg.jpg",
  "03-baiying-process.jpg.jpg",
  "04-baiying-process.jpg.jpg",
  "05-baiying-process.jpg.jpg",
  "06-baiying-process.jpg.jpg",
  "07-baiying-process.jpg.jpg",
  "08-baiying-process.jpg.jpg",
  "09-baiying-process.jpg.jpg",
  "10-baiying-process.jpg.jpg",
  "11-baiying-final.jpg.jpg",
];

export default function BaiyingGallery() {
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
  const imageDirectory = zh ? "baiying-zh" : "baiying-en";

  return (
    <main className="baiying-project">
      <a className="baiying-back" href="/#work" aria-label={zh ? "返回作品集" : "Back to selected work"}>
        <span>←</span> {zh ? "返回" : "Back"}
      </a>
      <div className="baiying-language" aria-label="Language selector">
        <button className={zh ? "active" : ""} onClick={() => setLang("zh")} aria-pressed={zh}>中</button>
        <span>/</span>
        <button className={!zh ? "active" : ""} onClick={() => setLang("en")} aria-pressed={!zh}>EN</button>
      </div>

      <div className="baiying-image-stream">
        {images.map((image, index) => (
          <img
            key={image}
            src={`/projects-webp/${imageDirectory}/${toWebpFilename(image)}`}
            alt={`${zh ? "联想百应电脑管家项目" : "Lenovo Baiying PC Manager project"} — ${String(index + 1).padStart(2, "0")}`}
            width="3840"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            draggable="false"
          />
        ))}
      </div>

      <section className="baiying-return" aria-labelledby="baiying-return-title">
        <p>{zh ? "项目结束" : "END OF PROJECT"} · {projectOrder.baiying.position}</p>
        <a href="/#work" className="baiying-return-link">
          <span id="baiying-return-title">
            {zh ? "返回作品集" : "Back to portfolio"}
            <small>{zh ? "Back to portfolio" : "返回作品集"}</small>
          </span>
          <i aria-hidden="true">↗</i>
        </a>
        <div className="baiying-return-meta">
          <span>LENOVO BAIYING · 2024—2026</span>
          <span>WUNAN&apos;S PORTFOLIO</span>
        </div>
      </section>
    </main>
  );
}
