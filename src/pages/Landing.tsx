import Hero from '../components/Hero';
import HeroInfoCard from '../components/HeroInfoCard';
import ListingsCarousel from '../components/ListingsCarousel';
import CommunitiesCarousel from '../components/CommunitiesCarousel';
import MasterPlan from '../components/MasterPlan';
import LeadForm from '../components/LeadForm';
import FAQ from '../components/FAQ';
import { apartmentListings } from '../data/listings';
import { villaListings } from '../data/villas';

const scrollToForm = () => {
  const formSection = document.getElementById('lead-form');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const Landing = () => {
  return (
    <main>
      <Hero />
      <HeroInfoCard />
      <section id="new-launch">
        <ListingsCarousel
          title="الإطلاق الجديد"
          subtitle="شقق من غرفة إلى 4 غرف، دوبلكس، جاردن فيلا وسكاي فيلا."
          paymentEyebrow="خطة السداد — للمجموعة بالكامل"
          paymentPlan="5% مقدم · 5% بعد 3 شهور · تقسيط 10 سنوات · EOI 100,000 ج قابل للاسترداد"
          listings={apartmentListings}
        />
      </section>
      <ListingsCarousel
        title="مجموعة الفيلات"
        subtitle="تاون هاوس، توين هاوس وفيلات مستقلة بحديقة خاصة."
        paymentEyebrow="خطة السداد — للمجموعة بالكامل"
        paymentPlan="5% مقدم · 5% بعد 3 شهور · تقسيط 8 سنوات · تسليم 4 سنوات"
        listings={villaListings}
      />
      <section id="architecture-design" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Architecture & Design
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            One Hyde Park brings together skyline living, garden-facing homes, and a connected daily lifestyle in Hyde Park New Cairo, with open green spaces and curated residential clusters across 238 acres.
          </p>
          <button
            onClick={scrollToForm}
            className="px-8 py-4 bg-hyde-forest text-white rounded-xl hover:bg-hyde-sage hover:text-hyde-forest transition-all duration-200 font-semibold shadow-lg"
          >
            Make an Inquiry
          </button>
        </div>
      </section>
      <CommunitiesCarousel />
      <MasterPlan />
      <LeadForm />
      <FAQ />
    </main>
  );
};

export default Landing;
