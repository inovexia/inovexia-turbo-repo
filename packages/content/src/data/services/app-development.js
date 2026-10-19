// Service: App Development — /service/app-development
export default {
  type: "service",
  slug: "app-development",
  template: "service-web-design",
  title: "App Development",
  published: true,
  sort: 2,
  fields: {
    name: "App Development",
    indexLabel: "",
    anchor: "svc-app",
    icon: "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"2.5\"/><path d=\"M10.5 5.3h3M10.8 18.4h2.4\"/>",
    description: "We design and develop premium mobile applications that deliver intuitive user experiences and powerful performance for modern businesses.",
    features: [
      "Native & cross-platform solutions",
      "Intuitive UI/UX design",
      "High security and reliability",
      "Seamless integrations",
    ],
    showOnHome: true,
    homeOrder: 2,
    homeTitle: "App Development",
    homeText: "Native and cross-platform apps for iOS and Android, from the first prototype through store launch and beyond.",
    homeIcon: "",
    showInFooter: true,
    footerOrder: 2,
    footerLabel: "App Development",
  },
  page: {
    "top.crumb": "<a href=\"/\">Home</a> <span aria-hidden=\"true\">/</span> <a href=\"/services\">Services</a> <span aria-hidden=\"true\">/</span> <span aria-current=\"page\">App Development</span>",
    "top.titleLine": "Mobile App Development Services",
    "top.titleLine2": "for iOS and Android",
    "top.lead": "Native and cross-platform apps for iOS and Android — from the first prototype through store launch and beyond, built to be fast, secure and simple to use.",
    "top.itemList": [
      {
        icon: "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"2.5\"/><path d=\"M10.8 18.4h2.4\"/>",
        itemText: "Flutter, React Native or",
        bold: "native",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M12 7.6V12l2.8 1.8\"/>",
        itemText: "First release in",
        bold: "8–16 weeks",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M3.6 12h16.8M12 3.6c2.4 2.3 3.6 5.1 3.6 8.4s-1.2 6.1-3.6 8.4c-2.4-2.3-3.6-5.1-3.6-8.4s1.2-6.1 3.6-8.4z\"/>",
        itemText: "Live on",
        bold: "both stores",
      },
    ],
    "top.buttonLink": "/get-in-touch",
    "top.buttonText": "Get in Touch",
    "approach.eyebrow": "The problem, and the fix",
    "approach.titleLine": "What is wrong,",
    "approach.titleLine2": "and what we do about it.",
    "approach.subheading": "Common Challenges Businesses Face",
    "approach.text": "App projects often run into:",
    "approach.itemList": [
      {
        itemText: "Unclear scope and growing budgets",
      },
      {
        itemText: "Separate, costly iOS and Android builds",
      },
      {
        itemText: "Slow or crash-prone apps",
      },
      {
        itemText: "Confusing user journeys",
      },
      {
        itemText: "Hard-to-scale back ends",
      },
      {
        itemText: "App Store and Play Store rejections",
      },
      {
        itemText: "No plan for updates after launch",
      },
    ],
    "approach.subheading2": "Our Solution",
    "approach.text2": "We deliver apps that avoid these problems through:",
    "approach.itemList2": [
      {
        itemText: "A clear MVP scope and fixed milestones",
      },
      {
        itemText: "One cross-platform codebase where it fits",
      },
      {
        itemText: "Performance and crash monitoring from day one",
      },
      {
        itemText: "User-tested, intuitive interface design",
      },
      {
        itemText: "Secure, scalable APIs and cloud back ends",
      },
      {
        itemText: "Store-ready builds and listing support",
      },
      {
        itemText: "A maintenance and release roadmap",
      },
    ],
    "benefits.eyebrow": "What you get",
    "benefits.titleLine": "Benefits of our",
    "benefits.titleLine2": "app development",
    "benefits.cardList": [
      {
        icon: "<path d=\"M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z\"/><path d=\"m9 12 2.2 2.2L15.4 10\"/>",
        subheading: "Faster Time to Market",
        text: "A focused first version gets your app into users’ hands sooner.",
      },
      {
        icon: "<path d=\"M12 3.4a8.6 8.6 0 1 0 8.6 8.6\"/><path d=\"M14.6 2.6A7.4 7.4 0 0 1 21.4 9\"/><path d=\"m8.6 12.6 2.6 2.6 5-5.6\"/>",
        subheading: "One Team, Both Platforms",
        text: "Design, iOS, Android and the back end delivered by the same team.",
      },
      {
        icon: "<rect x=\"6.8\" y=\"2.5\" width=\"10.4\" height=\"19\" rx=\"2.4\"/><path d=\"M10.6 5.2h2.8M10.9 18.4h2.2\"/>",
        subheading: "Smooth Performance",
        text: "Apps tested on real devices for speed, battery and reliability.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Secure by Design",
        text: "Authentication, encryption and secure APIs protect your users’ data.",
      },
      {
        icon: "<path d=\"M13.4 2.6 4.8 13.4h6L9.8 21.4l8.8-11h-6.2z\"/>",
        subheading: "Easy to Use",
        text: "Interfaces designed around your users and tested before release.",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><circle cx=\"12\" cy=\"12\" r=\"4.4\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
        subheading: "Built to Evolve",
        text: "Analytics and a clean architecture make every next release easier.",
      },
    ],
    "process.eyebrow": "How it runs",
    "process.titleLine": "Our app",
    "process.titleLine2": "development process",
    "process.stepList": [
      {
        subheadingText: "Discovery & MVP Scope",
        text: "We define the problem, the users and the smallest version that proves value.",
      },
      {
        subheadingText: "UX & Prototyping",
        text: "User journeys and a clickable prototype tested before development starts.",
      },
      {
        subheadingText: "Architecture & Back End",
        text: "APIs, database, authentication and cloud services planned and built.",
      },
      {
        subheadingText: "App Development",
        text: "Short cycles with a working build to review at the end of each one.",
      },
      {
        subheadingText: "Testing & QA",
        text: "Functional, performance and security testing across devices and OS versions.",
      },
      {
        subheadingText: "Store Launch",
        text: "Listings, screenshots and privacy details prepared and submitted.",
      },
      {
        subheadingText: "Updates & Growth",
        text: "Crash monitoring, analytics and regular feature releases.",
      },
    ],
    "process.label": "Technologies we use",
    "process.itemList": [
      {
        item: "Flutter",
      },
      {
        item: "React Native",
      },
      {
        item: "Swift (iOS)",
      },
      {
        item: "Kotlin (Android)",
      },
      {
        item: "Node.js",
      },
      {
        item: "Laravel",
      },
      {
        item: "Firebase",
      },
      {
        item: "REST & GraphQL APIs",
      },
      {
        item: "MySQL & PostgreSQL",
      },
      {
        item: "AWS",
      },
      {
        item: "Google Play Console",
      },
      {
        item: "App Store Connect",
      },
    ],
    "why.eyebrow": "Why choose us",
    "why.titleLine": "Six reasons",
    "why.titleLine2": "to work with us",
    "why.cardList": [
      {
        icon: "<circle cx=\"9\" cy=\"8.2\" r=\"3.4\"/><path d=\"M3.2 19.5a5.8 5.8 0 0 1 11.6 0\"/><path d=\"M16.2 5.2a3.2 3.2 0 0 1 0 6\"/><path d=\"M17.4 14.4a5.6 5.6 0 0 1 3.4 5.1\"/>",
        subheading: "Mobile Engineers",
        text: "Our team designs and builds native and cross-platform apps for iOS and Android.",
      },
      {
        icon: "<path d=\"M5 20V4M12 20v-7M19 20V9\"/><circle cx=\"5\" cy=\"8.5\" r=\"2.1\"/><circle cx=\"12\" cy=\"17.4\" r=\"2.1\"/><circle cx=\"19\" cy=\"6\" r=\"2.1\"/>",
        subheading: "Shaped Around Your Users",
        text: "We map out who uses the app and what they need to do, then build the features that matter most first.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Data-Informed Improvements",
        text: "Built-in analytics show how people use the app, so each release improves on the last.",
      },
      {
        icon: "<rect x=\"2.8\" y=\"5.5\" width=\"12\" height=\"13\" rx=\"2.2\"/><rect x=\"16.4\" y=\"8.5\" width=\"4.8\" height=\"10\" rx=\"1.6\"/><path d=\"M6.4 8.4h4.8\"/>",
        subheading: "Every Screen Size",
        text: "Apps are tested on a range of phones and tablets, so layouts and performance hold up everywhere.",
      },
      {
        icon: "<path d=\"M3.5 6.4A1.9 1.9 0 0 1 5.4 4.5h9.2a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9H8.2L4.6 16v-2.9h-1.1z\"/><path d=\"M18 9.3h.6a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9h-.6v2.6l-3.1-2.6h-3\"/>",
        subheading: "Clear Communication",
        text: "You get regular demos and test builds on your own device throughout development.",
      },
      {
        icon: "<path d=\"M12 20.4 4.6 13a4.8 4.8 0 1 1 7.4-6 4.8 4.8 0 1 1 7.4 6z\"/>",
        subheading: "Long-Term Support",
        text: "We handle OS updates, store submissions and new features after launch.",
      },
    ],
    "faq.eyebrow": "Questions",
    "faq.titleLine": "Frequently asked",
    "faq.titleLine2": "questions",
    "faq.questionList": [
      {
        text: "Native or cross-platform — which is right for us?",
        blockLabel: "Native or cross-platform — which is right for us?",
        text2: "Cross-platform (Flutter or React Native) suits most business apps and saves time and cost; native suits apps that need heavy device features or maximum performance.",
      },
      {
        text: "How long does it take to build an app?",
        blockLabel: "How long does it take to build an app?",
        text2: "A focused first version usually takes 8 to 16 weeks, depending on features and integrations.",
      },
      {
        text: "Do you publish the app to the stores?",
        blockLabel: "Do you publish the app to the stores?",
        text2: "Yes. We prepare the listings and handle submission to Google Play and the App Store.",
      },
      {
        text: "Can you build the admin panel and back end too?",
        blockLabel: "Can you build the admin panel and back end too?",
        text2: "Yes. We build the APIs, database and web admin panel that power your app.",
      },
      {
        text: "What happens after launch?",
        blockLabel: "What happens after launch?",
        text2: "We monitor crashes and usage, fix issues and ship improvements on a schedule that suits you.",
      },
    ],
    "case-studies.eyebrow": "Related work",
    "case-studies.titleLine": "Recent <span class=\"grad\">projects</span>",
    "case-studies.button": "Explore All Case Studies →",
    "case-studies.buttonLink": "/case-studies",
    "case-studies.slideList": [
      {
        slideHidden: "",
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
    "start.heading": "Planning a mobile app?",
    "start.text": "Tell us about your app idea and who it is for, and we will come back with a recommended approach, a rough timeline and an honest budget range.",
    "start.buttonLink": "/discuss-your-project?service={slug}",
    "start.buttonText": "Discuss Your Project",
  },
  section: null,
  seo: {
    title: "Mobile App Development Services for iOS and Android | Inovexia Software",
    description: "Native and cross-platform apps for iOS and Android — from the first prototype through store launch and beyond, built to be fast, secure and simple to use.",
  },
};
