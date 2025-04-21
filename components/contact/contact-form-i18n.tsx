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
import { useI18n } from "@/app/i18n/context";

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

export default function ContactForm() {
  const { toast } = useToast();
  const submitForm = useMutation(api.contact.submitContactForm);
  const { language } = useI18n();
  
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

  const content = {
    en: {
      topics: [
        "General Inquiry",
        "Partnership Opportunity",
        "Technical Support",
        "Pricing Question",
        "Feature Request",
        "Automation Consulting",
        "Integration Help",
        "Other",
      ],
      countries: [
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
      ],
      testimonials: [
        {
          quote: "I couldn't believe my eyes, what previously took me at least 90 minutes per day, is now done in a matter of seconds.",
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
      ],
      validationErrors: {
        name: "Name is required",
        surname: "Surname is required",
        email: "Email is required",
        invalidEmail: "Invalid email address",
        country: "Country is required",
        topic: "Please select a topic",
        subject: "Subject is required",
        description: "Description is required",
        source: "Please tell us how you heard about us"
      },
      successPage: {
        title: "Consultation Request Submitted!",
        message: "Thank you for your interest in Keyholders services. We'll review your request and reach out to you soon."
      },
      mainHeading: {
        title: "Meet with\nan expert.",
        description: "Keyholders Agency helps businesses transform their operations through intelligent automation. Our custom AI solutions eliminate manual tasks, connect tech stacks, and accelerate growth with solutions that respect privacy and security.",
        subDescription: "We typically work with companies that want to save at least 20 hours per week on repetitive tasks, have multiple software systems that need integration, or seek compliance with the EU AI Act while leveraging AI advantages.",
        closing: "Let's chat!"
      },
      testimonialSection: {
        heading: "What our clients say"
      },
      formSection: {
        heading: "Get in touch",
        firstName: "First Name",
        lastName: "Last Name",
        yourName: "Your name",
        yourSurname: "Your surname",
        workEmail: "Work Email",
        emailPlaceholder: "name@company.com",
        country: "Country",
        countryPlaceholder: "Select your country",
        helpTopic: "What can we help you with?",
        topicPlaceholder: "Select a topic",
        subject: "Subject",
        subjectPlaceholder: "Brief subject of your inquiry",
        details: "Details",
        detailsPlaceholder: "Tell us more about your needs and challenges",
        source: "How did you hear about us?",
        sourcePlaceholder: "Select an option",
        consentText: "By continuing, you agree to our",
        terms: "Terms of Use",
        and: "and",
        privacy: "Privacy policy",
        submitButton: "Book a Free Consultation",
        submitting: "Sending..."
      }
    },
    nl: {
      topics: [
        "Algemene Vraag",
        "Partnerschapsmogelijkheid",
        "Technische Ondersteuning",
        "Prijsvraag",
        "Functieverzoek",
        "Automatiseringsconsultatie",
        "Integratiehulp",
        "Anders",
      ],
      countries: [
        "Verenigde Staten",
        "Verenigd Koninkrijk",
        "Canada", 
        "Australië",
        "Duitsland",
        "Frankrijk",
        "Spanje",
        "Italië",
        "Nederland",
        "Japan",
        "China",
        "India",
        "Brazilië",
        "Mexico",
        "Zuid-Afrika",
        "Anders",
      ],
      testimonials: [
        {
          quote: "Ik kon mijn ogen niet geloven, wat me eerst minstens 90 minuten per dag kostte, gebeurt nu in een kwestie van seconden.",
          author: "Pascal",
          company: "Upbeatles PubQuiz",
          image: "/images/case-studies/Pascal.jpg"
        },
        {
          quote: "Ik raad de gratis AI-consultatie met Christian sterk aan, zijn kijk op het automatiseren van processen is van topniveau.",
          author: "Ashra",
          company: "Fokker V.O.F Constructor",
          image: "/images/case-studies/ashra.jpg"
        }
      ],
      validationErrors: {
        name: "Voornaam is verplicht",
        surname: "Achternaam is verplicht",
        email: "E-mail is verplicht",
        invalidEmail: "Ongeldig e-mailadres",
        country: "Land is verplicht",
        topic: "Selecteer een onderwerp",
        subject: "Onderwerp is verplicht",
        description: "Beschrijving is verplicht",
        source: "Vertel ons hoe je ons hebt gevonden"
      },
      successPage: {
        title: "Consultatieverzoek Ingediend!",
        message: "Bedankt voor je interesse in Keyholders diensten. We zullen je verzoek bekijken en binnenkort contact met je opnemen."
      },
      mainHeading: {
        title: "Overleg met\neen expert.",
        description: "Keyholders Agency helpt bedrijven hun activiteiten te transformeren door intelligente automatisering. Onze op maat gemaakte AI-oplossingen elimineren handmatige taken, verbinden technologiestacks en versnellen groei met oplossingen die privacy en veiligheid respecteren.",
        subDescription: "We werken doorgaans met bedrijven die minimaal 20 uur per week willen besparen op repetitieve taken, meerdere softwaresystemen hebben die integratie nodig hebben, of compliance met de EU AI Act zoeken terwijl ze AI-voordelen benutten.",
        closing: "Laten we praten!"
      },
      testimonialSection: {
        heading: "Wat onze klanten zeggen"
      },
      formSection: {
        heading: "Neem contact op",
        firstName: "Voornaam",
        lastName: "Achternaam",
        yourName: "Je voornaam",
        yourSurname: "Je achternaam",
        workEmail: "Werk E-mail",
        emailPlaceholder: "naam@bedrijf.com",
        country: "Land",
        countryPlaceholder: "Selecteer je land",
        helpTopic: "Waarmee kunnen we je helpen?",
        topicPlaceholder: "Selecteer een onderwerp",
        subject: "Onderwerp",
        subjectPlaceholder: "Kort onderwerp van je vraag",
        details: "Details",
        detailsPlaceholder: "Vertel ons meer over je behoeften en uitdagingen",
        source: "Hoe heb je ons gevonden?",
        sourcePlaceholder: "Selecteer een optie",
        consentText: "Door verder te gaan, ga je akkoord met onze",
        terms: "Gebruiksvoorwaarden",
        and: "en",
        privacy: "Privacybeleid",
        submitButton: "Boek een Gratis Consultatie",
        submitting: "Verzenden..."
      }
    }
  };

  const currentContent = language === "nl" ? content.nl : content.en;
  
  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    
    if (!formData.name) newErrors.name = currentContent.validationErrors.name;
    if (!formData.surname) newErrors.surname = currentContent.validationErrors.surname;
    if (!formData.email) newErrors.email = currentContent.validationErrors.email;
    if (!formData.email.includes('@')) newErrors.email = currentContent.validationErrors.invalidEmail;
    if (!formData.country) newErrors.country = currentContent.validationErrors.country;
    if (!formData.topic) newErrors.topic = currentContent.validationErrors.topic;
    if (!formData.subject) newErrors.subject = currentContent.validationErrors.subject;
    if (!formData.description) newErrors.description = currentContent.validationErrors.description;
    if (!formData.source) newErrors.source = currentContent.validationErrors.source;
    
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
            
            <h1 className="text-4xl font-bold text-white mb-6">{currentContent.successPage.title}</h1>
            
            <p className="text-gray-300 text-lg mb-8">
              {currentContent.successPage.message}
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
                {currentContent.mainHeading.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              
              <div className="prose prose-lg text-gray-300 max-w-2xl">
                <p className="text-xl">
                  {currentContent.mainHeading.description}
                </p>
                <p className="mt-6">
                  {currentContent.mainHeading.subDescription}
                </p>
                <p className="mt-6 text-purple-400 font-semibold">
                  {currentContent.mainHeading.closing}
                </p>
              </div>
            </div>
            
            {/* Testimonials section */}
            <div className="space-y-8 mt-8">
              <h2 className="text-2xl font-semibold text-white">{currentContent.testimonialSection.heading}</h2>
              
              <div className="space-y-6">
                {currentContent.testimonials.map((testimonial, index) => (
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
            <h2 className="text-2xl font-bold text-white mb-6">{currentContent.formSection.heading}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="text-gray-300">{currentContent.formSection.firstName}</Label>
                  <Input
                    id="contact-name"
                    placeholder={currentContent.formSection.yourName}
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
                  <Label htmlFor="contact-surname" className="text-gray-300">{currentContent.formSection.lastName}</Label>
                  <Input
                    id="contact-surname"
                    placeholder={currentContent.formSection.yourSurname}
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
                <Label htmlFor="contact-email" className="text-gray-300">{currentContent.formSection.workEmail}</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={currentContent.formSection.emailPlaceholder}
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
                <Label htmlFor="contact-country" className="text-gray-300">{currentContent.formSection.country}</Label>
                <Select
                  onValueChange={handleSelectChange("country")}
                  value={formData.country}
                >
                  <SelectTrigger id="contact-country" className="w-full bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500">
                    <SelectValue placeholder={currentContent.formSection.countryPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-900/20 text-white">
                    {currentContent.countries.map((country) => (
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
                <Label htmlFor="contact-topic" className="text-gray-300">{currentContent.formSection.helpTopic}</Label>
                <Select
                  onValueChange={handleSelectChange("topic")}
                  value={formData.topic}
                >
                  <SelectTrigger id="contact-topic" className="w-full bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500">
                    <SelectValue placeholder={currentContent.formSection.topicPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-900/20 text-white">
                    {currentContent.topics.map((topic) => (
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
                <Label htmlFor="contact-subject" className="text-gray-300">{currentContent.formSection.subject}</Label>
                <Input
                  id="contact-subject"
                  placeholder={currentContent.formSection.subjectPlaceholder}
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
                <Label htmlFor="contact-description" className="text-gray-300">{currentContent.formSection.details}</Label>
                <Textarea
                  id="contact-description"
                  placeholder={currentContent.formSection.detailsPlaceholder}
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
                <Label htmlFor="contact-source" className="text-gray-300">{currentContent.formSection.source}</Label>
                <Select
                  onValueChange={handleSelectChange("source")}
                  value={formData.source}
                >
                  <SelectTrigger id="contact-source" className="w-full bg-gray-900/60 border-purple-900/20 text-white focus:border-purple-500">
                    <SelectValue placeholder={currentContent.formSection.sourcePlaceholder} />
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
                {currentContent.formSection.consentText}{" "}
                <a href={`/${language === 'nl' ? 'nl/' : ''}terms`} className="text-purple-400 hover:text-purple-300 underline">
                  {currentContent.formSection.terms}
                </a>{" "}
                {currentContent.formSection.and}{" "}
                <a href={`/${language === 'nl' ? 'nl/' : ''}privacy`} className="text-purple-400 hover:text-purple-300 underline">
                  {currentContent.formSection.privacy}
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-6 h-auto text-lg font-medium rounded-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? currentContent.formSection.submitting : currentContent.formSection.submitButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 