/**
 * Is this a handheld device — phone or tablet?
 *
 * Deliberately not a user-agent sniff. The reliable signal is input
 * capability: a coarse primary pointer plus real touch points. That covers
 * phones and tablets, excludes desktops, and doesn't break when a new device
 * ships an unfamiliar UA string.
 *
 * The one case that needs special handling is iPadOS, which reports itself as
 * a Mac. maxTouchPoints is what gives it away.
 */
export function isHandheld() {
  if (typeof window === 'undefined') return false;

  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const touch = (navigator.maxTouchPoints ?? 0) > 0;

  // iPadOS 13+ masquerades as macOS. A Mac with touch points is an iPad.
  const iPadAsMac =
    navigator.platform === 'MacIntel' && (navigator.maxTouchPoints ?? 0) > 1;

  return iPadAsMac || (coarse && touch);
}

/**
 * Touch-capable laptops would pass isHandheld() on the coarse-pointer test
 * alone, so this is the stricter check used to decide whether AR is worth
 * offering at all. Combined with model-viewer's own canActivateAR, it keeps
 * the AR affordance off screens that can't use it.
 */
export function canOfferAR() {
  if (!isHandheld()) return false;
  const ua = navigator.userAgent;
  const mobileUA = /iPhone|iPad|iPod|Android/i.test(ua);
  const iPadAsMac =
    navigator.platform === 'MacIntel' && (navigator.maxTouchPoints ?? 0) > 1;
  return mobileUA || iPadAsMac;
}