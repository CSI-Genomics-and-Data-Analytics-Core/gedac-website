/**
 * The gtag plugin registers onRouteDidUpdate handlers that call window.gtag().
 * If the inline gtag snippet did not run (blocked, CSP) or .docusaurus is stale,
 * window.gtag can be missing — this restores the standard dataLayer stub.
 */
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}
