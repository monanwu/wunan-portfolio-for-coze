import type { Metadata } from "next";
import NovaGallery from "./NovaGallery";
import "./nova.css";

export const metadata: Metadata = {
  title: "Nova — Wunan’s Portfolio",
  description: "Nova AI-native personal agent workspace — product, UX/UI, brand and design system by Wunan.",
};

export default function NovaProject() {
  return <NovaGallery />;
}
