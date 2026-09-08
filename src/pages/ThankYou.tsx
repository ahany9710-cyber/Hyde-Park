import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { config } from '../config';
import { trackChannelConversion, trackConversion, trackCustomEvent } from '../utils/gtag';
import { wasMasterPlanPdfRequested } from '../utils/pdfDownload';

const CONVERSION_FIRED_KEY = 'hp_conversion_fired';

// TODO: replace with the real brochure/master-plan PDFs once available (public/*.pdf).
const BROCHURE_PDF_URL = './one-hyde-park-brochure.pdf';
const MASTER_PLAN_PDF_URL = './one-hyde-park-master-plan.pdf';

const BUDGET_OPTIONS = ['حتى 8 مليون', '8 – 15 مليون', '15 – 30 مليون', '30 مليون+'];
const TIMELINE_OPTIONS = ['أقل من شهر', '1 – 3 شهور', '3 – 6 شهور', 'لسه بستكشف'];

interface LeadState {
  phone?: string;
  unit?: string;
}

function buildVCard(name: string, phone: string): string {
  return ['BEGIN:VCARD', 'VERSION:3.0', `FN:${name}`, `TEL;TYPE=CELL:${phone}`, 'END:VCARD'].join('\n');
}

const ThankYou = () => {
  const location = useLocation();
  const state = (location.state || {}) as LeadState;
  const leadPhone = state.phone || `+20${config.phoneNumber.replace(/^0/, '')}`;
  const leadUnit = state.unit || 'وحدة في المشروع';

  const [budget, setBudget] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const pdfRequested = wasMasterPlanPdfRequested();

  useEffect(() => {
    let alreadyFired = false;
    try {
      alreadyFired = sessionStorage.getItem(CONVERSION_FIRED_KEY) === '1';
    } catch {
      alreadyFired = false;
    }

    if (alreadyFired) return;

    trackConversion();
    try {
      sessionStorage.setItem(CONVERSION_FIRED_KEY, '1');
    } catch {
      // sessionStorage unavailable; conversion still fired once this mount
    }
  }, []);

  const whatsappHref = () => {
    const message = `مرحباً، أنا مهتم بـ ${leadUnit} — رقمي ${leadPhone}. ممكن أعرف الأسعار الحالية وخطة السداد؟`;
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  const vCardHref = () => {
    // TODO: swap in the real sales agent name once provided.
    const vcard = buildVCard(`${config.brokerName} — فريق المبيعات`, `+20${config.phoneNumber.replace(/^0/, '')}`);
    return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
  };

  const handleFollowUpTap = (kind: 'budget' | 'timeline', value: string) => {
    if (kind === 'budget') setBudget(value);
    else setTimeline(value);
    trackCustomEvent(`thank_you_${kind}_tap`, { value });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            شكرًا، تم استلام طلبك.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            فريق {config.brokerName} سيتواصل معك قريبًا لتأكيد الأسعار المتاحة والبروشور وتفاصيل الـ EOI.
          </p>

          <div className="space-y-4 mb-10">
            <motion.a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackChannelConversion('whatsapp')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block w-full px-8 py-4 bg-hyde-forest text-white rounded-xl hover:bg-hyde-sage hover:text-hyde-forest transition-colors font-semibold shadow-lg"
            >
              فتح واتساب
            </motion.a>

            <a
              href={BROCHURE_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-3 border-2 border-hyde-forest text-hyde-forest rounded-xl hover:bg-hyde-mist transition-colors font-semibold"
            >
              تحميل البروشور PDF
            </a>

            {pdfRequested ? (
              <a
                href={MASTER_PLAN_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-8 py-3 border-2 border-hyde-forest text-hyde-forest rounded-xl hover:bg-hyde-mist transition-colors font-semibold"
              >
                تحميل الماستر بلان PDF
              </a>
            ) : null}

            <a
              href={vCardHref()}
              download="one-hyde-park-sales.vcf"
              className="block w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-hyde-sage hover:text-hyde-forest transition-colors font-semibold"
            >
              احفظ جهة اتصال {config.brokerName}
            </a>

            <Link
              to="/"
              className="block w-full px-8 py-3 text-gray-500 hover:text-hyde-forest transition-colors font-medium"
            >
              العودة للصفحة الرئيسية
            </Link>
          </div>

          {/* Optional follow-up: budget & timeline, asked after the conversion has fired */}
          <div className="text-right bg-hyde-mist rounded-2xl p-5">
            <p className="font-semibold text-hyde-forest mb-3 text-sm">
              (اختياري) عشان نجهزلك الأنسب — الميزانية التقريبية؟
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {BUDGET_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleFollowUpTap('budget', option)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                    budget === option
                      ? 'bg-hyde-forest text-white'
                      : 'bg-white text-hyde-forest border border-gray-300'
                  }`}
                  aria-pressed={budget === option}
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="font-semibold text-hyde-forest mb-3 text-sm">هتحب تتحرك امتى؟</p>
            <div className="flex flex-wrap gap-2">
              {TIMELINE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleFollowUpTap('timeline', option)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                    timeline === option
                      ? 'bg-hyde-forest text-white'
                      : 'bg-white text-hyde-forest border border-gray-300'
                  }`}
                  aria-pressed={timeline === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
