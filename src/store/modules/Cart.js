let initialState = [];

const cart = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_ITEM_CART":
			const productRepeated = state.some(
				(item) => item.product.name === action.pokemon.product.name
			);
			if (productRepeated) return state;
			else return [...state, action.pokemon];

		case "REMOVE_ITEM_CART":
			const index = state.findIndex(
				(item) => item.product.name === action.name
			);
			state.splice(index, 1);
			return state;

		default:
			return state;
	}
};

export default cart;
