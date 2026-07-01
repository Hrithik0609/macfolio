export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Senior Software Engineer",
    company: "Scubeelate Technologies Private Limited",
    location: "Bangalore, Karnataka",
    period: "Dec 2022 – Present",
    bullets: [
      "Developed responsive and interactive UIs using ReactJS and Redux/Context API, ensuring a seamless experience across devices.",
      "Rebuilt the company website from scratch using Next.js with SSR and SSG for improved performance and maintainability.",
      "Designed and developed RESTful APIs using the AdonisJS framework with Lucid ORM for secure, efficient frontend-backend communication.",
      "Optimized database query performance with indexes and selective denormalization in MySQL, reducing read latency on high-traffic endpoints.",
      "Integrated RESTful APIs and coordinated with the NodeJS/MySQL backend for dynamic content and smooth data flow.",
      "Enhanced Core Web Vitals (LCP, FID, CLS) via code splitting, lazy loading, and image optimization, improving page speed scores.",
      "Optimized SEO, meta tags, and structured data, increasing search visibility and organic traffic.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Capgemini Technologies Private Limited",
    location: "Bangalore, Karnataka",
    period: "Aug 2021 – Dec 2022",
    bullets: [
      "Optimized database queries and supported backend tasks to improve overall application performance.",
      "Contributed to building RESTful microservices and integrating backend APIs with frontend components.",
      "Assisted in developing and maintaining web applications using ReactJS, Java, JavaScript, and PostgreSQL.",
      "Participated in Agile/Scrum ceremonies and collaborated with senior developers to deliver features on time.",
    ],
  },
];
