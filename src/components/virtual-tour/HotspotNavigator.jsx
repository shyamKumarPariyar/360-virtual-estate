import { useEffect, useRef } from 'react';
import { usePannellum } from 'react-pannellum';

/**
 * How far a tap may land from a hotspot's centre, in SCREEN PIXELS.
 *
 * The previous version used degrees, which is the wrong unit: at hfov 120 on a
 * phone, 2 degrees is about 6 pixels, and a fingertip covers roughly 45. A
 * degree threshold also changes size as the user zooms, so a hotspot that was
 * reachable at one zoom level becomes unreachable at another.
 */
const HIT_RADIUS_PX = 44;

/** A pointer that travels further than this is a pan, not a tap. */
const DRAG_TOLERANCE_PX = 10;

/** Shortest angular distance in degrees, correct across the +/-180 seam. */
function angleDelta(a, b) {
  let d = ((a - b + 180) % 360 + 360) % 360 - 180;
  return Math.abs(d);
}

const HotspotNavigator = ({ loaded, hotSpots, onNavigate }) => {
  const pannellum = usePannellum();
  const start = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    if (typeof pannellum?.getContainer !== 'function') return;

    const container = pannellum.getContainer();
    if (!container) return;

    const onPointerDown = (event) => {
      start.current = { x: event.clientX, y: event.clientY, moved: false };
    };

    const onPointerMove = (event) => {
      const s = start.current;
      if (!s) return;
      if (Math.hypot(event.clientX - s.x, event.clientY - s.y) > DRAG_TOLERANCE_PX) {
        s.moved = true;
      }
    };

    const onPointerUp = (event) => {
      const s = start.current;
      start.current = null;

      if (!s || s.moved) return;
      if (typeof pannellum?.mouseEventToCoords !== 'function') return;

      const [pitch, yaw] = pannellum.mouseEventToCoords(event);

      const rect = container.getBoundingClientRect();
      const hfov = typeof pannellum.getHfov === 'function' ? pannellum.getHfov() : 100;
      const pxPerDeg = rect.width / hfov;
      const maxDeg = HIT_RADIUS_PX / pxPerDeg;

      let closest = null;
      let closestDeg = Infinity;

      for (const hotspot of hotSpots) {
        if (hotspot.type !== 'scene') continue;
        const dPitch = hotspot.pitch - pitch;
        const dYaw = angleDelta(hotspot.yaw, yaw) * Math.cos((pitch * Math.PI) / 180);
        const dist = Math.hypot(dPitch, dYaw);

        if (dist < closestDeg) {
          closestDeg = dist;
          closest = hotspot;
        }
      }

      if (closest && closestDeg <= maxDeg) {
        onNavigate(closest.sceneId, closest.targetPitch, closest.targetYaw, closest.targetHfov);
      }
    };

    const onPointerCancel = () => {
      start.current = null;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerCancel);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerCancel);
    };
  }, [loaded, hotSpots, onNavigate, pannellum]);

  return null;
};

export default HotspotNavigator;