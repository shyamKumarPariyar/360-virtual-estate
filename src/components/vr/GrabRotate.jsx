import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useXRInputSourceState } from '@react-three/xr';
import { Vector3 } from 'three';

const controllerPos = new Vector3();
const cameraPos = new Vector3();

export function GrabRotate({originRef, hand = 'right', sensitivity = 0.5}) {
	const controller = useXRInputSourceState('controller', hand);
	const { camera } = useThree();
	const lastAngle = useRef(null);
	
	useFrame(() => {
		const origin = originRef.current;
		const object = controller?.object;
		if (!origin || !object) return;
	
		const squeeze = controller.gamepad?.['xr-standard-squeeze'];
		const raw = controller.inputSource?.gamepad?.buttons?.[1];
		const held =
		squeeze?.state === 'pressed' ||
		(squeeze?.value ?? 0) > 0.5 ||
		raw?.pressed === true;
	
		if (!held) {
			lastAngle.current = null;
			return;
		}
	
		object.updateWorldMatrix(true, false);
		controllerPos.setFromMatrixPosition(object.matrixWorld);
		camera.getWorldPosition(cameraPos);
	
		const angle = Math.atan2(
			controllerPos.x - cameraPos.x,
			controllerPos.z - cameraPos.z
		);
	
		if (lastAngle.current === null) {
			lastAngle.current = angle;
			return;
		}
	
		let delta = angle - lastAngle.current;
		if (delta > Math.PI) delta -= Math.PI * 2;
		if (delta < -Math.PI) delta += Math.PI * 2;
		lastAngle.current = angle;
	
		const turn = -delta * sensitivity;
		if (Math.abs(turn) < 0.0005) return;
	
		const sin = Math.sin(turn);
		const cos = Math.cos(turn);
		const dx = origin.position.x - cameraPos.x;
		const dz = origin.position.z - cameraPos.z;
	
		origin.position.x = cameraPos.x + dx * cos - dz * sin;
		origin.position.z = cameraPos.z + dx * sin + dz * cos;
		origin.rotation.y += turn;
	});
	
	return null;
}