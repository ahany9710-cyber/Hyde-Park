import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToVillas = () => {
    document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="project-highlights" className="w-full">
      <div className="relative w-full h-[64vh] md:h-[70vh] lg:h-[74vh] overflow-hidden bg-lavista-ink">
        <img
          src="./projects/el-patio-townside/images/gallery/evening.webp"
          alt="فيلات El Patio المُسلَّمة — La Vista Developments"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 px-4 sm:px-8 pb-8 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="inline-block mb-3 px-3 py-1 rounded-full bg-white text-lavista-ink text-xs sm:text-sm font-semibold tracking-wide">
              Launching Soon — Waterside Parcel
            </p>
            <h1 className="font-lavista text-5xl md:text-6xl lg:text-7xl text-white leading-none mb-3 [text-shadow:0_2px_18px_rgba(0,0,0,0.45)]">
              El Patio Townside
            </h1>
            <p className="text-lg md:text-2xl text-white mb-2 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              فيلات فقط · على محور جمال عبد الناصر
            </p>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-xl [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
              390 فدان، 3 دقائق من الجامعة الأمريكية. أول لونش: 400 فيلا في بارسل Waterside.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToForm}
                className="px-7 py-3.5 bg-lavista-sand text-lavista-ink rounded-xl hover:bg-lavista-bronze transition-colors font-semibold"
              >
                سجّل EOI
              </button>
              <button
                onClick={scrollToVillas}
                className="px-7 py-3.5 text-white rounded-xl border border-white/70 hover:bg-white/10 transition-colors font-semibold"
              >
                شوف الفيلات
              </button>
            </div>
            <p className="mt-5 text-sm text-white max-w-xl [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
              تسويق Flair Agency · وسيط عقاري · لسنا الموقع الرسمي لـ La Vista Developments
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
