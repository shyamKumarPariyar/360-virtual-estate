import { useCallback, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useXRInputSourceState, useXRInputSourceEvent } from '@react-three/xr';
import * as THREE from 'three';

const rayOrigin = new THREE.Vector3();
const rayDir = new THREE.Vector3();
const controllerMatrix = new THREE.Matrix4();


export function VRTeleport({
    originRef,
    collidables,
    floorLevel = 0,
    hand = 'right',
    floorNormalThreshold = 0.85,
    floorHeightTolerance = 0.35,
    wallClearance = 0.4,
    onTeleport,
}) {
    const controller = useXRInputSourceState('controller', hand);
    const raycaster = useRef(new THREE.Raycaster());
    const sweep = useRef(new THREE.Raycaster());
    const reticle = useRef();
    const target = useRef(null);
    const [aiming, setAiming] = useState(false);

    const resolveLanding = useCallback(
        (point) => {
        const origin = new THREE.Vector3(point.x, point.y + 1.6, point.z);
        let closestDist = Infinity;
        let closestDir = null;

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const dir = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
            sweep.current.set(origin, dir);
            sweep.current.far = wallClearance;
            const hits = sweep.current.intersectObjects(collidables, true);
            if (hits.length && hits[0].distance < closestDist) {
            closestDist = hits[0].distance;
            closestDir = dir;
            }
        }
        sweep.current.far = Infinity;

        const result = point.clone();
        if (closestDir) {
            const push = wallClearance - closestDist;
            result.x -= closestDir.x * push;
            result.z -= closestDir.z * push;
        }
        return result;
        },
        [collidables, wallClearance]
    );

    useFrame(() => {
        const object = controller?.object;
        if (!object || !collidables?.length) {
            if (reticle.current) reticle.current.visible = false;
            return;
        }

        const trigger = controller.gamepad?.['xr-standard-trigger'];
        const held = (trigger?.state === 'pressed') || (trigger?.value ?? 0) > 0.15;

        if (held !== aiming) setAiming(held);

        if (!held) {
            if (reticle.current) reticle.current.visible = false;
            target.current = null;
            return;
        }

        object.updateWorldMatrix(true, false);
        controllerMatrix.copy(object.matrixWorld);
        rayOrigin.setFromMatrixPosition(controllerMatrix);
        rayDir.set(0, 0, -1).transformDirection(controllerMatrix);

        raycaster.current.set(rayOrigin, rayDir);
        const hits = raycaster.current.intersectObjects(collidables, true);

        let landing = null;
        for (const hit of hits) {
            if (!hit.face) continue;
            const normal = hit.face.normal
                .clone()
                .transformDirection(hit.object.matrixWorld);
            const facesUp = normal.y > floorNormalThreshold;
            const nearFloor = hit.point.y <= floorLevel + floorHeightTolerance;
            if (facesUp && nearFloor) {
                landing = hit.point;
                break;
            }
        }

        if (!landing) {
            if (reticle.current) reticle.current.visible = false;
            target.current = null;
            return;
        }

        const resolved = resolveLanding(landing);
        target.current = resolved;

        if (reticle.current) {
            reticle.current.visible = true;
            reticle.current.position.set(resolved.x, resolved.y + 0.02, resolved.z);
        }
    });

    useXRInputSourceEvent(
        controller?.inputSource,
        'selectend',
        () => {
            const point = target.current;
            const origin = originRef.current;
            if (!point || !origin) return;

            origin.position.set(point.x, point.y, point.z);
            onTeleport?.({ x: point.x, y: point.y, z: point.z });
        },
        [onTeleport]
    );

    return (
        <group ref={reticle} visible={false}>
            <mesh rotation-x={-Math.PI / 2}>
                <ringGeometry args={[0.18, 0.26, 40]} />
                <meshBasicMaterial color="#4ade80" transparent opacity={0.95} depthTest={false} />
            </mesh>
            <mesh rotation-x={-Math.PI / 2} position-y={0.001}>
                <circleGeometry args={[0.18, 32]} />
                <meshBasicMaterial color="#4ade80" transparent opacity={0.25} depthTest={false} />
            </mesh>
        </group>
    );
}