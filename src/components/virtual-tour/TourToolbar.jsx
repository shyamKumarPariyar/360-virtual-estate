import { usePannellum } from 'react-pannellum';
import { TOUR_CONFIG } from '../../data/tourConfig';
import { useParams } from 'react-router-dom';

const TourToolbar = ({loaded}) => {
    const {id} =  useParams()
    const pannellum = usePannellum();
    const currentScene = loaded ? pannellum.getCurrentScene() : null;
    return (
        <div
            style={{
                position: "absolute",
                top: 4,
                right: 4,
                zIndex: 10,
                background: "rgba(10,10,18,0.75)",
                color: "#e8e8f0",
                padding: "4px 6px",
                borderRadius: 2,
                fontFamily: "system-ui, sans-serif",
                fontSize: 10,
            }}
        >
            <div style={{textAlign: 'right'}}>{currentScene ? TOUR_CONFIG[id].scenes[currentScene]?.title : "Loading tour…"}</div> 
        </div>
    );
}

export default TourToolbar
