import React, { useEffect, useRef } from 'react';
import { PosterItem } from '../content/siteContent';
import { X, MessageSquare } from 'lucide-react';
import { siteContent } from '../content/siteContent';

interface PosterModalProps {
  poster: PosterItem | null;
  onClose: () => void;
  onEnquire: (posterTitle: string) => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({
  poster,
  onClose,
  onEnquire,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!poster) {
      if (wasOpenRef.current) {
        if (openerRef.current?.isConnected) {
          openerRef.current.focus();
        }
        openerRef.current = null;
        wasOpenRef.current = false;
      }
      return;
    }

    if (!wasOpenRef.current) {
      const activeElement = document.activeElement;
      openerRef.current = activeElement instanceof HTMLElement ? activeElement : null;
      wasOpenRef.current = true;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
    };
  }, [poster]);

  // Escape key handler to close dialog
  useEffect(() => {
    if (!poster) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [poster, onClose]);

  // Focus trap inside modal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  if (!poster) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1B2B]/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="poster-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={dialogRef}
        onKeyDown={handleKeyDown}
        className="bg-[#0F2C47] border border-[#336E95] text-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 focus:outline-none"
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#1A456F] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
          aria-label="Close poster preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs text-[#62B5DA] font-semibold uppercase tracking-wider mb-2">
          <span>{poster.category} Safety Campaign</span>
          <span className="text-slate-500">·</span>
          <span>Bilingual Poster</span>
        </div>

        <h2 id="poster-modal-title" className="text-xl sm:text-2xl font-bold text-white mb-4">
          {poster.title}
        </h2>

        {/* Poster Visual Presentation Canvas */}
        <div className="bg-[#0B1B2B] rounded-xl border border-[#1A456F] p-6 sm:p-8 mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          {/* Subtle Graphic Border Frame */}
          <div className="w-full max-w-md border-4 border-[#F4974C] rounded-lg p-6 bg-gradient-to-b from-[#1A456F] to-[#0F2C47] shadow-lg">
            
            {/* Header Kicker on poster */}
            <div className="inline-block px-3 py-1 bg-[#F4974C] text-[#0F2C47] text-xs font-black uppercase rounded mb-4">
              SAFETY MANAGEMENT SOLUTIONS
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight mb-2">
              {poster.title}
            </h3>

            <p className="text-sm font-semibold text-[#62B5DA] italic mb-6">
              &ldquo;{poster.tagline}&rdquo;
            </p>

            <div className="bg-[#0F2C47]/90 rounded-md p-4 text-xs text-slate-200 text-left border border-[#336E95]/40 leading-relaxed mb-4">
              {poster.summary}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-[#336E95]/40">
              <span>Ranchi Office: +91 93347 01135</span>
              <span>Available in Hindi & English</span>
            </div>
          </div>
        </div>

        {/* Details & Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-[#1A456F] text-xs">
          <div className="p-3 bg-[#1A456F]/40 rounded-xl border border-[#336E95]/30">
            <span className="text-slate-400 block mb-1">Standard Sizes:</span>
            <span className="font-semibold text-white">{poster.dimensions}</span>
          </div>

          <div className="p-3 bg-[#1A456F]/40 rounded-xl border border-[#336E95]/30">
            <span className="text-slate-400 block mb-1">Languages:</span>
            <span className="font-semibold text-white">{poster.languagesAvailable.join(', ')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-3">
          <a
            href={`${siteContent.contact.whatsAppUrl}?text=${encodeURIComponent(`Hello SMS, I would like to inquire about ordering physical prints of the "${poster.title}" safety poster for our facility.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-slate-950 rounded-lg text-xs sm:text-sm font-bold transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <MessageSquare className="w-4 h-4 text-slate-950" />
            <span>Order Prints via WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onEnquire(poster.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4974C]"
          >
            Request Quotation
          </button>
        </div>

      </div>
    </div>
  );
};
