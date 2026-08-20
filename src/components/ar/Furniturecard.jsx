import { useCallback, useEffect, useRef, useState } from 'react';
import { canOfferAR } from '../../hooks/device';

const handheld = canOfferAR();

export default function FurnitureCard({ item, ready, allowResize = false, onEvent }) {
	const viewerRef = useRef(null);
	const enteredAt = useRef(null);
	const [canAR, setCanAR] = useState(false);
	const [failed, setFailed] = useState(false);

	const emit = useCallback(
		(type, payload) => onEvent?.({ type, modelId: item.id, ...payload }),
		[onEvent, item.id]
	);

	useEffect(() => {
		const el = viewerRef.current;
		if (!el || !ready) return;
		const check = () => {
			const ok = !!el.canActivateAR;
			setCanAR(ok);
			return ok;
		};

		let ticks = 0;
		const poll = handheld
		? setInterval(() => {
			if (check() || ++ticks > 10) clearInterval(poll);
			}, 400)
		: null;

		const onLoad = () => {
			emit('model_loaded');
			check();
		};

		const onError = () => {
			setFailed(true);
			emit('model_error', { src: item.glb });
		};

		const onARStatus = (e) => {
			const status = e.detail.status;
			emit('ar_status', { status });
			if (status === 'session-started') {
				enteredAt.current = Date.now();
			} else if (status === 'not-presenting' && enteredAt.current) {
				emit('ar_session_ended', { durationMs: Date.now() - enteredAt.current });
				enteredAt.current = null;
			}
		};

		el.addEventListener('load', onLoad);
		el.addEventListener('error', onError);
		el.addEventListener('ar-status', onARStatus);

		return () => {
		el.removeEventListener('load', onLoad);
		el.removeEventListener('error', onError);
		el.removeEventListener('ar-status', onARStatus);
		if (poll) clearInterval(poll);
		};
	}, [ready, item.glb, emit]);

	const launchAR = useCallback(() => {
		emit('ar_requested');
		viewerRef.current?.activateAR?.();
	}, [emit]);

	return (
		<li className="fl__card">
		<div className="fl__stage">
			{ready ? (
			<model-viewer
				ref={viewerRef}
				src={item.glb}
				ios-src={item.usdz}
				poster={item.thumbnail}
				alt={item.name}
				ar
				ar-modes="webxr scene-viewer quick-look"
				ar-scale={allowResize ? 'auto' : 'fixed'}
				ar-placement={item.placement ?? 'floor'}
				camera-controls
				touch-action="pan-y"
				shadow-intensity="1"
				environment-image="neutral"
				loading="lazy"
				reveal="auto"
				style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
			>
				<div slot="ar-button" style={{ display: 'none' }} />
				<div slot="progress-bar" style={{ display: 'none' }} />
			</model-viewer>
			) : (
			<img className="fl__poster" src={item.thumbnail} alt={item.thumbnail} loading="lazy" />
			)}

			{handheld && canAR && (
				<button className="fl__ar" onClick={launchAR} aria-label={`View ${item.name} in your room`}>
					<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
						<path
							d="M12 3l7.5 4.33v8.66L12 20.33 4.5 16V7.33L12 3z"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>
						<path
							d="M12 12l7.5-4.33M12 12v8.33M12 12L4.5 7.67"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinejoin="round"
						/>
					</svg>
					<span>AR</span>
				</button>
			)}
		</div>

		<div className="fl__meta">
			<strong>{item.name}</strong>
			{/* <span className="fl__dims">
			{item.dimensions.w} × {item.dimensions.d} × {item.dimensions.h} m
			</span> */}
			{failed && <span className="fl__error">Model failed to load</span>}
		</div>
		</li>
	);
}