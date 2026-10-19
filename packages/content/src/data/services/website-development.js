// Service: Website Development — /service/website-development
export default {
  type: "service",
  slug: "website-development",
  template: "service-web-design",
  title: "Website Development",
  published: true,
  sort: 1,
  fields: {
    name: "Website Development",
    indexLabel: "",
    anchor: "svc-website",
    icon: "<rect x=\"3\" y=\"4.5\" width=\"18\" height=\"15\" rx=\"2.5\"/><path d=\"M3 9h18M6.4 6.7h.01M9 6.7h.01\"/><path d=\"m10 12.5-2 2 2 2M14 12.5l2 2-2 2\"/>",
    description: "We build sophisticated, high-performance websites that reflect your brand and deliver seamless digital experiences across all platforms.",
    features: [
      "Custom-built, scalable websites",
      "Optimized speed and performance",
      "SEO-ready architecture",
      "Cross-device compatibility",
    ],
    showOnHome: true,
    homeOrder: 1,
    homeTitle: "Website Development",
    homeText: "Fast, secure, SEO-ready websites for businesses, schools and non-profits — easy for your team to update after launch.",
    homeIcon: "",
    showInFooter: true,
    footerOrder: 1,
    footerLabel: "Website Development",
  },
  page: {
    "top.crumb": "<a href=\"/\">Home</a> <span aria-hidden=\"true\">/</span> <a href=\"/services\">Services</a> <span aria-hidden=\"true\">/</span> <span aria-current=\"page\">Website Development</span>",
    "top.titleLine": "Website Development Services",
    "top.titleLine2": "Built to Perform and Scale",
    "top.lead": "Fast, secure, SEO-ready websites for businesses, schools and non-profits — engineered with modern frameworks and easy for your team to update after launch.",
    "top.itemList": [
      {
        icon: "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"2.5\"/><path d=\"M10.8 18.4h2.4\"/>",
        itemText: "Fast, secure and",
        bold: "SEO-ready",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M12 7.6V12l2.8 1.8\"/>",
        itemText: "Most sites live in",
        bold: "3–8 weeks",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M3.6 12h16.8M12 3.6c2.4 2.3 3.6 5.1 3.6 8.4s-1.2 6.1-3.6 8.4c-2.4-2.3-3.6-5.1-3.6-8.4s1.2-6.1 3.6-8.4z\"/>",
        itemText: "Clients",
        bold: "worldwide",
      },
    ],
    "top.buttonLink": "/get-in-touch",
    "top.buttonText": "Get in Touch",
    "approach.eyebrow": "The problem, and the fix",
    "approach.titleLine": "What is wrong,",
    "approach.titleLine2": "and what we do about it.",
    "approach.subheading": "Common Challenges Businesses Face",
    "approach.text": "Many organisations struggle with:",
    "approach.itemList": [
      {
        itemText: "Slow, outdated websites",
      },
      {
        itemText: "Sites that are hard to update",
      },
      {
        itemText: "Security issues and broken plugins",
      },
      {
        itemText: "Poor results in search engines",
      },
      {
        itemText: "Websites that don’t work well on phones",
      },
      {
        itemText: "No connection to CRM or marketing tools",
      },
      {
        itemText: "Expensive rebuilds every few years",
      },
    ],
    "approach.subheading2": "Our Solution",
    "approach.text2": "We build websites that solve these problems through:",
    "approach.itemList2": [
      {
        itemText: "Modern, fast-loading front ends",
      },
      {
        itemText: "An easy content management system",
      },
      {
        itemText: "Secure hosting, updates and backups",
      },
      {
        itemText: "Technical SEO built in from day one",
      },
      {
        itemText: "Responsive layouts for every screen",
      },
      {
        itemText: "Integrations with your CRM and tools",
      },
      {
        itemText: "Clean, maintainable, scalable code",
      },
    ],
    "benefits.eyebrow": "What you get",
    "benefits.titleLine": "Benefits of our",
    "benefits.titleLine2": "website development",
    "benefits.cardList": [
      {
        icon: "<path d=\"M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z\"/><path d=\"m9 12 2.2 2.2L15.4 10\"/>",
        subheading: "Speed That Converts",
        text: "Fast pages keep visitors on the site and improve conversions and rankings.",
      },
      {
        icon: "<path d=\"M12 3.4a8.6 8.6 0 1 0 8.6 8.6\"/><path d=\"M14.6 2.6A7.4 7.4 0 0 1 21.4 9\"/><path d=\"m8.6 12.6 2.6 2.6 5-5.6\"/>",
        subheading: "Easy to Update",
        text: "Your team edits pages, news and images without calling a developer.",
      },
      {
        icon: "<rect x=\"6.8\" y=\"2.5\" width=\"10.4\" height=\"19\" rx=\"2.4\"/><path d=\"M10.6 5.2h2.8M10.9 18.4h2.2\"/>",
        subheading: "Secure by Default",
        text: "Hardened hosting, SSL, updates and backups protect your site and data.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Search-Engine Ready",
        text: "Clean code, structured data and good Core Web Vitals help you rank.",
      },
      {
        icon: "<path d=\"M13.4 2.6 4.8 13.4h6L9.8 21.4l8.8-11h-6.2z\"/>",
        subheading: "Works on Every Device",
        text: "Every page is tested on phones, tablets and desktops.",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><circle cx=\"12\" cy=\"12\" r=\"4.4\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
        subheading: "Room to Grow",
        text: "New sections, languages and integrations added without starting again.",
      },
    ],
    "process.eyebrow": "How it runs",
    "process.titleLine": "Our website",
    "process.titleLine2": "development process",
    "process.stepList": [
      {
        subheadingText: "Discovery & Requirements",
        text: "We learn your goals, audience, content and the features the site needs.",
      },
      {
        subheadingText: "Information Architecture",
        text: "Sitemap, page structure and user journeys planned before design starts.",
      },
      {
        subheadingText: "Design & Prototype",
        text: "Visual design and clickable prototypes you approve before development.",
      },
      {
        subheadingText: "Development",
        text: "We build the front end, CMS and integrations with clean, documented code.",
      },
      {
        subheadingText: "Content & SEO",
        text: "Content loaded, metadata written and technical SEO checked.",
      },
      {
        subheadingText: "Testing & Launch",
        text: "Cross-browser, device, speed and accessibility testing, then go-live.",
      },
      {
        subheadingText: "Support & Growth",
        text: "Updates, monitoring and improvements after launch.",
      },
    ],
    "process.label": "Technologies we use",
    "process.itemList": [
      {
        item: "HTML5 & CSS3",
      },
      {
        item: "JavaScript & TypeScript",
      },
      {
        item: "React & Next.js",
      },
      {
        item: "Vue.js",
      },
      {
        item: "Laravel & PHP",
      },
      {
        item: "Node.js",
      },
      {
        item: "WordPress",
      },
      {
        item: "Headless CMS",
      },
      {
        item: "Tailwind CSS",
      },
      {
        item: "MySQL & PostgreSQL",
      },
      {
        item: "AWS & Vercel",
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
        subheading: "Experienced Developers",
        text: "Our developers have built websites for businesses, schools and non-profits using modern, well-supported frameworks.",
      },
      {
        icon: "<path d=\"M5 20V4M12 20v-7M19 20V9\"/><circle cx=\"5\" cy=\"8.5\" r=\"2.1\"/><circle cx=\"12\" cy=\"17.4\" r=\"2.1\"/><circle cx=\"19\" cy=\"6\" r=\"2.1\"/>",
        subheading: "Built for Your Requirements",
        text: "Features, integrations and content structure are planned around how your organisation works.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "SEO From Day One",
        text: "Clean code, fast pages and proper metadata are part of the build, not an add-on after launch.",
      },
      {
        icon: "<rect x=\"2.8\" y=\"5.5\" width=\"12\" height=\"13\" rx=\"2.2\"/><rect x=\"16.4\" y=\"8.5\" width=\"4.8\" height=\"10\" rx=\"1.6\"/><path d=\"M6.4 8.4h4.8\"/>",
        subheading: "Tested on Every Device",
        text: "Every page is checked on phones, tablets and desktops across the major browsers before launch.",
      },
      {
        icon: "<path d=\"M3.5 6.4A1.9 1.9 0 0 1 5.4 4.5h9.2a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9H8.2L4.6 16v-2.9h-1.1z\"/><path d=\"M18 9.3h.6a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9h-.6v2.6l-3.1-2.6h-3\"/>",
        subheading: "Transparent Process",
        text: "Regular updates and a staging site mean you can see progress and give feedback at every step.",
      },
      {
        icon: "<path d=\"M12 20.4 4.6 13a4.8 4.8 0 1 1 7.4-6 4.8 4.8 0 1 1 7.4 6z\"/>",
        subheading: "Ongoing Care",
        text: "Security updates, backups and improvements continue after launch so your website stays healthy.",
      },
    ],
    "faq.eyebrow": "Questions",
    "faq.titleLine": "Frequently asked",
    "faq.titleLine2": "questions",
    "faq.questionList": [
      {
        text: "How long does it take to build a website?",
        blockLabel: "How long does it take to build a website?",
        text2: "Most business websites take 3 to 8 weeks, depending on the number of pages, features and integrations.",
      },
      {
        text: "Will I be able to update the website myself?",
        blockLabel: "Will I be able to update the website myself?",
        text2: "Yes. Every site comes with an easy CMS and a short training session for your team.",
      },
      {
        text: "Do you provide hosting and maintenance?",
        blockLabel: "Do you provide hosting and maintenance?",
        text2: "Yes. We can host, monitor, update and back up your site, or hand it over to your own team.",
      },
      {
        text: "Is the website SEO-friendly?",
        blockLabel: "Is the website SEO-friendly?",
        text2: "Yes. Technical SEO, fast loading and clean structure are part of every build.",
      },
      {
        text: "Can you redesign or rebuild my existing website?",
        blockLabel: "Can you redesign or rebuild my existing website?",
        text2: "Yes. We can modernise your current site and keep your content and search rankings.",
      },
    ],
    "case-studies.eyebrow": "Related work",
    "case-studies.titleLine": "Website development <span class=\"grad\">in action</span>",
    "case-studies.button": "Explore All Case Studies →",
    "case-studies.buttonLink": "/case-studies",
    "case-studies.slideList": [
      {
        slideHidden: "",
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
        buttonTabindex: "",
        buttonText: "View Case Study",
      },
      {
        slideHidden: "true",
        mediaLink: "/case-study/accounting",
        text: "MSC Portal",
        image: "/assets/img/acct-portal.png",
        imageAlt: "Smart Accounting web app dashboard with profit and loss charts",
        imageWidth: "714",
        imageHeight: "474",
        itemList: [
          {
            item: "Web App",
          },
          {
            item: "Mobile App",
          },
          {
            item: "Finance",
          },
        ],
        subheading: "<a href=\"/case-study/accounting\">Smart Accounting Web App</a>",
        text2: "A secure web app with a companion mobile app that lets businesses manage invoices, taxes, payroll and transactions in one place, with reports that are always up to date.",
        itemList2: [
          {
            itemText: "Invoicing & payroll",
          },
          {
            itemText: "Real-time reports",
          },
          {
            itemText: "Companion mobile app",
          },
        ],
        buttonLink: "/case-study/accounting",
        buttonTabindex: "-1",
        buttonText: "View Case Study",
      },
    ],
    "start.eyebrow": "Start Here",
    "start.heading": "Planning a new website?",
    "start.text": "Tell us what your website needs to do, and we will come back with a recommended approach, a rough timeline and an honest budget range.",
    "start.buttonLink": "/discuss-your-project?service={slug}",
    "start.buttonText": "Discuss Your Project",
  },
  section: null,
  seo: {
    title: "Website Development Services Built to Perform and Scale | Inovexia Software",
    description: "Fast, secure, SEO-ready websites for businesses, schools and non-profits — engineered with modern frameworks and easy for your team to update after launch.",
  },
};
