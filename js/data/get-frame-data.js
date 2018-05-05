const getFrameData = (folderName) => {
	return new Promise((resolve, reject) => {
		fetch(`./images/${folderName}/frame-data.json`).then((response) => {
			response.json().then((data) => resolve(data));
		})
	});
};

export default getFrameData;