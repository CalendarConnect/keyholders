"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { History, BookOpen, Lightbulb, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/app/i18n/context";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OurJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { language } = useI18n();
  
  const content = {
    en: {
      sectionTitle: "Our Journey",
      founderTitle: "Christian Bleeker",
      founderRole: "Founder & Lead Strategist",
      connectOnLinkedIn: "Connect with Christian on",
      linkedin: "LinkedIn",
      timeline: [
        {
          title: "From Early Insight to Action",
          paragraphs: [
            "Christian Bleeker, founder of Keyholders Agency, remembers reading \"Superintelligence\" by Nick Bostrom back in 2016 – years before ChatGPT reached the masses and DeepMind made headlines by defeating the world champion at Go.",
            "Initially skeptical and concerned about artificial intelligence's implications, Christian entered research mode. He followed the developments closely as figures like Elon Musk attempted to bring awareness to AI regulation needs."
          ]
        },
        {
          title: "The Business Perspective",
          paragraphs: [
            "What sets Christian's approach apart is his extensive business background. With over a decade of experience across multiple industries, including roles as a Growth Marketer, Business Development Manager, and Digital Transformation Consultant, Christian has gained intimate knowledge of internal business processes, technology stacks, and organizational dynamics.",
            "He's worked with CRMs, ERPs, marketing automation tools, and data analytics platforms – experiencing firsthand how systems connect (or fail to connect) within organizations."
          ]
        },
        {
          title: "Founding Keyholders Agency",
          paragraphs: [
            "While consulting for companies ranging from startups to enterprises, Christian was already implementing workflow automations using platforms like Make.com, seeing firsthand how intelligent automation could transform business operations. This hands-on experience showed him that successful AI implementation isn't just about the technology – it's about understanding how businesses actually function from the inside.",
            "The introduction of the EU AI Act provided the regulatory framework Christian had been waiting for. He founded Keyholders Agency, bringing together like-minded AI enthusiasts with strong business backgrounds, dedicated to implementing automations that respect privacy, maintain security, and amplify human potential rather than replacing it.",
            "Today, Christian shares his vision for responsible AI implementation on LinkedIn and leads Keyholders Agency in creating automations that deliver real business value while respecting regulatory boundaries."
          ]
        }
      ]
    },
    nl: {
      sectionTitle: "Onze Reis",
      founderTitle: "Christian Bleeker",
      founderRole: "Oprichter & Hoofdstrateeg",
      connectOnLinkedIn: "Verbind met Christian op",
      linkedin: "LinkedIn",
      timeline: [
        {
          title: "Van Vroeg Inzicht naar Actie",
          paragraphs: [
            "Christian Bleeker, oprichter van Keyholders Agency, herinnert zich het lezen van \"Superintelligence\" door Nick Bostrom in 2016, jaren voordat ChatGPT de massa bereikte en DeepMind krantenkoppen haalde door de wereldkampioen Go te verslaan.",
            "Aanvankelijk sceptisch en bezorgd over de implicaties van kunstmatige intelligentie, schakelde Christian over naar onderzoeksmodus. Hij volgde de ontwikkelingen nauwlettend terwijl figuren als Elon Musk probeerden bewustzijn te creëren voor AI-regelgeving."
          ]
        },
        {
          title: "Het Bedrijfsperspectief",
          paragraphs: [
            "Wat Christians benadering onderscheidt, is zijn uitgebreide zakelijke achtergrond. Met meer dan tien jaar ervaring in verschillende sectoren, waaronder rollen als Growth Marketer, Business Development Manager en Digital Transformation Consultant, heeft Christian diepgaande kennis opgedaan van interne bedrijfsprocessen, technologiestacks en organisatiedynamiek.",
            "Hij heeft gewerkt met CRM's, ERP's, marketing-automatiseringstools en data-analyseplatforms - en heeft uit eerste hand ervaren hoe systemen binnen organisaties verbinding maken (of niet verbinden)."
          ]
        },
        {
          title: "Oprichting Keyholders Agency",
          paragraphs: [
            "Tijdens het consulteren voor bedrijven, van startups tot ondernemingen, implementeerde Christian al workflowautomatiseringen met platforms zoals Make.com, waarbij hij uit eerste hand zag hoe intelligente automatisering bedrijfsoperaties kon transformeren. Deze praktijkervaring toonde hem dat succesvolle AI-implementatie niet alleen om de technologie draait, het gaat om begrijpen hoe bedrijven van binnenuit functioneren.",
            "De introductie van de EU AI Act bood het regelgevingskader waar Christian op had gewacht. Hij richtte Keyholders Agency op, waarbij hij gelijkgestemde AI-enthousiastelingen met sterke zakelijke achtergronden samenbracht, toegewijd aan het implementeren van automatiseringen die privacy respecteren, veiligheid handhaven en menselijk potentieel versterken in plaats van vervangen.",
            "Vandaag deelt Christian zijn visie op verantwoorde AI-implementatie op LinkedIn en leidt hij Keyholders Agency bij het creëren van automatiseringen die echte bedrijfswaarde leveren met respect voor regelgevingsgrenzen."
          ]
        }
      ]
    }
  };

  const currentContent = language === "nl" ? content.nl : content.en;
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
          }
        }
      );
      
      // Animate the founder image
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom-=50",
          }
        }
      );
      
      // Animate timeline items
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top bottom-=100",
          }
        }
      );
      
      // Animate the timeline line
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        { 
          height: "100%", 
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top bottom-=100",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-20 bg-[#0a0a0f]">
        {/* Subtle gradient */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-purple-500/10 text-purple-400 rounded-full p-3">
              <History className="h-6 w-6" />
            </div>
          </div>
          
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            {currentContent.sectionTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {/* Founder's image */}
            <div 
              ref={imageRef}
              className="relative col-span-1 md:sticky md:top-24 self-start"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] max-w-sm mx-auto">
                <Image
                  src="/images/logos/Christian.jpeg"
                  alt="Christian Bleeker - Founder & Lead Strategist"
                  fill
                  className="object-cover"
                />
                
                <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#0a0a0f] to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white">{currentContent.founderTitle}</h3>
                  <p className="text-purple-300">{currentContent.founderRole}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#13131f] rounded-xl border border-purple-500/10">
                <p className="text-gray-300">{currentContent.connectOnLinkedIn} <a href="https://www.linkedin.com/in/cbleeker/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 inline-flex items-center">{currentContent.linkedin} <ChevronRight className="h-4 w-4 ml-1" /></a></p>
              </div>
            </div>
            
            {/* Journey timeline */}
            <div
              ref={timelineRef}
              className="col-span-1 md:col-span-2 relative pl-8 md:pl-0"
            >
              <div className="relative">
                {/* Timeline vertical line */}
                <div className="absolute left-0 md:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-teal-500/50 timeline-line"></div>
                
                {/* Timeline items */}
                {currentContent.timeline.map((item, index) => (
                  <div key={index} className="timeline-item relative pb-16">
                    <div className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'teal'}-500/20 border border-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'teal'}-500/30 -translate-x-1/2 flex items-center justify-center`}>
                      <div className={`w-3 h-3 rounded-full bg-${index === 0 ? 'purple' : index === 1 ? 'blue' : 'teal'}-400`}></div>
                    </div>
                    
                    <div className="ml-8 md:ml-12">
                      <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                      <div className="space-y-4 text-gray-300">
                        {item.paragraphs.map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 