export type Project = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  bullets: string[];
  liveUrl: string;
  liveLabel: string;
};

export const projects: Project[] = [
  {
    id: "scube-africa",
    name: "Scube Africa",
    tag: "Digital Business Cards",
    blurb:
      "Digital business card platform for managing employee profiles, branding, and networking analytics.",
    bullets: [
      "Includes an admin console for registration, customization, and engagement tracking.",
      "Developed frontend and backend modules for profile management, card creation, and data sync.",
      "Improved reliability and speed through optimized APIs, modular design, and secure auth flows.",
    ],
    liveUrl: "https://scube.africa",
    liveLabel: "scube.africa",
  },
  {
    id: "lwl8",
    name: "LWL8 — Smart Water Bottle",
    tag: "D2C E-commerce",
    blurb:
      "A D2C e-commerce platform for a hydration-tracking smart bottle synced with a companion mobile app.",
    bullets: [
      "Focused on storytelling-driven product presentation, checkout experience, and seamless integrations.",
      "Developed the complete website stack using React and Next.js, integrating payment systems and APIs.",
      "Implemented animation-driven product showcases and performance optimizations for faster interactions.",
    ],
    liveUrl: "https://lwl8.com",
    liveLabel: "lwl8.com",
  },
  {
    id: "sea",
    name: "SEA — Scube Enterprise Application",
    tag: "B2B SaaS",
    blurb:
      "A B2B SaaS solution to manage digital identities, team branding, and card customization through a unified dashboard.",
    bullets: [
      "Provides template-based customization, live previews, and collaborative management tools for enterprises.",
      "Engineered the full-stack application using React, Next.js, and Node.js with REST API integrations.",
      "Improved data flow and interactivity via caching, real-time updates, and efficient API design.",
    ],
    liveUrl: "https://saas.scube.me",
    liveLabel: "saas.scube.me",
  },
  {
    id: "scube",
    name: "Scube — The Smart Business Card",
    tag: "E-commerce + Admin",
    blurb:
      "Central e-commerce platform offering NFC-enabled smart cards, Scube Pops, and Pulse Tracker Cards.",
    bullets: [
      "Connected to the internal admin system for real-time inventory, order tracking, and analytics.",
      "Built both the website and admin panel, integrating APIs for QR generation, vCard downloads, and order management.",
      "Enhanced scalability, SEO, and UX through code-splitting, SSR, and reusable component design.",
    ],
    liveUrl: "https://scube.me",
    liveLabel: "scube.me",
  },
  {
    id: "zaincare",
    name: "Zaincare — Medical E-commerce",
    tag: "Healthcare Marketplace",
    blurb:
      "A healthcare marketplace to book lab tests, purchase medical packages, and consult professionals online.",
    bullets: [
      "Provides patient dashboards, order management, and secure login access through the main website.",
      "Developed the complete platform using React and Material UI with robust payment and scheduling systems.",
      "Built an internal admin panel for operational workflows while ensuring data privacy and accessibility.",
    ],
    liveUrl: "https://zaincare.com",
    liveLabel: "zaincare.com",
  },
];
