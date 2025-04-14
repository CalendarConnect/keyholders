import PageWrapper from "@/components/wrapper/page-wrapper";
import JobDetail from "@/components/careers/job-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Integration Specialist | Careers at Keyholders Agency",
  description: "Join Keyholders Agency as an AI Integration Specialist and help transform businesses through intelligent automation.",
  openGraph: {
    title: "AI Integration Specialist | Keyholders Agency",
    description: "Join our team and help transform businesses through intelligent automation solutions.",
    images: [
      {
        url: "/images/og/careers.jpg",
        width: 1200,
        height: 630,
        alt: "AI Integration Specialist at Keyholders Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AIIntegrationSpecialistPage() {
  // Job details based on the provided example, translated to English and adapted for Keyholders
  const jobDetails = {
    title: "AI Integration Specialist",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€2,000-€3,500",
    aboutUs: "Keyholders Agency is a progressive leader in the European AI landscape, focused on helping organizations work more efficiently through innovative AI solutions. We specialize in developing and implementing custom AI agents that automate routine tasks and optimize workflows, resulting in significant efficiency increases (up to 5x). Our approach is client-centered, creating solutions that perfectly align with each organization's unique needs.",
    responsibilities: [
      "Develop and implement automated workflows using various automation tools and scripting languages",
      "Write high-quality, maintainable code in languages such as JavaScript and Python to achieve complex integrations",
      "Integrate AI models and agents with various applications, APIs, and databases",
      "Identify bottlenecks in existing processes and design automated solutions to optimize them",
      "Test, debug, and document automated processes and integrations",
      "Research and implement new automation technologies and methods to improve our services",
      "Work closely with AI Engineers and Consultants to ensure the technical feasibility and effectiveness of automation solutions"
    ],
    requirements: [
      "Bachelor's or Master's degree in Computer Science, Software Engineering, or a comparable technical field",
      "Solid programming experience in multiple languages, including JavaScript and Python",
      "Experience with various automation tools and frameworks (e.g., Zapier, Make.com, n8n, Ansible, Selenium)",
      "Familiarity with API integrations (REST, SOAP) and data exchange formats (JSON, XML)",
      "Strong focus on delivering efficient, scalable, and reliable solutions",
      "Excellent problem-solving skills and the ability to tackle complex technical challenges",
      "Proactive attitude, eagerness to learn, and the drive to continuously improve your technical skills"
    ],
    benefits: [
      "A challenging and diverse role where you can fully utilize your passion for coding and automation",
      "The opportunity to work with the latest AI technologies and cutting-edge automation tools",
      "A dynamic and informal work environment with a team of enthusiastic and knowledgeable colleagues",
      "Room for personal development and growth within a fast-growing company",
      "Competitive salary and good secondary benefits",
      "Remote-first culture with flexible working hours",
      "Regular team events and knowledge-sharing sessions"
    ]
  };
  
  return (
    <PageWrapper>
      <JobDetail job={jobDetails} />
    </PageWrapper>
  );
} 