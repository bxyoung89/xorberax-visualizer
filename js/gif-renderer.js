class GifRenderer {
	constructor(canvasId, gifData, palette, canvasRenderer) {
		this.canvas = document.getElementById(canvasId);
		this.canvasContext = this.canvas.getContext('2d');
		this.loadNewSettings(gifData, palette, canvasRenderer);
		this.lastTimeout = undefined;
	}

	loadNewSettings(gifData, palette, canvasRenderer){
		if(this.lastTimeout){
			clearTimeout(this.lastTimeout);
			this.lastTimeout = undefined;
		}
		this.gifData = gifData;
		this.currentFrame = 0;
		this.palette = palette;
		this.canvasRenderer = canvasRenderer;
		this.setScale();
		this.setPadding();
		this.setUpCanvas();
	}

	getParentWidth() {
		return this.canvas.parentElement.clientWidth
	}

	getParentHeight() {
		return this.canvas.parentElement.clientHeight;
	}

	setUpCanvas() {
		this.canvas.width = this.getParentWidth();
		this.canvas.height = this.getParentHeight();
		this.canvasContext.fillStyle = this.palette(0);
		this.canvasContext.fillRect(0, 0, this.getParentWidth(), this.getParentHeight());
	}

	setScale() {
		const {dimensions} = this.gifData;
		const {width, height} = dimensions;
		this.scale = Math.min(Math.round(this.getParentWidth() / width), Math.round(this.getParentHeight() / height));
	}

	setPadding() {
		const {dimensions} = this.gifData;
		const {width, height} = dimensions;
		this.leftPadding = Math.round((this.getParentWidth() - (width * this.scale)) / 2);
		this.topPadding = Math.round((this.getParentHeight() - (height * this.scale)) / 2);
	}

	runAnimation() {
		this.lastTimeout = setTimeout(() => {
			this.renderCurrentFrame();
			const {delay} = this.gifData.files[this.currentFrame];
			this.lastTimeout = setTimeout(() => this.runNextFrame(), delay);
		}, 0);
	}

	runNextFrame() {
		this.currentFrame = (this.currentFrame + 1) % Object.keys(this.gifData.files).length;
		this.renderCurrentFrame();
		const {delay} = this.gifData.files[this.currentFrame];
		this.lastTimeout = setTimeout(() => this.runNextFrame(), 0);
	}

	renderCurrentFrame() {
		const {pixels} = this.gifData.files[this.currentFrame];
		pixels.forEach((pixel) => {
			this.canvasRenderer(this.canvasContext, pixel, this.scale, this.leftPadding, this.topPadding, this.palette);
		});
	}
}

export default GifRenderer;