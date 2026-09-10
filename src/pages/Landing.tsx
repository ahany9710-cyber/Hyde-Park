import Hero from '../components/Hero';
import HeroInfoCard from '../components/HeroInfoCard';
import ListingsCarousel from '../components/ListingsCarousel';
import LeadForm from '../components/LeadForm';
import { apartmentListings } from '../data/listings';
import { villaListings } from '../data/villas';

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
      <LeadForm />
    </main>
  );
};

export default Landing;
