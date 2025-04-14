"use client"
import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const links = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Case Studies', href: '/case-studies' },
            { name: 'Our Team', href: '/about#team' },
            { name: 'Contact', href: '/contact' },
            { name: 'EU AI Act', href: '/ai-act' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' },
        ],
    };

    return (
        <footer className="border-t border-purple-900/20 bg-[#050510] py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Column 1: Logo and Description */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image 
                                src="/images/logos/logo-dark.webp" 
                                alt="Keyholders Logo" 
                                width={24} 
                                height={24}
                            />
                            <span className="font-medium text-white">Keyholders Agency</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            We are Keyholders with expertise in RevOps, Growth, Business Development, and building automations for your repetitive daily tasks.
                        </p>
                        <div className="flex gap-4 mb-8">
                            <Link href="https://www.linkedin.com/in/cbleeker/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5 text-purple-400 hover:text-purple-300 transition-colors" />
                            </Link>
                            <Link href="mailto:info@keyholders.agency" aria-label="Email">
                                <Mail className="h-5 w-5 text-purple-400 hover:text-purple-300 transition-colors" />
                            </Link>
                        </div>
                        <div className="text-gray-500 text-sm">
                            <p className="mb-1">Startup Nijmegen</p>
                            <p className="mb-1">Stationsplein 26</p>
                            <p className="mb-1">6512 AB</p>
                            <p>Nijmegen, The Netherlands</p>
                        </div>
                    </div>

                    {/* Column 2: Company */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {links.company.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-400 hover:text-purple-300 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {links.legal.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-400 hover:text-purple-300 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-purple-900/20 text-center">
                    <p className="text-gray-500">
                        © {new Date().getFullYear()} Keyholders Agency. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
