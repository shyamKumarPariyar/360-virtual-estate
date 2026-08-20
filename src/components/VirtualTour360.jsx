import ReactPannellum from 'react-pannellum'
import { TOUR_CONFIG } from '../data/tourConfig'
import TourToolbar from './virtual-tour/TourToolbar'
import { useCallback, useState } from 'react';
import HotspotNavigator from './virtual-tour/HotspotNavigator';
import { useParams } from 'react-router-dom';

const sceneFadeDuration = 800;

const VirtualTour360 = () => {
    const {id} =  useParams()
    const firstScene = TOUR_CONFIG[id].default.firstScene;
    const rawScenes = TOUR_CONFIG[id].scenes;

    const [loaded, setLoaded] = useState(false);
    const [currentSceneId, setCurrentSceneId] = useState(firstScene);
    const [entryView, setEntryView] = useState({ pitch: 0, yaw: 0, hfov: 100 });

    const handleNavigate = useCallback((sceneId, targetPitch, targetYaw, targetHfov) => {
        setLoaded(false); 
        setCurrentSceneId(sceneId);
        setEntryView({
            pitch: typeof targetPitch === "number" ? targetPitch : 0,
            yaw: typeof targetYaw === "number" ? targetYaw : 0,
            hfov:  typeof targetHfov  === 'number' ? targetHfov  : 100,
        });
    }, []);

    const currentScene = rawScenes[currentSceneId];

    return (
        <>
            <ReactPannellum
                key={currentSceneId}
                id={`apartment-tour-${currentSceneId}`}
                sceneId={currentSceneId}
                imageSource={currentScene.panorama}
                config={{
                    hfov: entryView.hfov ?? currentScene.hfov,
                    pitch: entryView.pitch,
                    yaw: entryView.yaw,
                    hotSpots: currentScene.hotSpots,
                    sceneFadeDuration,
                    autoLoad: true,
                    draggable: true,
                    showZoomCtrl: true,
                    showFullscreenCtrl: true,
                }}
                onPanoramaLoaded={() => setLoaded(true)}
                style={{ width: "100%", height: "100%" }}
            >
                <TourToolbar loaded={loaded} />
                <HotspotNavigator loaded={loaded} hotSpots={currentScene.hotSpots} onNavigate={handleNavigate} />
            </ReactPannellum>
        </>
    )
}

export default VirtualTour360
