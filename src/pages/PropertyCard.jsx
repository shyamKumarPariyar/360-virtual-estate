import { useState } from "react";
import { scenes } from "../data/homeConstant";
import Reveal from "../components/Reveal";
import { Link, useNavigate } from "react-router-dom";

const PropertyCard = ({p, delay}) => {
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate()

    return (
        <Reveal as="div" className="prop-card" delay={delay}>
             
            <div className="prop-photo " style={{ backgroundImage: `url(${scenes[p.scene].url})` }} >
                {p.tag && <span className={`prop-tag prop-tag--${p.tag.toLowerCase().replace(" ", "-")}`}>{p.tag}</span>}
                <button
                    className={`prop-save ${saved ? "prop-save--on" : ""}`}
                    onClick={() => setSaved(!saved)}
                    aria-label="Save property"
                >
                {saved ? "♥" : "♡"}
                </button>
                <div className="prop-xr-badges">
                {p.plan && <span className="prop-xr-badge">2D</span>}
                <span className="prop-xr-badge">360°</span>
                {/* {p.ar && <span className="prop-xr-badge">AR</span>} */}
                {p.vr && <span className="prop-xr-badge">VR</span>}
                </div>
            </div>
            <div className="prop-body">
                <div className="prop-price">{p.price}</div>
                <div className="prop-type">{p.type}</div>
                <div className="prop-place">{p.place}</div>
                <div className="prop-meta">
                <span>{p.beds} bed</span>
                <span>·</span>
                <span>{p.baths} bath</span>
                </div>
                <Link to={`/property/${p.id}`} className="prop-cta"> Start virtual tour → </Link>
                {/* <span className="prop-cta" href="#cta">Start virtual tour →</span> */}
            </div>
        </Reveal>
    );
}

export default PropertyCard
