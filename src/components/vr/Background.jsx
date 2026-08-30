import { Environment, Sky } from '@react-three/drei';

const Background = ({timeOfDay = 'golden', groundY = 0, lightweight = false}) => {
    const presets = {
        day: {
        sunPosition: [80, 60, 40],
        turbidity: 6,
        rayleigh: 1.2,
        sunIntensity: 2.2,
        ambient: 0.55,
        groundColor: '#8a8f7a',
        envPreset: 'city',
        },
        golden: {
        sunPosition: [90, 12, 30],
        turbidity: 9,
        rayleigh: 2.4,
        sunIntensity: 2.6,
        ambient: 0.4,
        groundColor: '#7d7359',
        envPreset: 'sunset',
        },
        overcast: {
        sunPosition: [40, 70, 40],
        turbidity: 14,
        rayleigh: 0.6,
        sunIntensity: 0.9,
        ambient: 0.85,
        groundColor: '#8d9088',
        envPreset: 'city',
        },
    };
    
    const p = presets[timeOfDay] ?? presets.day;
    
    return (
        <>
            <Sky
                distance={4500}
                sunPosition={p.sunPosition}
                turbidity={p.turbidity}
                rayleigh={p.rayleigh}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
            />
            <mesh
                rotation-x={-Math.PI / 2}
                position={[0, groundY - 0.02, 0]}
                receiveShadow={false}
            >
                <circleGeometry args={[300, 48]} />
                <meshBasicMaterial color={p.groundColor} />
            </mesh>
            <directionalLight
                position={p.sunPosition.map((v) => v / 6)}
                intensity={p.sunIntensity}
                color="#fff6e8"
            />
            <hemisphereLight args={['#bcd8ff', p.groundColor, p.ambient]} />
    
            <ambientLight intensity={p.ambient * 0.4} />
            {!lightweight && (
                <Environment preset={p.envPreset} background={false} />
            )}
        </>
    );
}

export default Background
