// ============================================================
//  Seasonal theme. Halloween: pumpkin orange + purple, bats,
//  a cobweb, low fog. Controlled by THEME in config.js:
//    "auto"      -> Halloween from Oct 20 to Nov 1, normal otherwise
//    "halloween" -> always on
//    "default"   -> always off
// ============================================================
import * as cfg from "./config.js";

const THEME = cfg.THEME || "auto";
const now = new Date();
const inSeason = (now.getMonth() === 9 && now.getDate() >= 20) || (now.getMonth() === 10 && now.getDate() <= 1);
export const isHalloween = THEME === "halloween" || (THEME === "auto" && inSeason);

// Colours the canvas code can use (as "r,g,b" strings)
export const PAL = isHalloween
  ? { hot: "255,122,26", mid: "139,61,255", cool: "157,255,74", hotHex: "#ff7a1a", midHex: "#8b3dff", coolHex: "#9dff4a" }
  : { hot: "255,61,127", mid: "124,92,255", cool: "77,225,255", hotHex: "#ff3d7f", midHex: "#7c5cff", coolHex: "#4de1ff" };

if (isHalloween) {
  document.documentElement.classList.add("halloween");

  const css = `
  html.halloween{--accent:#ff7a1a;--accent2:#8b3dff;--cyan:#9dff4a}
  /* Bats, cobweb and fog sit behind the content and never catch taps */
  .hw{position:fixed;pointer-events:none;z-index:1}   /* above the DJ stage, still behind the content (which comes later in the page) */
  .hw-bat{left:-80px;width:58px;height:29px;opacity:.75;filter:drop-shadow(0 0 6px rgba(255,122,26,.45));animation:hwFly var(--d) linear var(--delay) infinite}
  .hw-bat svg{width:100%;height:100%;animation:hwFlap .22s ease-in-out infinite alternate;transform-origin:50% 40%}
  @keyframes hwFly{0%{transform:translate(0,0)}25%{transform:translate(28vw,-6vh)}50%{transform:translate(55vw,4vh)}75%{transform:translate(82vw,-5vh)}100%{transform:translate(calc(100vw + 160px),2vh)}}
  @keyframes hwFlap{from{transform:scaleY(1)}to{transform:scaleY(.45)}}
  .hw-web{top:0;right:0;width:min(30vw,220px);height:min(30vw,220px);opacity:.22}
  .hw-fog{left:-10%;right:-10%;bottom:-6%;height:34vh;opacity:.32;filter:blur(30px);
    background:radial-gradient(ellipse at 20% 70%,rgba(190,170,255,.55),transparent 55%),radial-gradient(ellipse at 70% 80%,rgba(160,255,140,.25),transparent 55%),radial-gradient(ellipse at 50% 100%,rgba(255,140,60,.25),transparent 60%);
    animation:hwFog 16s ease-in-out infinite alternate}
  @keyframes hwFog{to{transform:translateX(6%)}}
  @media (prefers-reduced-motion:reduce){.hw-bat,.hw-bat svg,.hw-fog{animation:none}.hw-bat{display:none}}

  /* DJ screen accents */
  html.halloween #edge{box-shadow:inset 0 0 0 10px #ff7a1a,inset 0 0 90px 30px rgba(255,122,26,.7),inset 0 0 240px 80px rgba(139,61,255,.45)}
  html.halloween #hero{background:linear-gradient(135deg,rgba(48,18,10,.84),rgba(28,10,48,.84));box-shadow:0 0 50px rgba(255,122,26,.25)}
  html.halloween #hero.unread{animation:none;box-shadow:0 0 60px rgba(255,122,26,.7)}
  html.halloween .row.unread{box-shadow:0 0 24px rgba(255,122,26,.55)}
  html.halloween .fx-label{color:#9dff4a;text-shadow:0 0 18px #9dff4a}
  html.halloween .fx-song{text-shadow:0 0 30px rgba(255,122,26,.85),0 0 60px rgba(139,61,255,.6)}
  html.halloween .fx-scan{box-shadow:0 0 30px 8px rgba(255,255,255,.7),0 0 80px 20px rgba(255,122,26,.55)}
  html.halloween .fx-flash{background:radial-gradient(circle at 50% 50%,#fff 0,rgba(255,230,200,.85) 12%,rgba(255,122,26,.45) 30%,transparent 60%)}
  html.halloween .fx-grid{background-image:linear-gradient(rgba(255,122,26,.75) 2px,transparent 2px),linear-gradient(90deg,rgba(139,61,255,.75) 2px,transparent 2px)}
  html.halloween .fx-eq i{background:linear-gradient(to top,#ff7a1a,#8b3dff,#9dff4a)}
  html.halloween #term .hot{color:#ffa04d;text-shadow:0 0 10px rgba(255,122,26,.8)}
  html.halloween #deck .led.beat{background:#ff7a1a;box-shadow:0 0 12px #ff7a1a}
  html.halloween .newchip{background:#ff7a1a}

  /* Guest page accents */
  html.halloween .sheet{background:linear-gradient(160deg,#2e1408,#1a0b30);border-color:#ff7a1a;box-shadow:0 0 60px rgba(255,122,26,.4)}
  html.halloween .orb.a{background:#7a3a0a}
  html.halloween .orb.b{background:#3a1a6a}
  html.halloween .floor{background-image:linear-gradient(rgba(255,122,26,.45) 2px,transparent 2px),linear-gradient(90deg,rgba(139,61,255,.45) 2px,transparent 2px)}
  html.halloween .pick .disc{background:radial-gradient(circle,#ff7a1a 0 22%,#111 23% 100%)}
  `;
  const style = document.createElement("style"); style.textContent = css; document.head.append(style);

  const BAT = `<svg viewBox="0 0 64 32" fill="#0a0612" stroke="rgba(255,170,100,.85)" stroke-width="1.2"><path d="M32 12c-2-4-4-5-6-5 1 2 1 3 0 4-3-3-9-6-16-5 3 2 5 5 5 8-3-1-7-1-11 1 6 1 11 4 14 9 3-3 7-4 10-3 1 1 2 3 4 4 2-1 3-3 4-4 3-1 7 0 10 3 3-5 8-8 14-9-4-2-8-2-11-1 0-3 2-6 5-8-7-1-13 2-16 5-1-1-1-2 0-4-2 0-4 1-6 5z"/></svg>`;
  const add = (cls, html, styleText) => { const d = document.createElement("div"); d.className = "hw " + cls; d.innerHTML = html; if (styleText) d.style.cssText = styleText; d.setAttribute("aria-hidden", "true"); document.body.prepend(d); return d; };
  add("hw-fog", "");
  add("hw-web", `<svg viewBox="0 0 200 200" fill="none" stroke="#fff" stroke-width="1.2">
      <path d="M200 0L40 160M200 0L110 190M200 0L10 90M200 0L160 200M200 0L0 30"/>
      <path d="M170 20q-8 14-22 -2M142 38q-14 22-34 -6M112 56q-22 30-50 -10M82 74q-30 40-66 -12"/>
      <path d="M176 32q-10 16 -24 10M154 58q-18 24 -40 14M132 84q-26 32 -56 18M110 110q-32 40 -72 22"/>
      <path d="M188 46q-4 18 -18 20M178 82q-8 26 -30 30M168 118q-12 34 -40 40M158 154q-16 40 -50 46"/></svg>`);
  const bats = window.innerWidth < 640 ? 2 : 4;
  for (let i = 0; i < bats; i++) {
    add("hw-bat", BAT, `top:${8 + i * 17 + Math.random() * 6}vh;--d:${18 + Math.random() * 10}s;--delay:${i * 5 + Math.random() * 3}s;transform-origin:center`);
  }

  // Small copy touches
  const lbl = document.querySelector(".fx-label"); if (lbl) lbl.textContent = "🎃 New request 🎃";
  const sentTitle = document.getElementById("sentTitle"); if (sentTitle) sentTitle.textContent = "Sent! 🎃";
  const h1span = document.querySelector("h1 span"); if (h1span) h1span.after(document.createTextNode(" 🎃"));
}
