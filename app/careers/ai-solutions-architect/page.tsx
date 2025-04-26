import PageWrapper from "@/components/wrapper/page-wrapper";
import JobDetail from "@/components/careers/job-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Solutions Architect | Careers at Keyholders Agency",
  description: "Join Keyholders Agency as an AI Solutions Architect and develop custom AI solutions for leading businesses across Europe.",
  openGraph: {
    title: "AI Solutions Architect | Keyholders Agency",
    description: "Join our team as an AI Solutions Architect and create cutting-edge AI solutions for businesses.",
    images: [
      {
        url: "/images/og/careers.jpg",
        width: 1200,
        height: 630,
        alt: "AI Solutions Architect at Keyholders Agency",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
};

export default function AIEngineerPage() {
  // Job details based on the provided example, translated to English and adapted for Keyholders
  const jobDetails = {
    title: "AI Solutions Architect",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€2,500-€5,000",
    aboutUs: "Keyholders Agency helpt organisaties sneller groeien met veilige, praktische AI automatisering. Wij ontwerpen en implementeren oplossingen die bedrijven niet alleen efficiënter maken, maar ook toekomstbestendig.",
    responsibilities: [
      "Ontwerpen van slimme, veilige AI workflows voor klanten",
      "Bouwen van schaalbare integraties tussen AI, automatisering en bestaande systemen",
      "Vertalen van klantwensen naar technische oplossingen die direct resultaat leveren",
      "Adviseren over veilige inzet van AI in compliance gevoelige omgevingen",
      "Samenwerken met consultants en engineers om oplossingen snel te realiseren",
    ],
    requirements: [
      "Ervaring met ontwerpen van AI toepassingen die draaien in productie",
      "Kennis van LLM integratie, API koppelingen en workflow automatisering",
      "Ervaring met tools zoals n8n, Next.js, Node.js of vergelijkbare stacks",
      "Vermogen om complexe vraagstukken praktisch op te lossen",
      "Focus op veiligheid, schaalbaarheid en gebruikerservaring",
      "Heldere communicatie, zowel technisch als richting klanten",
    ],
    benefits: [
      "Impactvolle projecten bij bedrijven die echt willen versnellen met AI",
      "Ruimte om jouw architectuurvisie direct in de praktijk te brengen",
      "Samenwerken met een team dat technologie én mensgerichtheid combineert",
      "Marktconforme beloning en flexibele werktijden",
      "Remote first cultuur met ruimte voor groei en eigen initiatief",
    ]
  };
  
  return (
    <PageWrapper>
      <JobDetail job={jobDetails} />
    </PageWrapper>
  );
} 