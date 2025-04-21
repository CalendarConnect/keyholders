"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Icon } from '@/components/ui/icon';
import { useI18n } from "@/app/i18n/context";

export default function FeaturesSection() {
  const { language } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = {
    nl: [
      {
        icon: "lightning-bolt",
        title: "Snellere Besluitvorming",
        description: "Onze AI-automatisering biedt realtime inzichten en versnelt besluitvorming door complexe data direct te analyseren."
      },
      {
        icon: "cpu",
        title: "Slimme Workflows",
        description: "Wij bouwen intelligente workflows die taken automatiseren, menselijke fouten elimineren en operationele efficiëntie verhogen."
      },
      {
        icon: "chart-up",
        title: "Hogere ROI",
        description: "Door arbeidsintensieve processen te automatiseren, zien onze klanten een aanzienlijke kostenverlaging en verbeterde resultaten."
      },
      {
        icon: "shield-check",
        title: "Verbeterde Compliance",
        description: "Onze systemen zorgen voor consistentie en naleving van regelgeving door gestandaardiseerde processen en volledige audittrails."
      },
      {
        icon: "sparkles",
        title: "Naadloze Integratie",
        description: "We integreren moeiteloos met uw bestaande systemen zodat u uw huidige tools kunt blijven gebruiken."
      },
      {
        icon: "clock",
        title: "Tijdsbesparing",
        description: "Automatiseer repetitieve taken en geef uw team tijd terug om zich te concentreren op strategische, waardetoevoegende activiteiten."
      }
    ],
    en: [
      {
        icon: "lightning-bolt",
        title: "Faster Decision Making",
        description: "Our AI automation provides real-time insights and accelerates decision-making by instantly analyzing complex data."
      },
      {
        icon: "cpu",
        title: "Intelligent Workflows",
        description: "We build intelligent workflows that automate tasks, eliminate human error, and increase operational efficiency."
      },
      {
        icon: "chart-up",
        title: "Higher ROI",
        description: "By automating labor-intensive processes, our clients see significant cost reduction and improved outcomes."
      },
      {
        icon: "shield-check",
        title: "Enhanced Compliance",
        description: "Our systems ensure consistency and regulatory compliance through standardized processes and complete audit trails."
      },
      {
        icon: "sparkles",
        title: "Seamless Integration",
        description: "We integrate effortlessly with your existing systems so you can continue using your current tools."
      },
      {
        icon: "clock",
        title: "Time Savings",
        description: "Automate repetitive tasks and give your team back time to focus on strategic, value-adding activities."
      }
    ]
  };

  const currentFeatures = language === "nl" ? features.nl : features.en;

  return (
    <section ref={ref} className="py-20 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {language === "nl" ? "Waarom Kiezen voor AI Automatisering?" : "Why Choose AI Automation?"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === "nl"
              ? "Ontdek hoe onze AI-oplossingen uw bedrijfsprocessen transformeren en meetbare resultaten leveren."
              : "Discover how our AI solutions transform your business processes and deliver measurable results."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Icon name={feature.icon} className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 