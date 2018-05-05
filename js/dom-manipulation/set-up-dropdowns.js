import images from '../data/images.js';
import palettes from '../data/palettes.js';
import vertexShaders from '../data/vertex-shaders.js';

const imageSelectorId = 'image-selector';
const paletteSelectorId = 'palette-selector';
const vertexShaderSelectorId = 'vertex-shader-selector';


const setUpImageSelector = (onCurrentStateUpdated) => {
	const imageSelector = document.getElementById(imageSelectorId);
	images.forEach((image, index) => {
		const option = document.createElement('option');
		option.text = image.name;
		option.value = index;
		option.selected = index === 0;
		imageSelector.add(option);
	});
	imageSelector.onchange = (e) => {
		const currentImage = images[e.target.value];
		onCurrentStateUpdated({currentImage});
	};
};

const setUpPaletteSelector = (onCurrentStateUpdated) => {
	const paletteSelector = document.getElementById(paletteSelectorId);
	palettes.forEach((palette, index) => {
		const option = document.createElement('option');
		option.text = palette.name;
		option.value = index;
		option.selected = index === 0;
		paletteSelector.add(option);
	});
	paletteSelector.onchange = (e) => {
		const currentPalette = palettes[e.target.value];
		onCurrentStateUpdated({currentPalette});
	};
};

const setUpVertexShaderSelector = (onCurrentStateUpdated) => {
	const vertexShaderSelector = document.getElementById(vertexShaderSelectorId);
	vertexShaders.forEach((vertexShader, index) => {
		const option = document.createElement('option');
		option.text = vertexShader.name;
		option.value = index;
		option.selected = index === 0;
		vertexShaderSelector.add(option);
	});
	vertexShaderSelector.onchange = (e) => {
		const currentVertexShader = vertexShaders[e.target.value];
		onCurrentStateUpdated({currentVertexShader});
	};
};



export default (onCurrentStateUpdated) => {
	document.addEventListener('DOMContentLoaded', function () {
		setUpImageSelector(onCurrentStateUpdated);
		setUpPaletteSelector(onCurrentStateUpdated);
		setUpVertexShaderSelector(onCurrentStateUpdated);
	}, false);
	return {currentPalette: palettes[0], currentVertexShader: vertexShaders[0], currentImage: images[0]};
};


