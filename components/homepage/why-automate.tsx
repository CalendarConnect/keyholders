"use client"

import React from 'react'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

export default function WhyAutomate() {
  const nowList = [
    'Offertes handmatig typen',
    'Content handmatig bedenken en publiceren',
    'Afspraken één voor één inplannen',
    'Support‑tickets handmatig afhandelen',
    'Rapporten pas achteraf samenstellen'
  ]

  const futureList = [
    'Offertes automatisch binnen 5 min verstuurd',
    'Blogs & socials automatisch gepubliceerd',
    'Slimme planning zonder dubbele afspraken',
    '24/7 AI‑support op élk kanaal',
    'Realtime rapporten altijd beschikbaar'
  ]

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background patterns & glows */}
      <div className="absolute inset-0 -z-10 bg-[#050510]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.05)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px] animate-pulse-slow"></div>
      </div>

      {/* Decorative light beam */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white"
          >
            Waarom automatiseren?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Current */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-semibold text-white mb-6"
            >
              Hoe je het nu doet
            </motion.h3>
            {nowList.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start mb-4"
              >
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                    <Check className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <p className="ml-4 text-lg text-gray-300">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Future */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-semibold text-white mb-6"
            >
              Hoe het straks werkt
            </motion.h3>
            {futureList.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start mb-4"
              >
                <div className="mt-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="ml-4 text-lg text-white">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}