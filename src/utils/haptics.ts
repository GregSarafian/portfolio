import { WebHaptics, defaultPatterns } from 'web-haptics'

// Single shared instance — WebHaptics is lightweight and stateless
const haptics = new WebHaptics()

/**
 * Fire a Light haptic feedback on supported mobile browsers.
 * Safe to call on desktop (silently no-ops).
 */
export function triggerHaptic(): void {
  try {
    haptics.trigger(defaultPatterns.light)
  } catch {
    // Silently swallow — not all browsers support the Vibration API
  }
}
