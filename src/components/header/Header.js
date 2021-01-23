import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Badge,
	Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SummaryCart from "../cart/Summary";
import OptionsMenu from "../header/OptionsMenu";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

export default function Header() {
	const theme = useSelector((state) => state.theme.name);
	const items = useSelector((state) => state.cart);
	const history = useHistory();
	const styles = useStyles();
	const [menu, setMenu] = useState(null);
	const [cart, setCart] = useState(null);
	const isOpen = Boolean(menu);
	const isCartOpen = Boolean(cart);

	function capitalizeFirstLetter(string) {
		if (string !== null) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		} else {
			return string;
		}
	}

	function openOptions(event) {
		setMenu(event.currentTarget);
	}

	function openCart(event) {
		setCart(event.currentTarget);
	}

	function closeCart() {
		setCart(null);
	}

	function closeOptions() {
		setMenu(null);
	}

	return (
		<AppBar position="static" elevation={0} className={styles.root}>
			<Toolbar
				className={
					theme === "poison" ? styles.poisonToolbar : styles.iceToolbar
				}
			>
				{theme !== undefined && (
					<Typography
						onClick={() => history.push("/")}
						className={styles.title}
						variant="button"
						noWrap
					>
						{capitalizeFirstLetter(theme)} Pokemón
					</Typography>
				)}

				<Badge onClick={openCart} badgeContent={items.length} showZero>
					<ShoppingBasketIcon></ShoppingBasketIcon>
				</Badge>
				<IconButton
					aria-controls="fade-menu"
					onClick={openOptions}
					color="inherit"
				>
					<MenuIcon></MenuIcon>
				</IconButton>
				<Menu anchorEl={menu} keepMounted open={isOpen} onClose={closeOptions}>
					<OptionsMenu></OptionsMenu>
				</Menu>
				<Menu
					anchorEl={cart}
					keepMounted
					open={isCartOpen}
					onClose={closeCart}
					TransitionComponent={Fade}
					id="fade-menu"
				>
					<SummaryCart></SummaryCart>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "#80468F",
	},
	poisonToolbar: {
		minHeight: 40,
		alignItems: "flex-center",
		padding: theme.spacing(2),
		backgroundColor: "#80468F",
	},
	iceToolbar: {
		minHeight: 40,
		alignItems: "flex-center",
		padding: theme.spacing(2),
		backgroundColor: "#3EC3EA",
	},
	title: {
		flexGrow: 1,
		fontSize: 20,
		alignSelf: "flex-center",
		fontFamily: "Roboto, Arial",
		color: "#ffffff",
		cursor: "pointer",
	},
}));
