import { addDoc, collection } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { analytics, db } from '../firebase';
import { createLeadRecorder } from './leadRecorder';

let storage;
try {
  storage = window.sessionStorage;
} catch {
  // Private browsing may block session storage.
}

export const recordLead = createLeadRecorder({
  saveLead: (data) => addDoc(collection(db, 'leads'), data),
  // Reuse the existing Firebase GA4 instance; do not add a second GTM transport.
  sendEvent: (name, parameters) => logEvent(analytics, name, parameters),
  storage,
});
