import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	Grid,
	Button,
	Typography,
	Divider,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../cart/Avatar";

export default function Summary() {
	const loggedUser = useSelector((state) => state.user.email);
	const theme = useSelector((state) => state.theme.name);
	const items = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const history = useHistory();
	const styles = useStyle();

	function standardizePrice(price, fakeDiscount) {
		let finalPrice = (parseFloat(price) + parseFloat(fakeDiscount)).toFixed(2);

		return "R$" + finalPrice.replace(".", ",");
	}

	function capitalizeString(string) {
		if (string !== null) {
			return string.toUpperCase();
		} else {
			return string;
		}
	}

	function getItensFromTheCart() {
		let existingItems = [];
		if (theme === "poison") {
			if (localStorage.getItem("POISON_CART")) {
				existingItems = JSON.parse(localStorage.getItem("POISON_CART"));
			}
		} else if (theme === "ice") {
			if (localStorage.getItem("ICE_CART")) {
				existingItems = JSON.parse(localStorage.getItem("ICE_CART"));
			}
		}

		if (existingItems.length > 0) {
			for (let i = 0; i < existingItems.length; i++) {
				let pokemon = {
					product: existingItems[i].product,
				};
				dispatch({
					type: "ADD_ITEM_CART",
					pokemon: pokemon,
				});
			}
		}
	}

	function saveInLocalStorage() {
		if (theme === "poison") {
			localStorage.setItem("POISON_CART", JSON.stringify(items));
		} else if (theme === "ice") {
			localStorage.setItem("ICE_CART", JSON.stringify(items));
		}
	}

	function goToCart() {
		if (loggedUser === undefined) {
			history.push("/login");
		} else {
			history.push("/carrinho");
		}
	}

	useEffect(() => {
		if (items.length === 0) {
			getItensFromTheCart();
		} else {
			saveInLocalStorage();
		}
	}, [items, theme]);

	return (
		<Grid container className={styles.root}>
			<Grid item xs={12} className={styles.cardTitle}>
				<Typography variant="button" display="block" gutterBottom>
					minha cesta
				</Typography>
			</Grid>
			<Grid item xs={12} className={styles.card}>
				{items.map((item, i) => (
					<div key={i}>
						<Divider></Divider>
						<Grid container>
							<Grid item xs={5}>
								<Avatar url={item.product.url}></Avatar>
							</Grid>
							<Grid item xs={7}>
								<Typography
									className={styles.header}
									variant="overline"
									component="span"
									noWrap={false}
								>
									{capitalizeString(item.product.name)}
								</Typography>
								<List>
									<ListItem style={{ padding: 0, margin: 0 }}>
										<ListItemText
											classes={{
												primary: styles.primary,
												secondary: styles.secondary,
											}}
											primary={standardizePrice(item.product.price, 10)}
											secondary={standardizePrice(item.product.price, 0)}
										/>
									</ListItem>
								</List>
							</Grid>
						</Grid>
					</div>
				))}
			</Grid>
			<Grid item xs={12} className={styles.divider}>
				<Divider></Divider>
			</Grid>
			<Grid item xs={12} className={styles.buttonContainer}>
				<Button
					onClick={() => goToCart()}
					className={
						theme === "poison" ? styles.poisonButton : styles.iceButton
					}
					variant="contained"
					disableElevation
				>
					ver minha cesta
				</Button>
			</Grid>
		</Grid>
	);
}

const useStyle = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	cardTitle: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		width: 300,
	},
	header: {
		fontSize: 16,
		fontWeight: 700,
		color: "#393939",
		wordBreak: "break-word",
	},
	secondary: {
		fontSize: 18,
		fontWeight: 700,
		color: "#393939",
		margin: 0,
		padding: 0,
	},
	primary: {
		fontSize: 12,
		color: "#777777",
		textDecoration: "line-through",
		margin: 0,
		padding: 0,
	},
	poisonButton: {
		color: "#fff",
		backgroundColor: "#3C2042",
	},
	iceButton: {
		color: "#fff",
		backgroundColor: "#0A5DA6",
	},
	buttonContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	divider: {
		paddingBottom: theme.spacing(2),
	},
}));
