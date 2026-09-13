import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../config';
import { townsideHref } from '../paths';

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${config.formspreeFormId}`;

const UNITS = ['Side House', 'Icon', 'Prime', 'Grand', 'Signature', 'لسه بختار'];

function normalizePhone(raw: string) {
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.startsWith('0020')) digits = digits.slice(4);
  else if (digits.startsWith('20') && digits.length > 10) digits = digits.slice(2);
  if (digits.length === 10 && !digits.startsWith('0')) digits = `0${digits}`;
  return digits.slice(0, 11);
}

function isEgyptianMobile(phone: string) {
  return /^01[0125]\d{8}$/.test(phone);
}

const LeadForm = () => {
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState('لسه بختار');
  const [contactMethod, setContactMethod] = useState<'whatsapp' | 'call'>('whatsapp');
  const [error, setError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getThankYouPath = () => townsideHref('thank-you');

  const whatsappFallback = () => {
    const text = `مرحباً، أنا مهتم بـ ${unit} في El Patio Townside${phone ? ` — رقمي +20${phone.slice(1)}` : ''}. ممكن أعرف الأسعار وخطة السداد؟`;
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!isEgyptianMobile(phone)) {
      setError('رقم الموبايل غير صحيح — يرجى إدخال رقم مصري صحيح (01...)');
      phoneRef.current?.focus();
      return;
    }
    setIsSubmitting(true);
    try {
      const body = new FormData();
      body.append('phone', `+20${phone.slice(1)}`);
      body.append('interested_unit', unit);
      body.append('contact_method', contactMethod);
      body.append('project', 'El Patio Townside');
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body,
        headers: { Accept: 'application/json' },
        redirect: 'manual',
      });
      const success = res.ok || res.status === 301 || res.status === 302 || res.status === 303 || res.type === 'opaqueredirect';
      if (success) {
        navigate(getThankYouPath());
        return;
      }
      setIsSubmitting(false);
      setSubmitError('حدث خطأ أثناء الإرسال. جرب تاني أو كلمنا على واتساب مباشرة.');
    } catch {
      setIsSubmitting(false);
      setSubmitError('حدث خطأ أثناء الإرسال. جرب تاني أو كلمنا على واتساب مباشرة.');
    }
  };

  return (
    <section id="lead-form" className="w-full bg-lavista-cream px-4 py-6 md:py-8">
      <div className="mx-auto max-w-md">
        <div className="bg-white rounded-2xl border border-[#E4DCD0] px-4 py-5">
          <h2 className="text-[22px] font-bold text-lavista-ink leading-snug mb-2">
            استلم الأسعار وخطة السداد
          </h2>
          <p className="text-[14.5px] leading-relaxed text-[#5a6158] mb-5">
            رقمك فقط. فريق Flair Agency يبعتلك الأسعار والبروشور، وينسّق معاينة الموقع لو طلبت. لسنا المطور.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="phone" className="block text-sm font-semibold text-lavista-ink mb-2">
              رقم الموبايل
            </label>
            <div
              className="flex items-center gap-2 rounded-[13px] bg-white px-3 mb-1.5"
              style={{ border: `1.5px solid ${error ? '#8A2E1F' : '#161616'}` }}
            >
              <span className="text-[15px] text-[#5a6158] font-mono">+20</span>
              <span className="w-px h-[26px] bg-[#E4DCD0]" />
              <input
                ref={phoneRef}
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(normalizePhone(e.target.value));
                  if (error) setError('');
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  setPhone(normalizePhone(e.clipboardData.getData('text')));
                  if (error) setError('');
                }}
                placeholder="010 5555 0570"
                className="flex-1 min-h-[52px] bg-transparent outline-none text-[17px] text-lavista-ink font-mono"
              />
            </div>
            {error ? (
              <p className="text-[13px] text-[#8A2E1F] mb-4">{error}</p>
            ) : (
              <div className="mb-4" />
            )}

            <p className="block text-sm font-semibold text-lavista-ink mb-2">الوحدة المهتم بها</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {UNITS.map((item) => {
                const selected = unit === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setUnit(item)}
                    aria-pressed={selected}
                    className={`rounded-full px-[15px] py-[11px] text-sm ${
                      selected ? 'bg-lavista-ink text-white font-semibold' : 'bg-lavista-cream border border-[#DDD8CA]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <p className="block text-sm font-semibold text-lavista-ink mb-2">تحب نتواصل إزاي؟</p>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {([
                { id: 'whatsapp' as const, label: 'واتساب' },
                { id: 'call' as const, label: 'مكالمة' },
              ]).map((item) => {
                const selected = contactMethod === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setContactMethod(item.id)}
                    aria-pressed={selected}
                    className={`min-h-[50px] rounded-[13px] text-[15px] ${
                      selected
                        ? 'bg-lavista-sand text-lavista-ink font-bold'
                        : 'bg-white text-lavista-ink font-semibold border-[1.5px] border-[#DDD8CA]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {submitError && (
              <div className="rounded-xl mb-4 px-3.5 py-3 border border-[#8A2E1F] bg-[rgba(138,46,31,0.08)]">
                <p className="text-[13.5px] text-[#8A2E1F] mb-2">{submitError}</p>
                <a
                  href={whatsappFallback()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full min-h-[44px] bg-lavista-ink text-white font-semibold rounded-lg text-sm"
                >
                  تواصل معنا على واتساب بدلاً من ذلك
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[56px] rounded-[14px] bg-lavista-ink text-white font-bold text-[17px] disabled:opacity-80"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'ابعت الأسعار والبروشور'}
            </button>
            <p className="text-center mt-3 text-[13px] leading-relaxed text-[#6b7269]">
              بالإرسال بتوافق إن Flair Agency تتواصل معاك خلال ساعات العمل بخصوص الاستفسار ده. مش بنبيع بياناتك.{' '}
              <Link to={townsideHref('privacy')} className="underline">سياسة الخصوصية</Link>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
