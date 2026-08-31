import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Design",
    titles: [
      "Senior UX Designer",
      "UI/UX Visual Designer",
      "Product Designer",
      "Lead Interaction Designer",
      "Brand & Graphic Designer",
      "Design Systems Engineer",
    ],
  },
  {
    name: "Engineering",
    titles: [
      "Full-Stack Web Developer",
      "Senior Frontend React Engineer",
      "Backend Node.js Developer",
      "DevOps & Infrastructure Engineer",
      "Mobile App Developer (React Native)",
      "Systems Architect",
    ],
  },
  {
    name: "Marketing",
    titles: [
      "Growth Marketing Manager",
      "SEO & Content Strategist",
      "Digital Marketing Specialist",
      "Performance Marketing Lead",
      "Social Media Campaign Manager",
      "Email Marketing Automation Specialist",
    ],
  },
  {
    name: "Data",
    titles: [
      "Data Analyst",
      "Senior Data Engineer",
      "Machine Learning Scientist",
      "Business Intelligence Specialist",
      "Data Infrastructure Engineer",
      "Analytics Manager",
    ],
  },
  {
    name: "Sales",
    titles: [
      "Enterprise Account Executive",
      "Business Development Representative",
      "Sales Development Lead",
      "Customer Success Manager",
      "Strategic Partnerships Manager",
    ],
  },
  {
    name: "Product",
    titles: [
      "Senior Product Manager",
      "Technical Product Manager",
      "Product Operations Lead",
      "Associate Product Manager",
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

async function main() {
  console.log("Seeding database...");

  // 1. Create a dummy employer user to post the jobs
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

  // 2. Generate 25 jobs for each category (Total: 150 jobs)
  for (const cat of categories) {
    for (let i = 0; i < 25; i++) {
      const title = cat.titles[i % cat.titles.length];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const type = jobTypes[Math.floor(Math.random() * jobTypes.length)];
      const salary = salaries[Math.floor(Math.random() * salaries.length)];

      jobsToCreate.push({
        title: `${title} ${i > 5 ? `#${i + 1}` : ""}`.trim(),
        company,
        location,
        type,
        category: cat.name,
        salary,
        description: `We are looking for an experienced ${title} to join our fast-growing team at ${company}. You will be driving core product strategy, leading engineering and design efforts, and building scalable modern web applications. Ideal candidates have 3+ years of experience in high-growth startup environments.`,
        isExpired: true, // Marked as expired so users cannot apply
        postedById: employer.id,
      });
    }
  }

  // 3. Batch insert into database
  await prisma.job.createMany({
    data: jobsToCreate,
  });

  console.log(
    `Successfully seeded ${jobsToCreate.length} expired jobs across ${categories.length} categories.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
