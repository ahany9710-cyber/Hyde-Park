const photos = [
  { src: './projects/el-patio-townside/images/gallery/dusk-villas.webp', alt: 'فيلات وقت الغروب' },
  { src: './projects/el-patio-townside/images/gallery/gardens.webp', alt: 'لاندسكيب وحدائق' },
  { src: './projects/el-patio-townside/images/gallery/water.webp', alt: 'مسطحات مائية' },
  { src: './projects/el-patio-townside/images/gallery/clubhouse.webp', alt: 'الكلوب هاوس' },
  { src: './projects/el-patio-townside/images/gallery/sunset-pool.webp', alt: 'حمام سباحة عند الغروب' },
  { src: './projects/el-patio-townside/images/gallery/evening.webp', alt: 'إضاءة المساء في المجتمع' },
  { src: './projects/el-patio-townside/images/gallery/night.webp', alt: 'المسبح والشارع ليلاً' },
  { src: './projects/el-patio-townside/images/gallery/aerial.webp', alt: 'لقطة جوية للمجتمع' },
  { src: './projects/el-patio-townside/images/gallery/architecture.webp', alt: 'تفاصيل معمارية' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-10 max-w-2xl mx-auto">
          <p className="text-sm tracking-[0.18em] uppercase text-lavista-sand-deep font-lavista mb-2">Real Photography</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lavista-ink mb-3">
            صور حقيقية من مجتمعات El Patio
          </h2>
          <p className="text-gray-600">
            صور فعلية من مجتمعات El Patio المُسلَّمة — La Vista Developments. Townside لسه في مرحلة اللونش، ودي لغة التنفيذ اللي هتتكرر فيه.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo) => (
            <figure key={photo.src} className="overflow-hidden rounded-xl bg-lavista-cream aspect-[4/3]">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
