import { useState } from 'react'
import { filters, properties } from '../data/homeConstant';
import PropertyCard from './PropertyCard';

const PropertyListing = () => {
    const [active, setActive] = useState("All");
    return (
        <section id="properties" className="section" style={{background:"#efece2" }}>
        <div className="wrap">
            <div className="prop-header">
            <div>
                <p className="section-eyebrow">FEATURED PROPERTIES</p>
                <h2 className="h2" style={{ marginBottom: "0.4rem" }}>Every listing, ready to walk through</h2>
                <p className="prop-subtitle">Six homes below — each with a 360° tour, and most with AR or VR too.</p>
            </div>
            {/* <div className="prop-filters">
                {filters.map((f) => (
                <button key={f} className={`prop-filter ${active === f ? "prop-filter--active" : ""}`} onClick={() => setActive(f)}>
                    {f}
                </button>
                ))}
            </div> */}
            </div>
            <div className="prop-grid">
            {properties.map((p, i) => (<PropertyCard p={p} key={p.id} delay={i * 90} />))}
            </div>
        </div>
        </section>
    );
}

export default PropertyListing
