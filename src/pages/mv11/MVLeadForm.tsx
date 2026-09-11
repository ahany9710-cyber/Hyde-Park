import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEgyptPhone, normalizePhone } from "./validation";

const FORMSPREE = "https://formspree.io/f/xqpkjjjn";

interface MVLeadFormProps {
  source: string;
  formId?: string;
  className?: string;
  onSuccess?: () => void;
  showHeading?: boolean;
}

export function MVLeadForm({
  source,
  formId = "lf",
  className,
  onSuccess,
  showHeading = true,
}: MVLeadFormProps) {
  const navigate = useNavigate();
  const [budget, setBudget] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ phone?: string; form?: string }>(
    {},
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const unitType = (form.elements.namedItem("type") as HTMLSelectElement).value;
    const errors: { phone?: string } = {};

    if (!phone.trim()) errors.phone = "رقم الموبايل مطلوب";
    else if (!isValidEgyptPhone(phone)) {
      errors.phone =
        "رقم هاتف صحيح مطلوب (مصر، السعودية، البحرين، الإمارات، قطر)";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormSubmitting(true);
    setFormErrors({});

    const payload: Record<string, string> = {
      phone: normalizePhone(phone) || phone.trim(),
      project_slug: "mountain-view-1-1",
      project_name: "ماونتن ڤيو ١.١",
      source,
      approximate_budget: budget ?? "",
      agency: "Flair Agency",
      agency_role: "real-estate-broker",
      not_developer: "true",
      developer: "Mountain View",
      _subject: `استفسار Flair Agency — ${name || "عميل"} — ماونتن ڤيو ١.١`,
    };
    if (name) payload.name = name;
    if (unitType) payload.unit_interest = unitType;

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        const msg =
          (typeof data.error === "string" && data.error) ||
          Object.values(data.errors ?? {})[0] ||
          "تعذر إرسال النموذج. حاول مرة أخرى.";
        setFormErrors({ form: msg });
        return;
      }

      onSuccess?.();
      navigate("/thank-you", { state: { phone: payload.phone, unit: unitType || "ماونتن ڤيو ١.١" } });
    } catch {
      setFormErrors({
        form: "حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجدداً.",
      });
    } finally {
      setFormSubmitting(false);
    }
  }

  return (
    <>
      {showHeading ? (
        <>
          <h3>طلب التفاصيل</h3>
          <div className="sub">٣٠ ثانية فقط — استمارة قصيرة</div>
        </>
      ) : null}
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className={className}
        noValidate
      >
        <div className="row2c">
          <div className="field">
            <label htmlFor={`${formId}-name`}>
              الاسم <span className="opt">(اختياري)</span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              placeholder="اسمك بالكامل"
              disabled={formSubmitting}
            />
          </div>
          <div className="field">
            <label htmlFor={`${formId}-phone`}>رقم الموبايل *</label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              inputMode="numeric"
              required
              disabled={formSubmitting}
            />
            <div className="err">{formErrors.phone || ""}</div>
          </div>
        </div>
        <div className="field">
          <label htmlFor={`${formId}-type`}>
            نوع الوحدة المطلوبة <span className="opt">(اختياري)</span>
          </label>
          <select id={`${formId}-type`} name="type" defaultValue="" disabled={formSubmitting}>
            <option value="">— مش محدد —</option>
            <option>Millennial — 140 م²</option>
            <option>I-Villa Sky Garden — 235–255 م²</option>
            <option>Town House — 210 م²</option>
            <option>Luxury Villa — 255–350 م²</option>
            <option>Crown Palace — 670 م²</option>
            <option>غير متأكد بعد — محتاج استشارة</option>
          </select>
        </div>
        <div className="field">
          <label>
            الميزانية التقريبية <span className="opt">(اختياري)</span>
          </label>
          <div className="budget-chips">
            {[
              "14–25 مليون",
              "25–40 مليون",
              "40–60 مليون",
              "60 مليون+",
              "أحتاج استشارة",
            ].map((b) => (
              <div
                key={b}
                className={`chip ${budget === b ? "active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => !formSubmitting && setBudget(b)}
                onKeyDown={(ev) => {
                  if ((ev.key === "Enter" || ev.key === " ") && !formSubmitting)
                    setBudget(b);
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>
        {formErrors.form ? (
          <p style={{ color: "#c41e3a", fontSize: 14, margin: "0 0 8px" }}>
            {formErrors.form}
          </p>
        ) : null}
        <button className="btn-submit" type="submit" disabled={formSubmitting}>
          <span>
            {formSubmitting ? "جاري الإرسال…" : "ابعتلي التفاصيل من Flair Agency"}
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
            <path d="M5 12 H19 M19 12 L13 6 M19 12 L13 18" />
          </svg>
        </button>
        <div className="fineprint">
          بإرسال النموذج توافق على تواصل Flair Agency معك بخصوص وحدات ماونتن ڤيو ١.١.
          نحن بروكر تسويق عقاري بشراكة مع المطوّر ولسنا ماونتن ڤيو.
        </div>
      </form>
    </>
  );
}
