export const LOCALE_STORAGE_KEY = "zag-locale";

/**
 * Runs in <head> before first paint. For returning Arabic readers it flips the
 * document to RTL and hides the body until React swaps the copy in, so they
 * never see the English render first. A timer lifts the guard if scripts fail.
 */
export const localeBootScript = `(function(){try{if(localStorage.getItem("${LOCALE_STORAGE_KEY}")==="ar"){var r=document.documentElement;r.lang="ar";r.dir="rtl";r.classList.add("i18n-pending");setTimeout(function(){r.classList.remove("i18n-pending")},2500)}}catch(e){}})();`;
