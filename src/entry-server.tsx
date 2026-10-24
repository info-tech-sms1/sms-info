import { renderToString } from 'react-dom/server';
import App, { type StaticRouteRenderer } from './App';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { EvacuationPlanningPage } from './pages/EvacuationPlanningPage';
import { SafetyEquipmentPage } from './pages/SafetyEquipmentPage';
import { AwarenessEventsPage } from './pages/AwarenessEventsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const renderStaticRoute: StaticRouteRenderer = (route, { navigateTo, selectService, initialService }) => {
  switch (route) {
    case '/':
      return <HomePage onNavigate={navigateTo} onOpenConsultationWithService={selectService} />;
    case '/services/':
      return <ServicesPage onNavigate={navigateTo} onSelectService={selectService} />;
    case '/evacuation-planning/':
      return <EvacuationPlanningPage onNavigate={navigateTo} />;
    case '/safety-equipment/':
      return <SafetyEquipmentPage onNavigate={navigateTo} onSelectEquipment={selectService} />;
    case '/awareness-events/':
      return <AwarenessEventsPage onNavigate={navigateTo} onSelectService={selectService} />;
    case '/about/':
      return <AboutPage onNavigate={navigateTo} />;
    case '/contact/':
      return <ContactPage initialService={initialService} />;
    case '/privacy/':
      return <PrivacyPolicyPage />;
    case '/terms/':
      return <TermsPage />;
    default:
      return <NotFoundPage onNavigate={navigateTo} />;
  }
};

export function renderRoute(path: string): string {
  return renderToString(
    <App initialPath={path} staticRouteRenderer={renderStaticRoute} />,
  );
}
