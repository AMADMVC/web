import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Affordable Photographer in Delhi | Gallery & Frames",
  description: "Explore the premium collection of photographs, digital edits, frames, and creative visual experiments by the best affordable photographer in Delhi.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
