// Service: Plasmic Development — /service/plasmic-development
export default {
  type: "service",
  slug: "plasmic-development",
  template: "service-web-design",
  title: "Plasmic Development",
  published: true,
  sort: 7,
  fields: {
    name: "Plasmic Development",
    indexLabel: "",
    anchor: "svc-plasmic",
    icon: "<rect x=\"3\" y=\"3.5\" width=\"8\" height=\"8\" rx=\"1.8\"/><rect x=\"13\" y=\"3.5\" width=\"8\" height=\"5\" rx=\"1.8\"/><rect x=\"3\" y=\"13.5\" width=\"8\" height=\"7\" rx=\"1.8\"/><rect x=\"13\" y=\"10.5\" width=\"8\" height=\"10\" rx=\"1.8\"/>",
    description: "Our Plasmic solutions enable rapid development of modern websites through a powerful visual builder. We focus on delivering responsive, customizable, and performance-driven experiences tailored to your business needs.",
    features: [
      "Visual drag-and-drop page building",
      "Reusable components for faster development",
      "High-performance and responsive design",
      "Easy content updates without technical dependency",
    ],
    showOnHome: false,
    homeOrder: null,
    homeTitle: "Plasmic Development",
    homeText: "",
    homeIcon: "",
    showInFooter: false,
    footerOrder: null,
    footerLabel: "Plasmic Development",
  },
  page: {
    "top.crumb": "<a href=\"/\">Home</a> <span aria-hidden=\"true\">/</span> <a href=\"/services\">Services</a> <span aria-hidden=\"true\">/</span> <span aria-current=\"page\">Plasmic Development</span>",
    "top.titleLine": "Plasmic Development Services",
    "top.titleLine2": "for Fast, Visual Websites",
    "top.lead": "Websites built visually with Plasmic and engineered with real code — so your marketing team can publish pages without waiting on developers.",
    "top.itemList": [
      {
        icon: "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"2.5\"/><path d=\"M10.8 18.4h2.4\"/>",
        itemText: "Visual editing with",
        bold: "real code",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M12 7.6V12l2.8 1.8\"/>",
        itemText: "Most sites live in",
        bold: "3–6 weeks",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M3.6 12h16.8M12 3.6c2.4 2.3 3.6 5.1 3.6 8.4s-1.2 6.1-3.6 8.4c-2.4-2.3-3.6-5.1-3.6-8.4s1.2-6.1 3.6-8.4z\"/>",
        itemText: "Your team",
        bold: "publishes",
      },
    ],
    "top.buttonLink": "/get-in-touch",
    "top.buttonText": "Get in Touch",
    "approach.eyebrow": "The problem, and the fix",
    "approach.titleLine": "What is wrong,",
    "approach.titleLine2": "and what we do about it.",
    "approach.subheading": "Common Challenges Businesses Face",
    "approach.text": "Teams often struggle with:",
    "approach.itemList": [
      {
        itemText: "Waiting on developers for every page",
      },
      {
        itemText: "Website builders that look generic",
      },
      {
        itemText: "Slow, bloated no-code sites",
      },
      {
        itemText: "Campaign pages that take weeks",
      },
      {
        itemText: "Inconsistent design across pages",
      },
      {
        itemText: "Limited integrations with real data",
      },
      {
        itemText: "Sites that can’t grow beyond the builder",
      },
    ],
    "approach.subheading2": "Our Solution",
    "approach.text2": "We build Plasmic sites that solve these problems through:",
    "approach.itemList2": [
      {
        itemText: "A visual editor your team can use",
      },
      {
        itemText: "A custom design system and components",
      },
      {
        itemText: "Fast Next.js front ends",
      },
      {
        itemText: "Landing pages built in hours, not weeks",
      },
      {
        itemText: "Reusable, on-brand components",
      },
      {
        itemText: "Connections to your CMS, APIs and data",
      },
      {
        itemText: "Code you can extend at any time",
      },
    ],
    "benefits.eyebrow": "What you get",
    "benefits.titleLine": "Benefits of",
    "benefits.titleLine2": "Plasmic development",
    "benefits.cardList": [
      {
        icon: "<path d=\"M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z\"/><path d=\"m9 12 2.2 2.2L15.4 10\"/>",
        subheading: "Marketing Moves Faster",
        text: "Launch and change pages without a developer in the loop.",
      },
      {
        icon: "<path d=\"M12 3.4a8.6 8.6 0 1 0 8.6 8.6\"/><path d=\"M14.6 2.6A7.4 7.4 0 0 1 21.4 9\"/><path d=\"m8.6 12.6 2.6 2.6 5-5.6\"/>",
        subheading: "Consistent Design",
        text: "Shared components keep every page on brand.",
      },
      {
        icon: "<rect x=\"6.8\" y=\"2.5\" width=\"10.4\" height=\"19\" rx=\"2.4\"/><path d=\"M10.6 5.2h2.8M10.9 18.4h2.2\"/>",
        subheading: "Real Performance",
        text: "Pages render as fast, optimised Next.js code.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Connected to Your Data",
        text: "Pull content and products from your CMS or APIs.",
      },
      {
        icon: "<path d=\"M13.4 2.6 4.8 13.4h6L9.8 21.4l8.8-11h-6.2z\"/>",
        subheading: "No Lock-In",
        text: "Developers can extend the site with code whenever needed.",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><circle cx=\"12\" cy=\"12\" r=\"4.4\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
        subheading: "Lower Ongoing Cost",
        text: "Fewer development hours for everyday changes.",
      },
    ],
    "process.eyebrow": "How it runs",
    "process.titleLine": "Our Plasmic",
    "process.titleLine2": "development process",
    "process.stepList": [
      {
        subheadingText: "Discovery",
        text: "We learn which pages your team creates and how often they change.",
      },
      {
        subheadingText: "Design System",
        text: "Colours, type and reusable components set up in Plasmic.",
      },
      {
        subheadingText: "Page Templates",
        text: "Templates for the pages your team builds most often.",
      },
      {
        subheadingText: "Code Integration",
        text: "Plasmic connected to a Next.js app, your CMS and APIs.",
      },
      {
        subheadingText: "Performance & SEO",
        text: "Pages optimised for speed, metadata and search.",
      },
      {
        subheadingText: "Training & Handover",
        text: "Your team learns to build and publish pages themselves.",
      },
      {
        subheadingText: "Support",
        text: "New components and improvements as your needs grow.",
      },
    ],
    "process.label": "Technologies we use",
    "process.itemList": [
      {
        item: "Plasmic",
      },
      {
        item: "Next.js",
      },
      {
        item: "React",
      },
      {
        item: "TypeScript",
      },
      {
        item: "Headless CMS",
      },
      {
        item: "Vercel",
      },
      {
        item: "REST & GraphQL APIs",
      },
      {
        item: "Tailwind CSS",
      },
      {
        item: "Google Analytics 4",
      },
      {
        item: "Cloudflare",
      },
    ],
    "why.eyebrow": "Why choose us",
    "why.titleLine": "Six reasons",
    "why.titleLine2": "to work with us",
    "why.cardList": [
      {
        icon: "<circle cx=\"9\" cy=\"8.2\" r=\"3.4\"/><path d=\"M3.2 19.5a5.8 5.8 0 0 1 11.6 0\"/><path d=\"M16.2 5.2a3.2 3.2 0 0 1 0 6\"/><path d=\"M17.4 14.4a5.6 5.6 0 0 1 3.4 5.1\"/>",
        subheading: "Plasmic and Code Experience",
        text: "Our team combines visual building in Plasmic with real front-end engineering in React and Next.js.",
      },
      {
        icon: "<path d=\"M5 20V4M12 20v-7M19 20V9\"/><circle cx=\"5\" cy=\"8.5\" r=\"2.1\"/><circle cx=\"12\" cy=\"17.4\" r=\"2.1\"/><circle cx=\"19\" cy=\"6\" r=\"2.1\"/>",
        subheading: "Components for Your Team",
        text: "We build a component library around your brand so editors can create pages without breaking the design.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "SEO-Ready Output",
        text: "Pages are rendered as fast, crawlable HTML with proper metadata, not heavy client-side screens.",
      },
      {
        icon: "<rect x=\"2.8\" y=\"5.5\" width=\"12\" height=\"13\" rx=\"2.2\"/><rect x=\"16.4\" y=\"8.5\" width=\"4.8\" height=\"10\" rx=\"1.6\"/><path d=\"M6.4 8.4h4.8\"/>",
        subheading: "Responsive by Default",
        text: "Components adapt to phones, tablets and desktops, so every new page works everywhere.",
      },
      {
        icon: "<path d=\"M3.5 6.4A1.9 1.9 0 0 1 5.4 4.5h9.2a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9H8.2L4.6 16v-2.9h-1.1z\"/><path d=\"M18 9.3h.6a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9h-.6v2.6l-3.1-2.6h-3\"/>",
        subheading: "Training and Handover",
        text: "We show your team how to publish and edit pages, with documentation to refer back to.",
      },
      {
        icon: "<path d=\"M12 20.4 4.6 13a4.8 4.8 0 1 1 7.4-6 4.8 4.8 0 1 1 7.4 6z\"/>",
        subheading: "Support as You Grow",
        text: "We add new components, integrations and improvements as your marketing needs change.",
      },
    ],
    "faq.eyebrow": "Questions",
    "faq.titleLine": "Frequently asked",
    "faq.titleLine2": "questions",
    "faq.questionList": [
      {
        text: "What is Plasmic?",
        blockLabel: "What is Plasmic?",
        text2: "Plasmic is a visual builder for React and Next.js: designers and marketers edit pages visually while developers keep full control of the code.",
      },
      {
        text: "Can my team really edit the site without developers?",
        blockLabel: "Can my team really edit the site without developers?",
        text2: "Yes. Once components and templates are set up, your team can build and publish pages on their own.",
      },
      {
        text: "Is a Plasmic site fast?",
        blockLabel: "Is a Plasmic site fast?",
        text2: "Yes. Pages are rendered as optimised Next.js code, so they load as fast as hand-coded sites.",
      },
      {
        text: "Can Plasmic connect to our CMS or product data?",
        blockLabel: "Can Plasmic connect to our CMS or product data?",
        text2: "Yes. We connect it to your CMS, e-commerce platform or APIs.",
      },
      {
        text: "How long does a Plasmic website take?",
        blockLabel: "How long does a Plasmic website take?",
        text2: "Most Plasmic websites take 3 to 6 weeks, including the component library.",
      },
    ],
    "case-studies.eyebrow": "Related work",
    "case-studies.titleLine": "Recent <span class=\"grad\">projects</span>",
    "case-studies.button": "Explore All Case Studies →",
    "case-studies.buttonLink": "/case-studies",
    "case-studies.slideList": [
      {
        slideHidden: "",
        mediaLink: "/case-study/metrotruck",
        text: "metrotrucktraining.com",
        image: "/assets/img/work-metrotruck-home.png",
        imageAlt: "Metro Truck Driving School website design",
        imageWidth: "1915",
        imageHeight: "998",
        itemList: [
          {
            item: "Website UI/UX Design",
          },
          {
            item: "Figma",
          },
          {
            item: "Driver Training",
          },
        ],
        subheading: "<a href=\"/case-study/metrotruck\">Metro Truck Driving School</a>",
        text2: "A UI/UX redesign for an award-winning Ontario truck driving school, making it easy to find the right licence course and apply online.",
        itemList2: [
          {
            itemText: "Course finder",
          },
          {
            itemText: "Design system",
          },
          {
            itemText: "Apply-online flow",
          },
        ],
        buttonLink: "/case-study/metrotruck",
        buttonTabindex: "",
        buttonText: "View Case Study",
      },
      {
        slideHidden: "true",
        mediaLink: "/case-study/tonezone",
        text: "tonezone.in",
        image: "/assets/img/work-tonezone-1.jpg",
        imageAlt: "ToneZone beauty and wellness website home page",
        imageWidth: "1200",
        imageHeight: "750",
        itemList: [
          {
            item: "Website Design",
          },
          {
            item: "WooCommerce",
          },
          {
            item: "Beauty & Wellness",
          },
        ],
        subheading: "<a href=\"/case-study/tonezone\">ToneZone Beauty &amp; Wellness Store</a>",
        text2: "An image-led WooCommerce website for a Bengaluru salon, where customers discover services, see the salon’s work and book an appointment.",
        itemList2: [
          {
            itemText: "Custom UI/UX design",
          },
          {
            itemText: "Online booking",
          },
          {
            itemText: "Mobile-first layout",
          },
        ],
        buttonLink: "/case-study/tonezone",
        buttonTabindex: "-1",
        buttonText: "View Case Study",
      },
    ],
    "start.eyebrow": "Start Here",
    "start.heading": "Want a faster way to build your website?",
    "start.text": "Tell us how your team publishes pages today, and we will come back with a recommended Plasmic setup, a rough timeline and an honest budget range.",
    "start.buttonLink": "/discuss-your-project?service={slug}",
    "start.buttonText": "Discuss Your Project",
  },
  section: null,
  seo: {
    title: "Plasmic Development Services for Fast, Visual Websites | Inovexia Software",
    description: "Websites built visually with Plasmic and engineered with real code — so your marketing team can publish pages without waiting on developers.",
  },
};
