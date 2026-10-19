// Service: SEO Services — /service/seo-services
export default {
  type: "service",
  slug: "seo-services",
  template: "service-web-design",
  title: "SEO Services",
  published: true,
  sort: 4,
  fields: {
    name: "SEO Services",
    indexLabel: "",
    anchor: "svc-seo",
    icon: "<circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m15.4 15.4 4.1 4.1\"/><path d=\"M7.5 12V9.5M10.5 12V7.5M13.5 12v-4\"/>",
    description: "We elevate your digital presence with strategic SEO solutions that improve visibility, drive organic traffic, and deliver measurable growth.",
    features: [
      "Advanced keyword strategy",
      "Technical and on-page optimization",
      "Authority-building off-page SEO",
      "Data-driven performance insights",
    ],
    showOnHome: true,
    homeOrder: 4,
    homeTitle: "SEO Service",
    homeText: "Technical SEO, content and link building that move your pages up search results — with monthly reports you can actually read.",
    homeIcon: "",
    showInFooter: true,
    footerOrder: 4,
    footerLabel: "SEO Service",
  },
  page: {
    "top.crumb": "<a href=\"/\">Home</a> <span aria-hidden=\"true\">/</span> <a href=\"/services\">Services</a> <span aria-hidden=\"true\">/</span> <span aria-current=\"page\">SEO</span>",
    "top.titleLine": "SEO Services That Bring",
    "top.titleLine2": "Qualified Traffic and Leads",
    "top.lead": "Technical SEO, content and link building that move your pages up search results — with monthly reports you can actually read.",
    "top.itemList": [
      {
        icon: "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"2.5\"/><path d=\"M10.8 18.4h2.4\"/>",
        itemText: "Technical, content and",
        bold: "off-page",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M12 7.6V12l2.8 1.8\"/>",
        itemText: "First results in",
        bold: "6–12 weeks",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M3.6 12h16.8M12 3.6c2.4 2.3 3.6 5.1 3.6 8.4s-1.2 6.1-3.6 8.4c-2.4-2.3-3.6-5.1-3.6-8.4s1.2-6.1 3.6-8.4z\"/>",
        itemText: "Clear monthly",
        bold: "reports",
      },
    ],
    "top.buttonLink": "/get-in-touch",
    "top.buttonText": "Get in Touch",
    "approach.eyebrow": "The problem, and the fix",
    "approach.titleLine": "What is wrong,",
    "approach.titleLine2": "and what we do about it.",
    "approach.subheading": "Common Challenges Businesses Face",
    "approach.text": "Many businesses struggle with:",
    "approach.itemList": [
      {
        itemText: "Low rankings for important keywords",
      },
      {
        itemText: "Little or no organic traffic",
      },
      {
        itemText: "Technical errors blocking indexing",
      },
      {
        itemText: "Thin or outdated content",
      },
      {
        itemText: "Few quality backlinks",
      },
      {
        itemText: "Poor local search visibility",
      },
      {
        itemText: "Reports that don’t show real results",
      },
    ],
    "approach.subheading2": "Our Solution",
    "approach.text2": "We improve your search performance through:",
    "approach.itemList2": [
      {
        itemText: "A full technical SEO audit and fixes",
      },
      {
        itemText: "Keyword research tied to revenue",
      },
      {
        itemText: "Content plans and on-page optimisation",
      },
      {
        itemText: "Ethical, quality link building",
      },
      {
        itemText: "Local SEO and Google Business Profile",
      },
      {
        itemText: "Speed and Core Web Vitals improvements",
      },
      {
        itemText: "Plain-English monthly reporting",
      },
    ],
    "benefits.eyebrow": "What you get",
    "benefits.titleLine": "Benefits of our",
    "benefits.titleLine2": "SEO services",
    "benefits.cardList": [
      {
        icon: "<path d=\"M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z\"/><path d=\"m9 12 2.2 2.2L15.4 10\"/>",
        subheading: "Visitors With Intent",
        text: "People who find you through search are already looking for what you offer.",
      },
      {
        icon: "<path d=\"M12 3.4a8.6 8.6 0 1 0 8.6 8.6\"/><path d=\"M14.6 2.6A7.4 7.4 0 0 1 21.4 9\"/><path d=\"m8.6 12.6 2.6 2.6 5-5.6\"/>",
        subheading: "Results That Compound",
        text: "Rankings keep bringing visitors long after the work is done.",
      },
      {
        icon: "<rect x=\"6.8\" y=\"2.5\" width=\"10.4\" height=\"19\" rx=\"2.4\"/><path d=\"M10.6 5.2h2.8M10.9 18.4h2.2\"/>",
        subheading: "Lower Cost per Lead",
        text: "Organic traffic reduces how much you depend on paid ads.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Local Visibility",
        text: "Show up in maps and local searches where your customers are.",
      },
      {
        icon: "<path d=\"M13.4 2.6 4.8 13.4h6L9.8 21.4l8.8-11h-6.2z\"/>",
        subheading: "Better Website Health",
        text: "Technical fixes improve speed and user experience too.",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><circle cx=\"12\" cy=\"12\" r=\"4.4\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
        subheading: "Clear Reporting",
        text: "Track rankings, traffic and leads with reports you understand.",
      },
    ],
    "process.eyebrow": "How it runs",
    "process.titleLine": "Our SEO",
    "process.titleLine2": "process",
    "process.stepList": [
      {
        subheadingText: "SEO Audit",
        text: "We review your site’s technical health, content, links and competitors.",
      },
      {
        subheadingText: "Keyword Strategy",
        text: "Keywords chosen by search volume, intent and business value.",
      },
      {
        subheadingText: "Technical Fixes",
        text: "Indexing, speed, structure and structured-data issues resolved.",
      },
      {
        subheadingText: "On-Page Optimisation",
        text: "Titles, headings, content and internal links improved page by page.",
      },
      {
        subheadingText: "Content & Links",
        text: "New content and quality backlinks build authority over time.",
      },
      {
        subheadingText: "Local SEO",
        text: "Google Business Profile, citations and reviews for local search.",
      },
      {
        subheadingText: "Reporting & Refinement",
        text: "Monthly reports and adjustments based on what is working.",
      },
    ],
    "process.label": "Technologies we use",
    "process.itemList": [
      {
        item: "Google Search Console",
      },
      {
        item: "Google Analytics 4",
      },
      {
        item: "Ahrefs",
      },
      {
        item: "Semrush",
      },
      {
        item: "Screaming Frog",
      },
      {
        item: "PageSpeed Insights",
      },
      {
        item: "Schema.org",
      },
      {
        item: "Google Business Profile",
      },
      {
        item: "Looker Studio",
      },
      {
        item: "Yoast & Rank Math",
      },
    ],
    "why.eyebrow": "Why choose us",
    "why.titleLine": "Six reasons",
    "why.titleLine2": "to work with us",
    "why.cardList": [
      {
        icon: "<circle cx=\"9\" cy=\"8.2\" r=\"3.4\"/><path d=\"M3.2 19.5a5.8 5.8 0 0 1 11.6 0\"/><path d=\"M16.2 5.2a3.2 3.2 0 0 1 0 6\"/><path d=\"M17.4 14.4a5.6 5.6 0 0 1 3.4 5.1\"/>",
        subheading: "Dedicated SEO Specialists",
        text: "Our team covers technical SEO, content and link building, so every part of your search presence is handled.",
      },
      {
        icon: "<path d=\"M5 20V4M12 20v-7M19 20V9\"/><circle cx=\"5\" cy=\"8.5\" r=\"2.1\"/><circle cx=\"12\" cy=\"17.4\" r=\"2.1\"/><circle cx=\"19\" cy=\"6\" r=\"2.1\"/>",
        subheading: "A Plan for Your Market",
        text: "Keywords, content and priorities are chosen for your audience and competitors, not copied from a checklist.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Data-Driven Decisions",
        text: "We use Search Console, analytics and ranking data to decide what to work on next.",
      },
      {
        icon: "<rect x=\"2.8\" y=\"5.5\" width=\"12\" height=\"13\" rx=\"2.2\"/><rect x=\"16.4\" y=\"8.5\" width=\"4.8\" height=\"10\" rx=\"1.6\"/><path d=\"M6.4 8.4h4.8\"/>",
        subheading: "Mobile-First Indexing",
        text: "Google ranks the mobile version of your site, so we make sure it is fast and complete on phones.",
      },
      {
        icon: "<path d=\"M3.5 6.4A1.9 1.9 0 0 1 5.4 4.5h9.2a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9H8.2L4.6 16v-2.9h-1.1z\"/><path d=\"M18 9.3h.6a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9h-.6v2.6l-3.1-2.6h-3\"/>",
        subheading: "Reports You Can Read",
        text: "Monthly reports explain what changed, what it means for your business and what comes next.",
      },
      {
        icon: "<path d=\"M12 20.4 4.6 13a4.8 4.8 0 1 1 7.4-6 4.8 4.8 0 1 1 7.4 6z\"/>",
        subheading: "Steady, Lasting Growth",
        text: "We use white-hat methods that build rankings over time and hold up through algorithm updates.",
      },
    ],
    "faq.eyebrow": "Questions",
    "faq.titleLine": "Frequently asked",
    "faq.titleLine2": "questions",
    "faq.questionList": [
      {
        text: "How long does SEO take to work?",
        blockLabel: "How long does SEO take to work?",
        text2: "Technical fixes can help within weeks; meaningful ranking gains usually take three to six months of consistent work.",
      },
      {
        text: "Do you guarantee first-page rankings?",
        blockLabel: "Do you guarantee first-page rankings?",
        text2: "No one can honestly guarantee rankings. We commit to proven work, clear targets and transparent reporting.",
      },
      {
        text: "What do your monthly reports include?",
        blockLabel: "What do your monthly reports include?",
        text2: "Rankings, organic traffic, conversions and leads, plus what we did and what comes next.",
      },
      {
        text: "Do you do local SEO?",
        blockLabel: "Do you do local SEO?",
        text2: "Yes. We optimise your Google Business Profile, local citations and location pages.",
      },
      {
        text: "Can you fix SEO on my existing website?",
        blockLabel: "Can you fix SEO on my existing website?",
        text2: "Yes. We start with an audit and fix the issues holding your site back.",
      },
    ],
    "case-studies.eyebrow": "Related work",
    "case-studies.titleLine": "Recent <span class=\"grad\">projects</span>",
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
        buttonTabindex: "-1",
        buttonText: "View Case Study",
      },
    ],
    "start.eyebrow": "Start Here",
    "start.heading": "Want your business to rank higher?",
    "start.text": "Tell us about your website and the customers you want to reach, and we will come back with a recommended SEO plan and an honest budget range.",
    "start.buttonLink": "/discuss-your-project?service={slug}",
    "start.buttonText": "Discuss Your Project",
  },
  section: null,
  seo: {
    title: "SEO Services That Bring Qualified Traffic and Leads | Inovexia Software",
    description: "Technical SEO, content and link building that move your pages up search results — with monthly reports you can actually read.",
  },
};
