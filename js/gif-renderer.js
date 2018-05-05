import * as THREE from "./libs/three.module.js";
import scene from "./three-js-objects/scene.js";
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
		Object.keys(this.gifData.frameData).forEach((key, index) => {
			const numberKey = Number.parseInt(key);
			const geometry = new THREE.PlaneGeometry(10, 10 * .75);
			const material = new THREE.ShaderMaterial({
				fragmentShader: palette.shader,
				vertexShader: vertexShader.shader,
				uniforms: {
					texture: {type: "t", value: THREE.ImageUtils.loadTexture(`./images/${this.gifData.imageFolder}/${numberKey}.jpg`)}
				},
			});

			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(0, 0, index === 0 ? 1 : 0);
			scene.add(mesh);
			this.meshes[numberKey] = mesh;
		});
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
			mesh.position.set(0, 0, numberKey === this.currentFrameIndex ? 1 : 0);
		})
	}
}

export default GifRenderer;