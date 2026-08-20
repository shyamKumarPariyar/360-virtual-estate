import React, { useRef, useState } from 'react'

const Secene = () => {
    const wrapRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const onMove = (e) => {
        const rect = wrapRef.current.getBoundingClientRect();
        setTilt({ x: (e.clientX - rect.left) / rect.width - 0.5, y: (e.clientY - rect.top) / rect.height - 0.5 });
    };
    return (
        <div className="scene" ref={wrapRef} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
            <svg className="scene-layer scene-layer--back" style={{ transform: `translate(${tilt.x * 10}px, ${tilt.y * 8}px)` }} viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice">
                <rect width="1400" height="700" fill="#0d141c" />
                <circle cx="1180" cy="150" r="90" fill="rgba(95,225,214,0.08)" />
                {[80, 220, 380, 560, 760, 960, 1160, 1320].map((x, i) => (
                <rect key={i} x={x} y={340 - (i % 3) * 40} width="90" height={330 + (i % 3) * 40} fill="rgba(245,242,234,0.04)" />
                ))}
            </svg>
            <svg className="scene-layer scene-layer--mid" style={{ transform: `translate(${tilt.x * 22}px, ${tilt.y * 16}px)` }} viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice">
                <rect x="120" y="120" width="1160" height="480" rx="10" fill="rgba(95,225,214,0.04)" stroke="rgba(245,242,234,0.1)" />
                <rect x="180" y="170" width="420" height="260" fill="rgba(95,225,214,0.08)" />
                <rect x="660" y="170" width="420" height="260" fill="rgba(95,225,214,0.05)" />
                <rect x="120" y="560" width="1160" height="40" fill="rgba(245,242,234,0.03)" />
            </svg>
            <svg className="scene-layer scene-layer--front" style={{ transform: `translate(${tilt.x * 40}px, ${tilt.y * 28}px)` }} viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice">
                <rect x="220" y="460" width="380" height="130" rx="18" fill="#c9974d" opacity="0.85" />
                <rect x="700" y="410" width="240" height="180" rx="14" fill="#5fe1d6" opacity="0.5" />
                <circle cx="1080" cy="500" r="70" fill="#c9974d" opacity="0.65" />
            </svg>
            <div className="scene-vignette" />
        </div>
    );
}

export default Secene
