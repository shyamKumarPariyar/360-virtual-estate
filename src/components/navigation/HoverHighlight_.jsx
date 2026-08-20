import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'

const HoverHighlight = ({ collidables, enabled, onHoverInfo }) => {
    const { camera, gl, raycaster, mouse } = useThree()
    const highlighted = useRef(null)
    
    useEffect(() => {
        if (!enabled || !collidables?.length) {
        // clear any existing highlight when toggled off
        if (highlighted.current) {
            highlighted.current.material.emissive.copy(highlighted.current.userData._originalEmissive)
            highlighted.current = null
        }
        return
        }
        const canvas = gl.domElement
    
        const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        raycaster.setFromCamera(mouse, camera)
        const hits = raycaster.intersectObjects(collidables, true)
    
        if (highlighted.current) {
            highlighted.current.material.emissive.copy(highlighted.current.userData._originalEmissive)
            highlighted.current = null
        }
    
        if (hits.length > 0) {
            const mesh = hits[0].object
            if (mesh.material?.emissive) {
            mesh.material.emissive.set('#00e5ff')
            highlighted.current = mesh
            }
            onHoverInfo?.({ name: mesh.name, distance: hits[0].distance.toFixed(2) })
        } else {
            onHoverInfo?.(null)
        }
        }
    
        canvas.addEventListener('mousemove', onMouseMove)
        return () => canvas.removeEventListener('mousemove', onMouseMove)
    }, [collidables, enabled, camera, gl, raycaster, mouse, onHoverInfo])
    
    return null
}

export default HoverHighlight
