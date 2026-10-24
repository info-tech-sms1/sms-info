import { useState, useEffect, lazy, Suspense, type ReactNode } from 'react';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { normalizePath, routesMeta, AppRoute } from './utils/router';
import { safeScrollTo, restoreScrollForRoute, registerLenis } from './utils/scroll';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const EvacuationPlanningPage = lazy(() => import('./pages/EvacuationPlanningPage').then(m => ({ default: m.EvacuationPlanningPage })));
const SafetyEquipmentPage = lazy(() => import('./pages/SafetyEquipmentPage').then(m => ({ default: m.SafetyEquipmentPage })));
const AwarenessEventsPage = lazy(() => import('./pages/AwarenessEventsPage').then(m => ({ default: m.AwarenessEventsPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export interface StaticRouteContext {
  navigateTo: (path: string) => void;
  selectService: (serviceName: string) => void;
  initialService: string;
}

export type StaticRouteRenderer = (path: AppRoute, context: StaticRouteContext) => ReactNode;

interface AppProps {
  initialPath?: string;
  staticRouteRenderer?: StaticRouteRenderer;
}

export default function App({ initialPath, staticRouteRenderer }: AppProps = {}) {
  const [currentPath, setCurrentPath] = useState<AppRoute>(() => {
    if (initialPath) {
      return normalizePath(initialPath);
    }
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const [preselectedService, setPreselectedService] = useState<string>('');

  // Configure browser scroll restoration for client-side routing
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Initialize Lenis Smooth Scrolling (respecting prefers-reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Register active Lenis instance so safeScrollTo and scroll restoration stay in sync
    registerLenis(lenis);

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  // Sync document title, meta descriptions, and canonical links on route changes
  useEffect(() => {
    const meta = routesMeta[currentPath];
    if (meta) {
      document.title = meta.title;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', meta.description);
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', meta.title);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', meta.description);
      }

      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      twitterTitle?.setAttribute('content', meta.title);

      const twitterDesc = document.querySelector('meta[name="twitter:description"]');
      twitterDesc?.setAttribute('content', meta.description);

      const ogUrl = document.querySelector('meta[property="og:url"]');
      ogUrl?.setAttribute('content', meta.canonical);

      const socialImage = `${window.location.origin}/og-image.jpg`;
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', socialImage);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', socialImage);

      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', meta.canonical);
      }
    }
  }, [currentPath]);

  // Scroll Restoration on Route Navigation (starts every new page at the top, or target anchor)
  useEffect(() => {
    restoreScrollForRoute();
  }, [currentPath]);

  // Listen for browser forward/back history events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    const target = normalizePath(path);
    if (target !== currentPath) {
      window.history.pushState({}, '', target);
      setCurrentPath(target);
    } else {
      // If clicking current route, smoothly scroll up to top
      safeScrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenConsultationWithService = (serviceName: string) => {
    setPreselectedService(serviceName);
  };

  const renderActivePage = () => {
    if (staticRouteRenderer) {
      return staticRouteRenderer(currentPath, {
        navigateTo,
        selectService: handleOpenConsultationWithService,
        initialService: preselectedService,
      });
    }

    switch (currentPath) {
      case '/':
        return (
          <HomePage 
            onNavigate={navigateTo} 
            onOpenConsultationWithService={handleOpenConsultationWithService}
          />
        );
      case '/services/':
        return (
          <ServicesPage 
            onNavigate={navigateTo} 
            onSelectService={handleOpenConsultationWithService}
          />
        );
      case '/evacuation-planning/':
        return <EvacuationPlanningPage onNavigate={navigateTo} />;
      case '/safety-equipment/':
        return <SafetyEquipmentPage onNavigate={navigateTo} onSelectEquipment={handleOpenConsultationWithService} />;
      case '/awareness-events/':
        return <AwarenessEventsPage onNavigate={navigateTo} onSelectService={handleOpenConsultationWithService} />;
      case '/about/':
        return <AboutPage onNavigate={navigateTo} />;
      case '/contact/':
        return <ContactPage initialService={preselectedService} />;
      case '/privacy/':
        return <PrivacyPolicyPage />;
      case '/terms/':
        return <TermsPage />;
      default:
        return <NotFoundPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0F2C47] text-slate-100 pb-16 sm:pb-0">
      {/* Accessible Skip Link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#F4974C] text-[#0F2C47] font-bold rounded-lg shadow-lg"
      >
        Skip to main content
      </a>

      {/* Persistent Global Header */}
      <Header currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Dynamic Viewport */}
      <main id="main-content" className="flex-1">
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center bg-[#0F2C47]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#336E95] border-t-[#F4974C] rounded-full animate-spin" />
                <span className="text-[13px] font-semibold text-[#62B5DA] tracking-wider uppercase">
                  Loading page...
                </span>
              </div>
            </div>
          }
        >
          {renderActivePage()}
        </Suspense>
      </main>

      {/* Floating Actions (WhatsApp & Mobile Bar) */}
      <FloatingActions />

      {/* Persistent Footer */}
      <Footer onNavigate={navigateTo} />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
