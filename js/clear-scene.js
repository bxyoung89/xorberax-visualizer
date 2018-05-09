import scene from './three-js-objects/scene.js';
import renderer from './three-js-objects/renderer.js';

export default () => {
	scene.children.forEach(obj => scene.remove(obj));
	renderer.clear();
}