import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Grid, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import imagealternative from "../../assets/logo.png";

export default function Avatar(props) {
	const styles = useStyle();
	const items = useSelector((state) => state.cart);
	const [pokemonInfo, setPokemonInfo] = useState(null);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getPokemonInfo();
	}, [items]);

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

	async function getPokemonInfo() {
		setLoading(true);
		try {
			const response = await axios.get(props.url);
			setPokemonInfo(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Grid container className={styles.root}>
			<Grid item xs={12} className={styles.card}>
				{!loading && (
					<img
						className={styles.image}
						src={image !== null ? image : imagealternative}
						alt="Pokémon"
					/>
				)}
			</Grid>
		</Grid>
	);
}

const useStyle = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		padding: theme.spacing(1),
	},
}));
