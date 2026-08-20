import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CameraPivotControl = ({ collidables, dragStateRef, moveSpeed, lookSpeed, collisionBuffer, pitchLimit }) => {
    const { camera, gl } = useThree()
    const keys = useRef({ w: false, a: false, s: false, d: false })
    const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
    const forwardRay = useRef(new THREE.Raycaster())
    
    useEffect(() => {
        euler.current.setFromQuaternion(camera.quaternion, 'YXZ')
        euler.current.y = 1.865
        euler.current.x = 0
        camera.quaternion.setFromEuler(euler)
        const onKeyDown = (e) => { const k = e.key.toLowerCase(); if (k in keys.current) keys.current[k] = true }
        const onKeyUp = (e) => { const k = e.key.toLowerCase(); if (k in keys.current) keys.current[k] = false }
    
        const canvas = gl.domElement

         // shared by mouse and touch so both rotate the view identically
        const beginDrag = (x, y) => {
            dragStateRef.current.active = true
            dragStateRef.current.lastX = x
            dragStateRef.current.lastY = y
            dragStateRef.current.moved = false
        }
        
        const updateDrag = (x, y) => {
            if (!dragStateRef.current.active) return
            const dx = x - dragStateRef.current.lastX
            const dy = y - dragStateRef.current.lastY
            if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragStateRef.current.moved = true
            dragStateRef.current.lastX = x
            dragStateRef.current.lastY = y
        
            euler.current.y += dx * lookSpeed
            euler.current.x += dy * lookSpeed
            euler.current.x = Math.max(-pitchLimit, Math.min(pitchLimit, euler.current.x))
            camera.quaternion.setFromEuler(euler.current)
        }

        const endDrag = () => { dragStateRef.current.active = false }
        
        const onMouseDown = (e) => beginDrag(e.clientX, e.clientY)
        const onMouseMove = (e) => updateDrag(e.clientX, e.clientY)
        const onMouseUp = () => endDrag()

        const onTouchStart = (e) => {
            if (e.touches.length !== 1) return // ignore pinch-zoom gestures
            const t = e.touches[0]
            beginDrag(t.clientX, t.clientY)
        }
        const onTouchMove = (e) => {
            if (e.touches.length !== 1 || !dragStateRef.current.active) return
            e.preventDefault() // stop page scroll/bounce while looking around
            const t = e.touches[0]
            updateDrag(t.clientX, t.clientY)
        }

        const onTouchEnd = () => endDrag()
        
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        canvas.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)

        canvas.addEventListener('touchstart', onTouchStart, { passive: true })
        canvas.addEventListener('touchmove', onTouchMove, { passive: false })
        canvas.addEventListener('touchend', onTouchEnd)
        canvas.addEventListener('touchcancel', onTouchEnd)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
            canvas.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            canvas.removeEventListener('touchstart', onTouchStart)
            canvas.removeEventListener('touchmove', onTouchMove)
            canvas.removeEventListener('touchend', onTouchEnd)
            canvas.removeEventListener('touchcancel', onTouchEnd)
        }
    }, [camera, gl, dragStateRef, lookSpeed, pitchLimit])
    
    useFrame((_, delta) => {
        if (!collidables || collidables.length === 0) return
    
        const forward = new THREE.Vector3()
        camera.getWorldDirection(forward)
        forward.y = 0
        forward.normalize()
        const right = new THREE.Vector3()
        right.crossVectors(forward, camera.up).normalize()
    
        const wish = new THREE.Vector3()
        if (keys.current.w) wish.add(forward)
        if (keys.current.s) wish.sub(forward)
        if (keys.current.d) wish.add(right)
        if (keys.current.a) wish.sub(right)
        if (wish.lengthSq() === 0) return
        wish.normalize()
    
        const stepDistance = moveSpeed * delta
        forwardRay.current.set(camera.position.clone(), wish)
        const hits = forwardRay.current.intersectObjects(collidables, true)
        const blocked = hits.length > 0 && hits[0].distance < stepDistance + collisionBuffer
        if (blocked) return
    
        camera.position.add(wish.multiplyScalar(stepDistance))
    })
    
    return null
}

export default CameraPivotControl
