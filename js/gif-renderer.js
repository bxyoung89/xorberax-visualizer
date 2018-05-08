import * as THREE from "./libs/three.module.js";
import scene from "./three-js-objects/scene.js";
import renderer from './three-js-objects/renderer.js';
import camera from './three-js-objects/camera.js';
import clearScene from './clear-scene.js';

class GifRenderer {
	setGif(gifData, palette, vertexShader){
		clearScene();
		if(this.lastTimeout !== undefined){
			clearTimeout(this.lastTimeout);
		}
		this.lastTimeout = undefined;
		this.currentFrameIndex = 0;
		this.gifData = gifData;
		this.meshes = {};
		this.addFramesToScene(palette, vertexShader);
	}

	addFramesToScene(palette, vertexShader) {
		const imageDimensions = {width: 500, height: 373};
		const {width , height}  = imageDimensions;
		const backgroundGeometry = new THREE.PlaneGeometry(100000, 100000, 1, 1);
		const backgroundMaterial = new THREE.ShaderMaterial({
			fragmentShader: palette.backgroundShader,
			vertexShader: vertexShader.shader,
		});
		const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
		backgroundMesh.position.set(0, 0, 0);
		scene.add(backgroundMesh);
		Object.keys(this.gifData.frameData).forEach((key, index) => {
			const numberKey = Number.parseInt(key);
			const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
			const material = new THREE.ShaderMaterial({
				fragmentShader: palette.shader,
				vertexShader: vertexShader.shader,
				uniforms: {
					texture: {type: "t", value: THREE.ImageUtils.loadTexture(`./images/${this.gifData.imageFolder}/${numberKey}.jpg`)},
					resolution: {type: "vec2", value: [width, height]},
				},
			});

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, 0, index === 0 ? 1 : -1);
			scene.add(mesh);
			this.meshes[numberKey] = mesh;
		});
		let dist = camera.position.z - 1;
		camera.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI);
		camera.updateProjectionMatrix();
	}

	runAnimation() {
		this.runNextFrame();
	}

	runNextFrame() {
		this.renderCurrentFrame();
		const delay = this.gifData.frameData[this.currentFrameIndex];
		this.lastTimeout = setTimeout(() => this.runNextFrame(), delay);
		this.currentFrameIndex = (this.currentFrameIndex + 1) % Object.keys(this.gifData.frameData).length;
	}

	renderCurrentFrame() {
		Object.keys(this.meshes).forEach((key) => {
			const numberKey = Number.parseInt(key);
			const mesh = this.meshes[numberKey];
			mesh.position.set(0, 0, numberKey === this.currentFrameIndex ? 1 : -1);
		})
	}
}

export default GifRenderer;