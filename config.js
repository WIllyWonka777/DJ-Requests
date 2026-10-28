// ============================================================
//  EDIT THIS FILE — it's the only one you need to change.
// ============================================================

// 1) Paste your Firebase config here (Firebase console → Project settings → Your apps → Web app).
//    Make sure it includes databaseURL.
export const firebaseConfig = {
  apiKey: "PASTE_HERE",
  authDomain: "PASTE_HERE.firebaseapp.com",
  databaseURL: "https://PASTE_HERE-default-rtdb.firebaseio.com",
  projectId: "PASTE_HERE",
  storageBucket: "PASTE_HERE.appspot.com",
  messagingSenderId: "PASTE_HERE",
  appId: "PASTE_HERE"
};

// 2) The DJ's name, shown at the top of the guest page.
export const DJ_NAME = "DJ Name";

// 3) PIN to open the DJ screen (dj.html). Change it!
export const DJ_PIN = "2580";

// 4) Optional tip link (PayPal, Interac info page, Ko-fi, etc.). Leave "" to hide the button.
export const TIP_URL = "";
export const TIP_LABEL = "Tip the DJ";

// 5) Seconds a guest must wait between requests (light spam protection).
export const COOLDOWN_SECONDS = 45;
