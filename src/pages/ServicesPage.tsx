import React, { useState, useEffect } from 'react';
import { shouldHandleClientSideNavigation } from '../utils/navigation';
import { safeScrollTo } from '../utils/scroll';
import { siteContent, ConsolidatedService } from '../content/siteContent';
import safetyEventPhoto480 from '../assets/images/safety_event_hosting_1792512885892-480.webp';
import safetyEventPhoto900 from '../assets/images/safety_event_hosting_1792512885892-900.webp';
import safetyEventPhoto from '../assets/images/safety_event_hosting_1792512885892-1376.webp';
import { 
  ClipboardCheck, 
  Signpost, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Factory,
  GraduationCap,
  Building2,
  Cross,
  Home,
  Boxes,
  Zap,
  Timer,
  Users,
  Sparkles,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onSelectService?: (serviceName: string) => void;
  initialCategory?: string;
}

type FilterCategory = 'all' | 'events' | 'audits' | 'evacuation' | 'equipment' | 'drills' | 'inspections';

export const ServicesPage: React.FC<ServicesPageProps> = ({ 
  onNavigate, 
  onSelectService,
  initialCategory,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Interactive Event Builder State
  const [selectedEventType, setSelectedEventType] = useState<'national-safety-day' | 'school-carnival' | 'industrial-rally' | 'residential-assembly'>('national-safety-day');
  const [audienceSize, setAudienceSize] = useState<'50' | '150' | '350' | '500+'>('150');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'Fire Extinguisher Safety Practice',
    'Bilingual Stage Banner & Employee Pledge Cards',
    'Interactive Safety Quiz & Prize Distribution'
  ]);

  // Smooth scroll to targeted service category if URL has a hash or initialCategory prop
  useEffect(() => {
    const targetId = initialCategory || (typeof window !== 'undefined' && window.location.hash ? window.location.hash.replace('#', '') : null);
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - 80;
          safeScrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        }, 120);
      }
    }
  }, [initialCategory]);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => prev === index ? null : index);
  };

  const handleEnquire = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    onNavigate('/contact/');
  };

  const toggleBuilderModule = (moduleName: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleName) 
        ? (prev.length > 1 ? prev.filter(m => m !== moduleName) : prev) 
        : [...prev, moduleName]
    );
  };

  const handleBookBuiltEvent = () => {
    const currentEvent = siteContent.safetyEventHosting.eventTypes.find(e => e.id === selectedEventType);
    const eventName = currentEvent ? currentEvent.title : 'Safety Event Hosting';
    const detailString = `Safety Event Hosting: ${eventName} (~${audienceSize} Attendees, ${selectedModules.length} Modules)`;
    
    if (onSelectService) {
      onSelectService(detailString);
    }
    onNavigate('/contact/');
  };

  const getServiceIcon = (letter: string) => {
    switch (letter) {
      case 'A':
        return <ClipboardCheck className="w-6 h-6 text-[#F4974C]" />;
      case 'B':
        return <Signpost className="w-6 h-6 text-[#F4974C]" />;
      case 'C':
        return <ShieldCheck className="w-6 h-6 text-[#F4974C]" />;
      case 'D':
        return <Sparkles className="w-6 h-6 text-[#F4974C]" />;
      case 'E':
        return <Timer className="w-6 h-6 text-[#F4974C]" />;
      case 'F':
        return <Zap className="w-6 h-6 text-[#F4974C]" />;
      case 'G':
      default:
        return <Users className="w-6 h-6 text-[#F4974C]" />;
    }
  };

  const getIndustryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Factory className="w-5 h-5 text-[#336E95]" />;
      case 1:
        return <GraduationCap className="w-5 h-5 text-[#336E95]" />;
      case 2:
        return <Building2 className="w-5 h-5 text-[#336E95]" />;
      case 3:
        return <Cross className="w-5 h-5 text-[#336E95]" />;
      case 4:
        return <Home className="w-5 h-5 text-[#336E95]" />;
      case 5:
      default:
        return <Boxes className="w-5 h-5 text-[#336E95]" />;
    }
  };

  // Filtered list of services
  const filteredServices = siteContent.consolidatedServices.filter((service: ConsolidatedService) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'events') return service.id === 'safety-events';
    if (activeFilter === 'audits') return service.id === 'safety-audits' || service.id === 'contractor-inductions';
    if (activeFilter === 'evacuation') return service.id === 'evacuation-planning';
    if (activeFilter === 'equipment') return service.id === 'safety-equipment';
    if (activeFilter === 'drills') return service.id === 'mock-drills';
    if (activeFilter === 'inspections') return service.id === 'electrical-hazard-inspections';
    return true;
  });

  const availableModules = [
    'Fire Extinguisher Safety Practice',
    'Bilingual Stage Banner & Employee Pledge Cards',
    'Interactive Safety Quiz & Prize Distribution',
    'Choreographed Single-File Evacuation Walkthrough',
    'Electrical Panel & Hazard Awareness Briefing',
    'Emergency First-Aid Demonstration & Call Coaching'
  ];

  return (
    <div className="bg-[#F3F7FA] text-[#0B1B2B]">
      
      {/* 
        ========================================================================
        1. HERO BANNER
        ========================================================================
      */}
      <section className="bg-[#0F2C47] text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#1A456F]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#62B5DA] uppercase tracking-wider mb-3">
              <span>Workplace & Community Safety Services</span>
              <span aria-hidden="true">·</span>
              <span>Ranchi & Eastern India</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 text-balance">
              Premises Safety Solutions & Experiential Awareness Events
            </h1>
            <p className="text-[15px] sm:text-[16px] text-slate-300 leading-relaxed mb-8 max-w-2xl">
              SMS delivers practical, premises-tailored safety services across Jharkhand. From physical walkthrough audits and architectural evacuation mapping to turn-key National Safety Day event hosting and guided mock drills, our work is grounded in real operational safety.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/contact/"
                onClick={(e) => {
                  if (!shouldHandleClientSideNavigation(e)) return;
                  e.preventDefault();
                  onNavigate('/contact/');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[14px] font-bold rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Request a Safety Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#0F2C47]" />
              </a>
              <a
                href="#event-hosting"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#1A456F] hover:bg-[#235687] text-white text-[14px] font-semibold rounded-xl border border-[#336E95] transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#F4974C]" />
                <span>Explore Awareness Event Hosting</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. DEDICATED MARQUEE SPOTLIGHT: SAFETY EVENT HOSTING & AWARENESS CAMPAIGNS
        Directly satisfies user prompt: "add more safety related services, like event hosting for awareness"
        ========================================================================
      */}
      <section id="event-hosting" className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Visual Column */}
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[340px] lg:min-h-[580px] flex flex-col justify-end p-6 sm:p-8 overflow-hidden group">
              <img 
                src={safetyEventPhoto} 
                srcSet={`${safetyEventPhoto480} 480w, ${safetyEventPhoto900} 900w, ${safetyEventPhoto} 1376w`}
                sizes="(max-width: 1024px) 100vw, 42vw"
                alt="Corporate safety awareness event hosted with interactive demonstration and audience participation"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2C47] via-[#0F2C47]/50 to-transparent" />
              
              <div className="relative z-10 text-white">
                <span className="text-xs uppercase tracking-wider font-bold text-[#F4974C] block mb-2">
                  Featured Experiential Service
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                  Turnkey Safety Event Hosting & Awareness Campaigns
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
                  Active, hands-on demonstrations and bilingual campaigns designed to engage every worker, student, and resident without passive lectures.
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-slate-300">
                  <span>Ranchi & Jharkhand Statewide</span>
                  <span aria-hidden="true">·</span>
                  <span>Corporate · Schools · Communities</span>
                </div>
              </div>
            </div>

            {/* Content & Formats Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#336E95] mb-2">
                  <span>Turnkey Campaign Management</span>
                  <span aria-hidden="true">·</span>
                  <span>National Safety Day & Annual Weeks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight mb-4">
                  Transform Safety Compliance Into an Inspiring Workplace Celebration
                </h2>
                <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {siteContent.safetyEventHosting.description}
                </p>

                {/* 4 Quantitative/Commitment Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 px-4 bg-[#F3F7FA] rounded-2xl border border-slate-200 mb-8">
                  {siteContent.safetyEventHosting.stats.map((st, sIdx) => (
                    <div key={sIdx} className="text-center sm:text-left">
                      <span className="text-lg sm:text-xl font-extrabold text-[#0F2C47] block tabular-nums">
                        {st.value}
                      </span>
                      <span className="text-xs font-semibold text-[#336E95] block">
                        {st.label}
                      </span>
                      <span className="text-[11px] text-slate-500 hidden sm:block mt-0.5">
                        {st.detail}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Event Formats List */}
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F2C47] mb-3">
                  Tailored Event Formats We Plan & Facilitate:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {siteContent.safetyEventHosting.eventTypes.map((et) => (
                    <div 
                      key={et.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-[#336E95] transition-colors bg-white flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h4 className="text-[14px] font-bold text-[#0F2C47]">
                            {et.title}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#336E95] shrink-0">
                            {et.badge}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-500 leading-relaxed mb-2">
                          {et.summary}
                        </p>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span>{et.duration}</span>
                        <span className="text-[#336E95] font-semibold">{et.target.split(',')[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleEnquire('Safety Event Hosting & Awareness Campaigns')}
                  className="px-6 py-3 bg-[#0F2C47] hover:bg-[#1A456F] text-white text-[14px] font-bold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Enquire About Hosting an Event</span>
                  <ArrowRight className="w-4 h-4 text-[#F4974C]" />
                </button>
                <a
                  href="#event-builder"
                  className="px-5 py-3 text-[14px] font-semibold text-[#336E95] hover:text-[#0F2C47] transition-colors inline-flex items-center gap-1.5"
                >
                  <Sliders className="w-4 h-4 text-[#336E95]" />
                  <span>Customize an Event Agenda</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        3. INTERACTIVE SAFETY EVENT & CAMPAIGN BUILDER
        Enables clients to estimate scope, pick modules, and submit tailored requests
        ========================================================================
      */}
      <section id="event-builder" className="py-14 sm:py-18 bg-white border-t border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Interactive Planning Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
              Design Your Organization’s Safety Awareness Event
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
              Select your event format, estimated participant group, and hands-on modules to generate a tailored outline for your facility in Jharkhand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Selection Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Event Type */}
              <div className="bg-[#F3F7FA] rounded-2xl p-5 sm:p-6 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C47] block mb-3">
                  Step 1: Choose Event Format
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {siteContent.safetyEventHosting.eventTypes.map((et) => {
                    const isSelected = selectedEventType === et.id;
                    return (
                      <button
                        key={et.id}
                        type="button"
                        onClick={() => setSelectedEventType(et.id as 'national-safety-day' | 'school-carnival' | 'industrial-rally' | 'residential-assembly')}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-white border-[#0F2C47] shadow-sm ring-2 ring-[#0F2C47]/10' 
                            : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[13px] font-bold text-[#0F2C47] block">
                            {et.title}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />}
                        </div>
                        <span className="text-[11px] text-slate-500 block leading-tight">
                          {et.duration} · {et.target.split(',')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Audience Size */}
              <div className="bg-[#F3F7FA] rounded-2xl p-5 sm:p-6 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C47] block mb-3">
                  Step 2: Estimated Audience Size
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: '50', label: 'Up to 50', desc: 'Single department' },
                    { val: '150', label: '50 to 150', desc: 'Mid facility / branch' },
                    { val: '350', label: '150 to 350', desc: 'Full plant or school' },
                    { val: '500+', label: '350 to 500+', desc: 'Campus conclave' },
                  ].map((sizeOpt) => {
                    const isSelected = audienceSize === sizeOpt.val;
                    return (
                      <button
                        key={sizeOpt.val}
                        type="button"
                        onClick={() => setAudienceSize(sizeOpt.val as '50' | '150' | '350' | '500+')}
                        className={`text-center p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-white border-[#0F2C47] shadow-sm ring-2 ring-[#0F2C47]/10' 
                            : 'bg-white/80 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-sm font-extrabold text-[#0F2C47] block tabular-nums">
                          {sizeOpt.label}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {sizeOpt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Modules */}
              <div className="bg-[#F3F7FA] rounded-2xl p-5 sm:p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F2C47] block">
                    Step 3: Select Hands-On Demonstration Modules
                  </span>
                  <span className="text-[12px] font-semibold text-[#336E95]">
                    {selectedModules.length} Selected
                  </span>
                </div>
                <div className="space-y-2.5">
                  {availableModules.map((mod) => {
                    const isChecked = selectedModules.includes(mod);
                    return (
                      <label 
                        key={mod}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-white border-[#336E95]/40 text-[#0F2C47]' 
                            : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleBuilderModule(mod)}
                          className="w-4 h-4 mt-0.5 rounded text-[#0F2C47] focus:ring-[#F4974C] border-slate-300 cursor-pointer"
                        />
                        <span className="text-[13px] font-medium leading-snug">
                          {mod}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Summary & Consultation Trigger */}
            <div className="lg:col-span-5 sticky top-24">
              <div className="bg-[#0F2C47] text-white rounded-3xl p-6 sm:p-8 border border-[#1A456F] shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#62B5DA] mb-2">
                  <Sparkles className="w-4 h-4 text-[#F4974C]" />
                  <span>Custom Event Blueprint</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2">
                  {siteContent.safetyEventHosting.eventTypes.find(e => e.id === selectedEventType)?.title}
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Tailored for ~{audienceSize} attendees across your premises.
                </p>

                <div className="space-y-4 pb-6 border-b border-white/10 text-xs sm:text-[13px]">
                  <div>
                    <span className="text-slate-400 block mb-1">Recommended Duration:</span>
                    <span className="font-semibold text-white">
                      {selectedModules.length <= 3 ? '2.5 to 3 Hours (Focused Morning Session)' : 'Full Half-Day (3.5 to 4.5 Hours with Practical Stalls)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Deliverables Included by SMS:</span>
                    <ul className="space-y-1 text-slate-200">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Custom bilingual event backdrop & welcome standee</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Real demonstration gear for hands-on extinguisher practice</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Participant Safety Pledge cards & completion certificates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>Photographic event summary report for corporate ESG records</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={handleBookBuiltEvent}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[14px] font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Request Quotation for This Event</span>
                    <ArrowUpRight className="w-4 h-4 text-[#0F2C47]" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    No obligation · Our team reviews facility layout and timing in Ranchi
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        4. EXPANDED SERVICE CATALOGUE (7 CORE PILLARS WITH FILTER TABS)
        Desktop: 2-column balanced grid
        Mobile: 1 card per row
        ========================================================================
      */}
      <section id="service-cards" className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Complete Safety Service Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
              Seven Pillars of Practical Workplace & Premises Safety
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2">
              Every offering is executed directly by our team with on-site presence, functional safety equipment, and clear physical documentation.
            </p>
          </div>

          <div className="text-xs text-slate-500 shrink-0">
            Showing <strong className="text-[#0F2C47] tabular-nums">{filteredServices.length}</strong> of <strong className="text-[#0F2C47] tabular-nums">{siteContent.consolidatedServices.length}</strong> services
          </div>
        </div>

        {/* Clean Interactive Category Filter Bar */}
        <div className="mb-10 p-1.5 bg-slate-200/80 rounded-2xl flex flex-wrap items-center gap-1">
          {[
            { id: 'all', label: 'All Services (7)' },
            { id: 'events', label: 'Event Hosting & Awareness' },
            { id: 'audits', label: 'Audits & Inductions' },
            { id: 'evacuation', label: 'Evacuation & Maps' },
            { id: 'equipment', label: 'Equipment & PPE' },
            { id: 'drills', label: 'Mock Drills & Simulations' },
            { id: 'inspections', label: 'Electrical & Fire Hazards' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as FilterCategory)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-white text-[#0F2C47] shadow-sm' 
                    : 'text-slate-600 hover:text-[#0F2C47] hover:bg-white/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Grid of Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredServices.map((service: ConsolidatedService) => {
            const isFeatured = service.featured;
            return (
              <article
                key={service.id}
                id={service.id}
                className={`bg-white rounded-2xl border p-6 sm:p-8 shadow-sm flex flex-col justify-between transition-all scroll-mt-28 ${
                  isFeatured 
                    ? 'border-[#336E95] ring-2 ring-[#336E95]/10' 
                    : 'border-slate-200 hover:border-[#336E95]'
                }`}
              >
                <div>
                  {/* Header Lockup */}
                  <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#0F2C47] flex items-center justify-center shrink-0">
                        {getServiceIcon(service.categoryLetter)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase tracking-wider font-bold text-[#336E95] block">
                            Category {service.categoryLetter}
                          </span>
                          {service.badge && (
                            <span className="text-[11px] font-bold text-[#F4974C] bg-[#F4974C]/10 px-2 py-0.5 rounded-md">
                              {service.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F2C47] tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Short Purpose Description */}
                  <div className="mb-6">
                    <p className="text-[14px] font-medium text-slate-700 leading-relaxed">
                      {service.shortDesc}
                    </p>
                    <div className="text-[13px] text-slate-600 leading-relaxed mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <strong className="text-slate-800">Operational Purpose:</strong> {service.purpose}
                    </div>
                  </div>

                  {/* Complete Scannable List of Sub-Services */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2C47] mb-3">
                      Deliverables & Scope Included:
                    </h4>
                    <ul className="space-y-2.5">
                      {service.subServices.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-slate-600">
                          <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span className="leading-snug">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-5 border-t border-slate-100 mt-2">
                  <button
                    type="button"
                    onClick={() => handleEnquire(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F2C47] hover:bg-[#1A456F] text-white text-[14px] font-bold rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
                  >
                    <span>Enquire about this service</span>
                    <ArrowRight className="w-4 h-4 text-[#F4974C]" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* 
        ========================================================================
        5. SERVICE ENGAGEMENT TIERS / PACKAGES
        Clarifies how clients engage SMS (Single audit vs complete turnkey vs annual retainer)
        ========================================================================
      */}
      <section id="packages" className="py-16 sm:py-20 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Flexible Engagement Models
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2C47] tracking-tight">
              How Organizations Partner With SMS
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
              Whether you need a rapid diagnostic assessment for an upcoming audit, complete facility evacuation signage, or a year-round safety retainer with awareness event hosting, we offer clear scopes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Tier 1 */}
            <div className="bg-[#F3F7FA] rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#336E95] block mb-1">
                  Model 01
                </span>
                <h3 className="text-xl font-extrabold text-[#0F2C47] mb-2">
                  Rapid Site Audit & Diagnostic
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Ideal for facilities needing an immediate physical hazard assessment and clearance check.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Physical premises walkthrough & hazard review</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Emergency exit & staircase clearance inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Photographic advisory punch-list</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Direct debrief session with facility manager</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleEnquire('Rapid Site Audit & Diagnostic')}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-[#0F2C47] border border-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Request Audit Quotation
              </button>
            </div>

            {/* Tier 2 */}
            <div className="bg-[#0F2C47] text-white rounded-2xl p-6 sm:p-8 border border-[#1A456F] flex flex-col justify-between shadow-md relative">
              <div className="absolute top-4 right-4 bg-[#F4974C] text-[#0F2C47] text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                Most Comprehensive
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#62B5DA] block mb-1">
                  Model 02
                </span>
                <h3 className="text-xl font-extrabold text-white mb-2">
                  Complete Facility Turnkey Upgrade
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  End-to-end transformation: layout mapping, equipment placement, signage mounting, and staff training.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-200 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Architectural 2D evacuation maps with &apos;You Are Here&apos; markers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Supply & secure mounting of extinguishers & first-aid stations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Photoluminescent glow-in-the-dark exit directional signage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Hands-on extinguisher PASS training for key staff</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleEnquire('Complete Facility Turnkey Upgrade')}
                className="w-full py-2.5 px-4 bg-[#F4974C] hover:bg-[#F0853F] text-[#0F2C47] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Discuss Facility Upgrade
              </button>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#F3F7FA] rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#336E95] block mb-1">
                  Model 03
                </span>
                <h3 className="text-xl font-extrabold text-[#0F2C47] mb-2">
                  Annual Safety & Event Retainer
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Continuous preparedness with scheduled quarterly checks, National Safety Day hosting, and evacuation drills.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-600 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Quarterly premises walkthroughs & pressure status logs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Annual National Safety Day / Safety Week full event hosting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Biannual choreographed mock evacuation drill with timing debrief</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span>Fresh bilingual poster rotation & continuous safety advisory</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleEnquire('Annual Safety & Event Retainer')}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-[#0F2C47] border border-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Inquire About Retainer
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        6. THREE-STEP EXECUTION PROCESS
        ========================================================================
      */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
            Methodical Execution
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2C47] tracking-tight">
            {siteContent.sharedProcess.title}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
            {siteContent.sharedProcess.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.sharedProcess.steps.map((st) => (
            <div 
              key={st.number}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#F4974C] tabular-nums block mb-3">
                  {st.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2C47] mb-2">
                  {st.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 
        ========================================================================
        7. INDUSTRIES SERVED
        ========================================================================
      */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Sector Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
              Facilities & Industries We Support Across Jharkhand
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2">
              Our practical safety methodologies are adapted to the physical conditions and daily workflows of various facility types across Eastern India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {siteContent.industriesCompact.map((ind, iIdx) => (
              <div 
                key={ind.name}
                className="p-5 rounded-xl bg-[#F3F7FA] border border-slate-200 flex items-start gap-3.5 hover:border-[#336E95] transition-colors"
              >
                <div className="p-2.5 rounded-lg bg-white shrink-0 mt-0.5 border border-slate-200">
                  {getIndustryIcon(iIdx)}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0F2C47]">
                    {ind.name}
                  </h4>
                  <p className="text-[13px] text-slate-500 mt-1 leading-snug">
                    {ind.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        8. FREQUENTLY ASKED QUESTIONS
        ========================================================================
      */}
      <section className="py-16 sm:py-20 bg-[#F3F7FA] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#336E95] block mb-1">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F2C47] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-600 mt-2">
              Straightforward answers about our walkthroughs, equipment supply, event hosting, and evacuation planning.
            </p>
          </div>

          <div className="space-y-3">
            {siteContent.servicesFaqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full text-left p-4 sm:p-5 bg-white hover:bg-slate-50 flex items-center justify-between gap-4 text-[14px] sm:text-[15px] font-semibold text-[#0F2C47] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#336E95] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#336E95] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-[#F3F7FA] text-[13px] sm:text-[14px] text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        9. FINAL CONSULTATION CTA
        ========================================================================
      */}
      <section className="bg-[#0F2C47] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#1A456F]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-wider text-[#62B5DA] font-bold block mb-2">
            Premises Safety in Jharkhand
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 text-balance">
            Ready to Evaluate or Upgrade Your Facility Safety?
          </h2>
          <p className="text-[15px] sm:text-[16px] text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Schedule a practical on-site walkthrough, discuss turnkey safety awareness event hosting, or request evacuation mapping for your premises.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact/"
              onClick={(e) => {
                if (!shouldHandleClientSideNavigation(e)) return;
                e.preventDefault();
                onNavigate('/contact/');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[15px] font-bold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Request a Safety Consultation</span>
              <ArrowUpRight className="w-4 h-4 text-[#0F2C47]" />
            </a>
            <a
              href={siteContent.contact.whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#1A456F] hover:bg-[#275079] text-white text-[14px] font-semibold rounded-xl border border-[#336E95] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Inquiries (+91 93347 01135)</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
