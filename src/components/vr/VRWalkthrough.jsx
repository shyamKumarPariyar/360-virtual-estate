import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR, XROrigin, useXR } from '@react-three/xr';
import { useVRSupport } from '../../hooks/Usevrsupport';
import { Apartment } from './Apartment';
import { VRTeleport } from './VRTeleport';

const ASSETS_BASE_URL = 'https://360-virtual-estate.s3.eu-north-1.amazonaws.com'

const store = createXRStore({
    referenceSpace: 'local-floor',
    controller: true,
    hand: false,
});

function XROnly({ children }) {
    const session = useXR((s) => s.session);
    return session ? children : null;
}

export default function VRWalkthrough({
    modelUrl = ASSETS_BASE_URL+'/models/apartment.glb',
    spawn = { x: 0, z: 0 },
    floorLevel = 0,
    title = 'Apartment walkthrough',
    onEvent,
}) {
    const support = useVRSupport();
    const originRef = useRef();
    const [meshes, setMeshes] = useState([]);
    const [inXR, setInXR] = useState(false);
    const [error, setError] = useState('');
    const enteredAt = useRef(null);
    
    const handleReady = useCallback((m) => setMeshes(m), []);
    
    const enterVR = useCallback(async () => {
        setError('');
        try {
        await store.enterVR();
        } catch (err) {
        setError(`Could not start VR: ${err.message}`);
        onEvent?.({ type: 'error', message: err.message });
        }
    }, [onEvent]);
    
    useEffect(() => {
        return store.subscribe((state) => {
        const active = !!state.session;
        setInXR(active);
        if (active) {
            enteredAt.current = Date.now();
            onEvent?.({ type: 'vr_session_start' });
        } else if (enteredAt.current) {
            onEvent?.({
            type: 'vr_session_end',
            durationMs: Date.now() - enteredAt.current,
            });
            enteredAt.current = null;
        }
        });
    }, [onEvent]);
    
    const ready = support.status === 'ready';
    
    const canRender = support.status === 'ready' || support.status === 'no-headset';
    
    return (
        <div className="vrw">
        {!inXR && (
            <div className="vrw__lobby">
                <p className="vrw__eyebrow">3D Walkthrough</p>
                <h1>{title}</h1>
                <p className="vrw__lede">
                    Walk the apartment at full scale. Point a controller at the floor,
                    hold the trigger to aim, and release to move there.
                </p>
        
                <button
                    className="vrw__enter"
                    onClick={enterVR}
                    disabled={!ready || (canRender && meshes.length === 0)}
                >
                    {canRender && meshes.length === 0 ? 'Loading the apartment…' : 'Enter VR'}
                </button>
        
                {!ready && support.status !== 'checking' && (
                    <p className="vrw__note">{support.reason}</p>
                )}
                {error && <p className="vrw__note vrw__note--error">{error}</p>}
        
                <dl className="vrw__controls">
                    <div>
                    <dt>Aim</dt>
                    <dd>Hold the trigger and point at the floor.</dd>
                    </div>
                    <div>
                    <dt>Move</dt>
                    <dd>Release the trigger to teleport there.</dd>
                    </div>
                    <div>
                    <dt>Look</dt>
                    <dd>Turn your head, or turn on the spot.</dd>
                    </div>
                </dl>
            </div>
        )}
    
        {canRender ? (
            <div className="vrw__stage">
                <Canvas
                    shadows={false}
                    dpr={[1, 1.5]}
                    camera={{ fov: 60, position: [0, 1.6, 0] }}
                    onCreated={({ gl }) => {
                        gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                        setError('The 3D view ran out of memory on this device.');
                        onEvent?.({ type: 'webgl_context_lost' });
                        });
                    }}
                >
                    <XR store={store}>
                        <ambientLight intensity={2} />
                        <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
            
                        <Suspense fallback={null}>
                            <Apartment url={modelUrl} onReady={handleReady} />
                        </Suspense>
            
                        <XROrigin ref={originRef} position={[spawn.x, floorLevel, spawn.z]} />
            
                        <XROnly>
                            <VRTeleport
                                originRef={originRef}
                                collidables={meshes}
                                floorLevel={floorLevel}
                                hand="right"
                                onTeleport={(p) => onEvent?.({ type: 'vr_teleport', ...p })}
                            />
                        </XROnly>
                    </XR>
                </Canvas>
            </div>
        ) : (
            <div className="vrw__poster" aria-hidden="true" />
        )}
        </div>
    );
}