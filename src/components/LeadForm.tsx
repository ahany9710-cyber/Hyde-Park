import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from '../config';
import { getAdAttribution, trackChannelConversion, trackCustomEvent } from '../utils/gtag';
import { FORM_UNIT_OPTIONS, onUnitPreselectRequested, type FormUnitOption } from '../utils/unitSelection';
import { wasMasterPlanPdfRequested } from '../utils/pdfDownload';

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${config.formspreeFormId}`;

// TODO: real sales lead name and photo — placeholders until provided.
const SALES_AGENT_NAME = 'مسؤول المبيعات';

type ContactMethod = 'whatsapp' | 'call';

interface FormData {
  phone: string;
  unit: FormUnitOption | '';
  contactMethod: ContactMethod;
}

/** Strips non-digits and any pasted +20 / 0020 / 20 country-code prefix, returning the local 01… form. */
function sanitizePhoneInput(raw: string): string {
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('0020')) {
    digits = digits.slice(4);
  } else if (digits.startsWith('20') && digits.length > 10) {
    digits = digits.slice(2);
  }
  if (digits.length === 10 && !digits.startsWith('0')) {
    digits = `0${digits}`;
  }
  return digits.slice(0, 11);
}

function isValidEgyptianMobile(local: string): boolean {
  return /^01[0125][0-9]{8}$/.test(local);
}

function toE164(local: string): string {
  return `+20${local.slice(1)}`;
}

const LeadForm = () => {
  const navigate = useNavigate();
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    unit: '',
    contactMethod: 'whatsapp',
  });
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => onUnitPreselectRequested((unit) => setFormData((prev) => ({ ...prev, unit }))), []);

  const getThankYouPath = (): string => {
    const base = (typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '').replace(/\.$/, '') || '/';
    return base === '/' ? '/thank-you' : `${base.replace(/\/$/, '')}/thank-you`;
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: sanitizePhoneInput(value) }));
    if (phoneError) setPhoneError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!isValidEgyptianMobile(formData.phone)) {
      setPhoneError('رقم الموبايل غير صحيح — يرجى إدخال رقم مصري صحيح (01...)');
      phoneInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    const pdfRequested = wasMasterPlanPdfRequested();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('phone', toE164(formData.phone));
      formDataToSend.append('interested_unit', formData.unit || 'لسه بختار');
      formDataToSend.append('contact_method', formData.contactMethod);
      if (pdfRequested) formDataToSend.append('master_plan_pdf_requested', '1');
      formDataToSend.append('_gotcha', '');

      // Name the ad that produced this lead
      Object.entries(getAdAttribution()).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formDataToSend,
        headers: { Accept: 'application/json' },
        redirect: 'manual',
      });
      const success =
        res.ok ||
        res.status === 301 ||
        res.status === 302 ||
        res.status === 303 ||
        res.type === 'opaqueredirect';

      if (success) {
        // Form-submit conversion fires once on /thank-you (see ThankYou.tsx), not here.
        if (formData.contactMethod === 'whatsapp') trackCustomEvent('lead_prefers_whatsapp');
        if (pdfRequested) trackCustomEvent('master_plan_pdf_delivered');
        navigate(getThankYouPath(), {
          state: { phone: toE164(formData.phone), unit: formData.unit || 'لسه بختار' },
        });
        return;
      }
      setIsSubmitting(false);
      setSubmitError('حدث خطأ أثناء الإرسال. جرب تاني أو كلمنا على واتساب مباشرة.');
    } catch {
      setIsSubmitting(false);
      setSubmitError('حدث خطأ أثناء الإرسال. جرب تاني أو كلمنا على واتساب مباشرة.');
    }
  };

  const whatsappFallbackHref = () => {
    const unitText = formData.unit || 'وحدة في المشروع';
    const phoneText = formData.phone ? toE164(formData.phone) : '';
    const message = `مرحباً، أنا مهتم بـ ${unitText}${phoneText ? ` — رقمي ${phoneText}` : ''}. ممكن أعرف الأسعار وخطة السداد؟`;
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="lead-form" className="w-full bg-hyde-mist" style={{ padding: '22px 16px 20px' }}>
      <div className="container mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl"
          style={{ border: '1px solid #E3DFD2', padding: '20px 16px' }}
        >
          <h3 className="font-bold text-hyde-forest mb-2" style={{ fontSize: '22px', lineHeight: 1.3 }}>
            استلم الأسعار وخطة السداد
          </h3>
          <p className="mb-5" style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#5a6158' }}>
            رقمك فقط — يرسل لك فريق {config.brokerName} الأسعار الحالية والبروشور على واتساب.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <label htmlFor="phone" className="block font-semibold mb-2" style={{ fontSize: '14px' }}>
              رقم الموبايل
            </label>
            <div
              className="flex items-center bg-white rounded-[13px] mb-1.5"
              style={{
                border: `1.5px solid ${phoneError ? '#8A2E1F' : '#1F3324'}`,
                padding: '0 12px',
                gap: '8px',
              }}
            >
              <span
                style={{ fontSize: '15px', color: '#5a6158', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
              >
                +20
              </span>
              <span style={{ width: '1px', height: '26px', background: '#E3DFD2' }} />
              <input
                ref={phoneInputRef}
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  handlePhoneChange(e.clipboardData.getData('text'));
                }}
                placeholder="010 5555 0570"
                aria-invalid={Boolean(phoneError)}
                aria-describedby={phoneError ? 'phone-error' : undefined}
                className="flex-1 bg-transparent outline-none"
                style={{
                  minHeight: '52px',
                  fontSize: '17px',
                  color: '#1F3324',
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                }}
              />
            </div>
            {phoneError ? (
              <p id="phone-error" className="mb-4" style={{ fontSize: '13px', color: '#8A2E1F' }}>
                {phoneError}
              </p>
            ) : (
              <div className="mb-4" />
            )}

            <label className="block font-semibold mb-2" style={{ fontSize: '14px' }}>
              الوحدة المهتم بها
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {FORM_UNIT_OPTIONS.map((option) => {
                const selected = formData.unit === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, unit: option }))}
                    className={`rounded-full ${selected ? 'bg-hyde-forest text-white font-semibold' : 'bg-hyde-mist'}`}
                    style={{ padding: '11px 15px', fontSize: '14px', border: selected ? undefined : '1px solid #DDD8CA' }}
                    aria-pressed={selected}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            <label className="block font-semibold mb-2" style={{ fontSize: '14px' }}>
              تحب نتواصل إزاي؟
            </label>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {(
                [
                  { id: 'whatsapp', label: 'واتساب' },
                  { id: 'call', label: 'مكالمة' },
                ] as { id: ContactMethod; label: string }[]
              ).map((method) => {
                const selected = formData.contactMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, contactMethod: method.id }))}
                    className={`rounded-[13px] flex items-center justify-center ${
                      selected ? 'bg-hyde-sage text-hyde-forest font-bold' : 'bg-white font-semibold'
                    }`}
                    style={{ minHeight: '50px', fontSize: '15px', border: selected ? undefined : '1.5px solid #DDD8CA' }}
                    aria-pressed={selected}
                  >
                    {method.label}
                  </button>
                );
              })}
            </div>

            {submitError ? (
              <div
                className="rounded-xl mb-4"
                style={{ padding: '12px 14px', background: 'rgba(138,46,31,0.08)', border: '1px solid #8A2E1F' }}
              >
                <p className="mb-2" style={{ fontSize: '13.5px', color: '#8A2E1F' }}>
                  {submitError}
                </p>
                <a
                  href={whatsappFallbackHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackChannelConversion('whatsapp')}
                  className="inline-flex items-center justify-center w-full bg-hyde-forest text-white font-semibold rounded-lg"
                  style={{ minHeight: '44px', fontSize: '14px' }}
                >
                  تواصل معنا على واتساب بدلاً من ذلك
                </a>
              </div>
            ) : null}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-hyde-forest text-white font-bold rounded-[14px] flex items-center justify-center"
              style={{ minHeight: '56px', fontSize: '17px', opacity: isSubmitting ? 0.8 : 1 }}
            >
              {isSubmitting ? 'جاري الإرسال...' : 'ابعت الأسعار والبروشور'}
            </motion.button>

            <p className="text-center mt-3" style={{ fontSize: '13px', lineHeight: 1.6, color: '#6b7269' }}>
              نحاول التواصل في أقرب وقت خلال ساعات العمل · تُستخدم بياناتك للرد على استفسارك عن المشروع عبر {config.brokerName}
            </p>

            <div
              className="flex items-center gap-3 mt-5"
              style={{ paddingTop: '18px', borderTop: '1px solid #E3DFD2' }}
            >
              {/* TODO: real sales agent photo */}
              <div
                className="rounded-full shrink-0"
                style={{ width: '46px', height: '46px', background: '#F4F1E8', border: '1px solid #DDD8CA' }}
              />
              <div>
                <p className="font-bold text-hyde-forest" style={{ fontSize: '14.5px' }}>
                  {SALES_AGENT_NAME} - {config.brokerName}
                </p>
                <p style={{ fontSize: '13px', color: '#6b7269' }}>
                  هو اللي هيتواصل معاك — اتصل بنا
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadForm;
