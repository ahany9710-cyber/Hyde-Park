export interface Community {
  id: string;
  name: string;
  tags: string[];
  description: string;
  image: string;
}

export const communities: Community[] = [
  {
    id: 'waterside',
    name: 'Waterside Parcel',
    tags: ['البارسل الأولى', '400 فيلا فقط', '6 مسطحات مائية'],
    description:
      'أول بارسل في اللونش. مجتمع فيلات على الماء، بعدد محدود يحافظ على الهدوء والخصوصية — 400 فيلا فقط، من غير أبراج ومن غير شقق.',
    image: './projects/el-patio-townside/images/communities/waterside.webp',
  },
  {
    id: 'clubhouse',
    name: 'الكلوب هاوس',
    tags: ['5 أفدنة', 'قلب الكمبوند'],
    description:
      'كلوب هاوس على 5 أفدنة في قلب المشروع. مساحة اجتماعية يومية للعيلة، مش مجرد مبنى خدمات على أطراف الماستر بلان.',
    image: './projects/el-patio-townside/images/communities/clubhouse.webp',
  },
  {
    id: 'sports',
    name: 'النادي الرياضي',
    tags: ['نادي رياضي', '16% نسبة بناء'],
    description:
      'نادي رياضي مخصص، ونسبة بناء سكني 16% حسب بروشور المطور. الباقي حديقة مفتوحة ولاندسكيب ومرافق.',
    image: './projects/el-patio-townside/images/communities/sports.webp',
  },
  {
    id: 'living',
    name: '3 تجارب · 7 بارسلز',
    tags: ['فيلات فقط', 'مسجد', '40 فدان تجاري'],
    description:
      'سكن فيلات، مسجد وخدمات، وأوفيس بارك. والمنطقة التجارية 40 فدان على واجهة محور جمال عبد الناصر.',
    image: './projects/el-patio-townside/images/communities/living.webp',
  },
];
