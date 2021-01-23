let initialState = {};

const product = (product = initialState, action) => {
	switch (action.type) {
		case "SET_PRODUCT":
			return { ...product, product: action.product };

		default:
			return product;
	}
};

export default product;
