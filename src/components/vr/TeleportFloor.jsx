import { TeleportTarget } from '@react-three/xr';

const TeleportFloor = ({ width, depth, centre, y, onTeleport }) => {
    return (
        <TeleportTarget onTeleport={onTeleport}>
        <mesh rotation-x={-Math.PI / 2} position={[centre.x, y, centre.z]}>
            <planeGeometry args={[width, depth]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        </TeleportTarget>
      );
}

export default TeleportFloor
