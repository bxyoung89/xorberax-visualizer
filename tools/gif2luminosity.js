const fs = require('fs');
const path = require('path');
const gifFrames = require('gif-frames');
const gifInfo = require('gif-info');
const toArrayBuffer = require('to-array-buffer');
const jimp = require('jimp');

const src = path.join(__dirname, process.argv[2]);
const outDir = path.join(__dirname, process.argv[3]);

gifFrames({url: src, frames: 'all', cumulative: true,}).then(
	async(frameData) => {
		frameData.forEach(function (frame) {
			frame.getImage().pipe(fs.createWriteStream(
				path.join(outDir, `${frame.frameIndex}.png`)
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
			const jimpFile = await jimp.read(path.join(outDir, `${index}.png`));
			const fileLuminosity = [];
			for (let x = 0; x < jimpFile.bitmap.width; x += 1) {
				const rowArray = [];
				for (let y = 0; y < jimpFile.bitmap.height; y += 1) {
					const pixelIndex = jimpFile.getPixelIndex(x, y);
					const red = jimpFile.bitmap.data[pixelIndex];
					const green = jimpFile.bitmap.data[pixelIndex + 1];
					const blue = jimpFile.bitmap.data[pixelIndex + 2];

					const rawLuminosity = (0.299 * red + 0.587 * green + 0.114 * blue)/255;
					const roundedLuminosity = Math.round(rawLuminosity * 1000) / 1000;
					rowArray.push(roundedLuminosity);
				}
				fileLuminosity.push(rowArray);
			}
			output.files[index] = {
				delay: image.delay,
				luminosity: fileLuminosity
			};
			if (index === images.length - 1) {
				fs.writeFileSync(path.join(outDir, 'luminosity.json'), JSON.stringify(output));
			}
		});

	}
);