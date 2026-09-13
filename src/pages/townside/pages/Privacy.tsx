import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { config } from '../config';
import { setTownsideMeta, townsideHref } from '../paths';

const Privacy = () => {
  useEffect(() => {
    setTownsideMeta();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-3xl">
        <p className="text-sm text-gray-500 mb-2">Flair Agency</p>
        <h1 className="text-3xl md:text-4xl font-bold text-lavista-ink mb-6">سياسة الخصوصية وإخلاء المسؤولية</h1>

        <div className="space-y-5 text-gray-700 leading-relaxed">
          <p>
            الصفحة دي بتديرها <strong>Flair Agency</strong>، وسيط عقاري، ومش الموقع الرسمي لشركة La Vista Developments. الشراكة اتفاقية تسويق لمشروع El Patio Townside، ومش بتخلي الوكالة هي المطور أو البائع.
          </p>
          <p>
            المطور هو La Vista Developments. الأسعار وخطط السداد ومبالغ الـ EOI معلومات صادرة عن المطور وقابلة للتغيير من غير إخطار. الشيكات تُكتب باسم شركة طيبة لإدارة الأصول العقارية، ومش باسم Flair Agency. الوكالة مش بتحصّل ثمن الوحدة.
          </p>
          <p>
            لما تبعت النموذج، بنجمع رقم الموبايل وطريقة التواصل ونوع الفيلا المهتم بيها. بنستخدم البيانات دي بس عشان نرد على استفسارك ونرتب مكالمة أو زيارة. مش بنبيع البيانات، ومش بنستخدمها في إعلان مخصص لطرف تالت.
          </p>
          <p>
            الإرسال بيوصل على الإيميل المسجّل في نموذج Flair Agency. تقدر تطلب تعديل أو حذف بياناتك بالتواصل على{' '}
            <a href={`tel:${config.phoneNumber}`} className="underline" dir="ltr">{config.phoneDisplay}</a>
            {' '}أو واتساب.
          </p>
          <p>
            صور الصفحة من مجتمعات El Patio المُسلَّمة لنفس المطور، ومش صور تسليم لـ Townside لأن البارسل لسه في مرحلة اللونش. الماستر بلان من بروشور المطور.
          </p>
        </div>

        <Link to={townsideHref()} className="inline-block mt-10 text-lavista-ink underline">
          العودة للصفحة الرئيسية
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
