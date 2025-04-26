import PageWrapper from "@/components/wrapper/page-wrapper";
import JobDetail from "@/components/careers/job-detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automation Enablement Consultant | Careers at Keyholders Agency",
  description: "Join Keyholders Agency as an Automation Enablement Consultant and help transform businesses through intelligent automation.",
  openGraph: {
    title: "Automation Enablement Consultant | Keyholders Agency",
    description: "Join our team and help transform businesses through intelligent automation solutions.",
    images: [
      {
        url: "/images/og/careers.jpg",
        width: 1200,
        height: 630,
        alt: "Automation Enablement Consultant at Keyholders Agency",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
};

export default function AIIntegrationSpecialistPage() {
  // Job details based on the provided example, translated to English and adapted for Keyholders
  const jobDetails = {
    title: "Automation Enablement Consultant",
    type: "Full-Time",
    location: "Remote (Europe)",
    salary: "€2,500-€3,500",
    aboutUs: "Keyholders Agency helpt organisaties hun groeipotentieel ontsluiten met slimme, veilige AI-automatisering. Wij bouwen geen snelle AI-trucjes, maar duurzame oplossingen die processen versnellen, compliance waarborgen en mensen centraal zetten.",
    responsibilities: [
      "Analyseren van bedrijfsprocessen en signaleren van kansen voor workflow-automatisering",
      "Ontwerpen van automation roadmaps die praktisch, schaalbaar en compliance-proof zijn",
      "Begeleiden van workshops en intakegesprekken om automation ready-teams op te bouwen",
      "Adviseren over veilige implementatie van AI-gestuurde automatiseringen, bijvoorbeeld via n8n of GPT",
      "Proactief communiceren over risico's en mogelijkheden rond wetgeving zoals de EU AI Act",
      "Samenwerken met onze engineers voor de realisatie van workflows",
    ],
    requirements: [
      "Aantoonbare affiniteit met AI, workflow-automatisering en procesoptimalisatie",
      "Ervaring in consultancy, operations of projectmanagement",
      "Begrip van GDPR en het belang van AI-compliance",
      "Vermogen om complexe concepten begrijpelijk te maken voor niet-technische stakeholders",
      "Proactieve houding: je ziet kansen en handelt zelfstandig",
      "Ervaring met tools als n8n, Make.com of Zapier is een pre",
      "Vloeiend Engels in woord en schrift, andere talen zoals Nederlands zijn een plus"
    ],
    benefits: [
      "Een rol waarin je zelf strategie en impact helpt vormgeven",
      "TSamenwerken met een vooruitstrevend team dat innovatie en mensgerichtheid combineert",
      "De nieuwste AI- en automation tools toepassen op echte bedrijfsuitdagingen",
      "Flexibele remote cultuur waarin output voorop staat",
      "Reguliere deep-dives in nieuwe technologieën, compliance-eisen en best practices",
      "Eerlijke beloning en ruimte om te groeien in een snel veranderende markt",
    ]
  };
  
  return (
    <PageWrapper>
      <JobDetail job={jobDetails} />
    </PageWrapper>
  );
} 