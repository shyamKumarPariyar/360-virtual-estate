import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

const LoadModel = ({model, onReady}) => {
    const {scene} = useGLTF(model?.model)

    useEffect(() => {
        if (!scene) return
    
        const allMeshes = []
        scene.traverse((child) => {
            if (!child.isMesh) return
            child.material = child.material.clone()
            child.userData._originalEmissive = child.material.emissive
                ? child.material.emissive.clone()
                : new THREE.Color(0, 0, 0)
            allMeshes.push(child)
        })
    
        onReady?.({ allMeshes, floorLevel: model?.floorLevel, spawn: { x: model?.camera?.x, z: model?.camera?.z } })
    }, [scene, onReady, model])

    return (
        <primitive 
            object={scene} 
            scale={1} 
            castShadow
            receiveShadow 
        />
    )
}
useGLTF.preload('/models/appartement.glb')
export default LoadModel
