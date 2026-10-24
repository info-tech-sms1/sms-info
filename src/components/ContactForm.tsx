import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config/siteConfig';
import { siteContent } from '../content/siteContent';
import { Send, CheckCircle2, AlertCircle, Phone, MessageSquare, Loader2 } from 'lucide-react';

interface ContactFormProps {
  initialService?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    service: initialService || siteContent.contactPage.servicesList[0],
    premisesType: 'Commercial Offices & IT Parks',
    message: '',
  });

  // Sync initialService when navigated from an "Enquire" button on service/equipment cards
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'config_needed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const honeypotRef = useRef<HTMLInputElement>(null);
  const successStatusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitStatus === 'success') {
      successStatusRef.current?.focus();
    }
  }, [submitStatus]);

  // Client-side validations
  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name.';
    }
    if (!formData.organization.trim()) {
      errors.organization = 'Please provide your organization, school or facility name.';
    }
    const digitsOnly = formData.phone.replace(/\D/g, '');
    const hasLetters = /[a-zA-Z]/.test(formData.phone);
    if (!digitsOnly || digitsOnly.length < 10 || digitsOnly.length > 15 || hasLetters) {
      errors.phone = 'Please enter a valid 10-digit phone number without letters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide at least 10 characters describing your premises or inquiry.';
    }
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      organization: true,
      phone: true,
      email: true,
      message: true,
    });

    if (!isValid) {
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.focus();
      }
      return;
    }

    // The client check is only a first layer; Web3Forms also receives its honeypot field.
    if (honeypotRef.current?.checked) return;

    setSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Check if configuration placeholder is still active (Strictly honest, zero fake success)
    if (!siteConfig.web3FormsAccessKey || siteConfig.web3FormsAccessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      setSubmitting(false);
      setSubmitStatus('config_needed');
      return;
    }

    try {
      const response = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: siteConfig.web3FormsAccessKey,
          subject: `New Safety Inquiry from ${formData.name} (${formData.organization})`,
          from_name: formData.name,
          organization: formData.organization,
          phone: formData.phone,
          email: formData.email,
          service_requested: formData.service,
          premises_type: formData.premisesType,
          message: formData.message,
          botcheck: '',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Submission was rejected by the server.');
      }
    } catch (err: unknown) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'A network error occurred while connecting to the server.');
    } finally {
      setSubmitting(false);
    }
  };

  // Keep personal details out of the WhatsApp URL, browser history, and external request logs.
  const whatsAppMessage = encodeURIComponent('Hello SMS Team, I would like to discuss a safety inquiry.');

  // Combine standard services with preselected option if unique
  const serviceOptions = Array.from(
    new Set([formData.service, ...siteContent.contactPage.servicesList])
  );

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#0F2C47]">
          {siteContent.contactPage.formTitle}
        </h3>
        <p className="text-[14px] text-slate-600 mt-1">
          {siteContent.contactPage.formSubtitle}
        </p>
      </div>

      {/* Status Notifications (Polite Live Region for Assistive Technology) */}
      <div aria-live="polite" aria-atomic="true">
        {/* Configuration Mode Notification (Honest state, never fake success) */}
        {submitStatus === 'config_needed' && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[13px]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-amber-950">
                  Form Endpoint Configuration Note
                </p>
                <p className="text-amber-800 leading-relaxed">
                  The form is ready, but your production access key is pending in <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-medium">src/config/siteConfig.ts</code>.
                </p>
                <p className="text-amber-800 leading-relaxed">
                  You can start a WhatsApp chat and choose what details to share there:
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`${siteContent.contact.whatsAppUrl}?text=${whatsAppMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-[13px] font-bold rounded-lg hover:bg-[#1EBE5D] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp (+91 93347 01135)</span>
                  </a>
                  <a
                    href={`tel:${siteContent.contact.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F2C47] text-white text-[13px] font-bold rounded-lg hover:bg-[#1A456F] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#F4974C]" />
                    <span>Call Us Directly</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submission Failure Notification (Honest Error State) */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-[13px]">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-semibold text-red-950">
                  Inquiry Delivery Failed
                </p>
                <p className="text-red-800 leading-relaxed">
                  {errorMessage || 'We were unable to deliver your message due to a connection or server error.'}
                </p>
                <p className="text-red-800 leading-relaxed">
                  Please contact our Ranchi office directly to ensure your inquiry is received immediately:
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`${siteContent.contact.whatsAppUrl}?text=${whatsAppMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white text-[13px] font-bold rounded-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${siteContent.contact.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0F2C47] text-white text-[13px] font-bold rounded-lg"
                  >
                    <Phone className="w-4 h-4 text-[#F4974C]" />
                    <span>Call +91 93347 01135</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Genuine Success State */}
      {submitStatus === 'success' ? (
        <div
          ref={successStatusRef}
          role="status"
          tabIndex={-1}
          className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-4 animate-in fade-in focus:outline-none"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-lg font-bold text-emerald-950">
            Inquiry Successfully Received
          </h4>
          <p className="text-[14px] text-emerald-800 max-w-md mx-auto leading-relaxed">
            Thank you, {formData.name}. Our safety advisory team in Ranchi has received your inquiry for <strong>{formData.organization}</strong>.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 text-[13px]">
            <a
              href={`${siteContent.contact.whatsAppUrl}?text=${whatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Follow up on WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setSubmitStatus('idle');
                setFormData({
                  name: '',
                  organization: '',
                  phone: '',
                  email: '',
                  service: siteContent.contactPage.servicesList[0],
                  premisesType: 'Commercial Offices & IT Parks',
                  message: '',
                });
              }}
              className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        /* Form Inputs */
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-[13px] font-semibold text-slate-700 mb-1">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                placeholder="e.g. Ramesh Kumar"
                autoComplete="name"
                maxLength={80}
                aria-required="true"
                aria-invalid={touched.name && !!errors.name}
                aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4974C]/30 ${
                  touched.name && errors.name
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#275079]'
                }`}
                required
              />
              {touched.name && errors.name && (
                <span id="name-error" role="alert" className="text-[13px] text-red-600 mt-1 block">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Organization Name */}
            <div>
              <label htmlFor="organization" className="block text-[13px] font-semibold text-slate-700 mb-1">
                Organization / Facility Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                onBlur={() => handleBlur('organization')}
                placeholder="e.g. Ranchi Public School / Apex Engineering"
                autoComplete="organization"
                maxLength={100}
                aria-required="true"
                aria-invalid={touched.organization && !!errors.organization}
                aria-describedby={touched.organization && errors.organization ? 'organization-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4974C]/30 ${
                  touched.organization && errors.organization
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#275079]'
                }`}
                required
              />
              {touched.organization && errors.organization && (
                <span id="organization-error" role="alert" className="text-[13px] text-red-600 mt-1 block">
                  {errors.organization}
                </span>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-[13px] font-semibold text-slate-700 mb-1">
                Phone / WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                maxLength={20}
                value={formData.phone}
                onChange={handleChange}
                onBlur={() => handleBlur('phone')}
                placeholder="e.g. 9876543210"
                aria-required="true"
                aria-invalid={touched.phone && !!errors.phone}
                aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] transition-colors tabular-nums focus:outline-none focus:ring-2 focus:ring-[#F4974C]/30 ${
                  touched.phone && errors.phone
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#275079]'
                }`}
                required
              />
              {touched.phone && errors.phone && (
                <span id="phone-error" role="alert" className="text-[13px] text-red-600 mt-1 block">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[13px] font-semibold text-slate-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                maxLength={100}
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="e.g. contact@yourfirm.com"
                aria-required="true"
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4974C]/30 ${
                  touched.email && errors.email
                    ? 'border-red-400 bg-red-50/20'
                    : 'border-slate-300 focus:border-[#275079]'
                }`}
                required
              />
              {touched.email && errors.email && (
                <span id="email-error" role="alert" className="text-[13px] text-red-600 mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-[13px] font-semibold text-slate-700 mb-1">
                Service Required
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] bg-white focus:outline-none focus:border-[#275079] focus:ring-2 focus:ring-[#F4974C]/30"
              >
                {serviceOptions.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </div>

            {/* Premises Type */}
            <div>
              <label htmlFor="premisesType" className="block text-[13px] font-semibold text-slate-700 mb-1">
                Premises / Facility Type
              </label>
              <select
                id="premisesType"
                name="premisesType"
                value={formData.premisesType}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-[14px] bg-white focus:outline-none focus:border-[#275079] focus:ring-2 focus:ring-[#F4974C]/30"
              >
                {siteContent.sectorsServed.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Spam Prevention Honeypot (hidden from human visitors) */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            <label htmlFor="botcheck">Do not fill this field</label>
            <input
              type="checkbox"
              id="botcheck"
              name="botcheck"
              ref={honeypotRef}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Message Area */}
          <div>
            <label htmlFor="message" className="block text-[13px] font-semibold text-slate-700 mb-1">
              Premises Details or Specific Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1500}
              value={formData.message}
              onChange={handleChange}
              onBlur={() => handleBlur('message')}
              placeholder="Describe your building floors, approximate area, or whether you need evacuation planning, equipment supply, or staff workshops."
              aria-required="true"
              aria-invalid={touched.message && !!errors.message}
              aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-[14px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#F4974C]/30 ${
                touched.message && errors.message
                  ? 'border-red-400 bg-red-50/20'
                  : 'border-slate-300 focus:border-[#275079]'
              }`}
              required
            />
            {touched.message && errors.message && (
              <span id="message-error" role="alert" className="text-[13px] text-red-600 mt-1 block">
                {errors.message}
              </span>
            )}
          </div>

          {/* Privacy Note & Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-[12px] text-slate-500 leading-relaxed max-w-sm">
              If submitted, your details are sent to Web3Forms to deliver your inquiry to our Ranchi team. Share only what is needed; see our <a href="/privacy/" className="underline">privacy notice</a>.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F4974C] hover:bg-[#F0853F] active:bg-[#E57737] text-[#0F2C47] text-[14px] font-bold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2C47]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#0F2C47]" />
                  <span>Sending Inquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Consultation Request</span>
                  <Send className="w-4 h-4 text-[#0F2C47]" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
