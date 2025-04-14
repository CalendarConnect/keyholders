import PageWrapper from "@/components/wrapper/page-wrapper";
import JobDetail from "@/components/careers/job-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Trainer | Careers at Keyholders Agency",
  description: "Join Keyholders Agency as an AI Trainer and help clients maximize the value of our AI solutions through expert training and workshops.",
  openGraph: {
    title: "AI Trainer | Keyholders Agency",
    description: "Join our team as an AI Trainer and empower clients to leverage AI effectively in their organizations.",
    images: [
      {
        url: "/images/og/careers.jpg",
        width: 1200,
        height: 630,
        alt: "AI Trainer at Keyholders Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AITrainerPage() {
  // Job details based on the provided example, translated to English and adapted for Keyholders
  const jobDetails = {
    title: "AI Trainer",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€2,000-€3,500",
    aboutUs: "Keyholders Agency is a leading European company that helps organizations work more efficiently through innovative AI solutions. We are dedicated to developing and implementing custom AI agents that automate routine tasks and optimize workflows, aiming to achieve significant efficiency increases (up to 5x). Our mission also includes empowering our clients to fully utilize the value of AI technology. Keyholders Agency offers AI workshops and training, including the opportunity to obtain certification as a Prompt Engineer. Our focus on training and offering recognized certifications underscores the importance we place on educating professionals in effectively deploying AI.",
    responsibilities: [
      "Develop and deliver engaging and interactive workshops and training programs on various AI topics, including the use of specific AI agents and tools",
      "Create comprehensive training materials, including presentations, user guides, practical exercises, and assessment tools",
      "Assess the training needs of clients and adapt content and teaching methods to their specific requirements",
      "Provide ongoing support and guidance to clients to ensure they can effectively apply their newly acquired AI skills in their daily work",
      "Stay current with the latest developments in AI and translate them into relevant and practical training content",
      "Facilitate interactive learning environments and encourage active participation from trainees",
      "Collect and analyze feedback to continuously improve training effectiveness"
    ],
    requirements: [
      "Demonstrable experience in training, education, or knowledge transfer, preferably in a technology-related field",
      "Strong foundational knowledge of basic AI concepts and their practical applications in business",
      "Excellent presentation, facilitation, and communication skills with the ability to engage and inspire learners",
      "Ability to explain complex technical information in a clear, concise, and accessible manner to both technical and non-technical audiences",
      "Passion for empowering others through knowledge sharing and skill development",
      "Strong organizational and time management skills",
      "Adaptability and openness to learning new technologies and concepts",
      "Bachelor's degree in a relevant field (education, communications, computer science) is a plus"
    ],
    benefits: [
      "The rewarding opportunity to play a key role in fostering AI literacy and adoption within client organizations",
      "A collaborative and supportive work environment where you can further develop your training and teaching skills",
      "The satisfaction of seeing clients acquire valuable AI skills and achieve tangible results through your training",
      "Continuous learning opportunities in the rapidly evolving field of AI",
      "Competitive salary and benefits package",
      "Remote-first work culture with flexible hours",
      "Regular team events and knowledge-sharing sessions",
      "Opportunity to contribute to the development of our AI curriculum and training methodologies"
    ]
  };
  
  return (
    <PageWrapper>
      <JobDetail job={jobDetails} />
    </PageWrapper>
  );
} 