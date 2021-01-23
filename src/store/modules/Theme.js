let initialState = {
	name: null,
};

const theme = (state = initialState, action) => {
	switch (action.type) {
		case "CHANGE_THEME":
			return {
				...state,
				name: action.name,
			};

		default:
			return state;
	}
};
export default theme;
