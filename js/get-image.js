const getImage = (imageName) => {
	return new Promise((resolve, reject) => {
		fetch(`/images/${imageName}`).then((data) => {
			resolve(data);
		})
	});
};

export default getImage;