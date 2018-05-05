import scene from './three-js-objects/scene.js';

export default () => {
	scene.children.forEach(obj => scene.remove(obj));
}