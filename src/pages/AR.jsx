import React, { useCallback, useRef } from 'react'
import { canOfferAR } from '../hooks/device';
import FurnitureList from '../components/ar/Furniturelist';

const AR = () => {
    const handheld = canOfferAR();
    return (
        <div className="pxl-page">
            <section className="section" style={{paddingTop: '15px'}}>
                <header className="arp__hero wrap">
                    <h1>See it before you decide</h1>
                    <p className="arp__lede">
                    Photographs flatten a room. These models don't — every piece here is
                    built to real measurements, so you can put a sofa where you think it
                    goes and find out whether it actually fits.
                    </p>
            
                    {handheld ? (
                    <ol className="arp__steps">
                        <li>Tap the AR badge on any piece below.</li>
                        <li>Point your camera at the floor and move slowly until it finds a surface.</li>
                        <li>Tap to place, then walk around it.</li>
                    </ol>
                    ) : (
                    <div className="arp__mobile-prompt">
                        <h3 className='step-num'>Open this page on your phone to use AR</h3>
                        <p>
                        Drag any model below to rotate it. To place these pieces in your
                        own room at full size, open this page on a phone or tablet — the
                        camera does the rest.
                        </p>
                    </div>
                    )}
                </header>
            </section>
            <section className="arp__section wrap">
            <div className="arp__section-head">
            {/* <h2>Furniture, at full size</h2> */}
            <h2 className="section-eyebrow">Furniture, at full size</h2>
            <p>
                Shown at true measurements and locked there — you can't shrink a
                sofa to make it fit, which is rather the point. Check the walkway
                in front of a three-seater, or whether a dining table leaves room
                to pull chairs out.
            </p>
            </div>
            <div className=" detail-ar">
                    <FurnitureList filter="Seating" allowResize />
            </div>
        </section>
    <section className="arp__section wrap">
            <div className="arp__section-head">
            {/* <h2>Properties, as scale models</h2> */}
            <h2 className="section-eyebrow">Properties, as scale models</h2>
            <p>
                Apartments and blocks appear as tabletop models rather than at full
                size — stand a building on a desk, walk around it, and read the
                layout and massing from above. For walking through a property at
                eye level, use the virtual tour instead.
            </p>
            </div>
            <div className=" detail-ar">
                    <FurnitureList filter="Housing" allowResize />
            </div>
        </section>
        <footer className="arp__footnotes wrap">
            <div>
            <h3>Why sizes are locked</h3>
            <p>
                Nothing here can be pinched to resize. It's tempting, but a model
                scaled until it looks right tells you nothing about whether it is
                right.
            </p>
            </div>
            <div>
            <h3>If AR doesn't start</h3>
            <p>
                You'll need Safari on iPhone and iPad, or Chrome on Android, and
                a reasonably lit room with a few metres of clear floor.
            </p>
            </div>
        </footer>
        </div>
    );
}

export default AR
