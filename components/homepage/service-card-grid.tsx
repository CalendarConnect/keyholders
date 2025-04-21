"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useI18n } from "@/app/i18n/context";

export default function ServiceCardGrid() {
  const { language } = useI18n();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const services = language === "nl" ? [
    {
      icon: 'fluent:brain-circuit-24-regular',
      title: 'Strategie & Advies',
      description: 'We onderzoeken waar automatisering het grootste verschil maakt in jouw workflow.',
      href: `/nl/services/strategy`,
    },
    {
      icon: 'fluent:chat-bubbles-question-24-regular',
      title: 'AI Assistenten',
      description: 'Slimme chatbots voor support, sales, en interne kennisdeling.',
      href: `/nl/services/ai-assistants`,
    },
    {
      icon: 'fluent:flow-24-regular',
      title: 'Workflow Automatisering',
      description: 'API-verbindingen, triggers, en conditionele acties zonder zorgen.',
      href: `/nl/services/workflow`,
    },
    {
      icon: 'fluent:document-data-24-regular',
      title: 'Datagestuurd Werken',
      description: 'Wij maken jouw data inzichtelijk en actionable.',
      href: `/nl/services/data`,
    },
  ] : [
    {
      icon: 'fluent:brain-circuit-24-regular',
      title: 'Strategy & Advisory',
      description: 'We identify where automation makes the biggest difference in your workflow.',
      href: `/en/services/strategy`,
    },
    {
      icon: 'fluent:chat-bubbles-question-24-regular',
      title: 'AI Assistants',
      description: 'Smart chatbots for support, sales, and internal knowledge sharing.',
      href: `/en/services/ai-assistants`,
    },
    {
      icon: 'fluent:flow-24-regular',
      title: 'Workflow Automation',
      description: 'API connections, triggers, and conditional actions without hassle.',
      href: `/en/services/workflow`,
    },
    {
      icon: 'fluent:document-data-24-regular',
      title: 'Data-Driven Work',
      description: 'We make your data insightful and actionable.',
      href: `/en/services/data`,
    },
  ];

  return (
    <section className="py-16 md:py-24 relative" ref={ref}>
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[#050510] -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
      </div>

      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {language === "nl" ? "Wat we doen" : "What We Do"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {language === "nl" 
              ? "We bouwen duurzame AI-oplossingen die je team verder helpen."
              : "We build sustainable AI solutions that empower your team."}
          </motion.p>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
              className="relative group"
            >
              <Link 
                href={service.href}
                className="block p-8 h-full bg-[#0c0c1d] border border-purple-900/20 rounded-xl transition-all duration-300 
                           hover:border-purple-500/50 hover:shadow-[0_0_25px_-5px_rgba(149,76,233,0.25)]"
              >
                <div className="mb-5 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
                  <Icon icon={service.icon} className="text-2xl" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 ">{service.title}</h3>
                <p className="text-gray-300 ">{service.description}</p>
              </Link>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/0 to-violet-600/0 opacity-0 blur-xl rounded-xl
                              group-hover:opacity-20 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 