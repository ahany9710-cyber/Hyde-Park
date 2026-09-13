import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { trackConversion } from '../utils/gtag';
import { setTownsideMeta, townsideHref } from '../paths';

const ThankYou = () => {
  useEffect(() => {
    setTownsideMeta();
    trackConversion();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-lavista-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-lavista-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-lavista-ink mb-4">
            تم تسجيل اهتمامك
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Flair Agency هتتواصل معاك في أقرب وقت خلال ساعات العمل بخصوص El Patio Townside.
          </p>
          <div className="space-y-4">
            <a
              href="./projects/el-patio-townside/brochure.pdf"
              download
              className="inline-block w-full px-8 py-4 bg-lavista-sand text-lavista-ink rounded-xl hover:bg-lavista-bronze transition-colors font-semibold"
            >
              تحميل البروشور
            </a>
            <Link
              to={townsideHref()}
              className="block w-full px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-lavista-ink hover:text-lavista-ink transition-colors font-semibold"
            >
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;
