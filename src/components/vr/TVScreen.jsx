import { useEffect, useRef } from 'react'
import { SRGBColorSpace, VideoTexture } from 'three';

const TVScreen = ({ meshes, match, src, playing, onEvent }) => {
    const video = useRef(null);
    const texture = useRef(null);
    const targets = useRef([]);
    
    useEffect(() => {
        if (!meshes?.length || !src) return;
    
        const el = document.createElement('video');
        el.src = src;
        el.loop = true;
        el.muted = false;
        el.playsInline = true;    // depends on both being set this way
        el.crossOrigin = 'anonymous';
        el.preload = 'auto';
        el.setAttribute('playsinline', '');
        el.setAttribute('webkit-playsinline', '');
        el.style.cssText = [
            'position:fixed',
            'top:0',
            'left:0',
            'width:1px',
            'height:1px',
            'opacity:0',
            'z-index:-1',
            'pointer-events:none',
        ].join(';');
        el.setAttribute('aria-hidden', 'true');
        el.setAttribute('tabindex', '-1');
        document.body.appendChild(el);
        video.current = el;
    
        const tex = new VideoTexture(el);
        tex.colorSpace = SRGBColorSpace;
        tex.generateMipmaps = false;
        tex.flipY = false;
        texture.current = tex;
    
        const found = meshes.filter((m) => !Array.isArray(m.material) && match.test(m.name));
    
        if (!found.length) {
            console.info(
                '[TVScreen] no mesh matched. Names:',
                meshes.map((m) => m.name).join(', ')
            );
            return;
        }
    
        targets.current = found.map((mesh) => {
            mesh.material = mesh.material.clone();
            const original = {
                mesh,
                emissiveMap: mesh.material.emissiveMap ?? null,
                emissive: mesh.material.emissive?.clone() ?? null,
                intensity: mesh.material.emissiveIntensity ?? 1,
            };
        
            mesh.material.emissiveMap = tex;
            mesh.material.emissive?.set('#ffffff');
            mesh.material.emissiveIntensity = 0;
            mesh.material.needsUpdate = true;
        
            return original;
        });
    
        el.addEventListener('error', () => onEvent?.({
            type: 'video_error', src
        }));
    
        return () => {
            for (const t of targets.current) {
                t.mesh.material.emissiveMap = t.emissiveMap;
                if (t.emissive) t.mesh.material.emissive.copy(t.emissive);
                t.mesh.material.emissiveIntensity = t.intensity;
                t.mesh.material.needsUpdate = true;
            }
            targets.current = [];
            tex.dispose();
            el.pause();
            el.removeAttribute('src');
            el.load();
            el.remove();
        };
    }, [meshes, match, src, onEvent]);
    
    useEffect(() => {
        const el = video.current;
        if (!el) return;
    
        if (playing) {
            el.play().catch((err) => {
                onEvent?.({ type: 'video_blocked', message: err.message });
            });
        } else {
            el.pause();
        }
    
        for (const t of targets.current) {
            t.mesh.material.emissiveIntensity = playing ? 1.4 : 0;
        }
    }, [playing, onEvent]);
    
    return null;
}

export default TVScreen
