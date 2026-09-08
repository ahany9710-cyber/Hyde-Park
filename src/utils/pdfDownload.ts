/**
 * The master-plan PDF is gated behind the lead form (screen 3 spec): tapping the
 * download CTA flags the intent, scrolls to the form, and the thank-you page
 * serves the download once the two required fields are submitted.
 */

const PDF_REQUESTED_KEY = 'hp_pdf_requested';

export function requestMasterPlanPdf(): void {
  try {
    sessionStorage.setItem(PDF_REQUESTED_KEY, '1');
  } catch {
    // sessionStorage unavailable; the CTA still scrolls to the form
  }
}

export function wasMasterPlanPdfRequested(): boolean {
  try {
    return sessionStorage.getItem(PDF_REQUESTED_KEY) === '1';
  } catch {
    return false;
  }
}
