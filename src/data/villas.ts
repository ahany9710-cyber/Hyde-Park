import type { Listing } from './listings';

export interface VillaListing extends Listing {
  landArea: string;
}

export const villaListings: VillaListing[] = [
  {
    id: '1',
    name: 'تاون هاوس وسط وركن',
    chipLabel: 'تاون هاوس',
    area: '196 م² BUA',
    // TODO: confirm real land area per unit — placeholder pending sales team figures
    landArea: '200 م² أرض (تقريبي)',
    image: './images/one-hyde-park/listings/two-bedroom.png',
    tagline: 'صف متلاصق بحديقة أمامية، أقرب بوابة للمجتمع.',
    priceRange: '25.7 – 31 مليون ج',
  },
  {
    id: '2',
    name: 'توين هاوس',
    chipLabel: 'توين هاوس',
    area: '218 م² BUA',
    // TODO: confirm real land area — placeholder pending sales team figures
    landArea: '300 م² أرض (تقريبي)',
    image: './images/one-hyde-park/hero-family.png',
    tagline: 'خصوصية أكبر بحائط مشترك واحد فقط، حديقة جانبية.',
    priceRange: '37.5 مليون ج',
  },
  {
    id: '3',
    name: 'فيلا مستقلة',
    chipLabel: 'فيلا',
    area: '220 م² BUA',
    // TODO: confirm real land area — placeholder pending sales team figures
    landArea: '450 م² أرض (تقريبي)',
    image: './images/one-hyde-park/listings/views-rise-above.png',
    tagline: 'فيلا قائمة بذاتها على أربع واجهات، حديقة محيطة كاملة.',
    priceRange: '48 مليون ج',
  },
];
