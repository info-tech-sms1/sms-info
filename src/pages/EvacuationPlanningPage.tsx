import React, { useState } from 'react';
import { shouldHandleClientSideNavigation } from '../utils/navigation';
import { siteContent } from '../content/siteContent';
import { EvacuationMapDiagram } from '../components/EvacuationMapDiagram';
import { 
  Signpost, 
  Compass, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight
} from 'lucide-react';

interface EvacuationPlanningPageProps {
  onNavigate: (path: string) => void;
}

export const EvacuationPlanningPage: React.FC<EvacuationPlanningPageProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B] pb-20">
      
      {/* Header Hero */}
      <section className="bg-[#0F2C47] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-2">
              <Signpost className="w-4 h-4 text-[#F4974C]" />
              <span>Specialized Facility Engineering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              {siteContent.escapePlanningDetails.hero.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {siteContent.escapePlanningDetails.hero.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/contact/"
                onClick={(e) => {
                  if (!shouldHandleClientSideNavigation(e)) return;
                  e.preventDefault();
                  onNavigate('/contact/');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F4974C] hover:bg-[#F0853F] text-[#0F2C47] text-sm font-bold rounded-xl transition-all shadow-md"
              >
                <span>Book a Site Survey for Your Facility</span>
                <ArrowRight className="w-4 h-4 text-[#0F2C47]" />
              </a>
              <a
                href="tel:+919334701135"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#336E95] hover:border-[#62B5DA] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <span>Call +91 93347 01135</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Why Clear Evacuation Planning Matters */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-wider text-[#336E95] font-bold block mb-2">
              Life Safety First Principle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] mb-4">
              Why Every Facility Needs Tailored Evacuation Diagrams
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {siteContent.escapePlanningDetails.whyItMatters}
            </p>
          </div>

          {/* Interactive Illustrated Evacuation Map Graphic */}
          <div className="mt-8">
            <EvacuationMapDiagram />
          </div>
        </div>

        {/* What the Client Receives (Deliverables Breakdown) */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-wider text-[#336E95] font-bold block mb-1">
              Complete Documentation Package
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47]">
              What You Receive from SMS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteContent.escapePlanningDetails.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0F2C47] text-[#F4974C] flex items-center justify-center font-black text-sm mb-4 tabular-nums">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F2C47] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications & Signage Schedule */}
        <div className="bg-[#0F2C47] text-white rounded-3xl p-6 sm:p-10 border border-[#1A456F] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-wider text-[#62B5DA] font-bold block mb-2">
                Production Quality
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {siteContent.escapePlanningDetails.sampleMapSpecs.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Evacuation maps manufactured by SMS are engineered for maximum legibility under smoke, panic, and partial lighting conditions.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                {siteContent.escapePlanningDetails.sampleMapSpecs.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#F4974C] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 p-6 bg-[#1A456F]/60 rounded-2xl border border-[#336E95]/40 text-center">
              <Compass className="w-12 h-12 text-[#62B5DA] mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">
                Ranchi Site Survey Available
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Our SMS team visits your office, factory, or school in Ranchi to record exact corridor measurements and exit dimensions.
              </p>
              <a
                href="/contact/"
                onClick={(e) => {
                  if (!shouldHandleClientSideNavigation(e)) return;
                  e.preventDefault();
                  onNavigate('/contact/');
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#F4974C] text-[#0F2C47] text-xs font-bold rounded-lg hover:bg-[#F0853F] transition-colors"
              >
                <span>Schedule Survey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F2C47] mb-6">
            Frequently Asked Questions about Evacuation Planning
          </h2>

          <div className="space-y-3">
            {siteContent.escapePlanningDetails.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#0F2C47] transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#336E95] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#336E95] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
