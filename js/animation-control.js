import scene from "./three-js-objects/scene.js";
import camera from "./three-js-objects/camera.js";
import renderer from "./three-js-objects/renderer.js";
class AnimationControl {
	constructor(){
		this.animationRequest = undefined;
	}

	startAnimation(){
		if(this.animationRequest){
			return;
		}
		this.animationRequest = window.requestAnimationFrame(() => this.animate());
	}

	stopAnimation(){
		if (!this.animationRequest) {
			return;
		}
		window.cancelAnimationFrame(this.animationRequest);
		this.animationRequest = undefined;
	}

	animate(){
		this.animationRequest = undefined;
		renderer.render(scene, camera);
		this.startAnimation();
	}
}

export default new AnimationControl();
