const getImageData = (folderName) => {
	return new Promise((resolve, reject) => {
		fetch(`./images/${folderName}/image-data.json`).then((response) => {
			response.json().then((data) => resolve(data));
		})
	});
};

export default getImageData;