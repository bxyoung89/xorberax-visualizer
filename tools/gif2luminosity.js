const fs = require('fs');
const path = require('path');
const gifFrames = require('gif-frames');
const gifInfo = require('gif-info');
const toArrayBuffer = require('to-array-buffer');
const jimp = require('jimp');
const binarySearch = require('binary-search');

const src = path.join(__dirname, process.argv[2]);
const outDir = path.join(__dirname, process.argv[3]);

gifFrames({url: src, frames: 'all', cumulative: true, quality: 100}).then(
	async(frameData) => {
		frameData.forEach(function (frame) {
			frame.getImage().pipe(fs.createWriteStream(
				path.join(outDir, `${frame.frameIndex}.jpg`)
			));
		});
		const gifFile = fs.readFileSync(src);
		const gifBuffer = toArrayBuffer(gifFile);
		const srcInfo = gifInfo(gifBuffer);
		const {images, width, height} = srcInfo;
		const output = {
			dimensions: {
				width,
				height,
			},
			files: {},
		};
		await images.forEach(async(image, index) => {
			const jimpFile = await jimp.read(path.join(outDir, `${index}.jpg`));
			const pixels = [];
			for (let x = 0; x < jimpFile.bitmap.width; x += 1) {
				for (let y = 0; y < jimpFile.bitmap.height; y += 1) {
					const pixelIndex = jimpFile.getPixelIndex(x, y);
					const red = jimpFile.bitmap.data[pixelIndex];
					const green = jimpFile.bitmap.data[pixelIndex + 1];
					const blue = jimpFile.bitmap.data[pixelIndex + 2];

					const rawLuminosity = (0.299 * red + 0.587 * green + 0.114 * blue)/255;
					const roundedLuminosity = Math.round(rawLuminosity * 100) / 100;

					pixels.push({
						x,
						y,
						luminosity: roundedLuminosity,
					});
				}
			}
			output.files[index] = {
				delay: image.delay,
				pixels
			};
			if (Object.keys(output.files).length === images.length) {
				console.log(`${Object.keys(output.files).join(',')}`);
				for(let currentFrameIndex = 1; currentFrameIndex < images.length; currentFrameIndex+=1){
					const previousFrame = output.files[currentFrameIndex -1];
					const currentFrame = output.files[currentFrameIndex];
					console.log(`previous ${currentFrameIndex -1} current ${currentFrameIndex}`);
					let framePercentage = 0;
					const xComparatorConst = 100000;
					currentFrame.pixels = currentFrame.pixels.filter((currentPixel) => {
						const pixelPercentage = Math.round((currentPixel.x / width)*100);
						if(pixelPercentage !== framePercentage){
							framePercentage = pixelPercentage;
							console.log(`frame ${currentFrameIndex} at ${framePercentage}%`);
						}
						const previousPixelIndex = binarySearch(previousFrame.pixels, currentPixel, (a, b) => {
							return ((a.x * xComparatorConst) + a.y) - ((b.x * xComparatorConst) + a.y);
						});
						if(previousPixelIndex < 0){
							return true;
						}
						const previousPixel = previousFrame.pixels[previousPixelIndex];
						if(!previousPixel){
							return true;
						}
						return currentPixel.luminosity !== previousPixel.luminosity;
					})
				}
				for(let x = 0; x < images.length; x++){
					console.log(`frame ${x} has ${output.files[x].pixels.length} pixels`);
				}
				fs.writeFileSync(path.join(outDir, 'luminosity.json'), JSON.stringify(output));
			}
		});

	}
);