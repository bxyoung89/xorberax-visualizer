import images from './data/images.js';
import palettes from './data/palettes.js';
import audio from './data/audio.js';

const paletteQueryParameter = 'palette';
const imageQueryParameter = 'image';
const songQueryParameter = 'song';

class UrlManipulator {

	writeToUrl(state){
		const currentPaletteIndex = palettes.indexOf(state.currentPalette);
		const currentImageIndex = images.indexOf(state.currentImage);
		const currentSongIndex = audio.indexOf(state.currentSong);
		const currentUrl = window.location.href;
		const newUrl =  new URL(currentUrl);
		newUrl.searchParams.set(paletteQueryParameter, currentPaletteIndex);
		newUrl.searchParams.set(imageQueryParameter, currentImageIndex);
		newUrl.searchParams.set(songQueryParameter, currentSongIndex);
		window.history.pushState({path: newUrl.toString()}, '', newUrl.toString());
	}

	readFromUrl(){
		const currentUrl = new URL(window.location.href);
		const currentPaletteIndex = currentUrl.searchParams.get(paletteQueryParameter);
		const currentImageIndex = currentUrl.searchParams.get(imageQueryParameter);
		const currentSongIndex = currentUrl.searchParams.get(songQueryParameter);
		const currentPalette = !currentPaletteIndex || ! palettes[currentPaletteIndex] ? palettes[Math.round(Math.random() * 10000) % palettes.length] : palettes[currentPaletteIndex];
		const currentImage = !currentImageIndex || ! images[currentImageIndex] ? images[Math.round(Math.random() * 10000) % images.length] : images[currentImageIndex];
		const currentSong = !currentSongIndex || ! audio[currentSongIndex] ? audio[Math.round(Math.random() * 10000) % audio.length] : audio[currentSongIndex];
		return {
			currentPalette,
			currentImage,
			currentSong
		};
	}

}

export default new UrlManipulator();