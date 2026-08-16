"use client";

import { useEffect, useState } from "react";
import { projectOrder } from "../../project-order";
import { toWebpFilename } from "../../project-image";

const images = [
  "01-cover.jpg.png",
  "02-overview.jpg.png",
  "03-process.jpg.png",
  "04-process.jpg.png",
  "05-process.jpg.png",
  "06-process.jpg.png",
  "07-process.jpg.png",
  "08-process.jpg.png",
  "09-process.jpg.png",
  "10-process.jpg.png",
  "11-process.jpg.png",
  "12-final.jpg.png",
];

export default function NovaGallery() {
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
  const imageFolder = zh ? "nova-zh" : "nova";

  return (
    <main className="nova-project">
      <a className="nova-back" href="/#work" aria-label={zh ? "返回作品集" : "Back to selected work"}>
        <span>←</span> {zh ? "返回" : "Back"}
      </a>
      <div className="nova-language" aria-label="Language selector">
        <button className={zh ? "active" : ""} onClick={() => setLang("zh")} aria-pressed={zh}>中</button>
        <span>/</span>
        <button className={!zh ? "active" : ""} onClick={() => setLang("en")} aria-pressed={!zh}>EN</button>
      </div>
      <div className="nova-image-stream">
        {images.map((image, index) => (
          image === "09-process.jpg.png" ? (
            <section className="nova-motion-showcase" aria-label="Nova character motion studies" key={`${lang}-${image}`}>
              {["09-01", "09-02", "09-03"].map((video, videoIndex) => (
                <video
                  className={`nova-motion nova-motion-${videoIndex + 1}`}
                  key={`${lang}-${video}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={`/projects/video-posters/nova/${video}.jpg`}
                  aria-label={`Nova motion study ${videoIndex + 1}`}
                >
                  <source src={`/projects/nova/${video}-web.mp4`} type="video/mp4" />
                </video>
              ))}
            </section>
          ) : (
            <img
              key={`${lang}-${image}`}
              src={`/projects-webp/${imageFolder}/${toWebpFilename(image)}`}
              alt={`Nova project — ${String(index + 1).padStart(2, "0")}`}
              width="3840"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              draggable="false"
            />
          )
        ))}
      </div>
      <section className="nova-return" aria-labelledby="nova-return-title">
        <p>{zh ? "项目结束" : "END OF PROJECT"} · {projectOrder.nova.position}</p>
        <a href="/#work" className="nova-return-link">
          <span id="nova-return-title">
            {zh ? "返回作品集" : "Back to portfolio"}
            <small>{zh ? "Back to portfolio" : "返回作品集"}</small>
          </span>
          <i aria-hidden="true">↗</i>
        </a>
        <div className="nova-return-meta">
          <span>NOVA · 2026</span>
          <span>WUNAN&apos;S PORTFOLIO</span>
        </div>
      </section>
    </main>
  );
}
