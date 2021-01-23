import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
	Card,
	Grid,
	Typography,
	Chip,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import imagealternative from "../../assets/logo.png";

function ProductCard(props) {
	const theme = useSelector((state) => state.theme.name);
	const [pokemonInfo, setPokemonInfo] = useState(null);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(null);
	const dispatch = useDispatch();
	const style = useStyle();
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

	function seeDetails() {
		dispatch({
			type: "SET_PRODUCT",
			product: props,
		});

		localStorage.setItem("SELECTED_POKEMON", JSON.stringify(props));

		history.push("/produto");
	}

	async function getPokemonInfo(props) {
		try {
			const response = await axios.get(props.url);
			setPokemonInfo(response.data);
		} catch (error) {
			console.log(error);
		}
	}

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

	useEffect(() => {
		if (props.url !== undefined) {
			setLoading(true);
			getPokemonInfo(props);
		}
	}, [props]);

	return (
		<Grid container className={style.root}>
			{!loading ? (
				<Card
					onClick={() => seeDetails()}
					className={style.card}
					variant="outlined"
				>
					<Grid container>
						<Grid item xs={6} className={style.imageContainer}>
							<img
								className={style.image}
								src={image !== null ? image : imagealternative}
								alt="Pokémon"
							/>
						</Grid>
						<Grid item xs={6} style={{ paddingLeft: 4 }}>
							<Typography
								className={style.header}
								style={{ paddingLeft: 4 }}
								variant="overline"
								component="span"
								noWrap={false}
							>
								{capitalizeString(props.name)}
							</Typography>
							<Chip
								label={capitalizeString(theme)}
								className={
									theme === "poison" ? style.poisonAvatar : style.iceAvatar
								}
							/>
							<Rating
								className={style.rating}
								value={props.rating}
								readOnly
								size="small"
							/>
							<List>
								<ListItem style={{ padding: 0, margin: 0 }}>
									<ListItemText
										classes={{
											primary: style.primary,
											secondary: style.secondary,
										}}
										primary={standardizePrice(props.price, 10)}
										secondary={standardizePrice(props.price, 0)}
									/>
								</ListItem>
							</List>
						</Grid>
					</Grid>
				</Card>
			) : (
				<Card className={style.loadingCard} variant="outlined">
					<CircularProgress />
				</Card>
			)}
		</Grid>
	);
}
const useStyle = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		width: 300,
	},
	imageContainer: {
		padding: theme.spacing(1),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingCard: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(3),
	},
	image: {
		width: 120,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		fontSize: 18,
		fontWeight: 700,
		color: "#393939",
		wordBreak: "break-word",
	},
	poisonAvatar: {
		width: 70,
		height: 25,
		display: "flex",
		justifyContent: "center",
		backgroundColor: "#AE5FC2",
		fontSize: 10,
		fontWeight: 700,
		color: "#ffffff",
	},
	iceAvatar: {
		width: 50,
		height: 25,
		display: "flex",
		justifyContent: "center",
		fontSize: 10,
		fontWeight: 700,
		backgroundColor: "#3EC3EA",
		color: "#000000",
	},
	rating: {
		marginTop: theme.spacing(1),
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
}));

export default ProductCard;
