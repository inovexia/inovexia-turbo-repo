// Service: Website Design — /service/web-design
export default {
  type: "service",
  slug: "web-design",
  template: "service-web-design",
  title: "Website Design",
  published: true,
  sort: 5,
  fields: {
    name: "Website Design",
    indexLabel: "",
    anchor: "svc-design",
    icon: "<path d=\"M13.6 3.4 3.9 13.1a2 2 0 0 0-.55 1.05L2.6 18.2a1 1 0 0 0 1.16 1.16l4.05-.75a2 2 0 0 0 1.05-.55l9.7-9.7z\"/><path d=\"m15.8 5.6 2.6 2.6M14.9 20.5h5.5\"/>",
    description: "We create visually stunning and user-centric designs that not only capture attention but also deliver meaningful and engaging digital experiences.",
    features: [
      "Premium UI/UX design",
      "Brand-focused visual storytelling",
      "Responsive and adaptive layouts",
      "Conversion-driven design approach",
    ],
    showOnHome: true,
    homeOrder: 5,
    homeTitle: "Website Design",
    homeText: "On-brand, user-friendly designs — wireframes and clickable prototypes you approve before a line of code is written.",
    homeIcon: "",
    showInFooter: true,
    footerOrder: 5,
    footerLabel: "Website Design",
  },
  page: {
    "top.crumb": "<a href=\"/\">Home</a> <span aria-hidden=\"true\">/</span> <a href=\"/services\">Services</a> <span aria-hidden=\"true\">/</span> <span aria-current=\"page\">Web Design</span>",
    "top.titleLine": "Professional Web Design Services",
    "top.titleLine2": "for Businesses Worldwide",
    "top.lead": "We combine modern design principles, user experience strategies, and the latest technologies to deliver websites that are fast, secure, and scalable.",
    "top.itemList": [
      {
        icon: "<rect x=\"6.5\" y=\"2.5\" width=\"11\" height=\"19\" rx=\"2.5\"/><path d=\"M10.8 18.4h2.4\"/>",
        itemText: "SEO-ready and",
        bold: "mobile-first",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><path d=\"M12 7.6V12l2.8 1.8\"/>",
        itemText: "Most sites live in",
        bold: "2–8 weeks",
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
    "approach.text": "Many businesses struggle with:",
    "approach.itemList": [
      {
        itemText: "Outdated website designs",
      },
      {
        itemText: "Poor user experience",
      },
      {
        itemText: "Slow-loading pages",
      },
      {
        itemText: "Mobile responsiveness issues",
      },
      {
        itemText: "Low search engine rankings",
      },
      {
        itemText: "Low conversion rates",
      },
      {
        itemText: "Difficult website management",
      },
    ],
    "approach.subheading2": "Our Solution",
    "approach.text2": "We design websites that solve these challenges through:",
    "approach.itemList2": [
      {
        itemText: "Modern and responsive designs",
      },
      {
        itemText: "SEO-friendly website architecture",
      },
      {
        itemText: "Fast-loading pages",
      },
      {
        itemText: "Conversion-focused layouts",
      },
      {
        itemText: "Mobile-first development",
      },
      {
        itemText: "User-friendly content management systems",
      },
      {
        itemText: "Scalable website solutions for future growth",
      },
    ],
    "benefits.eyebrow": "What you get",
    "benefits.titleLine": "Benefits of our",
    "benefits.titleLine2": "web design services",
    "benefits.cardList": [
      {
        icon: "<path d=\"M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z\"/><path d=\"m9 12 2.2 2.2L15.4 10\"/>",
        subheading: "Improved Brand Credibility",
        text: "A professional website builds trust and strengthens your brand image.",
      },
      {
        icon: "<path d=\"M12 3.4a8.6 8.6 0 1 0 8.6 8.6\"/><path d=\"M14.6 2.6A7.4 7.4 0 0 1 21.4 9\"/><path d=\"m8.6 12.6 2.6 2.6 5-5.6\"/>",
        subheading: "Better User Experience",
        text: "Easy navigation and intuitive design keep visitors engaged.",
      },
      {
        icon: "<rect x=\"6.8\" y=\"2.5\" width=\"10.4\" height=\"19\" rx=\"2.4\"/><path d=\"M10.6 5.2h2.8M10.9 18.4h2.2\"/>",
        subheading: "Mobile-Friendly Design",
        text: "Your website performs seamlessly across all devices.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "Higher Search Engine Visibility",
        text: "SEO-ready websites help improve rankings and organic traffic.",
      },
      {
        icon: "<path d=\"M13.4 2.6 4.8 13.4h6L9.8 21.4l8.8-11h-6.2z\"/>",
        subheading: "Faster Website Performance",
        text: "Optimized designs ensure quick loading times and better user satisfaction.",
      },
      {
        icon: "<circle cx=\"12\" cy=\"12\" r=\"8.4\"/><circle cx=\"12\" cy=\"12\" r=\"4.4\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>",
        subheading: "Increased Lead Generation",
        text: "Strategic layouts and clear calls-to-action help convert visitors into customers.",
      },
    ],
    "process.eyebrow": "How it runs",
    "process.titleLine": "Our web",
    "process.titleLine2": "design process",
    "process.stepList": [
      {
        subheadingText: "Discovery & Consultation",
        text: "We understand your business goals, audience, and project requirements.",
      },
      {
        subheadingText: "Research & Planning",
        text: "Our team analyzes competitors and creates a website strategy.",
      },
      {
        subheadingText: "UI/UX Design",
        text: "We create wireframes and visual designs focused on user experience.",
      },
      {
        subheadingText: "Website Development",
        text: "Our developers transform designs into a functional website.",
      },
      {
        subheadingText: "Testing & Quality Assurance",
        text: "We test performance, responsiveness, security, and usability.",
      },
      {
        subheadingText: "Launch & Deployment",
        text: "Your website is deployed and optimized for live performance.",
      },
      {
        subheadingText: "Ongoing Support",
        text: "We provide maintenance, updates, and technical assistance as needed.",
      },
    ],
    "process.label": "Technologies we use",
    "process.itemList": [
      {
        item: "HTML5 & CSS3",
      },
      {
        item: "JavaScript",
      },
      {
        item: "React.js",
      },
      {
        item: "Next.js",
      },
      {
        item: "WordPress",
      },
      {
        item: "WooCommerce",
      },
      {
        item: "Shopify",
      },
      {
        item: "PHP",
      },
      {
        item: "Laravel",
      },
      {
        item: "MySQL",
      },
      {
        item: "Figma",
      },
      {
        item: "Adobe XD",
      },
      {
        item: "Plasmic",
      },
    ],
    "why.eyebrow": "Why choose us",
    "why.titleLine": "Six reasons",
    "why.titleLine2": "to work with us",
    "why.cardList": [
      {
        icon: "<circle cx=\"9\" cy=\"8.2\" r=\"3.4\"/><path d=\"M3.2 19.5a5.8 5.8 0 0 1 11.6 0\"/><path d=\"M16.2 5.2a3.2 3.2 0 0 1 0 6\"/><path d=\"M17.4 14.4a5.6 5.6 0 0 1 3.4 5.1\"/>",
        subheading: "Experienced Design Team",
        text: "Our designers and developers bring years of experience in creating business-focused websites.",
      },
      {
        icon: "<path d=\"M5 20V4M12 20v-7M19 20V9\"/><circle cx=\"5\" cy=\"8.5\" r=\"2.1\"/><circle cx=\"12\" cy=\"17.4\" r=\"2.1\"/><circle cx=\"19\" cy=\"6\" r=\"2.1\"/>",
        subheading: "Custom Solutions",
        text: "Every website is tailored to your unique business requirements.",
      },
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/><path d=\"M7.6 12V9.6M10.4 12V7.4M13.2 12v-3.2\"/>",
        subheading: "SEO-Focused Development",
        text: "We build websites with search engine optimization best practices from the start.",
      },
      {
        icon: "<rect x=\"2.8\" y=\"5.5\" width=\"12\" height=\"13\" rx=\"2.2\"/><rect x=\"16.4\" y=\"8.5\" width=\"4.8\" height=\"10\" rx=\"1.6\"/><path d=\"M6.4 8.4h4.8\"/>",
        subheading: "Mobile-First Approach",
        text: "All websites are optimized for smartphones, tablets, and desktops.",
      },
      {
        icon: "<path d=\"M3.5 6.4A1.9 1.9 0 0 1 5.4 4.5h9.2a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9H8.2L4.6 16v-2.9h-1.1z\"/><path d=\"M18 9.3h.6a1.9 1.9 0 0 1 1.9 1.9v4.8a1.9 1.9 0 0 1-1.9 1.9h-.6v2.6l-3.1-2.6h-3\"/>",
        subheading: "Transparent Communication",
        text: "Regular project updates ensure complete visibility throughout development.",
      },
      {
        icon: "<path d=\"M12 20.4 4.6 13a4.8 4.8 0 1 1 7.4-6 4.8 4.8 0 1 1 7.4 6z\"/>",
        subheading: "Long-Term Partnership",
        text: "We provide ongoing support and maintenance to help your website grow with your business.",
      },
    ],
    "faq.eyebrow": "Questions",
    "faq.titleLine": "Frequently asked",
    "faq.titleLine2": "questions",
    "faq.questionList": [
      {
        text: "How long does it take to design a website?",
        blockLabel: "How long does it take to design a website?",
        text2: "Most business websites are completed within 2 to 8 weeks, depending on complexity and requirements.",
      },
      {
        text: "Will my website be mobile-friendly?",
        blockLabel: "Will my website be mobile-friendly?",
        text2: "Yes. Every website we design is fully responsive and optimized for all devices.",
      },
      {
        text: "Can you redesign my existing website?",
        blockLabel: "Can you redesign my existing website?",
        text2: "Absolutely. We can modernize your current website while improving performance and user experience.",
      },
      {
        text: "Will my website be SEO-friendly?",
        blockLabel: "Will my website be SEO-friendly?",
        text2: "Yes. We follow SEO best practices, including optimized structure, metadata, speed, and mobile responsiveness.",
      },
      {
        text: "Can I update the website myself?",
        blockLabel: "Can I update the website myself?",
        text2: "Yes. We build websites with easy-to-manage content management systems such as WordPress.",
      },
      {
        text: "Do you provide website maintenance?",
        blockLabel: "Do you provide website maintenance?",
        text2: "Yes. We offer ongoing maintenance, security updates, performance monitoring, and technical support.",
      },
    ],
    "case-studies.eyebrow": "Related work",
    "case-studies.titleLine": "Website design <span class=\"grad\">in action</span>",
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
    "start.heading": "Not sure what your new website needs?",
    "start.text": "Tell us what you are trying to achieve and we will come back with a recommendation, a rough timeline and an honest budget range.",
    "start.buttonLink": "/discuss-your-project?service={slug}",
    "start.buttonText": "Discuss Your Project",
  },
  section: null,
  seo: {
    title: "Professional Web Design Services for Businesses Worldwide | Inovexia",
    description: "Looking for professional web design services? We create responsive, SEO-friendly, and conversion-focused websites for businesses worldwide.",
  },
};
