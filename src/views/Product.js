import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
	Grid,
	Card,
	Typography,
	Chip,
	List,
	ListItem,
	ListItemText,
	Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import imagealternative from "../assets/logo.png";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

function Product() {
	const theme = useSelector((state) => state.theme.name);
	const [product, setProduct] = useState(
		useSelector((state) => state.product.product)
	);
	const [pokemonInfo, setPokemonInfo] = useState(null);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(true);
	const styles = useStyle();
	const dispatch = useDispatch();
	const history = useHistory();

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

	function addCart() {
		let pokemon = {
			product: product,
		};
		dispatch({
			type: "ADD_ITEM_CART",
			pokemon: pokemon,
		});
	}

	useEffect(() => {
		setLoading(true);
		if (product === undefined) {
			if (localStorage.getItem("SELECTED_POKEMON")) {
				const pokemonSelected = JSON.parse(
					localStorage.getItem("SELECTED_POKEMON")
				);

				dispatch({
					type: "SET_PRODUCT",
					product: pokemonSelected,
				});

				setProduct(pokemonSelected);
				verifyAvailablePokemon(pokemonSelected);
			}
		} else {
			verifyAvailablePokemon(product);
		}

		function verifyAvailablePokemon() {
			if (theme === "poison") {
				if (localStorage.getItem("POISON_POKEMON")) {
					const poisonPokemon = JSON.parse(
						localStorage.getItem("POISON_POKEMON")
					);

					const validPokemon = poisonPokemon.pokemon.some(
						(item) => item.name === product.name
					);

					if (!validPokemon) {
						history.push("/");
					}
				} else {
					history.push("/");
				}
			} else if (theme === "ice") {
				if (localStorage.getItem("ICE_POKEMON")) {
					const icePokemon = JSON.parse(localStorage.getItem("ICE_POKEMON"));

					const validPokemon = icePokemon.pokemon.some(
						(item) => item.name === product.name
					);

					if (!validPokemon) {
						history.push("/");
					}
				} else {
					history.push("/");
				}
			}

			if (product !== null) {
				getPokemonInfo();
			}
		}

		async function getPokemonInfo() {
			try {
				const response = await axios.get(product.url);
				setPokemonInfo(response.data);
			} catch (error) {
				console.log(error);
			}
		}
	}, [theme, history, product, dispatch, setProduct, loading]);

	useEffect(() => {
		if (pokemonInfo !== null) {
			if (pokemonInfo.sprites.front_default !== null) {
				setImage(pokemonInfo.sprites.front_default);
			} else if (pokemonInfo.sprites.front_shiny !== null) {
				setImage(pokemonInfo.sprites.front_shiny);
			} else if (pokemonInfo.sprites.front_female !== null) {
				setImage(pokemonInfo.sprites.front_female);
			}

			setLoading(false);
		}
	}, [pokemonInfo]);

	return (
		<Grid container className={styles.root}>
			{!loading && (
				<Grid item xs={12} md={8} className={styles.container}>
					<Card className={styles.card} elevation={0} variant="outlined">
						<Grid container>
							<Grid item xs={12} sm={6} className={styles.centralizedContent}>
								<img
									className={styles.image}
									src={image !== null ? image : imagealternative}
									alt="Pokémon"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Typography
									className={styles.header}
									variant="overline"
									component="span"
									noWrap={false}
								>
									{capitalizeString(product.name)}
								</Typography>
								<Chip
									label={capitalizeString(theme)}
									className={
										theme === "poison" ? styles.poisonAvatar : styles.iceAvatar
									}
								/>
								<Rating
									className={styles.rating}
									value={product.rating}
									size="small"
									readOnly
								/>
								<Grid container>
									<Grid item xs={12}>
										<List>
											<ListItem style={{ padding: 0, margin: 0 }}>
												<ListItemText
													classes={{
														primary: styles.primary,
														secondary: styles.secondary,
													}}
													primary={standardizePrice(product.price, 10)}
													secondary={standardizePrice(product.price, 0)}
												/>
											</ListItem>
										</List>
									</Grid>
									<Grid item xs={12}>
										{!loading && (
											<Button
												onClick={() => addCart()}
												className={
													theme === "poison"
														? styles.poisonButton
														: styles.iceButton
												}
												variant="contained"
												startIcon={<ShoppingBasketIcon />}
												disableElevation
											>
												COMPRAR
											</Button>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			)}
		</Grid>
	);
}

export default Product;

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
		fontSize: 28,
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
}));
