// ============================================================
//  EDIT THIS FILE — it's the only one you need to change.
// ============================================================

// 1) Paste your Firebase config here (Firebase console → Project settings → Your apps → Web app).
//    Make sure it includes databaseURL.
export const firebaseConfig = {
  apiKey: "AIzaSyATFVvI8bIx100b1hctPsiVMuBfpEhAJNc",
  authDomain: "dj-requests-19dda.firebaseapp.com",
  databaseURL: "https://dj-requests-19dda-default-rtdb.firebaseio.com",
  projectId: "dj-requests-19dda",
  storageBucket: "dj-requests-19dda.firebasestorage.app",
  messagingSenderId: "467993548119",
  appId: "1:467993548119:web:86c9e261ed8bf8807b9a12"
};

// 2) The DJ's name, shown at the top of the guest page.
export const DJ_NAME = "DJ Phil.B";

// 3) PIN to open the DJ screen (dj.html). Change it!
export const DJ_PIN = "2580";

// 4) Email for Interac e-Transfer tips. Leave "" to hide the tip box.
export const TIP_EMAIL = "f.bravo2591@gmail.com";

// 5) Seconds a guest must wait between requests (light spam protection).
export const COOLDOWN_SECONDS = 45;

// 6) Seasonal look: "auto" = Halloween from Oct 20 to Nov 1 (normal the rest of the year),
//    "halloween" = always on, "default" = always off.
export const THEME = "auto";
