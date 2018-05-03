class GifRenderer {
	constructor(canvasId, gifData, palette, canvasRenderer) {
		this.gifData = gifData;
		this.canvas = document.getElementById(canvasId);
		this.canvasContext = this.canvas.getContext('2d');
		this.currentFrame = 0;
		this.palette = palette;
		this.canvasRenderer = canvasRenderer;
		this.setScale();
		this.setPadding();
		this.setUpCanvas();
	}

	setUpCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvasContext.fillStyle = this.palette(0);
		this.canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
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
		pixels.forEach((pixel) => {
			this.canvasRenderer(this.canvasContext, pixel, this.scale, this.leftPadding, this.topPadding, this.palette);
		});
	}
}

export default GifRenderer;