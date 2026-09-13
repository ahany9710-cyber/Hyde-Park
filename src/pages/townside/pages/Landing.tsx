import { useEffect } from 'react';
import Hero from '../components/Hero';
import { setTownsideMeta } from '../paths';
import ListingsCarousel from '../components/ListingsCarousel';
import PaymentPlans from '../components/PaymentPlans';
import CommunitiesCarousel from '../components/CommunitiesCarousel';
import Gallery from '../components/Gallery';
import LeadForm from '../components/LeadForm';

const distances = [
  { time: '3 دقائق', place: 'الجامعة الأمريكية AUC' },
  { time: 'مباشرة', place: 'محور جمال عبد الناصر' },
  { time: '5 دقائق', place: 'التسعين الجنوبي' },
  { time: '10 دقائق', place: 'الطريق الدائري' },
  { time: '15 دقيقة', place: 'طريق السويس' },
];

const Landing = () => {
  useEffect(() => {
    setTownsideMeta();
  }, []);

  return (
    <main>
      <p className="bg-lavista-ink text-white text-sm md:text-base text-center px-4 py-3 leading-snug">
        <span className="font-semibold">Flair Agency</span>
        <span className="text-white/80"> · وسيط عقاري · لسنا الموقع الرسمي لـ La Vista Developments</span>
      </p>
      <Hero />
      <ListingsCarousel />
      <PaymentPlans />
      <CommunitiesCarousel />
      <Gallery />
      <section id="location-map" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-lavista-ink">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm tracking-[0.18em] uppercase text-lavista-sand font-lavista mb-2">Location</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              على محور جمال عبد الناصر
            </h2>
            <p className="text-white/70">
              التجمع الخامس — جنب El Patio Town، 3 دقائق من الجامعة الأمريكية.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {distances.map((item) => (
              <div key={item.place} className="rounded-xl border border-white/10 px-3 py-4 text-center">
                <p className="text-lavista-sand font-semibold">{item.time}</p>
                <p className="text-white/80 text-sm mt-1">{item.place}</p>
              </div>
            ))}
          </div>
          <div className="aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gray-800">
            <iframe
              title="موقع El Patio Townside على محور جمال عبد الناصر"
              src="https://maps.google.com/maps?q=El%20Patio%20Town%20New%20Cairo&z=14&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      <LeadForm />
    </main>
  );
};

export default Landing;
