import Hero from '../components/Hero';
import HeroInfoCard from '../components/HeroInfoCard';
import ListingsCarousel from '../components/ListingsCarousel';
import CommunitiesCarousel from '../components/CommunitiesCarousel';
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
          title="New Launch Apartments & Signature Homes"
          subtitle="1 to 4 bedrooms, duplexes, sky villas, and garden villas with 5% down payment and 10 year installments."
          badge="EOI averages: 1BR 7-9M | 2BR 9-11M | 3BR 11-14M | Duplex 16-20M"
          listings={apartmentListings}
        />
      </section>
      <ListingsCarousel
        title="Villa Collection"
        subtitle="Townhouses, twin houses, and standalone villas with 5% now, 5% after 3 months, and equal installments over 8 years."
        badge="Townhouse 25.7M-31M | Twin House 37.5M | Standalone 48M"
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
      <section id="master-plan" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-hyde-forest">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            Master Plan
          </h2>
          <p className="text-gray-300 text-center mb-8">
            One Hyde Park | Hyde Park New Cairo
          </p>
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gray-800 shadow-2xl border border-white/10">
            <img
              src="./images/one-hyde-park/master-plan.png"
              alt="One Hyde Park master plan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <LeadForm />
      <FAQ />
    </main>
  );
};

export default Landing;
