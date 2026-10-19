// Blog post: Benefits of Using Plasmic for Modern Websites — no page of its own (listed only)
export default {
  type: "blog",
  slug: "plasmic-websites",
  template: null,
  title: "Benefits of Using Plasmic for Modern Websites",
  published: true,
  sort: 5,
  fields: {
    titleLine1: "Benefits of Using Plasmic",
    titleLine2: "for Modern Websites",
    category: "Web Development",
    readTime: "2 min",
    date: "",
    excerpt: "Discover how Plasmic accelerates website development while maintaining flexibility and design consistency.",
    homeSummary: "",
    cardImage: {
      src: "/assets/img/insight-web-design.jpg",
      alt: "Colour swatches and interface sketches on a tablet",
      width: 1200,
      height: 750,
    },
    articleImage: {
      src: "/assets/img/blog-web-development.svg",
      alt: "A visual page builder canvas with layout blocks, beside a code editor",
      width: 400,
      height: 250,
    },
    recentAlt: "Modern Website Development",
    ctaTitle: "Want a faster way to build your website?",
    featured: false,
    showOnHome: false,
    homeImage: null,
    blocks: [
      {
        type: "text",
        heading: "Introduction",
        html: "Marketing teams want to launch pages quickly. Developers want clean, maintainable code. Plasmic is a visual builder that brings the two together: designers and marketers build pages visually, while developers keep full control of components, data and performance.",
      },
      {
        type: "text",
        heading: "What Is Plasmic?",
        html: "Plasmic is a visual page builder for React-based websites and apps. Pages are designed on a drag-and-drop canvas and then rendered by your own codebase, typically a Next.js site, either loaded at runtime or generated as code. Developers can register their own React components so they appear in the editor as building blocks.",
      },
      {
        type: "points",
        heading: "Key Benefits",
        items: [
          {
            title: "Faster Page Launches",
            html: "New landing pages and campaign sections can be built and published in hours instead of development sprints.",
          },
          {
            title: "Your Own Components",
            html: "Registered components keep every page on-brand and consistent with your design system.",
          },
          {
            title: "Marketing Independence",
            html: "Content editors can update text, images and layouts without waiting for a developer.",
          },
          {
            title: "Modern Performance",
            html: "Because pages render through frameworks like Next.js, they benefit from static generation, server rendering and fast load times.",
          },
          {
            title: "Works With Your Data",
            html: "Plasmic can pull content from headless CMSs, APIs and commerce platforms, so pages stay dynamic.",
          },
        ],
      },
      {
        type: "text",
        heading: "When to Use Plasmic",
        html: "Plasmic is a strong fit for marketing sites, landing pages and content-heavy sections of a product, especially when a non-technical team needs to publish often. For highly interactive application screens, conventional code is usually still the better choice, and the two approaches can live side by side in the same project.",
      },
      {
        type: "text",
        heading: "Conclusion",
        html: "Plasmic speeds up website development without giving up flexibility or code quality. With a well-built component library behind it, your team gets the freedom of a visual builder and the reliability of a custom site.",
      },
    ],
  },
  page: null,
  section: null,
  seo: {
    title: "Benefits of Using Plasmic for Modern Websites | Inovexia",
    description: "How the Plasmic visual builder speeds up website development while keeping your own React components, performance and design consistency.",
  },
};
