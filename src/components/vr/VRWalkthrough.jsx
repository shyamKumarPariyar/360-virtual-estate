import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { createXRStore, XR, XROrigin } from '@react-three/xr';
import { useVRSupport } from '../../hooks/Usevrsupport';
import { Apartment } from './Apartment';
import { Raycaster, Vector3 } from 'three';
import TeleportFloor from './TeleportFloor';
import { GrabRotate } from './GrabRotate';
import Background from './Background';

const ASSETS_BASE_URL = 'https://360-virtual-estate.s3.eu-north-1.amazonaws.com/models/apartment.glb'

const store = createXRStore({
    hand: { teleportPointer: true },
    controller: { teleportPointer: true },
});

const STAND_HEIGHT = 1.7;
const VRWalkthrough = ({modelUrl = ASSETS_BASE_URL, title = 'Apartment walkthrough', onEvent}) => {
    const originRef = useRef();
    const positionRef = useRef(new Vector3(0, 0, 0));

    const support = useVRSupport();
    const [inXR, setInXR] = useState(false);
    const [error, setError] = useState('');
    const enteredAt = useRef(null);
    
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

    // Updates for raycasting on floor
    const up = useRef(new Raycaster());
    const across = useRef(new Raycaster());
    const [bounds, setBounds] = useState(null);
    const boundsRef = useRef(null);
    
    const handleBounds = useCallback((b) => {
        boundsRef.current = b;
        setBounds(b);
    }, []);
    
    const isDestinationClear = useCallback((target) => {
        const meshes = boundsRef.current?.meshes;
        if (!meshes?.length) return true;
    
        up.current.set(
            new Vector3(target.x, target.y + 0.05, target.z),
            new Vector3(0, 1, 0)
        );

        up.current.far = STAND_HEIGHT;
        const occupied = up.current.intersectObjects(meshes, true);
        up.current.far = Infinity;
        if (occupied.length > 0) return false;
    
        const from = positionRef.current.clone();
        from.y = target.y + 1.0;
        const to = new Vector3(target.x, target.y + 1.0, target.z);
        const distance = from.distanceTo(to);
        if (distance < 0.1) return true;
    
        across.current.set(from, to.clone().sub(from).normalize());
        across.current.far = distance - 0.15;
        const blocked = across.current.intersectObjects(meshes, true);
        across.current.far = Infinity;
    
        return blocked.length === 0;
    }, []);

    const handleTeleport = useCallback((target) => {
        const origin = originRef.current;
        if (!origin) return;
    
        const b = boundsRef.current;
        let dest = target.clone();
    
        if (b) {
            const margin = 0.3;
            dest.x = Math.min(Math.max(dest.x, b.box.min.x + margin), b.box.max.x - margin);
            dest.z = Math.min(Math.max(dest.z, b.box.min.z + margin), b.box.max.z - margin);
            if (!isDestinationClear(dest)) return;
        }
    
        origin.position.copy(dest);
        positionRef.current.copy(dest);
        onEvent?.({ type: 'vr_teleport', x: dest.x, y: dest.y, z: dest.z });
        },[isDestinationClear, onEvent]
    );

    const loading = canRender && !bounds;
    
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
                    disabled={!ready || loading}
                >
                    {loading ? 'Loading the apartment…' : 'Enter VR'}
                    
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
                    shadows={true}
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
                        <XROrigin ref={originRef} />
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} />
                        <Background timeOfDay="day" groundY={bounds?.minY ?? 0} />
                        <Apartment url={modelUrl} onBounds={handleBounds} />
                        <GrabRotate originRef={originRef} hand="right" />
                        {bounds && (
                            <TeleportFloor
                                width={bounds.size.x}
                                depth={bounds.size.z}
                                centre={bounds.centre}
                                y={bounds.minY + 0.01}
                                onTeleport={handleTeleport}
                            />
                        )}
                    </XR>
                </Canvas>
            </div>
        ) : (
            <div className="vrw__poster" aria-hidden="true" />
        )}
        </div>
    );
}

export default VRWalkthrough