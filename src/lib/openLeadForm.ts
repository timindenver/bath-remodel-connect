// Global helper for opening the focused lead-form modal from any CTA.
// Components dispatch this event; FormModal listens and opens.
export const LEAD_FORM_OPEN_EVENT = "lead-form:open";

export const openLeadForm = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LEAD_FORM_OPEN_EVENT));
};
