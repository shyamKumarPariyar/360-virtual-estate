import { Billboard, Text } from '@react-three/drei';
import { useCallback, useState } from 'react'

const Interactable = ({ position, on, onToggle, hand }) => {
    const [hovered, setHovered] = useState(false);
    
    const pulse = useCallback(() => {
        try {
        hand?.inputSource?.gamepad?.hapticActuators?.[0]?.pulse?.(0.4, 40);
        } catch {
            console.log('Something Error')
        }
    }, [hand]);
    
    const handleClick = useCallback(
        (event) => {
        event?.stopPropagation?.();
        pulse();
        onToggle?.();
        },
        [onToggle, pulse]
    );
    
    const accent = on ? '#4ade80' : '#f83030';
    
    return (
        <Billboard position={position}>
            <group
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <mesh visible={false}>
                    <circleGeometry args={[0.15, 10]} />
                </mesh>
        
                <mesh>
                    <circleGeometry args={[0.008, 55]} />
                    <meshBasicMaterial
                        color={accent}
                        transparent
                        opacity={hovered ? 0.80 : 0.35}
                        depthTest={false}
                    />
                </mesh>
        
                <Text
                    position={[0, -0.02, 0]}
                    fontSize={0.04}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="top"
                    outlineWidth={0.006}
                    outlineColor="#0e0e10"
                    visible={hovered}
                >
                    {on ? 'ON' : 'OFF'}
                </Text>
            </group>
        </Billboard>
    );
}

export default Interactable
