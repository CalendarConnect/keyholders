import PageWrapper from "@/components/wrapper/page-wrapper";
import JobDetail from "@/components/careers/job-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Engineer | Careers at Keyholders Agency",
  description: "Join Keyholders Agency as an AI Engineer and develop custom AI solutions for leading businesses across Europe.",
  openGraph: {
    title: "AI Engineer | Keyholders Agency",
    description: "Join our team as an AI Engineer and create cutting-edge AI solutions for businesses.",
    images: [
      {
        url: "/images/og/careers.jpg",
        width: 1200,
        height: 630,
        alt: "AI Engineer at Keyholders Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AIEngineerPage() {
  // Job details based on the provided example, translated to English and adapted for Keyholders
  const jobDetails = {
    title: "AI Engineer",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€1,500-€5,000",
    aboutUs: "Keyholders Agency is a forward-thinking company in the European AI landscape, with a strong focus on helping organizations work more efficiently through innovative AI solutions. We specialize in developing and implementing custom AI agents that automate routine tasks and optimize workflows, resulting in significant efficiency increases (up to 5x). Our approach is client-centered, creating solutions that perfectly align with each organization's unique needs. Keyholders Agency offers AI agents and solutions to help companies across Europe innovate and improve their efficiency, with expertise in AI for business, AI automation, and AI in healthcare.",
    responsibilities: [
      "Design, develop, and implement AI models and algorithms using programming languages such as JavaScript and Python",
      "Integrate AI solutions with existing systems and client infrastructures",
      "Write clean, well-documented, and efficient code",
      "Participate in code reviews and ensure compliance with best practices",
      "Troubleshoot and debug AI applications to ensure optimal performance",
      "Stay updated on the latest developments in AI, machine learning, and software development",
      "Collaborate with team members to deliver comprehensive AI solutions"
    ],
    requirements: [
      "Bachelor's or Master's degree in Computer Science, Artificial Intelligence, or a related field",
      "Demonstrable experience in developing and implementing AI applications using JavaScript and Python",
      "Familiarity with relevant AI/ML frameworks and libraries (e.g., TensorFlow, PyTorch, scikit-learn)",
      "Experience with API development and integration",
      "Strong understanding of software development principles, agile methodologies, and version control (e.g., Git)",
      "Excellent problem-solving and analytical skills",
      "Good communication and collaboration skills to work effectively within a team",
      "A passion for innovation and the transformative potential of AI"
    ],
    benefits: [
      "The opportunity to work on impactful AI projects that directly contribute to solving concrete business challenges",
      "A dynamic and stimulating work environment within a team of experienced AI professionals",
      "Continuous learning and development opportunities in the rapidly evolving field of AI",
      "A competitive salary and secondary benefits that value your expertise and contribution",
      "Remote-first work culture with flexible hours",
      "The chance to contribute to a company at the forefront of AI innovation in Europe",
      "Regular team events and knowledge-sharing sessions"
    ]
  };
  
  return (
    <PageWrapper>
      <JobDetail job={jobDetails} />
    </PageWrapper>
  );
} 