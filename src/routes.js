import React from "react";
import { Switch, Route } from "react-router-dom";
import Catalog from "./views/Catalog";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Profile";

function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={Catalog}></Route>
			<Route path="/produto" component={Product}></Route>
			<Route path="/carrinho" component={Cart}></Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/cadastro" component={Register}></Route>
			<Route path="/perfil" component={Profile}></Route>
		</Switch>
	);
}

export default Routes;
