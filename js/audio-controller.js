const audioElementId = 'audio-player';


class AudioController {
	constructor(){
		this.audioElement = document.getElementById(audioElementId);
		this.audioElement.addEventListener('load', () => this.onSongLoaded());
		const audioContext = new AudioContext();
		const mediaElementSource = audioContext.createMediaElementSource(this.audioElement);
		this.analyzer = audioContext.createAnalyser();
		mediaElementSource.connect(this.analyzer);
		mediaElementSource.connect(audioContext.destination);
		this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
	}

	loadSong(audioInfo){
		this.audioElement.pause();
		while(this.audioElement.firstChild){
			this.audioElement.removeChild(this.audioElement.firstChild);
		}
		const newSource = document.createElement('source');
		newSource.setAttribute('src', `./audio/${audioInfo.filePath}`);
		newSource.setAttribute('type', 'audio/mpeg');
		this.audioElement.appendChild(newSource);
		this.audioElement.load();
		this.audioElement.volume = 0.4;
		this.audioElement.play();
	}

	onSongLoaded(){
		this.audioElement.play();
	}

	getFrequencyData(){
		this.analyzer.getByteFrequencyData(this.frequencyData);
		return this.frequencyData;
	}

}

export default new AudioController();