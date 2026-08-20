import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { scenes } from "../data/homeConstant";
import { getPropertyById } from "../utils/propertyUtils";
import { createXRStore } from "@react-three/xr";
import CanvasComponent from "../components/common/CanvasComponent";
import VirtualTour360 from "../components/VirtualTour360";
import InfoBox from "../components/common/InfoBox";

const xrStore = createXRStore({ emulate: true })

const PropertyDetails = () => {
    const { id } = useParams();
    const property = getPropertyById(id);
    const [activeTab, setActiveTab] = useState("tour");

    if (!property) {
        return (
        <div className="pxl-page">
            <div className="wrap" style={{ padding: "4rem 0" }}>
            <p>We couldn't find that property.</p>
                <Link to="/properties" className="btn-primary">Back to all properties</Link>
            </div>
        </div>
        );
    }

    const scene = scenes[property.scene];

    return (
        <div className="pxl-page">
            <div className="wrap detail-breadcrumb">
                <Link to="/properties">← Back to all properties</Link>
            </div>

            <section className="detail-hero wrap">
                <div className="detail-tabs">
                    <button className={`detail-tab ${activeTab === "tour" ? "detail-tab--active" : ""}`} onClick={() => setActiveTab("tour")}>360° Tour</button>
                    {/* <button
                        className={`detail-tab ${activeTab === "ar" ? "detail-tab--active" : ""} ${!property.ar ? "detail-tab--disabled" : ""}`}
                        onClick={() => property.ar && setActiveTab("ar")}
                        disabled={!property.ar}
                    >
                        AR
                    </button> */}
                    <button
                        className={`detail-tab ${activeTab === "vr" ? "detail-tab--active" : ""} ${!property.vr ? "detail-tab--disabled" : ""}`}
                        onClick={() => property.vr && setActiveTab("vr") && xrStore.enterVR()}
                        disabled={!property.vr}
                    >
                        VR Walkthrough
                    </button>
                </div>

                {activeTab === "tour" && (
                    <>
                        <InfoBox text={'Drag to look around · click a marker to move rooms'} />
                        <div className="detail-pano">
                            <VirtualTour360 />
                        </div>
                    </>
                    
                ) }
                    {/* {activeTab === "tour" && <PanoromaViewer url={scene.url} />} */}

                {/* {activeTab === "ar" && (
                    <div className="detail-placeholder detail-pano">
                        <FurnitureList allowResize />
                    </div>
                )} */}

                {activeTab === "vr" && (
                    <CanvasComponent model={property} />
                )}

                <p className="detail-credit">{scene.credit}</p>
            </section>

            <section className="section">
                <div className="wrap detail-info">
                    <div>
                        <div className="prop-price" style={{ fontSize: "1.7rem" }}>{property.price}</div>
                        <div className="prop-type">{property.type}</div>
                        <div className="prop-place">{property.place}</div>
                    </div>
                    <div className="detail-meta">
                        <span>{property.beds} bed</span>
                        <span>·</span>
                        <span>{property.baths} bath</span>
                        {property.tag && <span className="prop-tag prop-tag--inline">{property.tag}</span>}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PropertyDetails
