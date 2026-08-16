"use client";

import { useEffect, useState, type PointerEvent } from "react";
import { projectOrder } from "./project-order";

const projects = [
  { no: projectOrder.magicenter.no, en: "MagiCenter", zh: "MagiCenter", typeEn: "Hardware · UX/UI · Brand", typeZh: "硬件 · UX/UI · 品牌", tone: "blue" },
  { no: projectOrder.nova.no, en: "Nova", zh: "Nova", typeEn: "AI Product · UX/UI · Brand", typeZh: "AI 产品 · UX/UI · 品牌", tone: "lime" },
  { no: projectOrder.baiying.no, en: "Lenovo Baiying", zh: "联想百应", typeEn: "PC · Device Management · UI & Visual Design", typeZh: "PC · 设备管理 · UI 与视觉设计", tone: "pink" },
  { no: projectOrder.illustration.no, en: "Illustration", zh: "插图", typeEn: "Illustration Design", typeZh: "插图设计", tone: "orange" },
  { no: projectOrder.otherWorks.no, en: "Other Works", zh: "其他作品", typeEn: "Diverse Explorations", typeZh: "多元探索", tone: "violet" },
];

const projectIndex = [
  { no: projectOrder.magicenter.no, en: "MagiCenter", zh: "MagiCenter", typeEn: "Smart Device · UX/UI", typeZh: "智能硬件 · UX/UI", href: "/projects/magicenter" },
  { no: projectOrder.nova.no, en: "Nova", zh: "Nova", typeEn: "AI Product · UX/UI", typeZh: "AI 产品 · UX/UI", href: "/projects/nova" },
  { no: projectOrder.baiying.no, en: "Lenovo BaiYing", zh: "联想百应", typeEn: "PC Management · UI", typeZh: "PC 管理 · UI", href: "/projects/baiying" },
  { no: "05.1", en: "Lenovo Research PPT Template", zh: "联想研究院 PPT 模板", typeEn: "PPT Template · Visual", typeZh: "PPT 模板 · 视觉", href: "/projects/other-works/project-1" },
  { no: "05.2", en: "AIPC Creator Zone", zh: "联想AI画师", typeEn: "AI Creative Application", typeZh: "AI 创意应用", href: "/projects/other-works/project-2" },
  { no: "05.3", en: "Hyper Reality — Glasses-Free 3D Experience", zh: "Hyper Reality 裸眼 3D 体验设计", typeEn: "Glasses-Free 3D · UX/UI", typeZh: "裸眼 3D · UX/UI", href: "/projects/other-works/project-3" },
  { no: "05.4", en: "AI Router", zh: "AI Router", typeEn: "Enterprise AI Platform", typeZh: "企业 AI 平台", href: "/projects/other-works/project-4" },
  { no: "04.1", en: "Hand-drawn Illustration", zh: "手绘插图", typeEn: "Illustration · Editorial", typeZh: "插图 · 编辑设计", href: "/projects/illustration/hand-drawn" },
  { no: "04.2", en: "AIGC Works", zh: "AIGC作品", typeEn: "Generative Visuals", typeZh: "生成式视觉", href: "/projects/illustration/aigc" },
] as const;

const aboutContent = {
  zh: {
    section: "关于",
    title: "你好，我是吴楠。",
    paragraphs: [
      "拥有 5 年数字产品设计经验，专注于 UI 设计、产品视觉体验与设计系统。曾任 Lenovo CTO Organization User Experience Designer，参与 AI 产品、企业级软件及智能硬件的设计，覆盖从概念探索、视觉设计到开发交付与产品落地的完整流程。",
    ],
    details: [
      ["专业方向", "UI 设计 · 产品视觉 · 设计系统"],
      ["设计经验", "5 年 · 数字产品与 AI 产品"],
      ["教育背景", "设计学硕士 · 澳门城市大学"],
      ["工作经历", "Lenovo CTO Organization"],
    ],
    contactLabel: "联系方式",
    focus: "UI / Visual\nAI Product\nSmart Device",
    greeting: "很高兴认识你。",
  },
  en: {
    section: "ABOUT",
    title: "Hi, I'm Wunan.",
    paragraphs: [
      "I’m a UI designer with 5 years of experience in digital products, focusing on UI design, visual experience, and design systems. I previously worked as a User Experience Designer at Lenovo CTO Organization, designing AI products, enterprise software, and smart device experiences from early concepts to final delivery.",
    ],
    details: [
      ["EXPERTISE", "UI Design · Visual Experience · Design Systems"],
      ["EXPERIENCE", "5 Years · Digital Products & AI"],
      ["EDUCATION", "M.Des · City University of Macau"],
      ["PREVIOUSLY", "Lenovo CTO Organization"],
    ],
    contactLabel: "CONTACT",
    focus: "UI / Visual\nAI Product\nSmart Device",
    greeting: "Nice to meet you.",
  },
} as const;

function AnimatedLine({ text }: { text: string }) {
  return (
    <span className="hero-title-line" aria-label={text}>
      {Array.from(text).map((character, index) => (
        <span className="hero-letter" aria-hidden="true" key={`${character}-${index}`}>
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [projectsOpen, setProjectsOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    const hash = window.location.hash;
    if (!hash || hash === "#" || hash === "#top" || hash === "#project-index") {
      if (hash === "#project-index") {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    }

    return () => {
      if ("scrollRestoration" in window.history) window.history.scrollRestoration = "auto";
    };
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-language");
    if (saved === "en" || saved === "zh") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("portfolio-language", lang);
  }, [lang]);

  const zh = lang === "zh";
  const about = aboutContent[lang];

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  const resetGlow = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty("--mouse-x");
    event.currentTarget.style.removeProperty("--mouse-y");
  };

  const viewProjects = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  return (
    <main>
      <header className="topbar">
        <a className="mark" href="#top" aria-label="Wunan portfolio home" onClick={() => setProjectsOpen(false)}>W</a>
        <nav aria-label={zh ? "主导航" : "Main navigation"}>
          <div
            className={`projects-menu${projectsOpen ? " open" : ""}`}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setProjectsOpen(false);
            }}
          >
            <button
              className="projects-trigger"
              type="button"
              aria-expanded={projectsOpen}
              aria-controls="projects-dropdown"
              onClick={() => setProjectsOpen((open) => !open)}
            >
              <span>{zh ? "项目" : "Projects"}</span>
              <i aria-hidden="true" />
            </button>
            <div className="projects-dropdown" id="projects-dropdown">
              {projectIndex.map((project) => (
                <a href={project.href} key={project.no} onClick={() => setProjectsOpen(false)}>
                  <span className="projects-dropdown-no">{project.no}</span>
                  <strong>{zh ? project.zh : project.en}</strong>
                  <span className="projects-dropdown-type">{zh ? project.typeZh : project.typeEn}</span>
                  <span className="projects-dropdown-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
          <a href="#about">{zh ? "关于" : "About"}</a>
          <a className="contact-pill" href="mailto:wunan0221@icloud.com">{zh ? "联系我" : "Contact"} ↗</a>
        </nav>
        <div className="language" aria-label="Language selector">
          <button className={zh ? "active" : ""} onClick={() => setLang("zh")} aria-pressed={zh}>中</button>
          <span>/</span>
          <button className={!zh ? "active" : ""} onClick={() => setLang("en")} aria-pressed={!zh}>EN</button>
        </div>
      </header>

      <section className="hero" id="top" onPointerMove={moveGlow} onPointerLeave={resetGlow}>
        <div className="hero-dots" aria-hidden="true" />
        <div className="hero-glow hero-glow-lime" aria-hidden="true" />
        <div className="hero-glow hero-glow-cyan" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow"><i /> 2020—2026</p>
          <div className="hero-heading">
            <h1><AnimatedLine text="WUNAN'S" /><AnimatedLine text="PORTFOLIO" /></h1>
          </div>
          <p className="hero-tagline">{zh ? "专注于创造清晰、优雅且高效的数字体验" : "Creating clear, elegant and efficient digital experiences"}</p>
          <div className="hero-services" aria-label={zh ? "设计方向" : "Design disciplines"}>
            <span>UI / Visual / AI Product / Smart Device</span>
          </div>
          <div className="hero-actions">
            <a
              className="hero-work-link"
              href="#work"
              onClick={(event) => {
                event.preventDefault();
                viewProjects();
              }}
            ><span>{zh ? "查看项目" : "View Projects"}</span><i>↓</i></a>
            <a className="hero-about-link" href="#about"><span>{zh ? "关于我" : "About Me"}</span><i>↓</i></a>
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-label">
          <span>{zh ? "精选项目" : "Selected work"}</span>
          <span>2026 — 01</span>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project project-${index + 1}`} key={project.no}>
              <a href={index === 0 ? "/projects/magicenter" : index === 1 ? "/projects/nova" : index === 2 ? "/projects/baiying" : index === 3 ? "/projects/illustration" : "/projects/other-works"} aria-label={zh ? project.zh : project.en}>
                <div className={`visual ${project.tone}`}>
                  {index === 0 && <img className="project-cover" src="/projects-webp/magicenter-zh/01-MagiCenter-cover-中文版.jpg.webp" alt="MagiCenter project cover" loading="eager" fetchPriority="high" decoding="async" />}
                  {index === 1 && <img className="project-cover" src="/projects-webp/nova/01-cover.jpg.webp" alt="Nova project cover" loading="lazy" decoding="async" />}
                  {index === 2 && <img className="project-cover project-cover-left" src="/projects-webp/baiying-zh/01-baiying-home-cover.jpg.webp" alt="Lenovo Baiying project cover" loading="lazy" decoding="async" />}
                  {index === 3 && <img className="project-cover" src="/projects-webp/illustration/hand-drawn/1.webp" alt="Illustration project cover" loading="lazy" decoding="async" />}
                  {index === 4 && <img className="project-cover" src="/projects-webp/home-covers/project-five-wunan.webp" alt="Wunan portfolio illustration project" loading="lazy" decoding="async" />}
                  <span className="visual-no">{project.no}</span>
                  <span className="coming">{index < 3 ? (zh ? "查看项目" : "View project") : (zh ? "查看分类" : "View categories")}</span>
                </div>
                <div className="project-info">
                  <div><span className="arrow">→</span><h2>{zh ? project.zh : project.en}</h2></div>
                  <p>{zh ? project.typeZh : project.typeEn}</p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-portrait" onPointerMove={moveGlow} onPointerLeave={resetGlow} aria-label={zh ? "吴楠个人视觉卡片" : "Wunan portrait card"}>
          <div className="about-dots" aria-hidden="true" />
          <div className="about-glow about-glow-lime" aria-hidden="true" />
          <div className="about-glow about-glow-cyan" aria-hidden="true" />
          <figure className="about-photo-card">
            <img src="/about/wunan-portrait.png" alt={zh ? "吴楠个人照片" : "Portrait of Wunan"} loading="lazy" draggable="false" />
          </figure>
          <div className="about-float about-float-dots" aria-hidden="true"><i /><i /><i /></div>
          <div className="about-float about-float-focus">
            <span>01</span>
            <strong>{about.focus}</strong>
          </div>
          <div className="about-float about-float-intro">
            <span>Wunan</span>
            <strong>{about.greeting}</strong>
          </div>
        </div>
        <div className="about-content">
          <p className="about-index">(01 — {about.section})</p>
          <h2 className={`about-title${zh ? " about-title-zh" : ""}`}>{about.title}</h2>
          <div className="about-copy">
            {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <dl className="about-details">
            {about.details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            <div>
              <dt>{about.contactLabel}</dt>
              <dd><a href="mailto:wunan0221@icloud.com">wunan0221@icloud.com</a><span className="about-contact-separator"> · </span><span>WeChat 18142270221</span></dd>
            </div>
          </dl>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-heading-row">
          <div className="footer-title">{zh ? "点击按钮查看简历" : "Click the button to view my résumé"}</div>
          <a className="resume-button" href="/wunan-resume.pdf" target="_blank" rel="noopener noreferrer">
            <span>{zh ? "查看简历" : "View résumé"}</span>
            <i>↗</i>
          </a>
        </div>
        <a className="email" href="mailto:wunan0221@icloud.com">wunan0221@icloud.com <span>↗</span></a>
        <div className="footer-meta">
          <span>WECHAT<br />18142270221</span>
          <span>{zh ? "中国 · 现在可合作" : "China · Available now"}</span>
          <span>© 2026 WUNAN</span>
        </div>
      </footer>
    </main>
  );
}
