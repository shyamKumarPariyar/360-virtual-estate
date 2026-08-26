import {
  ScanFace,
  Building2,
  Footprints,
  Compass,
} from "lucide-react";

export default function HeroAR() {
    return (
        <section className="ar-hero">

        <img
            src="/ar-hero.png"
            alt="AR Property Experience"
            className="ar-hero-bg"
        />

        <div className="ar-overlay"/>

        <div className="ar-hero-content">

            {/* <span className="ar-tag">IMMERSIVE REAL ESTATE EXPERIENCE</span> */}

            <h1>
            Step Inside.
            <br/>
            Explore Every Detail
            <span> in AR.</span>
            </h1>

            <p>
            Experience full-scale architectural properties in Augmented Reality.
            Walk naturally from room to room, inspect interiors,
            and understand every space before making a purchase decision.
            </p>

            <div className="ar-hero-features">

            <div>
                <Building2 size={28}/>
                <span>Life-size 3D Models</span>
            </div>

            <div>
                <Footprints size={28}/>
                <span>Door-to-Door Walkthrough</span>
            </div>

            <div>
                <ScanFace size={28}/>
                <span>Real-world Placement</span>
            </div>

            <div>
                <Compass size={28}/>
                <span>360° Spatial Navigation</span>
            </div>

            </div>

        </div>

        </section>
    );
}