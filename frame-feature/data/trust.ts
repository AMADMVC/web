export interface MetricStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const trustStats: MetricStat[] = [
  {
    value: 120,
    suffix: "+",
    label: "Enterprise Projects Shipped",
    description: "Across North America, Europe, and Asia-Pacific.",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Retention Rate",
    description: "Long-term engineering & growth partnerships.",
  },
  {
    value: 48,
    suffix: "M+",
    label: "Client Revenue Generated",
    description: "Tracked across high-conversion client funnels.",
  },
  {
    value: 60,
    suffix: " FPS",
    label: "Fluid 3D Render Speed",
    description: "Smooth GPU hardware accelerated interactive graphics.",
  },
];

export const clientLogos = [
  { name: "APEX NEURAL", icon: "Cpu" },
  { name: "LUMINA LABS", icon: "Radio" },
  { name: "ZENITH CAPITAL", icon: "TrendingUp" },
  { name: "CHRONO CLOUD", icon: "Layers" },
  { name: "AETHERIA 3D", icon: "Box" },
  { name: "SYNAPSE AI", icon: "Activity" },
  { name: "HYPERION D2C", icon: "ShoppingBag" },
  { name: "VORTEX VENTURES", icon: "Compass" },
];
