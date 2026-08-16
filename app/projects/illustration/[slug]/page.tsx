"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "../../other-works/[slug]/gallery.css";
import { toProjectWebpPath } from "../../../project-image";

const galleries = {
  "hand-drawn": {
    no: "04.1",
    titleZh: "手绘",
    titleEn: "Hand-drawn Illustration",
    descriptionZh: "收录个人手绘插图与编辑视觉作品。",
    descriptionEn: "A selection of hand-drawn illustrations and editorial visual work.",
    images: Array.from(
      { length: 12 },
      (_, index) => `/projects/illustration/hand-drawn/${index + 1}.png`,
    ),
  },
  aigc: {
    no: "04.2",
    titleZh: "AIGC 作品",
    titleEn: "AIGC Works",
    descriptionZh: "探索生成式 AI 在插图与视觉创作中的应用。",
    descriptionEn: "Explorations of generative AI across illustration and visual creation.",
    images: [
      "/projects/illustration/aigc/1.jpg",
      "/projects/illustration/aigc/2.png",
      "/projects/illustration/aigc/3-web.mp4",
      "aigc-motion-grid",
    ],
  },
} as const;

const aigcMotionVideos = ["01", "02", "03", "04", "05", "06"];

export default function IllustrationGalleryPage() {
  const params = useParams<{ slug: string }>();
  const gallery = galleries[params.slug as keyof typeof galleries] ?? galleries["hand-drawn"];
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [current, setCurrent] = useState(0);
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
      if (event.key === "ArrowLeft") {
        setCurrent((value) => (value - 1 + gallery.images.length) % gallery.images.length);
      }
      if (event.key === "ArrowRight") {
        setCurrent((value) => (value + 1) % gallery.images.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gallery.images.length]);

  const switchLanguage = (next: "zh" | "en") => {
    setLang(next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("portfolio-language", next);
  };

  const previous = () => setCurrent((value) => (value - 1 + gallery.images.length) % gallery.images.length);
  const next = () => setCurrent((value) => (value + 1) % gallery.images.length);

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <a className="gallery-mark" href="/#work">W</a>
        <a className="gallery-back" href="/projects/illustration"><i>←</i><span>{zh ? "返回插图" : "Back to illustration"}</span></a>
        <div className="gallery-language" aria-label="Language selector">
          <button className={zh ? "active" : ""} onClick={() => switchLanguage("zh")}>中</button><span>/</span>
          <button className={!zh ? "active" : ""} onClick={() => switchLanguage("en")}>EN</button>
        </div>
      </header>

      <section className="gallery-intro">
        <span>{gallery.no} — ILLUSTRATION</span>
        <h1>{zh ? gallery.titleZh : gallery.titleEn}</h1>
        <p>{zh ? gallery.descriptionZh : gallery.descriptionEn}</p>
      </section>

      <section className="gallery-viewer" aria-label={zh ? "图片查看器" : "Image viewer"}>
        <div className="gallery-stage">
          {gallery.images[current] === "aigc-motion-grid" ? (
            <section className="aigc-motion-grid" aria-label={zh ? "六段 AIGC 动态作品" : "Six AIGC motion works"}>
              {aigcMotionVideos.map((video, index) => (
                <video className={`aigc-motion aigc-motion-${index + 1}`} key={video} autoPlay muted loop playsInline preload={index < 3 ? "metadata" : "none"} poster={`/projects/video-posters/aigc/${video}.jpg`} aria-label={`${zh ? "AIGC 动态作品" : "AIGC motion work"} ${index + 1}`}>
                  <source src={`/projects/illustration/aigc/${video}-web.mp4`} type="video/mp4" />
                </video>
              ))}
            </section>
          ) : gallery.images[current].endsWith(".mp4") ? (
            <video className="gallery-stage-video" autoPlay muted loop playsInline preload="metadata" poster="/projects/video-posters/aigc/3.jpg" aria-label={`${zh ? gallery.titleZh : gallery.titleEn} ${current + 1}`}>
              <source src={gallery.images[current]} type="video/mp4" />
            </video>
          ) : (
            <img src={toProjectWebpPath(gallery.images[current])} alt={`${zh ? gallery.titleZh : gallery.titleEn} ${current + 1}`} fetchPriority="high" decoding="async" />
          )}
          {gallery.images.length > 1 && (
            <>
              <button className="gallery-arrow gallery-prev" onClick={previous} aria-label={zh ? "上一张" : "Previous image"}>←</button>
              <button className="gallery-arrow gallery-next" onClick={next} aria-label={zh ? "下一张" : "Next image"}>→</button>
            </>
          )}
          <div className="gallery-counter"><b>{String(current + 1).padStart(2, "0")}</b><span>/ {String(gallery.images.length).padStart(2, "0")}</span></div>
        </div>
        <div className="gallery-thumbnails" role="list" aria-label={zh ? "图片缩略图" : "Image thumbnails"}>
          {gallery.images.map((image, index) => (
            <button className={index === current ? "active" : ""} onClick={() => setCurrent(index)} key={image} role="listitem" aria-label={`${zh ? "查看第" : "View image"} ${index + 1}`}>
              {image === "aigc-motion-grid" ? (
                <img src="/projects-webp/illustration/aigc/nova2.webp" alt="" loading="lazy" decoding="async" />
              ) : image.endsWith(".mp4") ? (
                <video src={image} poster="/projects/video-posters/aigc/3.jpg" muted playsInline preload="none" aria-hidden="true" />
              ) : (
                <img src={toProjectWebpPath(image)} alt="" loading="lazy" decoding="async" />
              )}
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        {gallery.images.length > 1 && <p className="gallery-hint">{zh ? "点击缩略图或使用键盘 ← → 翻页" : "Select a thumbnail or use the ← → arrow keys"}</p>}
      </section>
    </main>
  );
}
