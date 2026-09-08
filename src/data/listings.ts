export interface Listing {
  id: string;
  name: string;
  area: string;
  tagline: string;
  downpayment: string;
  installment: string;
  delivery: string;
  finishing: string;
  priceRange: string;
  image?: string;
}

export const apartmentListings: Listing[] = [
  {
    id: '1',
    name: '1 Bedroom Apartment',
    area: '73 - 91 sqm',
    image: './images/one-hyde-park/listings/views-rise-above.png',
    tagline: 'Surrounded by green in Hyde Park New Cairo',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 5.9M EGP',
  },
  {
    id: '2',
    name: '2 Bedroom Apartment',
    area: '112 - 135 sqm',
    image: './images/one-hyde-park/listings/green-apartment.png',
    tagline: 'Comfortable homes with open landscape views',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 7.9M EGP',
  },
  {
    id: '3',
    name: '3 Bedroom Apartment',
    area: '142 - 170 sqm',
    image: './images/one-hyde-park/listings/home-that-opens.png',
    tagline: 'Room to live on a bigger scale',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 9.9M EGP',
  },
  {
    id: '4',
    name: '4 Bedroom Apartment',
    area: '185 - 191 sqm',
    image: './images/one-hyde-park/listings/everything-comes-together.png',
    tagline: 'Everything comes together around you',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 13.5M EGP',
  },
  {
    id: '5',
    name: 'Duplex',
    area: '203 - 219 sqm',
    image: './images/one-hyde-park/listings/bigger-scale.png',
    tagline: 'Double-height spaces with a poolside lifestyle',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 12.9M EGP',
  },
  {
    id: '6',
    name: 'Sky Villa',
    area: '240 - 275 sqm',
    image: './images/one-hyde-park/listings/after-sunset.png',
    tagline: 'A different rhythm after sunset',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 14.9M EGP',
  },
  {
    id: '7',
    name: 'Garden Villa',
    area: '203 - 220 sqm',
    image: './images/one-hyde-park/listings/two-bedroom.png',
    tagline: 'Live closer to green garden villas',
    downpayment: '5% down payment',
    installment: '5% after 3 months + 10 years',
    delivery: 'New launch collection',
    finishing: 'Ask for latest finishing specs',
    priceRange: 'Starting from 15.3M EGP',
  },
];
