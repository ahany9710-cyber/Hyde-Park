/**
 * إعدادات الموقع - عدّل القيم هنا فقط لتحديثها في كل الصفحات
 * Site config - edit these values only to update across the whole site
 */

export const config = {
  // اسم الوسيط الظاهر على الصفحة
  // Broker / agency name shown on the page
  brokerName: 'Flair Agency',

  // اسم المطوّر للذكر التعريفي فقط
  // Developer name for descriptive references only
  developerName: 'Hyde Park Developments',

  // معرف فورم Formspree (الفورم يبعت على الإيميل المسجل في formspree.io)
  // Formspree form ID (form submissions go to the email registered at formspree.io)
  formspreeFormId: 'xljeonla',

  // رقم الواتساب بالصيغة الدولية بدون + أو صفر بادئ (wa.me يرفض 01...)
  // WhatsApp number in international format, no + and no leading zero (wa.me rejects 01...)
  whatsappNumber: '201229310294',

  // رقم الموبايل للمكالمات (الصيغة المحلية أنسب لـ tel: داخل مصر)
  // Phone number for calls (local format works best for tel: inside Egypt)
  phoneNumber: '01229310294',

  // تنسيق رقم الموبايل للعرض (اختياري - لو فاضي يستخدم phoneNumber)
  // Phone display format (optional - uses phoneNumber if empty)
  phoneDisplay: '01229310294',

  // ——— Google Ads (تهيئة جوجل أدز) ———
  // معرف Google Tag العالمي (مثل AW-XXXXXXXXX) - يُحمّل في كل الصفحات
  // Global Tag ID (e.g. AW-XXXXXXXXX) - loaded on all pages
  gtag_id: 'AW-18202386140',

  // معرف التحويل (اختياري - للتوثيق، التتبع الفعلي يستخدم gtag_id + conversion_label)
  // Conversion ID from Google Ads (optional - for reference; tracking uses gtag_id + conversion_label)
  conversion_id: '',

  // رمز التحويل من إعدادات التحويل في Google Ads - يُستخدم في صفحة الشكر فقط
  // Conversion label from Google Ads - used on thank-you page only
  conversion_label: '19hmCPvcm_kbELGfoMpC',

  // رموز تحويل منفصلة لكل قناة - سيبها فاضية لحد ما تنشئها في Google Ads
  // Separate conversion labels per channel - leave empty until created in Google Ads
  conversion_label_call: '',
  conversion_label_whatsapp: '',

  // ——— الفيديوهات (اختياري - للاستضافة الخارجية) ———
  // لو فاضي: يستخدم الملفات من public (./hero-video.mp4، ./location.mp4)
  // لو مليان: يستخدم الرابط المباشر (مثلاً من YouTube أو CDN)
  heroVideoUrl: '',
  heroPosterUrl: '',
  mapVideoUrl: '',
};
