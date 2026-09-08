export interface Listing {
  id: string;
  name: string;
  /** Short label for the chip row, e.g. "1BR", "دوبلكس" */
  chipLabel: string;
  area: string;
  tagline: string;
  priceRange: string;
  image?: string;
  floorPlan?: string;
}

export const apartmentListings: Listing[] = [
  {
    id: '1',
    name: 'شقة غرفة واحدة',
    chipLabel: '1BR',
    area: '73 - 91 م²',
    image: './images/one-hyde-park/listings/views-rise-above.png',
    tagline: 'دور مرتفع بإطلالة مفتوحة على اللاندسكيب، مدخل مستقل.',
    priceRange: 'تبدأ من 5.9 مليون ج',
  },
  {
    id: '2',
    name: 'شقة غرفتين',
    chipLabel: '2BR',
    area: '112 - 135 م²',
    image: './images/one-hyde-park/listings/green-apartment.png',
    tagline: 'دور متكرر بإطلالة على اللاندسكيب المفتوح، بلكونة على الحديقة.',
    priceRange: 'تبدأ من 7.9 مليون ج',
  },
  {
    id: '3',
    name: 'شقة 3 غرف',
    chipLabel: '3BR',
    area: '142 - 170 م²',
    image: './images/one-hyde-park/listings/home-that-opens.png',
    tagline: 'مساحات معيشة أوسع لعائلة أكبر، ريسيبشن مفتوح على المطبخ.',
    priceRange: 'تبدأ من 9.9 مليون ج',
  },
  {
    id: '4',
    name: 'شقة 4 غرف',
    chipLabel: '4BR',
    area: '185 - 191 م²',
    image: './images/one-hyde-park/listings/everything-comes-together.png',
    tagline: 'أكبر وحدة في المجموعة، غرفة ماستر مزدوجة وتراس خاص.',
    priceRange: 'تبدأ من 13.5 مليون ج',
  },
  {
    id: '5',
    name: 'دوبلكس',
    chipLabel: 'دوبلكس',
    area: '203 - 219 م²',
    image: './images/one-hyde-park/listings/bigger-scale.png',
    tagline: 'مساحات مزدوجة الارتفاع، أقرب للحمام السباحة المشترك.',
    priceRange: 'تبدأ من 12.9 مليون ج',
  },
  {
    id: '6',
    name: 'سكاي فيلا',
    chipLabel: 'سكاي',
    area: '240 - 275 م²',
    image: './images/one-hyde-park/listings/after-sunset.png',
    tagline: 'أعلى دور في المبنى، روف خاص وإطلالة بانورامية بعد الغروب.',
    priceRange: 'تبدأ من 14.9 مليون ج',
  },
  {
    id: '7',
    name: 'جاردن فيلا',
    chipLabel: 'جاردن',
    area: '203 - 220 م²',
    image: './images/one-hyde-park/listings/two-bedroom.png',
    tagline: 'دور أرضي بحديقة خاصة ملاصقة للاندسكيب الرئيسي.',
    priceRange: 'تبدأ من 15.3 مليون ج',
  },
];
