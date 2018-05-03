export default {
	basicLuminosity: (canvasContext, pixel, scale, leftPadding, topPadding) => {
		const {x, y, luminosity} = pixel;
		canvasContext.fillStyle = luminosity > 0.5 ? '#FFF' : '#000';
		canvasContext.fillRect(x * scale + leftPadding, y * scale + topPadding, scale, scale);
	},
	palletLuminosity: (canvasContext, pixel, scale, leftPadding, topPadding, pallete) => {
		const {x, y, luminosity} = pixel;
		canvasContext.fillStyle = pallete(luminosity);
		canvasContext.fillRect(x * scale + leftPadding, y * scale + topPadding, scale, scale);
	},
};