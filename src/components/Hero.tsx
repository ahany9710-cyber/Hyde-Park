import { config } from '../config';
import { trackChannelConversion } from '../utils/gtag';

const Hero = () => {
  const scrollToVisitRequest = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="project-highlights" className="w-full">
      <div className="relative w-full h-[520px] overflow-hidden">
        <img
          src="./images/one-hyde-park/hero-family.png"
          alt="One Hyde Park lifestyle"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(31,51,36,0.82) 0%, rgba(31,51,36,0.34) 38%, rgba(31,51,36,0.86) 100%)',
          }}
        />

        <div className="relative z-10 h-full flex flex-col justify-between px-5 py-[22px] pb-[26px]">
          <div className="flex flex-col items-start text-right leading-none">
            <span className="font-display italic text-hyde-sage" style={{ fontSize: '40px' }}>
              one
            </span>
            <span
              className="text-white uppercase mt-1"
              style={{ fontSize: '12px', letterSpacing: '0.34em' }}
            >
              Hyde Park · New Cairo
            </span>
          </div>

          <div>
            <h1
              className="text-white font-bold mb-2.5"
              style={{ fontSize: '29px', lineHeight: 1.25, textWrap: 'pretty' }}
            >
              شقق وفيلات على 238 فدان في هايد بارك التجمع الخامس
            </h1>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display italic text-hyde-sage leading-none" style={{ fontSize: '46px' }}>
                5%
              </span>
              <span className="text-white font-semibold" style={{ fontSize: '16px' }}>
                مقدم · تقسيط 10 سنوات
              </span>
            </div>

            <div className="grid gap-2.5">
              <a
                href={`https://wa.me/${config.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackChannelConversion('whatsapp')}
                className="w-full min-h-[54px] rounded-[14px] bg-hyde-sage text-hyde-forest font-bold flex items-center justify-center text-center"
                style={{ fontSize: '17px' }}
              >
                الأسعار وخطة السداد على واتساب
              </a>
              <button
                type="button"
                onClick={scrollToVisitRequest}
                className="w-full min-h-[50px] rounded-[14px] bg-transparent text-white font-semibold flex items-center justify-center text-center"
                style={{ fontSize: '15.5px', border: '1.5px solid rgba(255,255,255,0.6)' }}
              >
                حدد ميعاد زيارة
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div
        dir="rtl"
        className="bg-white flex flex-wrap items-center"
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid #E3DFD2',
          gap: '6px 14px',
          fontSize: '12.5px',
          color: '#4b524a',
        }}
      >
        <span>{config.brokerName}</span>
        <span className="text-hyde-gold">·</span>
        <span>وسيط عقاري مستقل</span>
        <span className="text-hyde-gold">·</span>
        <span>المشروع من تطوير {config.developerName}</span>
      </div>
    </section>
  );
};

export default Hero;
