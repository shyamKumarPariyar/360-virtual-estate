import { useCallback, useState } from 'react'
import { INTERACTIONS } from '../../data/homeConstant';
import { useXRInputSourceState } from '@react-three/xr';
import Interactable from './Interactable';
import TVScreen from './TVScreen';

const ApartmentInteractions = ({ meshes }) => {
    const right = useXRInputSourceState('controller', 'right');
    
    const [state, setState] = useState(() =>
        Object.fromEntries(INTERACTIONS.map((i) => [i.id, i.defaultOn ?? false]))
    );
    
    const toggle = useCallback(
        (item) => {
            setState((prev) => {
                const next = !prev[item.id];
                return { ...prev, [item.id]: next };
            });
        }, []
    );
    
    return (
        <>
            {INTERACTIONS.filter((i) => i.type === 'screen' && i.video).map((item) => (
                <TVScreen
                    key={`${item.id}-video`}
                    meshes={meshes}
                    match={item.mesh}
                    src={item.video}
                    playing={state[item.id]}
                />
            ))}
        
            {INTERACTIONS.map((item) => (
                <Interactable
                    key={item.id}
                    position={item.position}
                    on={state[item.id]}
                    onToggle={() => toggle(item)}
                    hand={right}
                />
            ))}
        </>
    );
}

export default ApartmentInteractions
