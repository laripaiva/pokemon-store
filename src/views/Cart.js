import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	Grid,
	Card,
	Typography,
	List,
	ListItem,
	ListItemText,
	Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "../components/cart/Avatar";

function Cart() {
	const loggedUser = useSelector((state) => state.user.email);
	const theme = useSelector((state) => state.theme.name);
	const items = useSelector((state) => state.cart);
	const styles = useStyle();
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (loggedUser === undefined) {
			history.push("/login");
		}
	});

	function capitalizeString(string) {
		if (string !== null) {
			return string.toUpperCase();
		} else {
			return string;
		}
	}

	function standardizePrice(price, fakeDiscount) {
		let finalPrice = (parseFloat(price) + parseFloat(fakeDiscount)).toFixed(2);

		return "R$" + finalPrice.replace(".", ",");
	}

	function removeCart(product) {
		let name = product.name;
		dispatch({
			type: "REMOVE_ITEM_CART",
			name: name,
		});
	}

	return (
		<Grid container className={styles.root}>
			<Grid item xs={12} className={styles.container}>
				<Typography
					className={styles.header}
					variant="button"
					display="block"
					gutterBottom
				>
					minha cesta
				</Typography>
			</Grid>
			{items.length > 0 && (
				<Grid item xs={12} sm={8} className={styles.card}>
					{items.map((item, i) => (
						<div key={i}>
							<Card variant="outlined">
								<Grid container>
									<Grid item xs={3} className={styles.centralizedContent}>
										<Avatar url={item.product.url}></Avatar>
									</Grid>
									<Grid item xs={9}>
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
										<Rating
											className={styles.rating}
											value={item.product.rating}
											size="small"
											readOnly
										/>
									</Grid>
									<Grid item xs={12}>
										<Button
											onClick={() => removeCart(item)}
											className={
												theme === "poison"
													? styles.poisonButton
													: styles.iceButton
											}
											variant="contained"
											disableElevation
										>
											REMOVER
										</Button>
									</Grid>
								</Grid>
							</Card>
						</div>
					))}
				</Grid>
			)}

			{/* <Grid item xs={12} sm={6} className={styles.divider}>
				<Divider></Divider>
			</Grid> */}
			<Grid item xs={12} sm={4} className={styles.buttonContainer}>
				<Button
					className={
						theme === "poison" ? styles.poisonButton : styles.iceButton
					}
					variant="contained"
					disableElevation
					size="large"
				>
					Finalizar compra
				</Button>
			</Grid>
		</Grid>
	);
}

export default Cart;
const useStyle = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		padding: theme.spacing(3),
	},
	card: {
		padding: theme.spacing(3),
	},
	centralizedContent: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 120,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		fontSize: 24,
		fontWeight: 700,
		color: "#393939",
		wordBreak: "break-word",
	},
	title: {
		fontSize: 24,
		fontWeight: 700,
		color: "#393939",
		wordBreak: "break-word",
	},
	divider: {
		marginBottom: theme.spacing(3),
	},
	poisonButton: {
		color: "#fff",
		backgroundColor: "#3C2042",
	},
	iceButton: {
		color: "#fff",
		backgroundColor: "#0A5DA6",
	},
	poisonAvatar: {
		width: 90,
		height: 25,
		display: "flex",
		justifyContent: "center",
		backgroundColor: "#AE5FC2",
		fontSize: 14,
		fontWeight: 700,
		color: "#ffffff",
	},
	iceAvatar: {
		width: 70,
		height: 25,
		display: "flex",
		justifyContent: "center",
		fontSize: 14,
		fontWeight: 700,
		backgroundColor: "#3EC3EA",
		color: "#000000",
	},
	rating: {
		marginTop: theme.spacing(1),
	},
	secondary: {
		fontSize: 32,
		fontWeight: 700,
		color: "#393939",
	},
	primary: {
		fontSize: 14,
		color: "#777777",
		textDecoration: "line-through",
	},
	buttonContainer: {
		marginBottom: theme.spacing(3),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));
