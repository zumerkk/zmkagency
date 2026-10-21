const STORAGE_KEY = 'zmk.analytics.saved-leads.v1';

/** Count confirmed Firestore writes once per lead ID, without sending form data. */
export function createLeadRecorder({ saveLead, sendEvent, storage }) {
  const counted = new Set();
  try {
    const previous = JSON.parse(storage?.getItem(STORAGE_KEY) || '[]');
    if (Array.isArray(previous)) {
      previous.filter((id) => typeof id === 'string').forEach((id) => counted.add(id));
    }
  } catch {
    // Storage can be unavailable; the in-memory set still prevents duplicates.
  }

  return async (data, formName) => {
    const lead = await saveLead(data);
    const leadId = lead?.id;
    if (typeof leadId !== 'string' || !leadId || counted.has(leadId)) return lead;

    try {
      sendEvent('generate_lead', {
        lead_id: leadId,
        transaction_id: leadId,
        form_name: formName,
      });
      counted.add(leadId);
      try {
        storage?.setItem(STORAGE_KEY, JSON.stringify([...counted]));
      } catch {
        // Tracking must never turn a saved inquiry into a form error.
      }
    } catch {
      // A blocked analytics request must not fail or repeat the Firestore write.
    }
    return lead;
  };
}
