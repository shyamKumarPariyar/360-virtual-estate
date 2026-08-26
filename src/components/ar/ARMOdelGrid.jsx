import { useEffect, useState } from "react";
import { MODELS } from "../../data/Models";
import FurnitureCard from "./Furniturecard";

const MV_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';

let mvPromise = null;

function loadModelViewer() {
	if (customElements.get('model-viewer')) return Promise.resolve();
	if (mvPromise) return mvPromise;
	mvPromise = new Promise((resolve, reject) => {
		const s = document.createElement('script');
		s.type = 'module';
		s.src = MV_SRC;
		s.onload = () => customElements.whenDefined('model-viewer').then(resolve);
		s.onerror = () => {
			mvPromise = null;
			reject(new Error('Could not load model-viewer'));
		};
		document.head.appendChild(s);
	});
	return mvPromise;
}

export default function ARModelGrid({onEvent, filter, allowResize = false }) {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        loadModelViewer()
        .then(() => !cancelled && setReady(true))
        .catch((err) => !cancelled && setError(err.message));
        return () => {
            cancelled = true;
        };
    }, []);

    const filtered = MODELS.filter((m) => m.category === filter);

    return (
        <section className="ar-assets-section">
            <div className="ar-section-head">
                <div>
                    <h2>AR Property Models</h2>
                    <p>
                        Browse immersive 3D architectural models and launch them in
                        Augmented Reality directly from your mobile device.
                    </p>
                </div>
            </div>
            <div className="ar-model-grid">
                {error && <p className="fl__note">{error}</p>}
                {filtered.map((item) => (
                    <div  key={item.id} className="ar-model-card"> 
                        <FurnitureCard 
                            item={item}
                            ready={ready}
                            allowResize={allowResize}
                            onEvent={onEvent}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}