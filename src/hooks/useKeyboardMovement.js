// src/xr/hooks/useKeyboardMovement.js
//
// WASD + arrow-key movement for desktop/non-XR use. Returns a camera-relative
// horizontal velocity vector each frame, fed into the same rigid body the XR
// controller locomotion drives — one movement/collision path for both input
// methods instead of two divergent systems.

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useXR } from '@react-three/xr';
import { Vector3 } from 'three';

const KEY_MAP = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'backward',
  ArrowDown: 'backward',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

const WALK_SPEED = 2.2; // m/s
const RUN_SPEED = 4.2; // m/s, held with Shift

export function useKeyboardMovement() {
  const pressed = useRef({ forward: false, backward: false, left: false, right: false });
  const running = useRef(false);
  const camera = useThree((state) => state.camera);
  const session = useXR((state) => state.session);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (KEY_MAP[e.code]) pressed.current[KEY_MAP[e.code]] = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') running.current = true;
    };
    const onKeyUp = (e) => {
      if (KEY_MAP[e.code]) pressed.current[KEY_MAP[e.code]] = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') running.current = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const velocity = useRef(new Vector3());
  const forward = useRef(new Vector3());
  const right = useRef(new Vector3());

  const getMovement = () => {
    velocity.current.set(0, 0, 0);

    // Hand off entirely to controller thumbstick locomotion while in XR, so
    // the two inputs never fight over the same rigid body in the same frame.
    if (session) return velocity.current;

    const { forward: f, backward: b, left: l, right: r } = pressed.current;
    if (!f && !b && !l && !r) return velocity.current;

    camera.getWorldDirection(forward.current);
    forward.current.y = 0;
    forward.current.normalize();
    right.current.set(forward.current.z, 0, -forward.current.x);

    if (f) velocity.current.add(forward.current);
    if (b) velocity.current.sub(forward.current);
    if (r) velocity.current.add(right.current);
    if (l) velocity.current.sub(right.current);

    if (velocity.current.lengthSq() > 0) {
      velocity.current.normalize();
      velocity.current.multiplyScalar(running.current ? RUN_SPEED : WALK_SPEED);
    }

    return velocity.current;
  };

  return getMovement;
}
