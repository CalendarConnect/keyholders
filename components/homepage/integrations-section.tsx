"use client";

import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Top integration logos - these are just a sample
const integrationLogos = [
  { id: "salesforce", icon: "logos:salesforce" },
  { id: "slack", icon: "logos:slack-icon" },
  { id: "github", icon: "logos:github-icon" },
  { id: "notion", icon: "logos:notion-icon" },
  { id: "airtable", icon: "logos:airtable" },
  { id: "stripe", icon: "logos:stripe" },
  { id: "mailchimp", icon: "logos:mailchimp" },
  { id: "google-sheets", icon: "logos:google-sheets" },
  { id: "jira", icon: "logos:jira" },
  { id: "hubspot", icon: "logos:hubspot" },
  { id: "asana", icon: "logos:asana" },
  { id: "openai", icon: "simple-icons:openai" },
  { id: "zapier", icon: "logos:zapier-icon" },
  { id: "google-calendar", icon: "logos:google-calendar" },
  { id: "trello", icon: "logos:trello" },
  { id: "discord", icon: "logos:discord-icon" },
  { id: "teams", icon: "logos:microsoft-teams" },
  { id: "google-drive", icon: "logos:google-drive" },
  { id: "quickbooks", icon: "logos:quickbooks" },
  { id: "zoom", icon: "logos:zoom-icon" },
];

// Popular integration combinations
const popularCombinations = [
  {
    title: "GitHub + Jira",
    description: "Automate issue tracking and development workflow between GitHub and Jira.",
    from: "logos:github-icon",
    to: "logos:jira",
  },
  {
    title: "Slack + Asana",
    description: "Get task notifications and updates from Asana directly in your Slack channels.",
    from: "logos:slack-icon",
    to: "logos:asana",
  },
  {
    title: "HubSpot + Salesforce",
    description: "Sync customer data and sales information across both platforms automatically.",
    from: "logos:hubspot",
    to: "logos:salesforce",
  },
  {
    title: "Notion + Google Calendar",
    description: "Sync your Notion tasks and events with Google Calendar for better time management.",
    from: "logos:notion-icon",
    to: "logos:google-calendar",
  },
];

// Latest automation showcases
const latestAutomations = [
  {
    title: "AI-Powered WhatsApp Product Assistant",
    description: "Train AI with product data from WhatsApp and provide automated customer support using GPT-4 and Google Sheets.",
    imagePath: "/images/automations/workflow_Automate_Product.png",
    icons: ["logos:whatsapp", "simple-icons:openai", "logos:google-sheets"],
  },
  {
    title: "Cross-Platform Social Media Studio",
    description: "Generate platform-optimized content across 7+ social media platforms with AI assistance and automated publishing workflow.",
    imagePath: "/images/automations/Automate Multi-Platform Social Media Content Creation with AI.jpg",
    icons: ["logos:twitter", "logos:instagram", "logos:linkedin-icon", "simple-icons:openai"],
  },
  {
    title: "Smart Newsletter Digest Engine",
    description: "Automated daily digest delivery service pulling subscriber data from Excel, summarizing content with AI, and delivering via Outlook.",
    imagePath: "/images/automations/Daily Newsletter Service using Excel, Outlook and AI.jpg",
    icons: ["vscode-icons:file-type-excel", "logos:microsoft-outlook", "simple-icons:openai"],
  },
];

const IntegrationsSection = () => {
  // Remove all animation-related refs and effects
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden border-t border-gray-800"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
              Premium Automations
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Connect anything to <span className="text-indigo-500">everything</span>
          </h2>
          <p 
            className="text-xl text-gray-300"
          >
            We integrate with all your favorite tools and platforms to create seamless automation workflows.
          </p>
        </div>

        {/* Integration logos grid */}
        <div 
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-6 mb-20"
        >
          {integrationLogos.map((logo) => (
            <div 
              key={logo.id}
              className="flex items-center justify-center h-16 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <Icon 
                icon={logo.icon} 
                className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
          ))}
        </div>

        {/* Latest Automations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-2 text-center">
            Our Latest Automations!
          </h3>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            Award-winning automation templates built by Keyholders Agency experts to solve real business problems
          </p>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {latestAutomations.map((automation, index) => (
              <div 
                key={index} 
                className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-indigo-500/50 transition-all duration-300 group h-full flex flex-col shadow-lg shadow-indigo-900/5 hover:shadow-indigo-500/10"
              >
                <div className="absolute top-0 right-0 bg-indigo-500/20 text-indigo-300 text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-xl">
                  Keyholders Original
                </div>
                <div className="aspect-video w-full mb-5 overflow-hidden rounded-lg">
                  <img 
                    src={automation.imagePath} 
                    alt={automation.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {automation.icons.map((icon, i) => (
                    <div key={i} className="h-9 w-9 rounded-full bg-gray-800/80 flex items-center justify-center group-hover:bg-gray-700/80 transition-colors">
                      <Icon icon={icon} className="w-5 h-5" />
                    </div>
                  ))}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {automation.title}
                </h4>
                <p className="text-sm text-gray-400 mb-6 flex-grow">
                  {automation.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-indigo-900/20 to-purple-900/20 py-12 px-6 rounded-2xl border border-indigo-500/20">
          <h3 className="text-xl font-bold text-white mb-3">
            Looking for a custom automation?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us to find out if we can build your perfect automation solution tailored to your business needs.
          </p>
          <Link href="/contact">
            <Button 
              variant="default" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6"
            >
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection; 