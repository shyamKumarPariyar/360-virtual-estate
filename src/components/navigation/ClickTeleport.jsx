import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ClickTeleport = ({collidables, floorLevel, dragStateRef, params}) => {
    const { camera, gl, raycaster, mouse } = useThree()
    const sweepRaycaster = useRef(new THREE.Raycaster())
    
    useEffect(() => {
        if (!collidables || collidables.length === 0) return
        
        const canvas = gl.domElement
    
        const onClick = (e) => {
            if (dragStateRef.current.moved) return
        
            const rect = canvas.getBoundingClientRect()
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        
            raycaster.setFromCamera(mouse, camera)
            const hits = raycaster.intersectObjects(collidables, true)
            if (hits.length === 0) return
        
            const hit = hits[0]
            if (!hit.face) return
        
            const worldNormal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld)
            const facesUpward = worldNormal.y > params.floorNormalThreshold
            const nearFloorHeight = hit.point.y <= floorLevel + params.floorHeightTolerance
            const valid = facesUpward && nearFloorHeight
        
            const standHeight = hit.point.y + params.eyeHeight
            const origin = new THREE.Vector3(hit.point.x, standHeight, hit.point.z)
            const sweepDirs = params.clearanceDirections
            const sweepResults = []
            let closestDist = Infinity
            let closestDir = null
        
            for (let i = 0; i < sweepDirs; i++) {
                const angle = (i / sweepDirs) * Math.PI * 2
                const dir = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle))
                sweepRaycaster.current.set(origin, dir)
                sweepRaycaster.current.far = params.wallClearance
                const sHits = sweepRaycaster.current.intersectObjects(collidables, true)
                const dist = sHits.length > 0 ? sHits[0].distance : params.wallClearance
                sweepResults.push({ dir, dist, blocked: sHits.length > 0 })
                if (sHits.length > 0 && sHits[0].distance < closestDist) {
                closestDist = sHits[0].distance
                closestDir = dir
                }
            }

            sweepRaycaster.current.far = Infinity
        
            let finalX = hit.point.x
            let finalZ = hit.point.z
            if (closestDir) {
                const pushAmount = params.wallClearance - closestDist
                finalX -= closestDir.x * pushAmount
                finalZ -= closestDir.z * pushAmount
            }
        
            if (valid) {
                camera.position.x = finalX
                camera.position.z = finalZ
                camera.position.y = standHeight
            }
        }
    
        canvas.addEventListener('click', onClick)

        return () => canvas.removeEventListener('click', onClick)

    }, [collidables, floorLevel, camera, gl, raycaster, mouse, dragStateRef, params])
    
    return null
}

export default ClickTeleport
