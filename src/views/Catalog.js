import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Banner from "../components/product/Banner";
import ProductCard from "../components/product/ProductCard";

export default function Catalog() {
	const theme = useSelector((state) => state.theme.name);
	const [pokemon, setPokemon] = useState([]);
	const styles = useStyle();

	useEffect(() => {
		async function getPoisonPokemon() {
			try {
				const response = await axios.get("https://pokeapi.co/api/v2/type/4");
				setAdditionalPokemonInformation(response.data.pokemon);
			} catch (error) {
				console.log(error);
			}
		}

		async function getIcePokemon() {
			try {
				const response = await axios.get("https://pokeapi.co/api/v2/type/15");
				setAdditionalPokemonInformation(response.data.pokemon);
			} catch (error) {
				console.log(error);
			}
		}

		function setAdditionalPokemonInformation(items) {
			const newPokemonList = items.map((item) => {
				const newPropeties = {
					rating: Math.floor(Math.random() * 5) + 1,
					price: (Math.random() * (40 - 20) + 20).toFixed(),
				};

				return Object.assign(item.pokemon, newPropeties);
			});

			setPokemon(newPokemonList);
			saveInLocalStorage(newPokemonList);
		}

		function saveInLocalStorage(newPokemonList) {
			if (theme === "poison") {
				const poisonPokemon = {
					theme: "poison",
					pokemon: newPokemonList,
				};

				localStorage.setItem("POISON_POKEMON", JSON.stringify(poisonPokemon));
			} else if (theme === "ice") {
				const icePokemon = {
					theme: "ice",
					pokemon: newPokemonList,
				};

				localStorage.setItem("ICE_POKEMON", JSON.stringify(icePokemon));
			}
		}

		if (theme === "poison") {
			if (!localStorage.getItem("POISON_POKEMON")) {
				getPoisonPokemon();
			} else {
				const poisonPokemon = JSON.parse(
					localStorage.getItem("POISON_POKEMON")
				);
				setPokemon(poisonPokemon.pokemon);
			}
		} else if (theme === "ice") {
			if (!localStorage.getItem("ICE_POKEMON")) {
				getIcePokemon();
			} else {
				const icePokemon = JSON.parse(localStorage.getItem("ICE_POKEMON"));
				setPokemon(icePokemon.pokemon);
			}
		}
	}, [theme]);

	return (
		<Grid container={true}>
			<Grid item xs={12} className={styles.container}>
				<Banner></Banner>
			</Grid>
			<Grid item xs={12} className={styles.items}>
				<Grid container>
					{pokemon.map((item, i) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							lg={3}
							className={styles.item}
							key={i}
						>
							<ProductCard
								name={item.name}
								url={item.url}
								rating={item.rating}
								price={item.price}
							></ProductCard>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
}

const useStyle = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		backgroundSize: "cover",
	},
	items: {
		padding: theme.spacing(2),
	},
	item: {
		padding: theme.spacing(1),
	},
}));
