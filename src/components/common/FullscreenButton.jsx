import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
    faExpand,
    faCompress
} from "@fortawesome/free-solid-svg-icons";

const FullscreenButton = ({targetRef}) => {
const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await targetRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error("Fullscreen error:", error);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    return (
        
            <FontAwesomeIcon
                onClick={toggleFullscreen}
                icon={
                    isFullscreen
                        ? faCompress
                        : faExpand
                }
                size="lg"
                style={{color: '#000000ff', backgroundColor: "#fff" , padding: '3px', borderRadius: '3px',}}
            />
        
    );
};

export default FullscreenButton;