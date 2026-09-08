import { motion } from 'framer-motion';
import BrandLogo from './BrandLogo';

const Hero = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="project-highlights" className="w-full">
      <div className="relative w-full min-h-[88vh] overflow-hidden">
        <img
          src="./images/one-hyde-park/hero-family.png"
          alt="One Hyde Park lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 hero-gradient" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center px-4 max-w-4xl"
          >
            <div className="mb-8 flex justify-center">
              <BrandLogo align="center" light />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs sm:text-sm text-white/90 backdrop-blur-sm mb-5">
              <span>New Launch</span>
            </div>
            <p className="font-display text-3xl md:text-4xl italic text-white/90 mb-3">
              More Life Around Every Day
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Hyde Park New Cairo
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              مجتمع جديد على مساحة 238 فدان يقدّم شقق 1 إلى 4 غرف، دوبلكسات، جاردن فيلا، سكاي فيلا،
              مع مرحلة فيلات مستقلة وخطط سداد مرنة تناسب كل احتياج.
            </p>
            <div className="flex flex-wrap items-end justify-center gap-6 md:gap-10 mb-8 text-white">
              <div>
                <div className="font-display text-6xl md:text-7xl italic text-hyde-sage leading-none">5%</div>
                <div className="text-sm md:text-lg uppercase tracking-wide">Down Payment</div>
              </div>
              <div>
                <div className="font-display text-6xl md:text-7xl italic text-hyde-sage leading-none">10</div>
                <div className="text-sm md:text-lg uppercase tracking-wide">Year Installments</div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-hyde-forest text-white rounded-2xl hover:bg-hyde-sage hover:text-hyde-forest transition-all duration-200 font-semibold shadow-xl text-lg"
              >
                اطلب الأسعار والبروشور
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
