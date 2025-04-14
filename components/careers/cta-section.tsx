"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareersCTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [cvName, setCvName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Convex mutation for sending the application
  const submitApplication = useMutation(api.applications.submitApplication);
  
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
      
      // Animate form fields
      gsap.fromTo(
        ".form-element",
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".application-form",
            start: "top bottom-=50",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setCv(files[0]);
      setCvName(files[0].name);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      // Here we would normally upload the CV and get a URL
      // For demo purposes, we'll just use the filename
      await submitApplication({
        name,
        email,
        role,
        message,
        cvName,
        applicationDate: new Date().toISOString()
      });
      
      setSubmitStatus("success");
      // Reset form
      setName("");
      setEmail("");
      setRole("");
      setMessage("");
      setCv(null);
      setCvName("");
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,76,255,0.15),transparent_80%)]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(111,76,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(111,76,255,0.07)_1px,transparent_1px)] bg-[size:70px_70px]"></div>
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120vh] aspect-square rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Apply to Join Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to become a Keyholder? Fill out the application form below and we'll get back to you soon.
            </p>
          </div>
          
          {/* Application Form */}
          <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] rounded-2xl p-8 border border-purple-500/10 relative overflow-hidden application-form">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Application Submitted!</h3>
                <p className="text-gray-300 text-center max-w-md">
                  Thank you for your interest in joining Keyholders. We'll review your application and reach out to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-element space-y-2">
                    <label htmlFor="name" className="block text-sm text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  
                  <div className="form-element space-y-2">
                    <label htmlFor="email" className="block text-sm text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-element space-y-2">
                  <label htmlFor="role" className="block text-sm text-gray-300">
                    Position You&apos;re Applying For
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    required
                  >
                    <option value="" disabled>Select a position</option>
                    <option value="AI Integration Specialist">AI Integration Specialist</option>
                    <option value="AI Engineer">AI Engineer</option>
                    <option value="AI Trainer">AI Trainer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="form-element space-y-2">
                  <label htmlFor="message" className="block text-sm text-gray-300">
                    Why do you want to join Keyholders?
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    required
                  />
                </div>
                
                <div className="form-element space-y-2">
                  <label htmlFor="cv" className="block text-sm text-gray-300">
                    Upload Your CV (PDF preferred)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="cv"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <label
                      htmlFor="cv"
                      className="flex items-center justify-center cursor-pointer w-full p-4 bg-white/5 border border-dashed border-white/20 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
                    >
                      {cvName ? (
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                          <span className="text-green-400">{cvName}</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Upload className="h-5 w-5 mr-2" />
                          <span>Click to upload your CV</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
                
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>There was an error submitting your application. Please try again.</p>
                  </div>
                )}
                
                <div className="form-element">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 