class GifRenderer {
	constructor(canvasId, gifData) {
		this.gifData = gifData;
		this.canvas = document.getElementById(canvasId);
		this.canvasContext = this.canvas.getContext('2d');
		this.setScale();
		this.setPadding();
		this.setCanvasHeight();
		this.currentFrame = 0;
	}

	setCanvasHeight() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	setScale() {
		const {dimensions} = this.gifData;
		const {width, height} = dimensions;
		this.scale = Math.min(Math.round(window.innerWidth / width), Math.round(window.innerHeight / height));
	}

	setPadding() {
		const {dimensions} = this.gifData;
		const {width, height} = dimensions;
		this.leftPadding = Math.round((window.innerWidth - (width * this.scale)) / 2);
		this.topPadding = Math.round((window.innerHeight - (height * this.scale)) / 2);
	}

	runAnimation() {
		setTimeout(() => {
			this.renderCurrentFrame();
			const {delay} = this.gifData.files[this.currentFrame];
			setTimeout(() => this.runNextFrame(), delay);
		}, 0);
	}

	runNextFrame() {
		this.currentFrame = (this.currentFrame + 1) % Object.keys(this.gifData.files).length;
		this.renderCurrentFrame();
		const {delay} = this.gifData.files[this.currentFrame];
		setTimeout(() => this.runNextFrame(), delay);
	}

	renderCurrentFrame() {
		const {pixels} = this.gifData.files[this.currentFrame];
		pixels.forEach(({x, y, luminosity}) => {
			this.canvasContext.fillStyle = luminosity > 0.5 ? '#FFF' : '#000';
			this.canvasContext.fillRect(x * this.scale + this.leftPadding, y * this.scale + this.topPadding, this.scale, this.scale);
		});
	}
}

export default GifRenderer;