const PaymentPlans = () => {
  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="payment" className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-10 bg-lavista-cream">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-end justify-between gap-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-lavista-ink">خطط السداد</h2>
          <button
            type="button"
            onClick={scrollToForm}
            className="shrink-0 px-4 py-2 bg-lavista-ink text-white text-sm rounded-lg hover:bg-lavista-navy transition-colors"
          >
            سجّل EOI
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="rounded-xl bg-white px-3 py-3 md:px-4">
            <p className="text-2xl md:text-3xl font-bold text-lavista-ink leading-none">5%</p>
            <p className="text-xs text-gray-500 mt-1">مقدم · 8 سنين</p>
          </div>
          <div className="rounded-xl bg-white px-3 py-3 md:px-4">
            <p className="text-2xl md:text-3xl font-bold text-lavista-ink leading-none">12%</p>
            <p className="text-xs text-gray-500 mt-1">مقدم · 9 سنين</p>
          </div>
          <div className="rounded-xl bg-white px-3 py-3 md:px-4">
            <p className="text-2xl md:text-3xl font-bold text-lavista-ink leading-none">300</p>
            <p className="text-xs text-gray-500 mt-1">ألف EOI · توين</p>
          </div>
          <div className="rounded-xl bg-white px-3 py-3 md:px-4">
            <p className="text-2xl md:text-3xl font-bold text-lavista-ink leading-none">400</p>
            <p className="text-xs text-gray-500 mt-1">ألف EOI · ستاندالون</p>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-3">
          أقساط متساوية. الأسعار صادرة عن المطور وقابلة للتغيير. Flair Agency لا تحصّل مقدم ولا EOI. الشيكات باسم شركة طيبة لإدارة الأصول العقارية.
        </p>
      </div>
    </section>
  );
};

export default PaymentPlans;
