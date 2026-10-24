/**
 * Safety Management Solutions (SMS)
 * Centralized Site Content Matrix
 * 
 * Note: All text is isolated here so that Hindi ('hi') or additional language
 * dictionaries can be added seamlessly in the future without altering UI components.
 * 
 * Adheres strictly to user instructions:
 * - No invented business hours, coordinates, response times, or "free" promises.
 * - [confirm] flags used where specific operational data is pending from the client.
 * - No mentions of ISI/EN standards, refilling, hydrostatic tests, live fire, "safety engineers", stretchers, or eyewash stations.
 */

export interface ServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string;
  whatsIncluded: string[];
  deliverables: string[];
  processSteps: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface EquipmentCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: {
    name: string;
    description: string;
    usage: string;
    specs: string;
  }[];
}

export interface PosterItem {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Fire' | 'Electrical' | 'Workplace' | 'Road' | 'Health' | 'Community';
  summary: string;
  tagline: string;
  dimensions: string;
  languagesAvailable: string[];
}

export interface EventProgram {
  id: string;
  title: string;
  category: string;
  targetGroup: string;
  duration: string;
  format: string;
  overview: string;
  keyTopics: string[];
}

export interface ConsolidatedService {
  id: string;
  categoryLetter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  title: string;
  shortDesc: string;
  purpose: string;
  subServices: string[];
  badge?: string;
  categoryFilter?: 'audits' | 'evacuation' | 'equipment' | 'events' | 'drills' | 'inspections';
  featured?: boolean;
}

export const siteContent = {
  meta: {
    siteName: 'Safety Management Solutions (SMS)',
    shortName: 'SMS',
    tagline: 'Safety starts with you.',
    region: 'Ranchi, Jharkhand',
    canonicalBase: 'https://safetymanagementsolutions.in',
  },

  contact: {
    phone: '+91 9334701135',
    phoneFormatted: '+91 93347 01135',
    whatsAppUrl: 'https://wa.me/919334701135',
    email: 'Info@safetymanagementsolutions.in',
    website: 'safetymanagementsolutions.in',
    addressLine1: 'Main Road, opposite Capitol Hill, Walking Street',
    addressFloor: '4th Floor',
    city: 'Ranchi',
    state: 'Jharkhand',
    pincode: '834001',
    fullAddress: 'Main Road, opposite Capitol Hill, Walking Street, 4th Floor, Ranchi, Jharkhand 834001',
    director: 'Sabir Hussain',
  },

  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],

  hero: {
    kicker: 'Workplace & Community Safety in Ranchi & Jharkhand',
    headline: 'Practical Safety Solutions for Workplaces, Schools & Facilities.',
    subheadline: 'SMS delivers tailored safety awareness programs, floor-plan evacuation mapping, basic safety equipment supply and management, and practical risk walkthroughs across Jharkhand and neighboring regions.',
    primaryCta: 'Request a Safety Consultation',
    secondaryCta: 'Explore Core Services',
    trustNote: 'Tailored specifically to your premises - Aligned with good safety practice',
  },

  trustStrip: [
    { label: 'Premises-Tailored', detail: 'Practical walkthroughs suited to your exact layout' },
    { label: 'Equipment Upkeep', detail: 'Supply and ongoing management under one roof' },
    { label: 'Creative Awareness', detail: 'Relatable bilingual training & visual poster campaigns' },
    { label: 'Local In Ranchi', detail: 'Prompt regional presence across Jharkhand' },
  ],

  consolidatedServices: [
    {
      id: 'safety-audits',
      categoryLetter: 'A' as const,
      categoryFilter: 'audits' as const,
      title: 'Safety Audits & Risk Assessments',
      shortDesc: 'Workplace safety inspections, physical hazard identification, emergency exit and door clearance checks, and prioritized practical recommendations.',
      purpose: 'Helps facility heads, school administrators, and factory managers identify real physical hazards before incidents occur, delivering a clear photographic action matrix rather than generic paperwork.',
      subServices: [
        'On-site premises walkthroughs & physical hazard inspections',
        'Identification of slip, trip, fall, and machinery-related hazards',
        'Emergency exit, door clearance & staircase obstruction checks',
        'Electrical room, storage area & corridor clearance observations',
        'Prioritized photographic advisory report with actionable remediations',
        'Direct debrief session with facility leadership & administrative staff',
      ],
    },
    {
      id: 'evacuation-planning',
      categoryLetter: 'B' as const,
      categoryFilter: 'evacuation' as const,
      title: 'Evacuation Planning & Emergency Signage',
      shortDesc: 'Floor-plan evacuation diagrams, directional escape routes, "You Are Here" markers, assembly-point planning, and drill guidance.',
      purpose: 'Eliminates confusion during critical emergency situations by providing building occupants with clear, viewer-oriented directional floor plans and photoluminescent escape markers.',
      subServices: [
        'Premises-specific 2D architectural evacuation floor plans',
        '"You Are Here" orientation markers aligned to the viewer’s physical gaze',
        'Primary and secondary emergency escape route planning',
        'Designation and signposting of outdoor safe assembly / muster points',
        'Photoluminescent glow-in-the-dark exit and stairwell directional signage plans',
        'Evacuation marshal checklists & structured drill execution guidelines',
      ],
    },
    {
      id: 'safety-equipment',
      categoryLetter: 'C' as const,
      categoryFilter: 'equipment' as const,
      title: 'Safety Equipment, Fire Systems & PPE Supply',
      shortDesc: 'Fire extinguishers, industrial first-aid stations, personal protective equipment, safety signage, and ongoing equipment management.',
      purpose: 'Provides reliable, verified basic safety equipment placed at designated locations with scheduled pressure checks, inspection tags, and replenishment.',
      subServices: [
        'Fire extinguishers: ABC dry chemical powder (2kg, 4kg, 6kg, 9kg) & clean-agent CO2',
        'Extinguisher mounting: heavy-duty floor stands, wall brackets & protective covers',
        'Industrial wall-mounted first-aid boxes & basic emergency care supplies',
        'Personal Protective Equipment (PPE): safety helmets, high-vis vests, goggles & gloves',
        'Safety signage: glow-in-the-dark exit signs, caution boards & assembly markers',
        'Ongoing equipment management: routine pressure tracking & inspection tags',
      ],
    },
    {
      id: 'safety-events',
      categoryLetter: 'D' as const,
      categoryFilter: 'events' as const,
      featured: true,
      badge: 'High Engagement',
      title: 'Safety Event Hosting & Awareness Campaigns',
      shortDesc: 'Turn-key on-site event planning and hosting for National Safety Day, Corporate Safety Weeks, campus safety fairs, and community awareness rallies.',
      purpose: 'Transforms routine safety compliance into high-energy, memorable organizational celebrations featuring bilingual banners, pledge ceremonies, interactive hazard hunts, live safety demos, and participant certificates.',
      subServices: [
        'Turnkey National Safety Day (March 4th) & Annual Safety Week event hosting',
        'School & college safety carnivals with interactive student demonstration stations',
        'Corporate townhalls, safety pledge ceremonies, and employee safety quizzes',
        'High-impact bilingual event stage backdrops, standees & selfie photo frames',
        'Hands-on fire extinguisher discharge training with real equipment for all attendees',
        'Event photo summary documentation & participation certificates for company ESG records',
      ],
    },
    {
      id: 'mock-drills',
      categoryLetter: 'E' as const,
      categoryFilter: 'drills' as const,
      title: 'Emergency Mock Drills & Evacuation Simulations',
      shortDesc: 'Choreographed real-time disaster simulations, alarm response, warden marshalling, outdoor muster accountability, and post-drill evaluation reports.',
      purpose: 'Tests organizational crisis readiness under realistic conditions, identifying escape choke points, timing bottlenecks, and communication gaps before real emergencies strike.',
      subServices: [
        'Choreographed evacuation simulations with simulated alarm activation',
        'Floor warden and evacuation marshal role briefings & designated sweeps',
        'Stopwatch timing of floor-by-floor egress and outdoor assembly headcount',
        'Emergency response procedure checks for elevators, servers, and hazardous areas',
        'Detailed post-drill debriefing with leadership and quantitative timing report',
        'Action plan for resolving staircase congestion and muster point bottlenecks',
      ],
    },
    {
      id: 'electrical-hazard-inspections',
      categoryLetter: 'F' as const,
      categoryFilter: 'inspections' as const,
      title: 'Specialized Electrical & Industrial Hazard Walkthroughs',
      shortDesc: 'Distribution panel clearance, cable tray inspection assistance, combustible storage segregation, and transformer perimeter reviews.',
      purpose: 'Focuses specifically on the leading causes of facility fires in commercial and industrial settings: overloaded circuits, obstructed electrical panels, and improperly stored flammable materials.',
      subServices: [
        'Electrical main panel & distribution board clearance inspection (minimum 1m clear radius)',
        'Observation of overloaded power strips, loose wiring, and unsealed conduit boxes',
        'Flammable storage & chemical segregation checks with spill precaution guidance',
        'Server room & UPS battery area ventilation and fire equipment positioning',
        'Transformer perimeter & exterior switchyard clearance verification',
        'Direct photographic punch-list prioritized by immediate fire risk level',
      ],
    },
    {
      id: 'contractor-inductions',
      categoryLetter: 'G' as const,
      categoryFilter: 'audits' as const,
      title: 'Contractor, Driver & Visitor Safety Inductions',
      shortDesc: 'Standardized safety orientation modules, bilingual pocket cards, gatehouse protocol design, and logistics yard pedestrian safety rules.',
      purpose: 'Ensures external visitors, temporary labor, transport drivers, and contractors entering your facility adhere to life-saving site rules from the moment they step past the main gate.',
      subServices: [
        'Gatehouse visitor safety orientation protocol and badge system setup',
        'Bilingual pocket-sized safety rule cards (Hindi & English) for drivers and laborers',
        'Logistics yard traffic management: pedestrian walkway and truck bay segregation',
        'Contractor basic permit-to-work and personal protective equipment (PPE) check routines',
        'Loading dock safety guidance and emergency contact signage installation',
        'Annual refresher training kits for security guards and facility reception personnel',
      ],
    },
  ],

  safetyEventHosting: {
    badge: 'Turnkey Event Hosting',
    title: 'Workplace & Community Safety Event Hosting',
    tagline: 'Energize your workplace culture with engaging, experiential safety celebrations across Jharkhand.',
    description: 'SMS provides complete, turn-key planning and staging of safety events. Whether you need a high-profile National Safety Day celebration, an interactive school safety fair, or an industrial shift rally, our team handles setup, bilingual materials, qualified facilitators, and live practical demonstrations.',
    stats: [
      { value: '100%', label: 'Hands-On Practice', detail: 'Attendees operate real equipment' },
      { value: 'Bilingual', label: 'Hindi & English', detail: 'Accessible to all workers & staff' },
      { value: 'Turnkey', label: 'End-to-End Setup', detail: 'Banners, sound, props & certificates' },
      { value: 'Documented', label: 'ESG & Compliance', detail: 'Photographic & video report included' },
    ],
    eventTypes: [
      {
        id: 'national-safety-day',
        title: 'National Safety Day & Safety Week',
        badge: 'Annual Marquee Event',
        target: 'Corporate Offices, Factories & Industrial Parks',
        duration: 'Half-Day or Full-Day Conclave',
        summary: 'A high-impact organization-wide event with safety flag hoisting, employee pledge ceremony, interactive hazard-hunt contests, safety quiz with prizes, and live extinguisher demonstrations.',
        highlights: [
          'Custom bilingual stage backdrops, banners & selfie standees',
          'Executive opening address & official Safety Pledge ceremony',
          'Interactive safety trivia quiz with custom winner awards',
          'Hands-on fire extinguisher PASS practice for all participants',
          'Formal completion certificates & documentation for ESG reports',
        ],
      },
      {
        id: 'school-carnival',
        title: 'Campus & School Safety Carnivals',
        badge: 'Youth & Academic',
        target: 'Schools, Colleges, Universities & Hostels',
        duration: '2 to 3 Hour Interactive Session',
        summary: 'Engaging, memorable educational experiences teaching students and teachers calm emergency behavior, single-file stairwell descents, calling local emergency numbers, and fire alarm sound recognition.',
        highlights: [
          'Age-appropriate bilingual safety games & disaster survival tips',
          'Single-file stairwell evacuation walk without pushing or panic',
          'Teacher emergency marshal checklist & attendance coaching',
          'Live demonstration of extinguisher pin pulling and spraying',
          'Student Safety Ambassador badges & take-home parent leaflets',
        ],
      },
      {
        id: 'industrial-rally',
        title: 'Industrial Safety Rallies & Toolbox Conclaves',
        badge: 'Plant & Floor Operations',
        target: 'Manufacturing Units, Warehouses & Logistics Hubs',
        duration: 'Shift-Transition or Half-Day Rally',
        summary: 'Targeted ground-level awareness event reinforcing daily PPE discipline, machine guard safety, chemical spill response, and pedestrian-forklift pathway segregation.',
        highlights: [
          'High-visibility rally entrance flags and caution display stands',
          'Live PPE fitment, helmet shock absorption, and glove integrity checks',
          'Worker hazard-spotting challenge with instant recognition tokens',
          'Toolbox talk marathon led by experienced SMS safety facilitators',
          'Documented shift attendance records for statutory compliance files',
        ],
      },
      {
        id: 'residential-assembly',
        title: 'Residential Society Safety Drives',
        badge: 'Community & High-Rise',
        target: 'Apartment Complexes, Gated Communities & RWAs',
        duration: 'Weekend Morning (90 Mins)',
        summary: 'Family-friendly interactive community event teaching residents, domestic staff, and security guards essential kitchen fire safety, LPG cylinder leak response, and smoke-filled hallway escape rules.',
        highlights: [
          'Courtyard fire extinguisher safety demonstrations for residents',
          'Safe handling and soap-water leak testing for LPG cylinders',
          'Stairwell smoke door clearance and lift-avoidance protocols',
          'Security guard first-responder drill and alarm activation protocol',
          'Emergency contact refrigerator magnets and lobby posters',
        ],
      },
    ],
    includedServices: [
      {
        title: 'Turnkey Event Coordination',
        description: 'Complete scheduling, agenda planning, sound setup, stage framing, and venue crowd management.',
      },
      {
        title: 'Bilingual Collateral & Branding',
        description: 'Professionally printed event banners, podium signs, participant badges, and informative handouts in Hindi and English.',
      },
      {
        title: 'Hands-On Demonstration Equipment',
        description: 'Real training extinguishers, PPE demonstration kits, and alarm sirens for realistic experiential learning.',
      },
      {
        title: 'Recognition & Documentation',
        description: 'Custom participation certificates, safety pledge certificates, and a photographic summary report for leadership.',
      },
    ],
  },

  sharedProcess: {
    title: 'How Our Service Process Works',
    subtitle: 'A straightforward, three-step engagement model designed to evaluate, implement, and maintain safety readiness without disrupting your daily operations.',
    steps: [
      {
        number: '01',
        title: 'On-Site Walkthrough & Assessment',
        description: 'Our team visits your facility in Ranchi or nearby districts across Jharkhand to inspect active work areas, evaluate exit routes, review existing equipment, and note practical hazards.',
      },
      {
        number: '02',
        title: 'Tailored Plan & Implementation',
        description: 'We draft clear floor-plan evacuation maps, supply and mount required basic equipment and high-contrast signage, and lead structured staff safety briefings.',
      },
      {
        number: '03',
        title: 'Ongoing Upkeep & Preparedness Drills',
        description: 'We establish scheduled equipment pressure and inspection checks, supply consumable refills, and conduct guided mock evacuation drills so emergency readiness never lapses.',
      },
    ],
  },

  servicesFaqs: [
    {
      q: 'How do we get started with a safety consultation or site walkthrough?',
      a: 'Contact us via our consultation form, phone (+91 9334701135), or WhatsApp. We will discuss your premises layout, location in Jharkhand, and coordinate a convenient time for an on-site walkthrough.',
    },
    {
      q: 'Do you supply physical equipment and signage as well as advisory services?',
      a: 'Yes. SMS supplies, mounts, and inspects safety equipment including fire extinguishers, first-aid stations, PPE, and photoluminescent glow-in-the-dark signs under one roof.',
    },
    {
      q: 'Can evacuation diagrams and awareness posters be prepared in Hindi and English?',
      a: 'Yes. All evacuation plans, exit signs, and visual posters are prepared with bilingual English and Hindi text so that all employees, visitors, and workers can immediately understand them.',
    },
    {
      q: 'What drawings or blueprints do you require to draft evacuation maps?',
      a: 'A floor plan sketch, architectural CAD drawing, or layout is helpful. If you do not have blueprints, our team surveys the building during our walkthrough and drafts the diagram from physical measurements.',
    },
    {
      q: 'Do you provide practical, hands-on training for staff and workers?',
      a: 'Yes. We conduct interactive training sessions including hands-on fire extinguisher operation using the PASS method, floor-warden briefings, and guided mock evacuation drills.',
    },
    {
      q: 'Can SMS host our organization’s National Safety Day or annual safety week events?',
      a: 'Yes. SMS delivers complete turnkey event management: stage setup, custom bilingual banners, executive safety pledge ceremonies, interactive hazard-hunting quizzes, live extinguisher demonstrations, and participant certificates across Ranchi and Jharkhand.',
    },
  ],

  industriesCompact: [
    { name: 'Industrial Sites & Manufacturing Plants', context: 'Production floors, machinery spaces & logistics yards' },
    { name: 'Schools, Colleges & Hostels', context: 'Corridors, labs, dormitories & assembly muster areas' },
    { name: 'Commercial Offices & IT Parks', context: 'Multi-floor office suites, server rooms & exit stairs' },
    { name: 'Healthcare & Hospital Facilities', context: 'Patient wards, diagnostic wings & emergency pathways' },
    { name: 'Residential Societies & High-Rises', context: 'Common stairwells, parking basements & resident awareness' },
    { name: 'Warehouses & Logistics Hubs', context: 'Loading docks, high-rack aisles & material storage zones' },
  ],

  whySms: {
    title: 'Why Organisations Choose SMS',
    lead: 'Straightforward, practical safety solutions designed for real building layouts and daily operational realities in Jharkhand and Eastern India.',
    points: [
      {
        num: '01',
        title: 'Practical, Not Academic',
        description: 'We do not generate thick, unreadable reports that sit on a shelf. We focus on visible floor plans, functional equipment, clear signage, and educated staff.',
      },
      {
        num: '02',
        title: 'Tailored to Your Premises',
        description: 'Every building is unique. We walk your premises, identify physical choke points, and design evacuation paths and equipment placement tailored to your reality.',
      },
      {
        num: '03',
        title: 'Creative, Relatable Awareness',
        description: 'Safety posters and sessions that actually connect with people. Available in Hindi and English with crisp visuals designed to be understood at a glance.',
      },
      {
        num: '04',
        title: 'Equipment Supply & Ongoing Upkeep',
        description: 'We do not just drop off safety equipment and leave. We help you establish ongoing inspection schedules and equipment management in one place.',
      },
    ],
  },

  howWeWork: {
    title: 'Our 4-Step Practical Safety Workflow',
    lead: 'A methodical sequence designed to build emergency readiness without disrupting your day-to-day operations.',
    steps: [
      {
        num: '01',
        name: 'Assess',
        kicker: 'On-site Walkthrough',
        description: 'We visit your facility, walk through active work areas, review exit points, inspect existing equipment, and note practical vulnerabilities.',
        focus: 'Physical site inspection & hazard identification',
      },
      {
        num: '02',
        name: 'Plan',
        kicker: 'Tailored Action Map',
        description: 'We draft your premises evacuation layout, define optimal signage placement, recommend necessary basic equipment, and outline training priorities.',
        focus: 'Evacuation mapping & signage layout',
      },
      {
        num: '03',
        name: 'Implement',
        kicker: 'Installation & Training',
        description: 'We position equipment, mount high-visibility signage, install evacuation maps at key decision points, and conduct staff training sessions.',
        focus: 'Equipment delivery & workforce training',
      },
      {
        num: '04',
        name: 'Sustain',
        kicker: 'Routine Management & Drills',
        description: 'We assist with scheduled equipment status checks, refresher awareness campaigns, and guided mock evacuation drills to keep everyone prepared.',
        focus: 'Ongoing checks & preparedness drills',
      },
    ],
  },

  sectorsServed: [
    { name: 'Industrial Sites & Factories', context: 'Production floors, machinery spaces & logistics routes' },
    { name: 'Schools, Colleges & Hostels', context: 'Classroom corridors, stairwells & campus muster zones' },
    { name: 'Commercial Offices & IT Parks', context: 'Multi-floor office layouts, server rooms & exit corridors' },
    { name: 'Hospitals & Healthcare Facilities', context: 'Patient corridors, stairways & emergency exit pathways' },
    { name: 'Residential Societies & High-Rises', context: 'Common stairwells, parking areas & resident awareness' },
    { name: 'Warehouses & Logistics Hubs', context: 'Loading bays, storage aisles & high-rack safety zones' },
    { name: 'Government & Administrative Offices', context: 'Public visitor entrances, hall clearances & staff safety' },
  ],

  whoWeServe: [
    { category: 'Industrial Sites & Factories', description: 'Production floors, machinery spaces & logistics routes', icon: 'Factory' },
    { category: 'Schools, Colleges & Hostels', description: 'Classroom corridors, stairwells & campus muster zones', icon: 'GraduationCap' },
    { category: 'Commercial Offices & IT Parks', description: 'Multi-floor office layouts, server rooms & exit corridors', icon: 'Building2' },
    { category: 'Hospitals & Healthcare Facilities', description: 'Patient corridors, stairways & emergency exit pathways', icon: 'Cross' },
    { category: 'Residential Societies & High-Rises', description: 'Common stairwells, parking areas & resident awareness', icon: 'Home' },
    { category: 'Warehouses & Logistics Hubs', description: 'Loading bays, storage aisles & high-rack safety zones', icon: 'Boxes' },
    { category: 'Government & Administrative Offices', description: 'Public visitor entrances, hall clearances & staff safety', icon: 'Landmark' },
  ],

  awarenessShowcase: {
    title: 'Bilingual Creative Safety Posters',
    lead: 'Designed in our brand palette in Hindi and English. Clear visual hierarchy with life-saving takeaways.',
    posters: [
      {
        id: 'fire-pass-method',
        title: 'How to Use a Fire Extinguisher (PASS Method)',
        titleHindi: 'अग्निशामक का उपयोग कैसे करें (PASS विधि)',
        category: 'Fire' as const,
        summary: 'Pull the pin, Aim at base, Squeeze the lever, Sweep side to side. Clear bilingual instructions for rapid action.',
        tagline: 'Act quick, act right.',
        dimensions: 'A2 / A3 / Vinyl Board',
        languagesAvailable: ['Hindi', 'English'],
      },
      {
        id: 'electrical-hazard-safety',
        title: 'Electrical Safety at Work & Home',
        titleHindi: 'कार्यस्थल और घर पर विद्युत सुरक्षा',
        category: 'Electrical' as const,
        summary: 'Avoid overloading sockets, report exposed wires immediately, and never touch electrical switches with wet hands.',
        tagline: 'Electricity serves you. Respect its danger.',
        dimensions: 'A2 / A3 / Laminated Poster',
        languagesAvailable: ['Hindi', 'English'],
      },
      {
        id: 'emergency-evacuation-rules',
        title: 'Emergency Evacuation: Do’s & Don’ts',
        titleHindi: 'आपातकालीन निकास: क्या करें और क्या न करें',
        category: 'Workplace' as const,
        summary: 'Never use elevators during fire alarms. Walk calmly, leave heavy belongings behind, and assemble at the marked muster point.',
        tagline: 'In an emergency, every second counts.',
        dimensions: 'A1 / A2 Acrylic Board',
        languagesAvailable: ['Hindi', 'English'],
      },
      {
        id: 'road-commute-safety',
        title: 'Two-Wheeler & Commute Safety',
        titleHindi: 'दोपहिया और दैनिक यात्रा सुरक्षा',
        category: 'Road' as const,
        summary: 'Fasten helmet straps securely, observe premises speed limits, avoid mobile phone distractions while driving.',
        tagline: 'Speed gives a thrill, but safety saves lives.',
        dimensions: 'A2 / A3 Outdoor Flex',
        languagesAvailable: ['Hindi', 'English'],
      },
    ],
  },

  eventsSection: {
    title: 'Workshops, Drills & Awareness Programs',
    lead: 'Interactive sessions led for employees, students, and resident communities.',
    programs: [
      {
        id: 'workplace-workshop',
        title: 'Workplace Emergency Response Workshop',
        category: 'Corporate & Industrial',
        targetGroup: 'Office staff, supervisors, workers',
        duration: 'Half-day workshop (2.5 to 3 hours)',
        format: 'Hands-on practical demonstration + classroom briefing',
        overview: 'Teaches staff how to spot hazards, operate basic fire extinguishers, and lead colleagues to safety.',
        keyTopics: [
          'Classification of fire hazards',
          'Extinguisher discharge mechanics (Hands-on training)',
          'Calling local emergency services with precise site coordinates',
          'Evacuation order and floor sweep procedures',
        ],
      },
      {
        id: 'school-preparedness',
        title: 'Campus Emergency Preparedness Session',
        category: 'Educational Institutions',
        targetGroup: 'School teachers, administrators, staff, students',
        duration: 'Guided school session (90 to 120 mins)',
        format: 'Interactive talk + guided evacuation drill',
        overview: 'Instills calm discipline in children and teenagers, training teachers on accountability rosters.',
        keyTopics: [
          'Recognizing alarm sounds and keeping calm',
          'Single-file stairwell descent without pushing',
          'Teacher headcounts at outdoor assembly zones',
        ],
      },
      {
        id: 'residential-drill',
        title: 'Residential High-Rise Fire Safety Session',
        category: 'Residential Societies',
        targetGroup: 'Apartment owners, security staff',
        duration: 'Society session (60 to 90 mins)',
        format: 'Courtyard demonstration + staircase walk',
        overview: 'Helps housing societies organize resident emergency wardens and clear common corridors.',
        keyTopics: [
          'Common stairwell smoke barriers and door seals',
          'LPG cylinder safety and kitchen caution',
          'Elderly and infant assistance during emergencies',
        ],
      },
    ],
  },

  escapePlanningDetails: {
    hero: {
      title: 'Emergency Escape Route Planning & Evacuation Mapping',
      subtitle: 'Clear, legible, premises-tailored evacuation diagrams and assembly strategies for commercial buildings, educational institutions, and industrial plants in Ranchi and across Jharkhand.',
    },
    whyItMatters: 'In a real emergency with smoke, power outages, and anxiety, panic occurs when people do not know where to go. A well-designed, prominently placed evacuation map gives occupants immediate directional clarity.',
    deliverables: [
      {
        title: 'Architectural Floor-Plan Evacuation Diagrams',
        description: 'Clean 2D schematic layouts of your floors showing current location ("YOU ARE HERE"), primary escape routes, secondary escape routes, fire alarm call points, and extinguisher locations.',
      },
      {
        title: 'Exit & Stairwell Directional Signage Plan',
        description: 'Optimal positioning layout for photoluminescent (glow-in-the-dark) exit signs and directional arrows visible in sudden power outages.',
      },
      {
        title: 'Outdoor Assembly Point Designation',
        description: 'Identification of safe outdoor zones far enough from building collapse or smoke paths, with durable outdoor assembly point markers for headcounts.',
      },
      {
        title: 'Evacuation Drill & Marshalling Manual',
        description: 'Practical guidance booklet outlining warden duties, floor sweep checklists, visitor assistance protocols, and mock drill execution frequencies.',
      },
    ],
    sampleMapSpecs: {
      title: 'Standard SMS Evacuation Map Specification',
      features: [
        'High-contrast color scheme (Green escape vectors, Red fire equipment, Blue assembly zones)',
        'Bilingual text support (Hindi & English room and exit labels)',
        'Oriented to viewer perspective (map is rotated to match the direction the viewer faces)',
        'Weather-resistant framing options (acrylic, brushed aluminium, and snap-lock frames)',
        'Photoluminescent substrate option for low-light visibility',
      ],
    },
    faqs: [
      {
        question: 'What information do we need to provide to start an escape plan?',
        answer: 'A copy of your premises layout, CAD drawing, architectural blueprint, or sketch. Our team can also conduct a physical site survey in Ranchi and surrounding areas to map doors, partitions, and staircases.',
      },
      {
        question: 'Where should evacuation maps be placed inside our building?',
        answer: 'Evacuation diagrams should be mounted at every entrance, near passenger lifts, at staircase landings, in common corridors, cafeteria areas, and major intersection points.',
      },
      {
        question: 'Do you help us conduct a practical mock evacuation drill after installing maps?',
        answer: 'Yes, we conduct guided drills where our advisors observe the evacuation flow, measure timing, identify bottlenecks, and present a practical debrief.',
      },
    ],
  },

  equipmentCatalogue: [
    {
      id: 'fire-safety',
      title: 'Fire Safety Equipment',
      description: 'Extinguishers, fire blankets, extinguisher stands, and inspection tags suited for offices, schools, and factories.',
      iconName: 'Flame',
      items: [
        {
          name: 'ABC Dry Powder Fire Extinguisher',
          description: 'Multi-purpose extinguisher suitable for Class A (wood, paper), Class B (flammable liquids), and Class C (gases & electrical hazards).',
          usage: 'Offices, corridors, workshops, residential buildings.',
          specs: 'Stored pressure, brass valve, pressure gauge, wall mounting bracket included.',
        },
        {
          name: 'CO2 Carbon Dioxide Extinguisher',
          description: 'Leaves no residue. Ideal for electrical equipment, server racks, switchboards, and sensitive electronics.',
          usage: 'Electrical panels, data rooms, computer labs, generator rooms.',
          specs: 'High-pressure steel cylinder, non-conductive discharge horn.',
        },
        {
          name: 'Fire Blankets',
          description: 'Woven fiberglass fabric designed to smother small kitchen grease fires or wrap around clothing fires.',
          usage: 'Pantry areas, kitchen facilities, laboratory rooms.',
          specs: 'Quick-release pull tabs, flame-retardant wall casing.',
        },
        {
          name: 'Extinguisher Floor Stands & Covers',
          description: 'Protects cylinders, keeps equipment visible and accessible across high-traffic floors.',
          usage: 'Factory floors, parking lots, generator sheds.',
          specs: 'Powder-coated steel or heavy polyethylene.',
        },
      ],
    },
    {
      id: 'first-aid',
      title: 'First-Aid & Emergency Supplies',
      description: 'Workplace first-aid boxes and basic emergency care supplies for rapid first response.',
      iconName: 'HeartPulse',
      items: [
        {
          name: 'Workplace First-Aid Box',
          description: 'Stocked with sterile gauze, roller bandages, adhesive plaster, antiseptic lotion, burn dressing, and trauma shears.',
          usage: 'Offices, construction sites, manufacturing floors, school clinics.',
          specs: 'Durable wall-mountable lockable metallic box with inventory card.',
        },
      ],
    },
    {
      id: 'ppe',
      title: 'Personal Protective Equipment (PPE)',
      description: 'Protective gear for site supervisors, facility workers, and maintenance teams.',
      iconName: 'HardHat',
      items: [
        {
          name: 'Industrial Safety Helmets with Ratchet Suspension',
          description: 'High-density polyethylene shell protecting against overhead impacts and debris.',
          usage: 'Construction sites, manufacturing plants, maintenance yards.',
          specs: 'Adjustable headband, chin strap included.',
        },
        {
          name: 'High-Visibility Reflective Safety Vests',
          description: 'Bright fluorescent fabric with dual reflective strips ensuring visibility in daylight and vehicle headlights.',
          usage: 'Traffic wardens, site visitors, loading yards, warehouse staff.',
          specs: 'Breathable polyester, velcro front closure.',
        },
        {
          name: 'Impact & Eye Defense Goggles',
          description: 'Wrap-around clear polycarbonate goggles with anti-scratch coating.',
          usage: 'Grinding, chemical handling, school science labs.',
          specs: 'Wide elastic strap, indirect ventilation ports.',
        },
        {
          name: 'Heavy-Duty Work Gloves',
          description: 'Ergonomic gloves offering grip and abrasion protection during material handling.',
          usage: 'Metal fabrication, loading docks, general maintenance.',
          specs: 'Reinforced palms, breathable back.',
        },
      ],
    },
    {
      id: 'signage',
      title: 'Safety Signage & Glow Markers',
      description: 'Photoluminescent exit indicators, assembly point boards, and hazard warning signs.',
      iconName: 'Signpost',
      items: [
        {
          name: 'Photoluminescent Glow-in-the-Dark Exit Signs',
          description: 'Glows for hours during sudden power blackouts, pointing occupants toward stairs and doors.',
          usage: 'Corridors, stairwells, basements, emergency exit doorways.',
          specs: 'Rigid PVC or aluminum sheet, high luminosity grade.',
        },
        {
          name: 'Emergency Assembly Point Outdoor Sign Boards',
          description: 'Large, high-contrast weatherproof signboard marking the designated safe muster area.',
          usage: 'Open grounds, parking areas, perimeter boundary gates.',
          specs: 'Reflective vinyl on heavy-gauge metal with mounting holes.',
        },
        {
          name: 'Hazard & Caution Signage',
          description: 'Clear graphical warning signs identifying high-voltage panels, fire equipment, and caution zones.',
          usage: 'Utility rooms, server rooms, chemical stores, workshop entrances.',
          specs: 'Bilingual English & Hindi text with standard symbols.',
        },
      ],
    },
  ],

  about: {
    hero: {
      title: 'About Safety Management Solutions',
      subtitle: 'Dedicated to making workplaces, campuses, and communities in Jharkhand and Eastern India safer through practical planning, real equipment, and everyday awareness.',
    },
    story: {
      heading: 'Our Story & Ethos',
      paragraphs: [
        'Safety Management Solutions (SMS) was founded in Ranchi, Jharkhand with a simple conviction: genuine safety does not come from complicated paperwork. Real safety happens when people understand risks, when clear evacuation paths exist, and when functional safety equipment is within reach.',
        'Across our cities, industrial zones, and educational institutions, safety measures are often treated as an afterthought until an incident occurs. SMS was built to bridge this gap by offering practical, accessible, and dependable safety solutions for institutions of every size.',
        'Whether it is a school in Ranchi, a high-rise residential apartment complex, a manufacturing unit, or an office workspace, we approach each facility with careful attention to its unique physical layout, foot traffic, and practical needs.',
      ],
    },
    mission: {
      heading: 'Our Mission & Vision',
      missionText: 'To equip organizations and communities across Eastern India with the knowledge, emergency escape architecture, and equipment required to prevent accidents and protect lives during critical emergencies.',
      visionText: 'A culture where safety is recognized as a shared, everyday responsibility — where every employee, student, and citizen feels confident knowing how to respond calmly and safely when emergencies arise.',
    },
    values: [
      {
        title: 'Practical Action Over Jargon',
        description: 'We believe in straightforward, actionable safety advice that building occupants and workers can readily understand and apply.',
      },
      {
        title: 'Premises Respect',
        description: 'No two buildings are identical. We respect your physical layout, constraints, and daily operations when designing safety plans.',
      },
      {
        title: 'Ongoing Stewardship',
        description: 'Safety equipment requires continuous upkeep. We encourage regular checks and refresher drills so readiness never lapses.',
      },
      {
        title: 'Local Responsiveness',
        description: 'Rooted right here in Walking Street, Ranchi, we offer prompt on-site visits and dependable local service across Jharkhand.',
      },
    ],
    directorMessage: {
      name: 'Sabir Hussain',
      role: 'Director, Safety Management Solutions',
      location: 'Ranchi, Jharkhand',
      quote: 'Safety is not something you purchase once and forget. It is an active culture that starts with personal vigilance and clear preparation. When an emergency happens, seconds decide outcomes. Our commitment at SMS is to ensure your people know where to go, what to do, and have the right equipment ready to save lives.',
    },
    logoMeaning: {
      title: 'The Symbolism of Our Logo',
      lead: 'Every element in the Safety Management Solutions emblem represents a cornerstone of our philosophy:',
      elements: [
        {
          element: 'The Protective Shield',
          meaning: 'Represents shelter, institutional security, and our defense of human life and premises against preventable harm.',
        },
        {
          element: 'The Running Figure',
          meaning: 'Symbolizes escape, rapid life safety, and the vital importance of clear, unobstructed emergency evacuation routes.',
        },
        {
          element: 'The Upward Arrow',
          meaning: 'Denotes continuous progress, proactive vigilance, and lifting community safety benchmarks to higher standards.',
        },
        {
          element: 'The Orange Arc',
          meaning: 'A bold signal for active alertness, responsiveness, and prompt action when seconds matter most.',
        },
        {
          element: 'SMS Lettering',
          meaning: 'Anchors our identity in clean navy typography, representing stability, authority, and professional trust.',
        },
      ],
    },
  },

  testimonialsSection: {
    enabled: true,
    isPlaceholder: true,
    title: 'Verified Client Experiences',
    placeholderNotice: 'Verified client case summaries and facility walkthrough reports are published following completed on-site engagements. SMS maintains strict client privacy and does not publish unverified reviews.',
  },

  contactPage: {
    hero: {
      title: 'Get in Touch with SMS',
      subtitle: 'Schedule a premises walkthrough, request an equipment quotation, or discuss emergency evacuation planning for your facility in Ranchi and Eastern India.',
    },
    formTitle: 'Request a Safety Consultation',
    formSubtitle: 'Submit your requirements below and our safety advisory team in Ranchi will review your facility details and get back to you promptly.',
    servicesList: [
      'Safety Audits & Risk Assessments',
      'Evacuation Planning & Emergency Signage',
      'Safety Equipment, Fire Systems & PPE Supply',
      'Safety Event Hosting & Awareness Campaigns',
      'Emergency Mock Drills & Evacuation Simulations',
      'Specialized Electrical & Industrial Hazard Walkthroughs',
      'Contractor, Driver & Visitor Safety Inductions',
      'General Facility Consultation',
    ],
  },

  footer: {
    tagline: 'Safety starts with you',
    description: 'Workplace and community safety solutions across India, Helping organisations design clear evacuation routes, supply reliable safety equipment, and build everyday safety awareness',
    quickLinks: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services/' },
      { label: 'About Company', href: '/about/' },
      { label: 'Contact Us', href: '/contact/' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Service', href: '/terms/' },
    ],
    legalNotice: 'All guidance and services provided are aligned with good safety practices and premises-tailored recommendations. Statutory and regulatory compliance remains the respective responsibility of facility owners.',
    copyright: '© 2026 Safety Management Solutions (SMS). All rights reserved.',
  },

  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'October 2026',
    draftNotice: 'Notice: This privacy policy outlines standard inquiry and client communication practices. It is maintained for operational transparency and is updated periodically as services evolve.',
    sections: [
      {
        title: '1. Information We Collect',
        content: 'If you submit the website form, the details you choose to provide—such as your name, organization, phone number, email address, premises type, service interest, and message—are sent to Web3Forms to deliver your inquiry. If you contact us by phone or choose to message us on WhatsApp, you share the information you choose directly through those channels. Please do not include sensitive personal information in a general inquiry.',
      },
      {
        title: '2. How We Use Your Information',
        content: 'We use the information you provide solely to respond to your consultation requests, prepare safety equipment quotations, coordinate site visits in Ranchi and neighboring districts, and provide customer support.',
      },
      {
        title: '3. Data Sharing & Third Parties',
        content: 'The website inquiry form uses Web3Forms to transmit submissions to Safety Management Solutions. WhatsApp links open WhatsApp with generic starter text only; submitted form values are not placed in those links. These providers may process information under their own terms and privacy practices. Safety Management Solutions does not sell or rent your personal or business contact details.',
      },
      {
        title: '4. Contact Regarding Data',
        content: 'For any questions regarding your contact details or to request removal from our communications list, please contact Info@safetymanagementsolutions.in or call +91 9334701135.',
      },
    ],
  },

  termsOfService: {
    title: 'Terms of Service',
    lastUpdated: 'October 2026',
    draftNotice: 'Notice: These terms outline standard advisory, equipment supply, and walkthrough engagement frameworks for commercial clients in Eastern India.',
    sections: [
      {
        title: '1. Scope of Services',
        content: 'Safety Management Solutions provides safety awareness training, emergency escape route planning, safety equipment supply and management, and general safety walkthrough advisory. All guidance is premises-tailored and aligned with recognized good safety practices.',
      },
      {
        title: '2. Advisory Nature & Premises Responsibility',
        content: 'Our walkthroughs, evacuation diagrams, and suggestions are practical recommendations intended to improve life safety preparedness. Facility management retains statutory responsibility for structural integrity, electrical loads, and adherence to local municipal regulations.',
      },
      {
        title: '3. Equipment Supply & Maintenance',
        content: 'Safety equipment provided by SMS must be handled and operated according to standard manufacturer operating instructions. Routine inspections and servicing are vital to ensure continuous operational readiness.',
      },
      {
        title: '4. Jurisdiction',
        content: 'Any disputes arising out of services provided by Safety Management Solutions shall be subject to the exclusive jurisdiction of the competent courts in Ranchi, Jharkhand, India.',
      },
    ],
  },
};
