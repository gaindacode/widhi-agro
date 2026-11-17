// ---- Fill in your real contact details here. Empty values stay hidden on the site. ----
const CONTACT = {
  phone: "+977-9851036878",      // e.g. "+977 98XXXXXXXX"
  whatsapp: "",   // digits only with country code, e.g. "97798XXXXXXXX"
  email: "",      // e.g. "info@example.com"
  facebook: "",   // full page URL
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Padampur%2C+Chitwan%2C+Nepal"
};
// ---------------------------------------------------------------------------------------

const LANGS = ["en", "ne", "hi", "zh"];
const HTML_LANG = { en: "en", ne: "ne", hi: "hi", zh: "zh-Hans" };

function pickLang() {
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return LANGS.includes(nav) ? nav : "en";
}

function setLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = HTML_LANG[lang];
  document.title = dict.title;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = dict[el.dataset.i18n] ?? I18N.en[el.dataset.i18n] ?? "";
  });
  document.querySelectorAll(".lang button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

document.querySelectorAll(".lang button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang)));

const menu = document.getElementById("menu"), links = document.getElementById("links");
menu.addEventListener("click", () => {
  menu.setAttribute("aria-expanded", String(links.classList.toggle("open")));
});
links.addEventListener("click", () => links.classList.remove("open"));

function show(id, text, href) {
  if (!text) return false;
  const a = document.getElementById(id);
  a.textContent = text; a.href = href;
  document.getElementById("row-" + id).hidden = false;
  return true;
}
const any = [
  show("phone", CONTACT.phone, "tel:" + CONTACT.phone.replace(/[^+\d]/g, "")),
  show("whatsapp", CONTACT.whatsapp && "+" + CONTACT.whatsapp, "https://wa.me/" + CONTACT.whatsapp),
  show("email", CONTACT.email, "mailto:" + CONTACT.email),
  show("facebook", CONTACT.facebook && CONTACT.facebook.replace(/^https?:\/\/(www\.)?/, ""), CONTACT.facebook)
].some(Boolean);
document.getElementById("row-soon").hidden = any;
document.getElementById("maplink").href = CONTACT.mapUrl;
document.getElementById("year").textContent = new Date().getFullYear();

setLang(pickLang());
