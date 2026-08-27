import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Loads the apartment GLB and hands its meshes up for raycasting.
 *
 * GLB only — USDZ is an iOS Quick Look format and cannot be loaded by
 * three.js, WebXR, or anything in this stack.
 */
export function Apartment({ url, onReady }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    if (!scene) return;

    const meshes = [];
    scene.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
      meshes.push(child);
    });

    onReady?.(meshes);
  }, [scene, onReady]);

  return <primitive object={scene} />;
}