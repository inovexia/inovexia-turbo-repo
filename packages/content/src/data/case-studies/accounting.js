// Case study: Smart Accounting — /case-study/accounting
export default {
  type: "case",
  slug: "accounting",
  template: "work-accounting",
  title: "Smart Accounting",
  published: true,
  sort: 7,
  fields: {
    title: "Smart Accounting",
    tags: ["Web App", "Web Development"],
    categories: ["web-development"],
    image: {
      src: "/assets/img/acct-portal.png",
      alt: "",
      width: 714,
      height: 474,
    },
    coverStyle: 1,
    comingSoonText: "",
    linkLabel: "Smart Accounting — read the case study",
    homeCategories: ["web-development", "app-development"],
    showOnHome: true,
    homeOrder: 2,
    homeImage: {
      src: "/assets/img/acct-portal.png",
      alt: "",
      width: 714,
      height: 474,
    },
    homeCoverStyle: 2,
  },
  page: {
    "top.crumb": "<a href=\"/\">Home</a><span aria-hidden=\"true\">/</span> <a href=\"/case-studies\">Case Studies</a><span aria-hidden=\"true\">/</span> <span aria-current=\"page\">Smart Accounting</span>",
    "top.titleLine": "Smart Accounting",
    "top.titleLine2": "Web App",
    "top.lead": "A secure web app, with a companion mobile app, that lets businesses manage finances, invoices, taxes, payroll and transactions in one place, with reports that are always up to date.",
    "top.itemList": [
      {
        item: "Sector <b>Finance</b>",
      },
      {
        item: "Type <b>Web App</b>",
      },
      {
        item: "Stack <b>Laravel + React</b>",
      },
    ],
    "top.buttonLink": "/get-in-touch",
    "top.buttonText": "Get in Touch",
    "top.image": "/assets/img/acct-portal.png",
    "top.imageAlt": "Accounting dashboard with profit and loss charts, net income and expense trends",
    "top.pdWslideList": [
      {
        image: "/assets/img/acct-web-invoices.svg",
        imageAlt: "Accounting web invoices list with paid, due and overdue statuses",
      },
      {
        image: "/assets/img/acct-web-reports.svg",
        imageAlt: "Accounting web profit and loss statement and downloadable statements",
      },
      {
        image: "/assets/img/acct-web-payroll.svg",
        imageAlt: "Accounting web payroll with salaries and approval status",
      },
    ],
    "top.image2": "/assets/img/acct-app.svg",
    "top.imageAlt2": "",
    "top.tzxSyncList": [
      {
        image: "/assets/img/acct-app-invoices.svg",
        imageAlt: "",
      },
      {
        image: "/assets/img/acct-app-reports.svg",
        imageAlt: "",
      },
      {
        image: "/assets/img/acct-app-payroll.svg",
        imageAlt: "",
      },
    ],
    "top.image3": "/assets/img/acct-portal.png",
    "top.imageAlt3": "",
    "top.tzxSyncList2": [
      {
        image: "/assets/img/acct-web-invoices.svg",
        imageAlt: "",
      },
      {
        image: "/assets/img/acct-web-reports.svg",
        imageAlt: "",
      },
      {
        image: "/assets/img/acct-web-payroll.svg",
        imageAlt: "",
      },
    ],
    "top.image4": "/assets/img/acct-app.svg",
    "top.imageAlt4": "Accounting app overview: cash balance, income and expenses, and recent invoices",
    "top.imageCap": "Overview — the live MSC Portal dashboard, and the app overview",
    "top.pdSlideList": [
      {
        image: "/assets/img/acct-app-invoices.svg",
        imageAlt: "Invoices list with paid, due and overdue invoices",
        imageCap: "Invoices — sent, due, paid and overdue at a glance",
      },
      {
        image: "/assets/img/acct-app-reports.svg",
        imageAlt: "Quarterly profit and loss with downloadable statements",
        imageCap: "Reports — P&L, balance sheet, cash flow and tax, export-ready",
      },
      {
        image: "/assets/img/acct-app-payroll.svg",
        imageAlt: "Next payroll total and employee salaries with approval status",
        imageCap: "Payroll — salaries, deductions and approvals in one run",
      },
    ],
    "top.chip": "<span class=\"pd__ok\">✓</span> New profit <b>$2,992</b>",
    "top.cap": "Overview — the live MSC Portal dashboard, and the app overview",
    "overview.eyebrow": "Project overview",
    "overview.titleLine": "The whole finance office,",
    "overview.titleLine2": "in one app.",
    "overview.lead": "Growing businesses were running their accounts across spreadsheets, a separate invoicing tool and a payroll file, so nobody had a clear, current picture of the money.",
    "overview.sub": "We designed and built one platform for bookkeeping, invoicing, payroll, tax and reporting, used in the browser at the office and on a phone through the companion app.",
    "overview.label": "Project snapshot",
    "overview.blockList": [
      {
        term: "Product",
        detail: "Smart Accounting Software",
      },
      {
        term: "Industry",
        detail: "Finance & accounting",
      },
      {
        term: "Built for",
        detail: "Small and growing businesses",
      },
      {
        term: "Case Studies",
        detail: "Design, development, launch",
      },
      {
        term: "Platforms",
        detail: "Web app + mobile app",
      },
      {
        term: "Timeline",
        detail: "5 months",
      },
    ],
    "challenge.eyebrow": "The brief",
    "challenge.titleLine": "Spreadsheets and guesswork,",
    "challenge.titleLine2": "replaced by live numbers.",
    "challenge.subheading": "Challenges",
    "challenge.text": "Transactions were typed in by hand, invoices were tracked in a spreadsheet and payroll was worked out separately every month. Month-end reports took days to compile, errors were hard to trace, and owners only saw where the business stood long after the fact.",
    "challenge.subheading2": "Solution",
    "challenge.text2": "One secure platform where transactions are recorded automatically, invoices and payroll live next to the books, and profit & loss, balance sheet and cash flow update in real time. A mobile app gives owners the same numbers on the go.",
    "features.eyebrow": "Key features",
    "features.titleLine": "Everything finance needs,",
    "features.titleLine2": "in one login.",
    "features.waFeatList": [
      {
        icon: "<path d=\"M5 4.5h11a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3z\"/><path d=\"M5 16.5a3 3 0 0 1 3-3h11M9 8.5h6\"/>",
        subheading: "Automated bookkeeping",
        text: "Transactions are recorded automatically, cutting manual data entry and the errors that come with it.",
      },
      {
        icon: "<path d=\"M6 3.5h12v17l-3-2-3 2-3-2-3 2z\"/><path d=\"M9 8h6M9 11.5h6M9 15h3.5\"/>",
        subheading: "Invoicing",
        text: "Create, send and track invoices, with paid, due and overdue status at a glance.",
      },
      {
        icon: "<path d=\"M3.5 20.5h17\"/><path d=\"M6.5 16v-5M11 16V7M15.5 16v-7M20 16V5\"/>",
        subheading: "Real-time reports",
        text: "Profit & loss, balance sheet and cash flow, always up to date and ready to export.",
      },
      {
        icon: "<circle cx=\"9\" cy=\"8\" r=\"3.2\"/><path d=\"M3.5 19.5a5.5 5.5 0 0 1 11 0\"/><path d=\"M17 8v8M14.8 10.2c0-1 1-1.6 2.2-1.6s2.2.6 2.2 1.6-1 1.4-2.2 1.6-2.2.6-2.2 1.6 1 1.6 2.2 1.6 2.2-.6 2.2-1.6\"/>",
        subheading: "Payroll",
        text: "Salaries, deductions and approvals handled in a single payroll run.",
      },
      {
        icon: "<rect x=\"4.5\" y=\"3.5\" width=\"15\" height=\"17\" rx=\"2.5\"/><path d=\"m9 15 6-6M9.5 9.5h.01M14.5 14.5h.01\"/>",
        subheading: "Tax management",
        text: "Organised records and tax reports that make filing and compliance simpler.",
      },
      {
        icon: "<rect x=\"4.5\" y=\"10.5\" width=\"15\" height=\"10\" rx=\"2.5\"/><path d=\"M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2\"/>",
        subheading: "Data security",
        text: "Role-based access controls, encrypted data and regular backups.",
      },
    ],
    "tour.eyebrow": "Product tour",
    "tour.titleLine": "Inside the",
    "tour.titleLine2": "app.",
    "tour.buttonList": [
      {
        button: "<b>Dashboard</b><span>Net income, profit and expense trends and the P&amp;L statement on one screen.</span>",
        buttonId: "waTab-dashboard",
        buttonControls: "waPane-dashboard",
        buttonSelected: "true",
      },
      {
        button: "<b>Invoices</b><span>Every invoice with its paid, due or overdue status, and totals for each.</span>",
        buttonId: "waTab-invoices",
        buttonControls: "waPane-invoices",
        buttonSelected: "false",
      },
      {
        button: "<b>Reports</b><span>Profit &amp; loss and downloadable statements for any period.</span>",
        buttonId: "waTab-reports",
        buttonControls: "waPane-reports",
        buttonSelected: "false",
      },
      {
        button: "<b>Payroll</b><span>Salaries and approval status for each employee in the next run.</span>",
        buttonId: "waTab-payroll",
        buttonControls: "waPane-payroll",
        buttonSelected: "false",
      },
    ],
    "tour.shotframeList": [
      {
        shotframeId: "waPane-dashboard",
        shotframeLabelledby: "waTab-dashboard",
        shotframeHidden: "",
        text: "portal.yourcompany.com/dashboard",
        image: "/assets/img/acct-portal.png",
        imageAlt: "Accounting dashboard with profit and loss charts, net income and expense trends",
        imageWidth: "714",
        imageHeight: "474",
      },
      {
        shotframeId: "waPane-invoices",
        shotframeLabelledby: "waTab-invoices",
        shotframeHidden: "true",
        text: "portal.yourcompany.com/invoices",
        image: "/assets/img/acct-web-invoices.svg",
        imageAlt: "Invoices list with paid, due and overdue statuses",
        imageWidth: "1200",
        imageHeight: "797",
      },
      {
        shotframeId: "waPane-reports",
        shotframeLabelledby: "waTab-reports",
        shotframeHidden: "true",
        text: "portal.yourcompany.com/reports",
        image: "/assets/img/acct-web-reports.svg",
        imageAlt: "Profit and loss statement with downloadable statements",
        imageWidth: "1200",
        imageHeight: "797",
      },
      {
        shotframeId: "waPane-payroll",
        shotframeLabelledby: "waTab-payroll",
        shotframeHidden: "true",
        text: "portal.yourcompany.com/payroll",
        image: "/assets/img/acct-web-payroll.svg",
        imageAlt: "Payroll with employee salaries and approval status",
        imageWidth: "1200",
        imageHeight: "797",
      },
    ],
    "roles.eyebrow": "User roles",
    "roles.titleLine": "The right access",
    "roles.titleLine2": "for every person.",
    "roles.itemList": [
      {
        text: "B",
        bold: "Business owner",
        text2: "Sees cash, profit and outstanding invoices at a glance, on the web or the app.",
      },
      {
        text: "A",
        bold: "Accountant",
        text2: "Records transactions, reconciles accounts and prepares statements and tax reports.",
      },
      {
        text: "P",
        bold: "Payroll manager",
        text2: "Runs payroll, manages deductions and sends salaries for approval.",
      },
      {
        text: "A",
        bold: "Auditor",
        text2: "Read-only access to ledgers and reports, with a full history of changes.",
      },
    ],
    "stack.eyebrow": "How it’s built",
    "stack.titleLine": "Secure by design,",
    "stack.titleLine2": "ready to grow.",
    "stack.node": "<span>Users</span><b>Web + mobile app</b><i>Browser, Android, iOS</i>",
    "stack.node2": "<span>Frontend</span><b>React.js</b><i>Dashboard, forms, reports</i>",
    "stack.node3": "<span>Backend</span><b>Laravel / PHP</b><i>REST APIs · role-based access</i>",
    "stack.node4": "<span>Data</span><b>MySQL</b><i>Encrypted, backed up daily</i>",
    "stack.text": "Runs on AWS cloud infrastructure, with",
    "stack.itemList": [
      {
        item: "<b>REST APIs</b> Shared by web and mobile",
      },
      {
        item: "<b>PDF &amp; Excel</b> Statement exports",
      },
      {
        item: "<b>Email</b> Invoices and reminders",
      },
      {
        item: "<b>Backups</b> Automatic and restorable",
      },
    ],
    "stack.label": "Technology stack",
    "stack.itemList2": [
      {
        item: "Laravel / PHP",
      },
      {
        item: "React.js",
      },
      {
        item: "MySQL",
      },
      {
        item: "REST APIs",
      },
      {
        item: "AWS Cloud Infrastructure",
      },
      {
        item: "Mobile Application Integration",
      },
    ],
    "process.eyebrow": "Delivery",
    "process.titleLine": "Five months,",
    "process.titleLine2": "five stages.",
    "process.stepList": [
      {
        icon: "<circle cx=\"10.4\" cy=\"10.4\" r=\"6.4\"/><path d=\"m15.3 15.3 4.2 4.2\"/>",
        text: "Wk 1–2",
        subheading: "Discovery",
        text2: "Sessions with accountants and business owners, mapping every workflow from entry to report.",
      },
      {
        icon: "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"2\"/><path d=\"M3.5 9h17M9 9v10.5\"/>",
        text: "Wk 3–5",
        subheading: "UX & UI design",
        text2: "Wireframes and a clickable prototype for the dashboard, invoicing, payroll and reports.",
      },
      {
        icon: "<path d=\"m8.5 8.5-4 3.5 4 3.5M15.5 8.5l4 3.5-4 3.5M13.5 5l-3 14\"/>",
        text: "Wk 6–17",
        subheading: "Development",
        text2: "Two-week sprints building the Laravel API, React web app and mobile integration.",
      },
      {
        icon: "<path d=\"M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z\"/><path d=\"m9 12 2.2 2.2L15.4 10\"/>",
        text: "Wk 18–20",
        subheading: "QA & security",
        text2: "Calculation checks against real ledgers, permission testing and a security review.",
      },
      {
        icon: "<path d=\"M12 2.5c3 2.2 4.5 5.4 4.5 9l-1.8 4.3H9.3L7.5 11.5c0-3.6 1.5-6.8 4.5-9z\"/><circle cx=\"12\" cy=\"10\" r=\"2\"/><path d=\"M9.3 17.5 8 21l3-1.6 3 1.6-1.3-3.5\"/>",
        text: "Wk 21+",
        subheading: "Launch & support",
        text2: "Data migration from spreadsheets, team training and ongoing updates.",
      },
    ],
    "results.eyebrow": "Outcome",
    "results.titleLine": "What changed",
    "results.titleLine2": "for the finance team.",
    "results.itemList": [
      {
        item: "<b>−70%</b><span>Time spent on month-end closing</span>",
      },
      {
        item: "<b>3×</b><span>Faster from invoice to payment</span>",
      },
      {
        item: "<b>Real-time</b><span>Profit &amp; loss, instead of monthly</span>",
      },
      {
        item: "<b>1 run</b><span>For salaries, deductions and approvals</span>",
      },
    ],
    "start.eyebrow": "Start Here",
    "start.heading": "Need accounting software for your business?",
    "start.text": "Tell us what you are trying to achieve and we will come back with a recommendation, a rough timeline and an honest budget range.",
    "start.buttonLink": "/get-in-touch",
    "start.buttonText": "Request a Demo",
  },
  section: null,
  seo: {
    title: "Smart Accounting Software Case Study — Accounting Web App | Inovexia",
    description: "How we designed and built Smart Accounting Software: a web app and mobile app for invoicing, bookkeeping, payroll, tax and real-time financial reports.",
  },
};
