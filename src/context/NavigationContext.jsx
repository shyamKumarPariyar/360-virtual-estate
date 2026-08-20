
import { createContext, useContext, useRef } from "react";
import * as THREE from "three";

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {

    const cameraPosition = useRef(new THREE.Vector3(0, 1.6, 5));
    const targetPosition = useRef(new THREE.Vector3(0, 1.6, 5));

    const yaw = useRef(0);
    const pitch = useRef(0);

    const isMoving = useRef(false);

    const moveTo = (position) => {
        targetPosition.current.copy(position);
        isMoving.current = true;
    };

    return (
        <NavigationContext.Provider
            value={{
                cameraPosition,
                targetPosition,
                yaw,
                pitch,
                isMoving,
                moveTo
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);