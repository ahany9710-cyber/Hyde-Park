import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { trackChannelConversion } from '../utils/gtag';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'هل التقسيط متاح؟',
    answer:
      'نعم، One Hyde Park يوفّر أكثر من خطة سداد بحسب نوع الوحدة: الشقق والدوبلكسات والسكاي فيلا والجاردن فيلا بخطة 5% مقدم و5% بعد 3 شهور وتقسيط حتى 10 سنوات، بينما الفيللات المستقلة بخطة تمتد حتى 8 سنوات.',
  },
  {
    question: 'ما هي تفاصيل الـ EOI؟',
    answer:
      'نحن نجمع الآن EOI للشقق في Hyde Park New Cairo بقيمة 100,000 جنيه قابلة للاسترداد. الأسعار والمعلومات المعروضة هنا استرشادية بحسب المتاح لدينا كوسيط عقاري مستقل، وتؤكد نهائيًا عند التواصل وفق تحديثات المطوّر والتوافر: غرفة واحدة 7 إلى 9 مليون، غرفتين 9 إلى 11 مليون، ثلاث غرف 11 إلى 14 مليون، والدوبلكس 16 إلى 20 مليون.',
  },
  {
    question: 'كيف يمكنني زيارة الموقع؟',
    answer: 'custom',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-gray-600 text-lg">
            أهم الأسئلة حول One Hyde Park وخطط السداد والتفاصيل الحالية
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-right flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-hyde-sage focus:ring-offset-2 rounded-2xl"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-gray-900 text-lg pl-4">
                  {faq.question}
                </span>
                <motion.svg
                  className="w-5 h-5 text-hyde-sage flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed text-right">
                      {faq.answer === 'custom' ? (
                        <>
                          <p className="mb-4">
                            يمكنك جدولة زيارة للموقع بالاتصال بنا على{' '}
                            <a
                              href={`tel:${config.phoneNumber}`}
                              onClick={() => trackChannelConversion('call')}
                              className="text-hyde-forest font-semibold hover:underline"
                            >
                              اتصل بنا
                            </a>{' '}
                            أو التواصل معنا عبر واتساب. سيقوم فريق {config.brokerName} بترتيب وقت مناسب لك
                            لزيارة المشروع والإجابة على أي أسئلة قد تكون لديك.
                          </p>
                          <a
                            href={`tel:${config.phoneNumber}`}
                            onClick={() => trackChannelConversion('call')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-hyde-forest text-white rounded-xl font-semibold hover:bg-hyde-sage hover:text-hyde-forest transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            اتصل الآن
                          </a>
                        </>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
