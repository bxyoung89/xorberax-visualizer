import images from '../data/images.js';
import palettes from '../data/palettes.js';
import vertexShaders from '../data/vertex-shaders.js';
import audio from '../data/audio.js';
import AudioController from '../audio-controller.js';

const imageSelectorId = 'image-selector';
const paletteSelectorId = 'palette-selector';
const vertexShaderSelectorId = 'vertex-shader-selector';
const audioSelectorId = 'audio-selector';


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

// const setUpVertexShaderSelector = (onCurrentStateUpdated) => {
// 	const vertexShaderSelector = document.getElementById(vertexShaderSelectorId);
// 	vertexShaders.forEach((vertexShader, index) => {
// 		const option = document.createElement('option');
// 		option.text = vertexShader.name;
// 		option.value = index;
// 		option.selected = index === 0;
// 		vertexShaderSelector.add(option);
// 	});
// 	vertexShaderSelector.onchange = (e) => {
// 		const currentVertexShader = vertexShaders[e.target.value];
// 		onCurrentStateUpdated({currentVertexShader});
// 	};
// };


const setUpAudioSelector = (onCurrentStateUpdated) => {
	const audioSelector = document.getElementById(audioSelectorId);
	audio.forEach((song, index) => {
		const {artist, name} = song;
		const option = document.createElement('option');
		option.text = `${artist} --- ${name}`;
		option.value = index;
		option.selected = index === 0;
		audioSelector.add(option);
	});
	audioSelector.onchange = (e) => {
		const newSong = audio[e.target.value];
		AudioController.loadSong(newSong);
	};
	AudioController.loadSong(audio[0]);
};



export default (onCurrentStateUpdated) => {
	document.addEventListener('DOMContentLoaded', function () {
		setUpImageSelector(onCurrentStateUpdated);
		setUpPaletteSelector(onCurrentStateUpdated);
		// setUpVertexShaderSelector(onCurrentStateUpdated);
		setUpAudioSelector(onCurrentStateUpdated);
	}, false);
	return {
		currentPalette: palettes[0],
		currentVertexShader: vertexShaders[0],
		currentImage: images[0]
	};
};


