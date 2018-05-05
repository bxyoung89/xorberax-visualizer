const fs = require('fs');
const path = require('path');
const gifFrames = require('gif-frames');
const gifInfo = require('gif-info');
const toArrayBuffer = require('to-array-buffer');

const src = path.join(__dirname, process.argv[2]);

gifFrames({url: src, frames: 'all', cumulative: true, quality: 100}).then(
	async (frameData) => {
		const outDir = src.replace('.gif', '');
		if(!fs.existsSync(outDir)){
			fs.mkdirSync(outDir);
		}
		frameData.forEach(function (frame) {
			frame.getImage().pipe(fs.createWriteStream(
				path.join(outDir, `${frame.frameIndex}.jpg`)
			));
		});
		const gifFile = fs.readFileSync(src);
		const gifBuffer = toArrayBuffer(gifFile);
		const srcInfo = gifInfo(gifBuffer);
		const {images} = srcInfo;
		const output = {};
		await images.forEach(async (image, index) => {
			output[index] = image.delay;
			if (Object.keys(output).length === images.length) {
				fs.writeFileSync(path.join(outDir, 'frame-data.json'), JSON.stringify(output));
			}
		});

	}
);