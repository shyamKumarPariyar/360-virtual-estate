import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'

const SpawnCamera = ({ x, z, floorLevel, eyeHeight, facingDeg }) => {
    const { camera } = useThree()
    const done = useRef(false)
    useFrame(() => {
        if (done.current) return
        camera.position.set(x, floorLevel + eyeHeight, z)
        // camera.rotation.order = 'YXZ'
        camera.rotation.set(0, (facingDeg * Math.PI) / 180, 0)
        done.current = true
    })
    return null
}

export default SpawnCamera
