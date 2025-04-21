"use client"

import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

export default function CTASection() {
  const highlights = [
    'Persoonlijk AI‑consult op maat',
    'Honderden ondernemers geholpen',
    'Direct inzicht in jouw AI‑automaties'
  ]

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white mb-4"
        >
          Klaar om nog slimmer te werken?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Plan een gratis AI‑consult en ontdek in 30 minuten hoe jij met slimme workflows honderden uren wint!
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-center gap-6 mb-12"
        >
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-center text-gray-300">
              <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </motion.ul>

        {/* CTAs */}
        <div className="cta-group flex flex-row gap-5 items-center justify-center mb-20">
          <Link href="/ai-scan" className="relative z-20">
            <Button
              size="lg"
              className="cta-button rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-6 h-auto text-base relative group"
              style={{
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                borderRadius: '9999px',
              }}
            >
              {/* Border glimmer effect - only visible on hover */}
              <style jsx global>{` 
                .cta-button:hover { border-color: #8b5cf6; } 
                .cta-button { box-shadow: 0 0 0 rgba(255,255,255,0); } 
                .cta-button:hover::before { content: ''; position: absolute; inset: -2px; border-radius: 9999px; background: linear-gradient(90deg, #7f1dff, #4f46e5); opacity: 0.3; filter: blur(8px);} 
              `}</style>
              <span className="mr-2 relative z-10">Ja, ik wil een gratis AI consult!</span>
              <ChevronRight className="h-4 w-4 relative z-10" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
