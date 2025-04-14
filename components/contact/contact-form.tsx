"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CONTACT_SOURCES, ContactSource } from "@/convex/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Quote, User, Calendar, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  surname: z.string().min(2, { message: "Surname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  topic: z.string().min(1, { message: "Please select a topic" }),
  subject: z.string().min(5, { message: "Subject is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  source: z.string().min(1, { message: "Please tell us how you heard about us" }),
});

type FormValues = z.infer<typeof formSchema>;

const topics = [
  "General Inquiry",
  "Partnership Opportunity",
  "Technical Support",
  "Pricing Question",
  "Feature Request",
  "Automation Consulting",
  "Integration Help",
  "Other",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada", 
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Africa",
  "Other",
];

// Featured testimonials from case studies
const testimonials = [
  {
    quote: "I couldn&apos;t believe my eyes, what previously took me at least 90 minutes per day, is now done in a matter of seconds.",
    author: "Pascal",
    company: "Upbeatles PubQuiz",
    image: "/images/case-studies/Pascal.jpg"
  },
  {
    quote: "I highly recommend the free AI consult with Christian, his eye on automating processes is next level.",
    author: "Ashra",
    company: "Fokker V.O.F Constructor",
    image: "/images/case-studies/ashra.jpg"
  }
];

export default function ContactForm() {
  const { toast } = useToast();
  const submitForm = useMutation(api.contact.submitContactForm);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    topic: "",
    subject: "",
    description: "",
    source: ""
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.email.includes('@')) newErrors.email = "Invalid email address";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.topic) newErrors.topic = "Please select a topic";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.source) newErrors.source = "Please tell us how you heard about us";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSelectChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitForm({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        country: formData.country,
        topic: formData.topic,
        subject: formData.subject,
        description: formData.description,
        source: formData.source as ContactSource,
      });
      
      // Show success state instead of toast
      setIsSubmitted(true);
      
      // Reset form data (though it won't be shown anymore)
      setFormData({
        name: "",
        surname: "",
        email: "",
        country: "",
        topic: "",
        subject: "",
        description: "",
        source: ""
      });
    } catch (error) {
      console.error("Form submission error:", error);
      
      toast({
        title: "Submission failed",
        description: "There was an error submitting your form. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success confirmation view
  if (isSubmitted) {
    return (
      <div className="relative w-full min-h-screen bg-black overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute top-0 right-0 w-1/2 h-screen bg-purple-600/10 blur-[120px] z-0" />
        
        <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
          <div className="max-w-xl mx-auto bg-gradient-to-br from-[#0c0c18] to-[#13131f] p-10 rounded-2xl border border-purple-900/20 shadow-xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-900/20 border border-green-500/30 flex items-center justify-center mb-6">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">Consultation Request Submitted!</h1>
            
            <p className="text-gray-300 text-lg mb-8">
              Thank you for your interest in Keyholders services. We'll review your request and reach out to you soon.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-purple-600/10 blur-[120px] z-0" />
      
      <div className="container mx-auto px-4 pt-24 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left column - Information */}
          <div className="flex flex-col">
            <div className="mb-12">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Meet with<br />
                an expert.
              </h1>
              
              <div className="prose prose-lg text-gray-300 max-w-2xl">
                <p className="text-xl">
                  Keyholders Agency helps businesses transform their operations through intelligent automation. Our custom AI solutions eliminate manual tasks, connect tech stacks, and accelerate growth with solutions that respect privacy and security.
                </p>
                <p className="mt-6">
                  We typically work with companies that want to save at least 20 hours per week on repetitive tasks, have multiple software systems that need integration, or seek compliance with the EU AI Act while leveraging AI advantages.
                </p>
                <p className="mt-6 text-purple-400 font-semibold">
                  Let&apos;s chat!
                </p>
              </div>
            </div>
            
            {/* Testimonials section */}
            <div className="space-y-8 mt-8">
              <h2 className="text-2xl font-semibold text-white">What our clients say</h2>
              
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-xl bg-gradient-to-br from-[#0c0c18] to-[#13131f] border border-purple-500/20"
                  >
                    <div className="flex gap-4 items-start">
                      <Quote className="flex-shrink-0 h-8 w-8 text-purple-400 opacity-50" />
                      <div>
                        <p className="text-gray-300 italic mb-4">{testimonial.quote}</p>
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-purple-900/30">
                            <Image 
                              src={testimonial.image} 
                              alt={testimonial.author}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">{testimonial.author}</p>
                            <p className="text-purple-400 text-sm">{testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Contact form */}
          <div className="bg-gradient-to-br from-[#0c0c18] to-[#13131f] p-8 lg:p-10 rounded-2xl border border-purple-900/20 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Get in touch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-gray-300">First Name</Label>
                  <Input
                    id="contact-name"
                    placeholder="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-surname" className="text-gray-300">Last Name</Label>
                  <Input
                    id="contact-surname"
                    placeholder="Your surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500"
                  />
                  {errors.surname && (
                    <p className="text-red-500 text-sm">{errors.surname}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-gray-300">Work Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="name@company.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-country" className="text-gray-300">Country</Label>
                <Select
                  onValueChange={handleSelectChange("country")}
                  value={formData.country}
                >
                  <SelectTrigger id="contact-country" className="w-full bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-900/20 text-white">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-topic" className="text-gray-300">What can we help you with?</Label>
                <Select
                  onValueChange={handleSelectChange("topic")}
                  value={formData.topic}
                >
                  <SelectTrigger id="contact-topic" className="w-full bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-900/20 text-white">
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.topic && (
                  <p className="text-red-500 text-sm">{errors.topic}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject" className="text-gray-300">Subject</Label>
                <Input
                  id="contact-subject"
                  placeholder="Brief subject of your inquiry"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">{errors.subject}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-description" className="text-gray-300">Details</Label>
                <Textarea
                  id="contact-description"
                  placeholder="Tell us more about your needs and challenges"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="bg-gray-900/60 border-purple-900/20 text-white resize-none focus:border-purple-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-source" className="text-gray-300">How did you hear about us?</Label>
                <Select
                  onValueChange={handleSelectChange("source")}
                  value={formData.source}
                >
                  <SelectTrigger id="contact-source" className="w-full bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-900/20 text-white">
                    {Object.entries(CONTACT_SOURCES).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.source && (
                  <p className="text-red-500 text-sm">{errors.source}</p>
                )}
              </div>

              <div className="text-sm text-gray-400">
                By continuing, you agree to our{" "}
                <a href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                  Privacy policy
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-6 h-auto text-lg font-medium rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Book a Free Consultation"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 