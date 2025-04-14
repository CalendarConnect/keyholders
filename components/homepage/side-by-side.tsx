"use client"
import { Computer, Network, Sparkles } from 'lucide-react'
import { FaBusinessTime } from 'react-icons/fa'
import { OrbitingCirclesComponent } from './orbiting-circles'
import { motion } from "motion/react"
import Image from "next/image"
import { 
  BarChart, 
  Bot, 
  Calendar, 
  Clock, 
  Code2, 
  Database, 
  FileSpreadsheet, 
  Key, 
  LineChart, 
  MessagesSquare, 
  Users 
} from "lucide-react"

const services = [
  {
    id: 1,
    title: "RevOps Automation",
    description: "Streamline your revenue operations workflow with custom automation solutions",
    icon: <BarChart className="h-10 w-10 text-blue-500" />,
    delay: 0.1
  },
  {
    id: 2,
    title: "Business Intelligence",
    description: "Turn your data into actionable insights with our advanced analytics solutions",
    icon: <LineChart className="h-10 w-10 text-purple-500" />,
    delay: 0.2
  },
  {
    id: 3,
    title: "Meeting Schedulers",
    description: "Eliminate scheduling headaches with intelligent calendar management",
    icon: <Calendar className="h-10 w-10 text-green-500" />,
    delay: 0.3
  },
  {
    id: 4,
    title: "Time Tracking",
    description: "Boost productivity with seamless time tracking and reporting tools",
    icon: <Clock className="h-10 w-10 text-orange-500" />,
    delay: 0.4
  },
  {
    id: 5,
    title: "Data Integration",
    description: "Connect all your systems and create a unified data ecosystem",
    icon: <Database className="h-10 w-10 text-red-500" />,
    delay: 0.5
  },
  {
    id: 6,
    title: "Team Collaboration",
    description: "Foster teamwork with purpose-built collaboration tools and workflows",
    icon: <Users className="h-10 w-10 text-teal-500" />,
    delay: 0.6
  },
  {
    id: 7,
    title: "Custom API Development",
    description: "Create powerful connections between your business systems",
    icon: <Code2 className="h-10 w-10 text-blue-400" />,
    delay: 0.7
  },
  {
    id: 8,
    title: "AI-Powered Assistants",
    description: "Implement intelligent assistants to handle routine tasks and inquiries",
    icon: <Bot className="h-10 w-10 text-purple-400" />,
    delay: 0.8
  },
  {
    id: 9,
    title: "Custom Dashboards",
    description: "Visualize your key metrics with elegant, real-time dashboards",
    icon: <FileSpreadsheet className="h-10 w-10 text-green-400" />,
    delay: 0.9
  },
  {
    id: 10,
    title: "Workflow Optimization",
    description: "Identify and eliminate bottlenecks with intelligent process mapping",
    icon: <Network className="h-10 w-10 text-amber-500" />,
    delay: 1.0
  },
  {
    id: 11,
    title: "Custom CRM Solutions",
    description: "Build customer relationship tools tailored to your specific needs",
    icon: <MessagesSquare className="h-10 w-10 text-cyan-500" />,
    delay: 1.1
  },
  {
    id: 12,
    title: "Access Management",
    description: "Secure and streamline access to your organization's tools and data",
    icon: <Key className="h-10 w-10 text-blue-500" />,
    delay: 1.2
  }
]

const features = [
  {
    id: 1,
    title: "Expert Team",
    description: "Our team consists of specialists in RevOps, Growth, Business Development, and Automation technologies.",
    icon: <Users className="h-12 w-12 text-blue-400" />,
  },
  {
    id: 2,
    title: "Tailored Solutions",
    description: "We analyze your business processes and develop custom solutions that address your specific needs.",
    icon: <Key className="h-12 w-12 text-blue-400" />,
  },
  {
    id: 3,
    title: "Cutting-Edge Tech",
    description: "We leverage the latest automation tools and platforms to build robust and scalable solutions.",
    icon: <Code2 className="h-12 w-12 text-blue-400" />,
  }
]

export default function SideBySide() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:pr-8 lg:pt-4"
          >
            <div className="lg:max-w-lg">
              {/* Pill badge */}
              <div className="mb-6 w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
                  <Sparkles className="h-4 w-4" />
                  <span>Why Choose Next Starter</span>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white pb-2">
                A Faster Path to Production
              </h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                Accelerate your development with our powerful Next.js starter kit. Focus on building features, not infrastructure.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    key={feature.id}
                    className="relative pl-12 group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-4 rounded-xl transition-colors"
                  >
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      <feature.icon
                        className="absolute left-3 top-5 h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      />
                      {feature.title}
                    </dt>{' '}
                    <dd className="inline text-gray-600 dark:text-gray-300">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-background/5 to-background/0 z-10"></div>
              <OrbitingCirclesComponent />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function ServicesGrid() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-black to-blue-950 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 -z-0 h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Blue glow effect */}
      <div className="absolute top-1/3 left-1/4 -z-0 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/4 -z-0 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-[100px]"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-white"
          >
            Unlock Your Business Potential
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Our team of specialists creates custom solutions to eliminate repetitive tasks
            and streamline your operations for maximum efficiency.
          </motion.p>
        </div>
        
        {/* Key features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-b from-blue-900/40 to-blue-950/40 backdrop-blur-sm border border-blue-800/50 rounded-2xl p-8"
            >
              <div className="mb-6 p-4 bg-blue-900/30 rounded-xl w-fit">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: service.delay }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-blue-950/30 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
