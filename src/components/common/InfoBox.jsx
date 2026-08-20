import React, { useEffect, useState } from 'react'

const InfoBox = ({text}) => {
const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000); 
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="tour-info-box">
            <button
                className="tour-info-close"
                onClick={() => setShow(false)}
            >
                ×
            </button>
                {text}
        </div>
    );
}

export default InfoBox
