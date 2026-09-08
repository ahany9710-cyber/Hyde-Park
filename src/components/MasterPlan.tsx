import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { requestMasterPlanPdf } from '../utils/pdfDownload';
import { trackCustomEvent } from '../utils/gtag';

const MASTER_PLAN_SRC = './images/one-hyde-park/master-plan.png';

// TODO: replace with real drive times from the sales team — these are placeholders.
const DISTANCES = [
  { label: 'الجامعة الأمريكية', value: '10 دقائق' },
  { label: 'الدائري الأوسطي', value: '5 دقائق' },
  { label: 'العاصمة الإدارية', value: '25 دقيقة' },
  { label: 'مطار القاهرة', value: '30 دقيقة' },
];

// TODO: these are approximate placeholder positions — align with the real
// zone boundaries in the master-plan artwork once available.
const ZONE_LABELS = [
  { label: 'فيلات', top: '18%', left: '20%' },
  { label: 'شقق ودوبلكس', top: '55%', left: '68%' },
  { label: 'المساحات الخضراء', top: '78%', left: '30%' },
];

const MasterPlan = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomed(false);
  };

  const handleDownloadPdf = () => {
    requestMasterPlanPdf();
    trackCustomEvent('master_plan_pdf_requested');
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="master-plan" className="w-full bg-hyde-forest" style={{ padding: '22px 16px 20px' }}>
      <div className="container mx-auto max-w-md">
        <h2 className="font-bold text-white mb-1.5" style={{ fontSize: '22px' }}>
          الماستر بلان
        </h2>
        <p className="mb-4" style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.72)' }}>
          238 فدان — هايد بارك التجمع الخامس
        </p>

        <div className="relative rounded-[14px] bg-hyde-mist mb-3.5" style={{ padding: '10px' }}>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block w-full rounded-lg overflow-hidden relative"
            aria-label="تكبير الماستر بلان"
          >
            <img
              src={MASTER_PLAN_SRC}
              alt="الماستر بلان لمشروع One Hyde Park"
              className="w-full object-contain"
              style={{ height: '230px' }}
              loading="lazy"
            />
            {ZONE_LABELS.map((zone) => (
              <span
                key={zone.label}
                className="absolute bg-hyde-forest/85 text-white rounded-full pointer-events-none"
                style={{ top: zone.top, left: zone.left, fontSize: '10.5px', padding: '3px 8px' }}
              >
                {zone.label}
              </span>
            ))}
          </button>
        </div>

        <p className="text-center mb-4" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
          اضغط للتكبير
        </p>

        {/* Distance strip */}
        <div
          className="grid rounded-xl overflow-hidden mb-4"
          style={{ gap: '1px', background: 'rgba(255,255,255,0.14)' }}
        >
          {DISTANCES.map((row) => (
            <div
              key={row.label}
              className="bg-hyde-forest flex items-center justify-between"
              style={{ padding: '12px 14px', fontSize: '14.5px' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.78)' }}>{row.label}</span>
              <span className="font-semibold text-white">{row.value}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="w-full text-hyde-sage font-bold rounded-[13px] flex items-center justify-center"
          style={{ minHeight: '52px', fontSize: '16px', border: '1.5px solid #8EB796', background: 'transparent' }}
        >
          حمّل الماستر بلان PDF
        </button>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/95"
            role="dialog"
            aria-modal="true"
            aria-label="الماستر بلان بالحجم الكامل"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 min-w-[48px] min-h-[48px] rounded-full bg-white/15 text-white flex items-center justify-center backdrop-blur-sm"
              aria-label="إغلاق"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              className="w-full h-full overflow-auto flex items-center justify-center p-4"
              style={{ touchAction: 'pinch-zoom' }}
            >
              <img
                src={MASTER_PLAN_SRC}
                alt="الماستر بلان لمشروع One Hyde Park"
                onClick={() => setZoomed((prev) => !prev)}
                className={
                  zoomed
                    ? 'max-w-none w-[220%] md:w-[160%] cursor-zoom-out'
                    : 'max-w-full max-h-full object-contain cursor-zoom-in'
                }
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MasterPlan;
