import images from '../data/images.js';
import palettes from '../data/palettes.js';
import vertexShaders from '../data/vertex-shaders.js';
import audio from '../data/audio.js';
import AudioController from '../audio-controller.js';
import UrlManipulator from '../url-manipulator.js';

const imageSelectorId = 'image-selector';
const paletteSelectorId = 'palette-selector';
const audioSelectorId = 'audio-selector';


const setUpImageSelector = (onCurrentStateUpdated, state) => {
	const imageSelector = document.getElementById(imageSelectorId);
	images.forEach((image, index) => {
		const option = document.createElement('option');
		option.text = image.name;
		option.value = index;
		option.selected = state.currentImage === image;
		imageSelector.add(option);
	});
	imageSelector.onchange = (e) => {
		const currentImage = images[e.target.value];
		onCurrentStateUpdated({currentImage});
	};
};

const setUpPaletteSelector = (onCurrentStateUpdated, state) => {
	const paletteSelector = document.getElementById(paletteSelectorId);
	palettes.forEach((palette, index) => {
		const option = document.createElement('option');
		option.text = palette.name;
		option.value = index;
		option.selected = palette === state.currentPalette;
		paletteSelector.add(option);
	});
	paletteSelector.onchange = (e) => {
		const currentPalette = palettes[e.target.value];
		onCurrentStateUpdated({currentPalette});
	};
};

const setUpAudioSelector = (onCurrentStateUpdated, state) => {
	const {currentSong} = state;
	const audioSelector = document.getElementById(audioSelectorId);
	audio.forEach((song, index) => {
		const {artist, name} = song;
		const option = document.createElement('option');
		option.text = `${artist} --- ${name}`;
		option.value = index;
		option.selected = song === currentSong;
		audioSelector.add(option);
	});
	audioSelector.onchange = (e) => {
		const newSong = audio[e.target.value];
		AudioController.loadSong(newSong);
		onCurrentStateUpdated({currentSong: newSong});
	};
	AudioController.loadSong(currentSong);
};


export default (onCurrentStateUpdated) => {
	// todo read here
	const state = {
		currentVertexShader: vertexShaders[0],
		...UrlManipulator.readFromUrl(),
	};
	document.addEventListener('DOMContentLoaded', function () {
		setUpImageSelector(onCurrentStateUpdated, state);
		setUpPaletteSelector(onCurrentStateUpdated, state);
		setUpAudioSelector(onCurrentStateUpdated, state);
	}, false);
	return state;
};


