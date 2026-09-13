import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

const FORMSPREE = "https://formspree.io/f/xqpkjjjn";

const UNIT_OPTIONS = [
  "Millennial",
  "I-Villa",
  "Town House",
  "Luxury Villa",
  "Crown Palace",
  "لسه بختار",
] as const;

type UnitOption = (typeof UNIT_OPTIONS)[number];
type ContactMethod = "whatsapp" | "call";

function sanitizePhoneInput(raw: string): string {
  let digits = raw.replace(/[^\d]/g, "");
  if (digits.startsWith("0020")) digits = digits.slice(4);
  else if (digits.startsWith("20") && digits.length > 10) digits = digits.slice(2);
  if (digits.length === 10 && !digits.startsWith("0")) digits = `0${digits}`;
  return digits.slice(0, 11);
}

function isValidEgyptianMobile(local: string): boolean {
  return /^01[0125][0-9]{8}$/.test(local);
}

interface MVLeadFormProps {
  source: string;
  formId?: string;
  className?: string;
  onSuccess?: () => void;
}

export function MVLeadForm({ source, formId = "lf", className, onSuccess }: MVLeadFormProps) {
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [unit, setUnit] = useState<UnitOption | "">("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>("whatsapp");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ phone?: string; form?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEgyptianMobile(phone)) {
      setFormErrors({
        phone: "رقم الموبايل غير صحيح — يرجى إدخال رقم مصري صحيح (01...)",
      });
      phoneRef.current?.focus();
      return;
    }

    setFormSubmitting(true);
    setFormErrors({});

    const e164 = `+20${phone.slice(1)}`;
    const payload: Record<string, string> = {
      phone: e164,
      project_slug: "mountain-view-1-1",
      project_name: "ماونتن ڤيو ١.١",
      source,
      unit_interest: unit || "لسه بختار",
      contact_method: contactMethod,
      agency: "Flair Agency",
      agency_role: "real-estate-broker",
      not_developer: "true",
      developer: "Mountain View",
      _subject: `استفسار Flair Agency — ماونتن ڤيو ١.١`,
    };

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
      navigate("/thank-you", { state: { phone: e164, unit: unit || "ماونتن ڤيو ١.١" } });
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
      <h3>استلم الأسعار وخطة السداد</h3>
      <div className="sub">
        رقمك فقط — يرسل لك فريق {config.brokerName} الأسعار الحالية والبروشور على واتساب.
      </div>
      <form onSubmit={handleSubmit} autoComplete="on" className={className} noValidate>
        <div className="field">
          <label htmlFor={`${formId}-phone`}>رقم الموبايل</label>
          <div className={`phone-row${formErrors.phone ? " invalid" : ""}`}>
            <span className="cc">+20</span>
            <span className="sep" aria-hidden />
            <input
              ref={phoneRef}
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="010 5555 0570"
              value={phone}
              disabled={formSubmitting}
              aria-invalid={Boolean(formErrors.phone)}
              onChange={(ev) => {
                setPhone(sanitizePhoneInput(ev.target.value));
                if (formErrors.phone) setFormErrors({});
              }}
              onPaste={(ev) => {
                ev.preventDefault();
                setPhone(sanitizePhoneInput(ev.clipboardData.getData("text")));
                if (formErrors.phone) setFormErrors({});
              }}
            />
          </div>
          {formErrors.phone ? <div className="err">{formErrors.phone}</div> : null}
        </div>

        <div className="field">
          <label>الوحدة المهتم بها</label>
          <div className="budget-chips">
            {UNIT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className={`chip${unit === option ? " active" : ""}`}
                aria-pressed={unit === option}
                disabled={formSubmitting}
                onClick={() => setUnit(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>تحب نتواصل إزاي؟</label>
          <div className="contact-methods">
            {(
              [
                { id: "whatsapp", label: "واتساب" },
                { id: "call", label: "مكالمة" },
              ] as { id: ContactMethod; label: string }[]
            ).map((method) => (
              <button
                key={method.id}
                type="button"
                className={`method${contactMethod === method.id ? " active" : ""}`}
                aria-pressed={contactMethod === method.id}
                disabled={formSubmitting}
                onClick={() => setContactMethod(method.id)}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {formErrors.form ? <p className="form-err">{formErrors.form}</p> : null}

        <button className="btn-submit" type="submit" disabled={formSubmitting}>
          {formSubmitting ? "جاري الإرسال…" : "ابعت الأسعار والبروشور"}
        </button>
        <div className="fineprint">
          نحاول التواصل في أقرب وقت خلال ساعات العمل. بياناتك للرد على استفسارك فقط عبر Flair Agency — بروكر وليست المطوّر.
        </div>

        <div className="agent-row">
          <span className="agent-avatar" aria-hidden />
          <div>
            <strong>مسؤول المبيعات - {config.brokerName}</strong>
            <span>هو اللي هيتواصل معاك — اتصل بنا</span>
          </div>
        </div>
      </form>
    </>
  );
}
