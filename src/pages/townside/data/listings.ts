export interface Listing {
  id: string;
  name: string;
  type: string;
  area: string;
  land?: string;
  specs: string;
  eoi: string;
  priceRange: string;
  image: string;
}

export const listings: Listing[] = [
  {
    id: 'side-house',
    name: 'Side House',
    type: 'توين هاوس',
    area: '225 م²',
    specs: '3 غرف نوم + ريسبشن',
    eoi: '300,000 ج.م',
    priceRange: '31,190,000 ج.م',
    image: './projects/el-patio-townside/images/gallery/evening.webp',
  },
  {
    id: 'icon',
    name: 'Icon Villa',
    type: 'ستاندالون',
    area: '225 م²',
    land: '262 م²',
    specs: '3 غرف نوم + ريسبشن',
    eoi: '400,000 ج.م',
    priceRange: '35,800,000 ج.م',
    image: './projects/el-patio-townside/images/listings/icon.webp',
  },
  {
    id: 'prime',
    name: 'Prime Villa',
    type: 'ستاندالون',
    area: '265 م²',
    land: '299 م²',
    specs: '4 غرف نوم + ريسبشن + غرفة خادمة',
    eoi: '400,000 ج.م',
    priceRange: '40,190,000 ج.م',
    image: './projects/el-patio-townside/images/listings/prime.webp',
  },
  {
    id: 'grand',
    name: 'Grand Villa',
    type: 'ستاندالون',
    area: '310 م²',
    land: '349 م²',
    specs: '4 ماستر بدريسنج + غرفة خادمة + ريسبشن',
    eoi: '400,000 ج.م',
    priceRange: '49,430,000 ج.م',
    image: './projects/el-patio-townside/images/listings/grand.webp',
  },
  {
    id: 'signature',
    name: 'Signature Villa',
    type: 'ستاندالون',
    area: '411 م²',
    land: '508 م²',
    specs: 'أوفيس + 4 ماستر + ريسبشن',
    eoi: '400,000 ج.م',
    priceRange: '70,430,000 ج.م',
    image: './projects/el-patio-townside/images/listings/signature.webp',
  },
];
