import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Design",
    targetCount: 42,
    titles: [
      "Senior UX Designer",
      "UI/UX Visual Designer",
      "Product Designer",
      "Lead Interaction Designer",
      "Brand & Graphic Designer",
      "Design Systems Engineer",
    ],
    requirementsPool: [
      "3+ years of experience designing web and mobile applications.",
      "Proficiency with Figma, Auto Layout, and component architecture.",
      "Strong understanding of responsive design and accessibility (WCAG) standards.",
      "Experience conducting user interviews and usability testing sessions.",
      "Ability to create high-fidelity prototypes and interactive wireframes.",
      "Experience building and maintaining scalable multi-brand design systems.",
      "Strong background in motion design and visual micro-interactions.",
      "Proven track record of collaborating closely with frontend engineering teams.",
    ],
  },
  {
    name: "Engineering",
    targetCount: 63,
    titles: [
      "Full-Stack Web Developer",
      "Senior Frontend React Engineer",
      "Backend Node.js Developer",
      "DevOps & Infrastructure Engineer",
      "Mobile App Developer (React Native)",
      "Systems Architect",
    ],
    requirementsPool: [
      "3+ years of experience with TypeScript, React, and Next.js.",
      "Solid understanding of relational databases (PostgreSQL) and Prisma ORM.",
      "Hands-on experience with server-side Node.js and Express frameworks.",
      "Familiarity with containerization using Docker and cloud platforms (Railway, Vercel).",
      "Experience writing automated unit tests using Vitest or React Testing Library.",
      "Proficiency with RESTful APIs, WebSockets, and real-time streaming endpoints.",
      "Understanding of web security fundamentals and OWASP guidelines.",
      "Strong knowledge of state management patterns (Redux Toolkit, Zustand).",
    ],
  },
  {
    name: "Marketing",
    targetCount: 27,
    titles: [
      "Growth Marketing Manager",
      "SEO & Content Strategist",
      "Digital Marketing Specialist",
      "Performance Marketing Lead",
      "Social Media Campaign Manager",
      "Email Marketing Automation Specialist",
    ],
    requirementsPool: [
      "3+ years managing paid acquisition campaigns across Meta, Google, and LinkedIn.",
      "Proficiency with Google Analytics (GA4), Search Console, and SEO tools.",
      "Experience building automated lifecycle email workflows and drip campaigns.",
      "Strong copywriting and editorial background with a focus on conversions.",
      "Hands-on experience running A/B landing page tests and funnel optimization.",
      "Ability to analyze campaign metrics and present performance reports to stakeholders.",
      "Demonstrated experience managing monthly advertising budgets above $20k.",
    ],
  },
  {
    name: "Data",
    targetCount: 35,
    titles: [
      "Data Analyst",
      "Senior Data Engineer",
      "Machine Learning Scientist",
      "Business Intelligence Specialist",
      "Data Infrastructure Engineer",
      "Analytics Manager",
    ],
    requirementsPool: [
      "Strong proficiency in complex SQL queries, window functions, and database tuning.",
      "Experience writing production ETL/ELT pipelines with Python or dbt.",
      "Proficiency with data visualization dashboards (Tableau, Looker, PowerBI).",
      "Background in statistical modeling, hypothesis testing, and quantitative analysis.",
      "Experience with cloud data warehouses such as Snowflake, BigQuery, or Redshift.",
      "Familiarity with machine learning frameworks (scikit-learn, PyTorch, or TensorFlow).",
      "Bachelor's degree in Computer Science, Applied Math, Statistics, or equivalent field.",
    ],
  },
  {
    name: "Sales",
    targetCount: 30,
    titles: [
      "Enterprise Account Executive",
      "Business Development Representative",
      "Sales Development Lead",
      "Customer Success Manager",
      "Strategic Partnerships Manager",
    ],
    requirementsPool: [
      "2+ years of enterprise SaaS sales or account management experience.",
      "Proven history of meeting or exceeding quarterly quota targets.",
      "Experience running end-to-end sales pipelines using Salesforce or HubSpot.",
      "Strong consultative selling, deal negotiation, and closing skills.",
      "Excellent verbal communication and executive-level presentation abilities.",
      "Track record of managing key accounts and driving contract renewals.",
    ],
  },
  {
    name: "Product",
    targetCount: 18,
    titles: [
      "Senior Product Manager",
      "Technical Product Manager",
      "Product Operations Lead",
      "Associate Product Manager",
    ],
    requirementsPool: [
      "3+ years leading product development cycles for B2B or B2C SaaS platforms.",
      "Experience running Agile/Scrum ceremonies and writing detailed user stories.",
      "Strong ability to translate user feedback into actionable technical roadmaps.",
      "Comfortable analyzing product analytics using Mixpanel, Amplitude, or PostHog.",
      "Proven cross-functional leadership across design, engineering, and marketing teams.",
      "Demonstrated success launching MVPs from initial concept to market adoption.",
    ],
  },
];

const companies = [
  "TechFlow Systems",
  "Apex Financial",
  "CloudScale AI",
  "Vanguard Labs",
  "Pulse Digital",
  "Nexus Software",
  "Starlight Interactive",
  "Hyperion Data",
];

const locations = [
  "San Francisco, CA (Hybrid)",
  "New York, NY (Remote)",
  "Austin, TX (On-site)",
  "Seattle, WA (Remote)",
  "Chicago, IL (Hybrid)",
  "Boston, MA (Remote)",
];

const jobTypes = ["Full-time", "Contract", "Part-time", "Remote"];

const salaries = [
  "$90,000 - $110,000",
  "$120,000 - $150,000",
  "$140,000 - $180,000",
  "$80/hr - $100/hr",
  "$160,000 - $200,000",
];

const globalBenefitsPool = [
  "Comprehensive Health, Dental, & Vision Coverage",
  "401(k) Retirement Plan with 5% Employer Match",
  "Flexible Remote Working Policy & $1,000 Home Office Stipend",
  "Unlimited Paid Time Off (PTO) & Paid Company Holidays",
  "$1,500 Annual Learning & Professional Development Allowance",
  "16 Weeks Fully Paid Parental Leave for All New Parents",
  "Monthly Wellness & Gym Membership Reimbursement",
  "Flexible Spending Account (FSA) & Health Savings Account (HSA)",
  "Annual Company Retreats & Team Outings",
  "Stock Options / Equity Grant Options",
];

// Utility function to pick 'count' random unique items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function main() {
  console.log("Cleaning old jobs...");
  await prisma.job.deleteMany({});

  console.log("Seeding database with randomized requirements and benefits...");

  const employer = await prisma.user.upsert({
    where: { email: "employer@seed.com" },
    update: {},
    create: {
      email: "employer@seed.com",
      name: "Demo Employer Tech",
      role: "EMPLOYER",
    },
  });

  const jobsToCreate = [];

  for (const cat of categories) {
    for (let i = 0; i < cat.targetCount; i++) {
      const title = cat.titles[i % cat.titles.length];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const type = jobTypes[Math.floor(Math.random() * jobTypes.length)];
      const salary = salaries[Math.floor(Math.random() * salaries.length)];

      // Pick 3 to 5 random requirements specifically for this job
      const reqCount = 3 + Math.floor(Math.random() * 3);
      const requirements = getRandomItems(cat.requirementsPool, reqCount);

      // Pick 3 to 5 random benefits specifically for this job
      const benefitCount = 3 + Math.floor(Math.random() * 3);
      const benefits = getRandomItems(globalBenefitsPool, benefitCount);

      jobsToCreate.push({
        title: `${title} ${i >= cat.titles.length ? `#${i + 1}` : ""}`.trim(),
        company,
        location,
        type,
        category: cat.name,
        salary,
        description: `We are looking for an experienced ${title} to join our fast-growing team at ${company}. You will be driving core product strategy, leading engineering and design efforts, and building scalable modern web applications. Ideal candidates have 3+ years of experience in high-growth startup environments.`,
        requirements,
        benefits,
        isExpired: true,
        postedById: employer.id,
      });
    }
  }

  await prisma.job.createMany({
    data: jobsToCreate,
  });

  console.log(`Successfully seeded ${jobsToCreate.length} expired jobs:`);
  categories.forEach((c) => console.log(` - ${c.name}: ${c.targetCount} jobs`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
