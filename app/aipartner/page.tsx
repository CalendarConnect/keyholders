import HeroSection from '@/components/aipartner/hero-section';
import BenefitsSection from '@/components/aipartner/benefits-section';
import ProcessSection from '@/components/aipartner/process-section';
import DeliverySection from '@/components/aipartner/delivery-section';
import ClientsSection from '@/components/aipartner/clients-section';
import CTASection from '@/components/aipartner/cta-section';

export default function AIPartnerPage() {
  return (
    <main className="relative bg-white overflow-x-hidden">
      {/* Hero Section - Memory Meets Partnership */}
      <HeroSection />
      
      {/* Benefits Section - Intelligence That Knows You */}
      <BenefitsSection />
      
      {/* Process Section - Four Steps to Partnership */}
      <ProcessSection />
      
      {/* Delivery Section - Your Keith Experience */}
      <DeliverySection />
      
      {/* Clients Section - Partnerships in Action */}
      <ClientsSection />
      
      {/* CTA Section - Start Your Partnership */}
      <CTASection />
    </main>
  );
} 