interface BrandLogoProps {
  className?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

const BrandLogo = ({ className = '', align = 'left', light = false }: BrandLogoProps) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-right';
  const titleColor = light ? 'text-hyde-sage' : 'text-hyde-forest';
  const subtitleColor = light ? 'text-white' : 'text-hyde-forest';

  return (
    <div className={`inline-flex flex-col leading-none ${alignment} ${className}`}>
      <span className={`font-display text-5xl md:text-6xl italic ${titleColor}`}>one</span>
      <span className={`text-xl md:text-2xl tracking-[0.35em] uppercase ${subtitleColor}`}>Hyde Park</span>
    </div>
  );
};

export default BrandLogo;
