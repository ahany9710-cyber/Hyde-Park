import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { communities } from '../data/communities';

const CommunitiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % communities.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + communities.length) % communities.length);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const currentCommunity = communities[currentIndex];

  return (
    <section id="project-zones" className="w-full px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12 lg:pb-20 bg-gray-50">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              الماستر بلان
            </h2>
            <p className="text-gray-600">16% بناء، حديقة 25 فدان، كلوب هاوس، نادي، وتجاري على المحور</p>
          </div>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-lavista-sand text-lavista-ink rounded-xl font-semibold hover:bg-lavista-bronze transition-colors shadow-md whitespace-nowrap"
          >
            سجّل EOI
          </motion.button>
        </div>

        <figure className="mb-8 md:mb-10 overflow-hidden rounded-2xl bg-lavista-cream border border-black/5">
          <img
            src="./projects/el-patio-townside/images/masterplan.webp"
            alt="ماستر بلان El Patio Townside من بروشور المطور"
            className="w-full h-auto"
          />
          <figcaption className="px-4 py-2 text-xs text-gray-500">
            من بروشور المطور. Townside لسه في مرحلة اللونش، وده مش تصوير للموقع بعد التنفيذ.
          </figcaption>
        </figure>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation arrows - matching ListingsCarousel style */}
          <button
            onClick={prev}
            className="absolute lg:right-2 right-0 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 md:p-5 shadow-2xl bg-white rounded-full border-2 border-gray-200 hover:border-lavista-sand active:border-lavista-sand transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="السابق"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-lavista-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute lg:left-2 left-0 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 md:p-5 shadow-2xl bg-white rounded-full border-2 border-gray-200 hover:border-lavista-sand active:border-lavista-sand transition-all min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="التالي"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-lavista-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="relative overflow-hidden px-12 sm:px-16 md:px-20 lg:px-12">
            {/* Single card display for all screen sizes */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -500) next();
                  else if (swipe > 500) prev();
                }}
                className="w-full max-w-7xl mx-auto cursor-grab active:cursor-grabbing"
              >
                {/* Single large card with horizontal layout */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                    {/* Details column - order-2 on mobile (below image), order-1 on md+ (right side) */}
                    <div className="order-2 md:order-1 flex flex-col justify-between">
                      {/* Tags */}
                      {currentCommunity.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {currentCommunity.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full bg-lavista-cream text-lavista-ink"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {currentCommunity.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 flex-grow">
                        {currentCommunity.description}
                      </p>

                      {/* CTA Button */}
                      <button
                        onClick={scrollToForm}
                        className="w-full py-4 px-6 bg-lavista-sand text-lavista-ink rounded-xl font-semibold text-lg hover:bg-lavista-bronze transition-colors shadow-lg"
                      >
                        عاين من أرض الواقع
                      </button>
                      <p className="mt-2 text-xs text-gray-500">الطلب بيتسجل مع Flair Agency لترتيب المعاينة. لسنا المطور.</p>
                    </div>

                    {/* Image column - order-1 on mobile (above text), order-2 on md+ (left side) */}
                    <div className="order-1 md:order-2">
                      <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                        <img
                          src={currentCommunity.image}
                          alt={currentCommunity.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
              {communities.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToIndex(i)}
                  className={`rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center ${
                    i === currentIndex
                      ? 'bg-lavista-sand w-12 h-3'
                      : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
                  }`}
                  aria-label={`الانتقال إلى المنطقة ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesCarousel;
