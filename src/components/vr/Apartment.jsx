import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';

export function Apartment({ url, onBounds }) {
    const { scene } = useGLTF(url);
  
    useEffect(() => {
      if (!scene) return;
      const box = new Box3().setFromObject(scene);
      const size = box.getSize(new Vector3());
      const centre = box.getCenter(new Vector3());
  
      const meshes = [];
      scene.traverse((child) => {
        if (child.isMesh) meshes.push(child);
      });
  
      onBounds?.({ box, size, centre, minY: box.min.y, meshes });
    }, [scene, onBounds]);
  
    return <primitive object={scene} />;
}