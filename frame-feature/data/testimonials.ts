export interface TestimonialItem {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  metric: string;
  metricLabel: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t1",
    clientName: "David Sterling",
    clientRole: "Chief Technology Officer",
    company: "Apex Systems Inc.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "They didn't just build a website; they transformed our entire digital engineering stack into a category-defining brand experience. Our enterprise conversion increased by 340% within the first quarter.",
    rating: 5,
    metric: "+340%",
    metricLabel: "Enterprise Conversion Lift",
  },
  {
    id: "t2",
    clientName: "Claire Dumont",
    clientRole: "VP of Product",
    company: "Lumina Labs UK",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    quote: "The interactive 3D product showcase they engineered generated $2.4M in direct pre-orders in 14 days. Flawless 60fps performance on mobile devices with zero lag.",
    rating: 5,
    metric: "$2.4M",
    metricLabel: "14-Day Launch Pre-Orders",
  },
  {
    id: "t3",
    clientName: "Jonathan Hayes",
    clientRole: "Managing Partner",
    company: "Zenith Capital",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    quote: "Their data-driven SEO and paid acquisition strategy yielded an astounding 5.2x return on ad spend. They are the most disciplined growth and engineering agency we've ever partnered with.",
    rating: 5,
    metric: "5.2x",
    metricLabel: "Sustained ROAS",
  },
  {
    id: "t4",
    clientName: "Samantha Reed",
    clientRole: "Head of Marketing",
    company: "Chrono SaaS Suite",
    avatar: "/gallery/1786386563351-Founder.JPG",
    quote: "The design system and Next.js frontend cut our team's feature shipping time in half. Our customers constantly praise how fluid, intuitive, and modern the interface is.",
    rating: 5,
    metric: "3x Faster",
    metricLabel: "Feature Shipping Velocity",
  },
];
