const fs = require('fs');
const path = require('path');
const imageInfo = require('imageinfo');
const getColors = require('get-image-colors');

const src = path.join(__dirname, process.argv[2]);

const firstImagePath = path.join(src, '/0.jpg');
const frameDataPath = path.join(src, '/frame-data.json');

const frameData = JSON.parse(fs.readFileSync(frameDataPath).toString());
const firstImage = fs.readFileSync(firstImagePath);
const firstImageInfo = imageInfo(firstImage);

const output = {
	frameData,
	dimensions: {
		width: firstImageInfo.width,
		height: firstImageInfo.height,
	},
};

getColors(firstImage, 'image/jpg').then(colors => {
	output.colors = colors.map(color => color.hex());
	fs.writeFileSync(path.join(src, 'image-data.json'), JSON.stringify(output));
});

