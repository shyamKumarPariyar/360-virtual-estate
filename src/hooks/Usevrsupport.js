import { useEffect, useState } from 'react';

/**
 * Can this device run an immersive-vr session?
 *
 *   'ready'       — headset browser, session available.
 *   'no-headset'  — WebXR exists but no immersive-vr device connected.
 *   'unsupported' — no WebXR at all (all iOS browsers, most desktop browsers
 *                   without a headset attached).
 *   'insecure'    — not HTTPS, so the API is unavailable regardless.
 *
 * Reported separately from "did entering fail" so the page can say something
 * useful before the user taps rather than after.
 */
export function useVRSupport() {
    const [state, setState] = useState({ status: 'checking', reason: null });

    useEffect(() => {
        let cancelled = false;
        const settle = (status, reason) => !cancelled && setState({ status, reason });

        if (!window.isSecureContext) {
        return settle('insecure', 'WebXR needs HTTPS. Serve the site over TLS or use localhost.');
        }

        if (!navigator.xr) {
        return settle(
            'unsupported',
            'This browser does not support WebXR. Try the Meta Quest Browser, or Chrome on a PC with a headset attached.'
        );
        }

        navigator.xr
        .isSessionSupported('immersive-vr')
        .then((ok) =>
            ok
            ? settle('ready', null)
            : settle('no-headset', 'No VR headset detected. Open this page in your headset browser.')
        )
        .catch((err) => settle('unsupported', err.message));

        return () => {
        cancelled = true;
        };
    }, []);

    return state;
}