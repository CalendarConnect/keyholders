"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Icon } from '@/components/ui/icon';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useI18n } from "@/app/i18n/context";

export default function TestimonialsSection() {
  const { language } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = {
    nl: [
      {
        quote: "De Key-agentschap transformeerde onze bedrijfsprocessen met hun AI-automatiseringsoplossingen. We hebben een vermindering van 40% in handmatige invoer gezien en onze reactietijd is gehalveerd.",
        author: "Marco de Vries",
        role: "COO, TechVentures BV",
        avatar: "/avatars/testimonial-1.jpg"
      },
      {
        quote: "De implementatie was naadloos en het team van Key bleef betrokken tot alles perfect werkte. We hebben nu processen geautomatiseerd die voorheen uren per dag kostten.",
        author: "Lisa Jansen",
        role: "Directeur Operaties, Nova Finance",
        avatar: "/avatars/testimonial-2.jpg"
      },
      {
        quote: "Als een middelgroot bedrijf waren we sceptisch over AI-implementatie, maar Key maakte het toegankelijk en betaalbaar. De ROI was zichtbaar binnen 3 maanden na implementatie.",
        author: "Thomas Bakker",
        role: "CEO, Horizon Solutions",
        avatar: "/avatars/testimonial-3.jpg"
      }
    ],
    en: [
      {
        quote: "The Key agency transformed our business processes with their AI automation solutions. We've seen a 40% reduction in manual input and our response time has been cut in half.",
        author: "Mark Davis",
        role: "COO, TechVentures Inc",
        avatar: "/avatars/testimonial-1.jpg"
      },
      {
        quote: "Implementation was seamless and the Key team stayed engaged until everything worked perfectly. We now have automated processes that previously took hours each day.",
        author: "Lisa Johnson",
        role: "Operations Director, Nova Finance",
        avatar: "/avatars/testimonial-2.jpg"
      },
      {
        quote: "As a medium-sized business, we were skeptical about AI implementation, but Key made it accessible and affordable. The ROI was visible within 3 months of implementation.",
        author: "Thomas Baker",
        role: "CEO, Horizon Solutions",
        avatar: "/avatars/testimonial-3.jpg"
      }
    ]
  };

  const currentTestimonials = language === "nl" ? testimonials.nl : testimonials.en;

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {language === "nl" ? "Wat Onze Klanten Zeggen" : "What Our Clients Say"}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {language === "nl" 
              ? "Ontdek hoe onze AI automatiseringsoplossingen bedrijven zoals het uwe hebben geholpen."
              : "Discover how our AI automation solutions have helped businesses like yours."}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-indigo-500 mb-6">
                <Icon name="quote" className="w-12 h-12" />
              </div>
              <p className="text-xl md:text-2xl leading-relaxed mb-8 dark:text-white">
                {currentTestimonials[activeIndex].quote}
              </p>
              <Avatar className="w-16 h-16 border-2 border-indigo-100 dark:border-indigo-900">
                <AvatarImage src={currentTestimonials[activeIndex].avatar} alt={currentTestimonials[activeIndex].author} />
                <AvatarFallback>{currentTestimonials[activeIndex].author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <h4 className="text-lg font-semibold mt-4 dark:text-white">{currentTestimonials[activeIndex].author}</h4>
              <p className="text-gray-500 dark:text-gray-400">{currentTestimonials[activeIndex].role}</p>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-2">
            {currentTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index 
                    ? "bg-indigo-600 dark:bg-indigo-400" 
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 