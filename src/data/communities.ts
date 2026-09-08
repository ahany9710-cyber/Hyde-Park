export interface Community {
  id: string;
  name: string;
  tags: string[];
  description: string;
  image: string;
}

export const communities: Community[] = [
  {
    id: 'garden-villas',
    name: 'Garden Villas',
    tags: ['New Launch', 'Green Living', 'Hyde Park New Cairo'],
    description: 'عيش أقرب للمساحات المفتوحة واللاندسكيب في مجموعة منازل بتطل على حدائق ومسارات يومية هادئة.',
    image: './images/one-hyde-park/zones/garden-villas.png',
  },
  {
    id: 'skyline-living',
    name: 'Skyline Living',
    tags: ['Apartment Collection', 'Sky Villas', '238 Acres'],
    description: 'وحدات مرتفعة بإطلالات واسعة تجمع بين المدينة والطبيعة مع هوية معمارية هادئة ومميزة داخل One Hyde Park.',
    image: './images/one-hyde-park/zones/skyline-living.png',
  },
  {
    id: 'poolside-living',
    name: 'Poolside Living',
    tags: ['Lifestyle', 'Pools', 'Family Spaces'],
    description: 'مناطق معيشة يومية حول المسابح والمساحات الاجتماعية، مصممة لتقدم إيقاع مريح يناسب العائلات والضيوف.',
    image: './images/one-hyde-park/zones/poolside.png',
  },
  {
    id: 'whats-next',
    name: "At The Heart Of What's Next",
    tags: ['Community Hub', 'Retail', 'Connected Living'],
    description: 'مركز نابض بالحياة قريب من الخدمات والتجارب اليومية، يربط بين السكن والمساحات المفتوحة ومناطق اللقاء.',
    image: './images/one-hyde-park/zones/heart-of-whats-next.png',
  },
];
