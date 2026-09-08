const HeroInfoCard = () => {
  const cells = [
    { label: 'مساحة المشروع', value: '238 فدان' },
    { label: 'الأسعار من', value: '5.9 مليون ج' },
    { label: 'أنواع الوحدات', value: 'شقق · دوبلكس · فيلات' },
    { label: 'المساحات', value: '73 – 275 م²' },
  ];

  return (
    <div className="px-4" style={{ padding: '16px', background: '#F4F1E8' }}>
      <div className="container mx-auto max-w-5xl">
        <div className="bg-white rounded-[14px] overflow-hidden" style={{ border: '1px solid #E3DFD2' }}>
          <div className="grid grid-cols-2">
            {cells.map((cell, index) => (
              <div
                key={cell.label}
                style={{
                  padding: '12px 14px',
                  borderInlineEnd: index % 2 === 0 ? '1px solid #E3DFD2' : undefined,
                  borderBottom: index < 2 ? '1px solid #E3DFD2' : undefined,
                }}
              >
                <p className="mb-[3px]" style={{ fontSize: '11.5px', color: '#6b7269' }}>
                  {cell.label}
                </p>
                <p className="font-semibold text-hyde-forest" style={{ fontSize: '15px' }}>
                  {cell.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroInfoCard;
