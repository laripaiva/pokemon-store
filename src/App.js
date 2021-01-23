import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store";
import Routes from "./routes";
import Header from "./components/header/Header";

function App() {
	return (
		<Provider store={Store}>
			<BrowserRouter>
				<Header></Header>
				<Routes></Routes>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
