import { Component, Suspense, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import LoadModel from '../LoadModel'
import Loader from './Loader'
import CameraPivotControl from '../camera/CameraPivotControl'
import ClickTeleport from '../navigation/ClickTeleport'
import SpawnCamera from '../camera/SpawnCamera'
import { folder, Leva, useControls } from 'leva'
import { Html } from '@react-three/drei'
import InfoBox from './InfoBox'
import FullscreenButton from './FullscreenButton'

class ModelErrorBoundary extends Component {
	constructor(props) { super(props); this.state = { error: null } }
	static getDerivedStateFromError(error) { return { error } }
	render() {
		if (this.state.error) {
		return (
			<Html center>
			<div style={{
				background: '#2a0510', color: '#ff6688', padding: '16px 20px',
				borderRadius: 10, fontFamily: 'monospace', fontSize: 12,
				maxWidth: 360, border: '1px solid #ff336655'
			}}>
				<div style={{ fontWeight: 700, marginBottom: 6 }}>Model failed to load</div>
				<div>{String(this.state.error.message || this.state.error)}</div>
				<div style={{ marginTop: 8, color: '#ffaa99' }}>
				Check: is appartement.glb actually at /models/appartement.glb
				in your public folder? Check the Network tab for a 404.
				</div>
			</div>
			</Html>
		)
		}
		return this.props.children
	}
}

const CanvasComponent = ({model}) => {
	const [allMeshes, setAllMeshes] = useState([])
	const [floorLevel, setFloorLevel] = useState(0)
	const [spawn, setSpawn] = useState(null)
	const [eyeHeight, setEyeHeight] = useState(model?.camera?.y)
	const [floorNormalThreshold, setFloorNormalThreshold] = useState(0.7)
	const [floorHeightTolerance, setFloorHeightTolerance] = useState(0.25)

	const [hasLoaded, setHasLoaded] = useState(false)

	const [isTouchDevice] = useState(() =>
		typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
	)

	const dragStateRef = useRef({ active: false, lastX: 0, lastY: 0, moved: false })

	const divRef = useRef(null);

	const {
		moveSpeed, lookSpeed, collisionBuffer, pitchLimitDeg,
		wallClearance, clearanceDirections,
	} = useControls({
		Movement: folder({
			moveSpeed: { value: 0.5, min: 0.5, max: 8, step: 0.5 },
			lookSpeed: { value: 0.003, min: 0.0005, max: 0.008, step: 0.0005 },
			collisionBuffer: { value: 0.9, min: 0.1, max: 1, step: 0.1 },
			pitchLimitDeg: { value: 20, min: 10, max: 90, step: 10 }, // how far up/down you can look, in degrees
		}),
		'Wall Clearance': folder({
			wallClearance: { value: 0.6, min: 0.1, max: 1.5, step: 0.05 },
		})
	})
	
	const params = useMemo(() => ({
			eyeHeight, floorNormalThreshold, floorHeightTolerance, wallClearance, clearanceDirections
		}), [eyeHeight, floorNormalThreshold, floorHeightTolerance, wallClearance, clearanceDirections])

	const handleReady = ({ allMeshes, floorLevel, spawn }) => {
		setAllMeshes(allMeshes)
		setFloorLevel(floorLevel)
		setSpawn(spawn)
		setHasLoaded(true)
	}

    return (
        <div ref={divRef} className='detail-vr'>
			<Leva collapsed={false} hidden={isTouchDevice} titleBar={{ title: 'Walkthrough Debug' }} />
			{!hasLoaded && (
				<div 
					style={{
						position: 'absolute', inset: 0, zIndex: 20,
						display: 'flex', alignItems: 'center', justifyContent: 'center',
						background: 'rgba(10,10,18,0.7)', 
						color: '#e8e8f0',
						fontFamily: 'monospace', fontSize: 14
					}}
				>
					Loading apartment…
				</div>
			)}

			<div
				hidden={isTouchDevice}
				style={{
					position: 'absolute',
					bottom: 4,
					right: 6,
					zIndex: 10,
					cursor: 'pointer',
					backgroundColor: '#fff',
					border: '1px solid #999',
					borderColor: '#00000066',
					borderRadius: '3px',
				}}
			>
				<FullscreenButton targetRef={divRef} />
			</div>
			
			<InfoBox text={isTouchDevice
				? 'Tap the floor to teleport there and move or drag to look around'
				: 'WASD move · drag look · click on the floor to teleport'} />
			<Canvas 
				shadows 
				camera={{ position: [-4.69, 2.5, 2.53], fov: 70 }}
				style={{
					width: '100%',
					height: '100%',
					opacity: hasLoaded ? 1 : 0,
					transition: 'opacity 0.5s ease'
				}}
			>
				{/* <XR store={xrStore}> */}
					<ambientLight intensity={2} />
					<directionalLight position={[5, 8, 5]} intensity={1} castShadow />
					<ModelErrorBoundary>
						<Suspense fallback={<Loader />} >
							<LoadModel 
								onReady={handleReady} 
								model={model} 
							/>
						</Suspense>
					</ModelErrorBoundary>
					<>
						{spawn && (
							<SpawnCamera x={spawn.x} z={spawn.z} floorLevel={floorLevel} eyeHeight={eyeHeight} facingDeg={model?.cameraFacing} />
						)}
					
						<CameraPivotControl 
							collidables={allMeshes} 
							dragStateRef={dragStateRef} 
							moveSpeed={moveSpeed}
							lookSpeed={lookSpeed}
							collisionBuffer={collisionBuffer}
							pitchLimit={(pitchLimitDeg * Math.PI) / 180}
						/>
						<ClickTeleport 
							collidables={allMeshes} 
							floorLevel={floorLevel} 
							dragStateRef={dragStateRef} 
							params={params}
						/>
					</>
				{/* </XR> */}
			</Canvas>
        </div>
    )
}

export default CanvasComponent
