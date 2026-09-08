import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Listing } from '../data/listings';
import { mapChipLabelToFormUnit, requestUnitPreselect } from '../utils/unitSelection';

interface ListingsCarouselProps {
  /** Arabic h2, e.g. "الإطلاق الجديد" */
  title: string;
  /** Arabic sub-line under the h2 */
  subtitle: string;
  /** Payment band eyebrow, e.g. "خطة السداد — للمجموعة بالكامل" */
  paymentEyebrow: string;
  /** Payment band body, e.g. "5% مقدم · 5% بعد 3 شهور · تقسيط 10 سنوات · EOI 100,000 ج قابل للاسترداد" */
  paymentPlan: string;
  listings: Listing[];
}

const ListingsCarousel = ({ title, subtitle, paymentEyebrow, paymentPlan, listings }: ListingsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextListing = () => {
    setCurrentIndex((prev) => (prev + 1) % listings.length);
  };

  const prevListing = () => {
    setCurrentIndex((prev) => (prev - 1 + listings.length) % listings.length);
  };

  const scrollToForm = (listing: Listing) => {
    requestUnitPreselect(mapChipLabelToFormUnit(listing.chipLabel));
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const viewFloorPlan = (listing: Listing) => {
    if (listing.floorPlan) {
      window.open(listing.floorPlan, '_blank', 'noopener,noreferrer');
      return;
    }
    // No floor plan asset yet for this unit type — fall back to asking the team.
    requestUnitPreselect(mapChipLabelToFormUnit(listing.chipLabel));
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentListing = listings[currentIndex];

  return (
    <section className="w-full" style={{ padding: '22px 16px 20px' }}>
      <div className="container mx-auto max-w-md">
        <h2 className="font-bold text-hyde-forest mb-1.5" style={{ fontSize: '22px' }}>
          {title}
        </h2>
        <p className="mb-4" style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#5a6158' }}>
          {subtitle}
        </p>

        {/* Payment band */}
        <div className="bg-hyde-forest rounded-[14px] mb-4" style={{ padding: '14px 16px' }}>
          <p
            className="text-hyde-sage uppercase mb-2"
            style={{ fontSize: '12px', letterSpacing: '0.14em' }}
          >
            {paymentEyebrow}
          </p>
          <p className="text-white" style={{ fontSize: '15px', lineHeight: 1.6 }}>
            {paymentPlan}
          </p>
        </div>

        {/* Chip row */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-1" style={{ scrollbarWidth: 'none' }}>
          {listings.map((listing, index) => {
            const active = index === currentIndex;
            return (
              <button
                key={listing.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`shrink-0 rounded-full whitespace-nowrap ${
                  active ? 'bg-hyde-forest text-white font-bold' : 'bg-hyde-mist font-semibold'
                }`}
                style={{
                  padding: '9px 15px',
                  fontSize: '13.5px',
                  border: active ? undefined : '1px solid #DDD8CA',
                  color: active ? undefined : '#1F3324',
                }}
                aria-current={active}
              >
                {listing.chipLabel}
              </button>
            );
          })}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, { offset }) => {
              if (offset.x < -60) {
                nextListing();
              } else if (offset.x > 60) {
                prevListing();
              }
            }}
            className="bg-white rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
            style={{ border: '1px solid #E3DFD2' }}
          >
            <div className="bg-gray-100" style={{ height: '200px' }}>
              {currentListing.image ? (
                <img
                  src={currentListing.image}
                  alt={currentListing.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>
            <div style={{ padding: '16px' }}>
              <div className="flex items-baseline justify-between gap-2.5 mb-1">
                <h3 className="font-bold text-hyde-forest" style={{ fontSize: '20px' }}>
                  {currentListing.name}
                </h3>
                <span className="font-semibold" style={{ fontSize: '13.5px', color: '#5a6158' }}>
                  {currentListing.area}
                </span>
              </div>
              <p className="mb-3.5" style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#5a6158' }}>
                {currentListing.tagline}
              </p>
              <div
                className="flex items-baseline justify-between mb-3.5"
                style={{ padding: '12px 0', borderTop: '1px solid #E3DFD2', borderBottom: '1px solid #E3DFD2' }}
              >
                <span style={{ fontSize: '14px', color: '#5a6158' }}>تبدأ من</span>
                <span className="font-bold text-hyde-forest" style={{ fontSize: '20px' }}>
                  {currentListing.priceRange.replace(/^تبدأ من\s*/, '')}
                </span>
              </div>
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => scrollToForm(currentListing)}
                  className="w-full bg-hyde-forest text-white font-bold rounded-[13px] flex items-center justify-center"
                  style={{ minHeight: '52px', fontSize: '16px' }}
                >
                  اطلب تفاصيل الوحدة
                </button>
                <button
                  type="button"
                  onClick={() => viewFloorPlan(currentListing)}
                  className="w-full bg-white text-hyde-forest font-semibold rounded-[13px] flex items-center justify-center"
                  style={{ minHeight: '48px', fontSize: '15px', border: '1.5px solid #1F3324' }}
                >
                  شاهد الفلور بلان
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center mt-3.5" style={{ fontSize: '13px', color: '#6b7269' }}>
          {currentIndex + 1} من {listings.length} · اسحب للتالي
        </p>
      </div>
    </section>
  );
};

export default ListingsCarousel;
