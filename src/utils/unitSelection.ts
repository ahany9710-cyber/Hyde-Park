/**
 * Shared bridge between the listings carousels and the lead form: a card's
 * "اطلب تفاصيل الوحدة" CTA preselects the matching unit chip on the form.
 */

export const FORM_UNIT_OPTIONS = ['شقة غرفتين', 'دوبلكس', 'فيلا', 'لسه بختار'] as const;
export type FormUnitOption = (typeof FORM_UNIT_OPTIONS)[number];

const SELECT_UNIT_EVENT = 'hp:select-unit';

/** Maps a carousel card's chip label to the closest lead-form unit chip. */
export function mapChipLabelToFormUnit(chipLabel: string): FormUnitOption {
  if (chipLabel === 'دوبلكس') return 'دوبلكس';
  if (['سكاي', 'جاردن', 'تاون هاوس', 'توين هاوس', 'فيلا'].includes(chipLabel)) return 'فيلا';
  if (['1BR', '2BR', '3BR', '4BR'].includes(chipLabel)) return 'شقة غرفتين';
  return 'لسه بختار';
}

export function requestUnitPreselect(unit: FormUnitOption): void {
  window.dispatchEvent(new CustomEvent<FormUnitOption>(SELECT_UNIT_EVENT, { detail: unit }));
}

export function onUnitPreselectRequested(handler: (unit: FormUnitOption) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<FormUnitOption>).detail);
  window.addEventListener(SELECT_UNIT_EVENT, listener);
  return () => window.removeEventListener(SELECT_UNIT_EVENT, listener);
}
