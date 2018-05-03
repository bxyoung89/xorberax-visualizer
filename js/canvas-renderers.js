export default {
	basicLuminosity: (canvasContext, pixel, scale, leftPadding, topPadding) => {
		const {x, y, luminosity} = pixel;
		canvasContext.fillStyle = luminosity > 0.5 ? '#FFF' : '#000';
		canvasContext.fillRect(x * scale + leftPadding, y * scale + topPadding, scale, scale);
	},
	basicPaletteLuminosity: (canvasContext, pixel, scale, leftPadding, topPadding, pallete) => {
		const {x, y, luminosity} = pixel;
		canvasContext.fillStyle = luminosity > 0.5 ? pallete(1) : pallete(0);
		canvasContext.fillRect(x * scale + leftPadding, y * scale + topPadding, scale, scale);
	},
	paletteLuminosity: (canvasContext, pixel, scale, leftPadding, topPadding, pallete) => {
		const {x, y, luminosity} = pixel;
		canvasContext.fillStyle = pallete(luminosity);
		canvasContext.fillRect(x * scale + leftPadding, y * scale + topPadding, scale, scale);
	},
	halfTone: (canvasContext, pixel, scale, leftPadding, topPadding, pallete) => {
		const {x, y, luminosity} = pixel;
		canvasContext.fillStyle = pallete(0);
		canvasContext.fillRect(x * scale + leftPadding, y * scale + topPadding, scale, scale);
		const fullRadius = Math.round(scale/2);
		const radius = Math.round(fullRadius * luminosity);
		const centerX = (x * scale) + fullRadius;
		const centerY = (y * scale) + fullRadius;
		canvasContext.fillStyle = pallete(1);
		canvasContext.beginPath();
		canvasContext.arc(centerX + leftPadding, centerY + topPadding, radius, 0, 2 * Math.PI);
		canvasContext.fill();
	},
};