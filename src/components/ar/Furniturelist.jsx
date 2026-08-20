import { useEffect, useState } from 'react';
import FurnitureCard from './Furniturecard';
import ScrollRail from './Scrollrail';
import { MODELS } from '../../data/Models';

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

export default function FurnitureList({ onEvent, filter, allowResize = false }) {
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

	const shown =  MODELS.filter((m) => m.category === filter);
	return (
		<div className="fl">
		{error && <p className="fl__note">{error}</p>}
		<ScrollRail ariaLabel="Furniture">
			{shown.map((item) => (
				<FurnitureCard
					key={item.id}
					item={item}
					ready={ready}
					allowResize={allowResize}
					onEvent={onEvent}
				/>
			))}
		</ScrollRail>
		</div>
	);
}