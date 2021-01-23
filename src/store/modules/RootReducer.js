import { combineReducers } from "redux";
import user from "./User";
import cart from "./Cart";
import theme from "./Theme";
import product from "./Product";

const rootReducer = combineReducers({
	user,
	cart,
	theme,
	product,
});

export default rootReducer;
