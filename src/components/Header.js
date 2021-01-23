import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Avatar,
	Badge,
	Divider,
	Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SummaryCart from "./cart/Summary";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

export default function Header() {
	const iceStyle = iceTheme();
	const poisonStyle = poisonTheme();
	const dispatch = useDispatch();
	const history = useHistory();
	const theme = useSelector((state) => state.theme.name);
	const loggedUser = useSelector((state) => state.user.email);
	const items = useSelector((state) => state.cart);

	const [anchorEl, setAnchorEl] = useState(null);
	const [cart, setCart] = useState(null);
	const isOpen = Boolean(anchorEl);
	const isCartOpen = Boolean(cart);

	function verifyTheme() {
		if (theme === null) {
			if (localStorage.getItem("THEME")) {
				changeTheme(localStorage.getItem("THEME"));
			} else {
				changeTheme("poison");
			}
		}
	}

	function capitalizeFirstLetter(string) {
		if (string !== null) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		} else {
			return string;
		}
	}

	function changeTheme(name) {
		for (const item of items) {
			let name = item.name;
			dispatch({
				type: "REMOVE_ITEM_CART",
				name: name,
			});
		}

		dispatch({
			type: "CHANGE_THEME",
			name: name,
		});

		setTimeout(localStorage.setItem("THEME", name), 500);
	}

	function logout() {
		dispatch({
			type: "SET_NAME",
			name: undefined,
		});

		dispatch({
			type: "SET_EMAIL",
			name: undefined,
		});

		history.push("/login");
		localStorage.removeItem("LOGGED_USER");
	}

	function isUserLoggedIn() {
		if (loggedUser === undefined) {
			if (localStorage.getItem("LOGGED_USER")) {
				const userInfo = JSON.parse(localStorage.getItem("LOGGED_USER"));

				dispatch({
					type: "SET_NAME",
					name: userInfo.name,
				});

				dispatch({
					type: "SET_EMAIL",
					email: userInfo.email,
				});

				history.push("/");
			}
		}
	}

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function openCart(event) {
		setCart(event.currentTarget);
	}

	function closeCart() {
		setCart(null);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	useEffect(() => {
		verifyTheme();
		isUserLoggedIn();
	});

	return (
		<AppBar
			position="static"
			elevation={0}
			className={theme === "poison" ? poisonStyle.root : iceStyle.root}
		>
			<Toolbar
				className={theme === "poison" ? poisonStyle.toolbar : iceStyle.toolbar}
			>
				{theme !== undefined && (
					<Typography
						onClick={() => history.push("/")}
						className={theme === "poison" ? poisonStyle.title : iceStyle.title}
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
					onClick={handleClick}
					color="inherit"
				>
					<MenuIcon></MenuIcon>
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					keepMounted
					open={isOpen}
					onClose={handleClose}
				>
					<Typography
						variant="overline"
						className={
							theme === "poison"
								? poisonStyle.basicMargin
								: iceStyle.basicMargin
						}
						display="block"
						gutterBottom
					>
						Lojas temáticas
					</Typography>
					<MenuItem onClick={() => changeTheme("poison")}>
						<Avatar
							className={
								theme === "poison"
									? poisonStyle.poisonAvatar
									: iceStyle.poisonAvatar
							}
							variant="square"
						>
							P
						</Avatar>
						<Typography variant="button" display="block" gutterBottom>
							Poison Pokémon
						</Typography>
					</MenuItem>
					<MenuItem onClick={() => changeTheme("ice")}>
						<Avatar
							className={
								theme === "poison" ? poisonStyle.iceAvatar : iceStyle.iceAvatar
							}
							variant="square"
						>
							I
						</Avatar>
						<Typography variant="button" display="block" gutterBottom>
							Ice Pokémon
						</Typography>
					</MenuItem>
					<Divider></Divider>
					{loggedUser === undefined && (
						<MenuItem onClick={() => history.push("/login")}>
							<Typography variant="button" display="block" gutterBottom>
								Login
							</Typography>
						</MenuItem>
					)}
					{loggedUser !== undefined && <Divider></Divider>}
					{loggedUser !== undefined && (
						<MenuItem onClick={handleClose}>
							<Typography variant="button" display="block" gutterBottom>
								Meus pedidos
							</Typography>
						</MenuItem>
					)}
					{loggedUser !== undefined && <Divider></Divider>}
					{loggedUser !== undefined && (
						<MenuItem onClick={() => logout()}>
							<Typography variant="button" display="block" gutterBottom>
								Sair
							</Typography>
						</MenuItem>
					)}
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

const poisonTheme = makeStyles((theme) => ({
	badge: {
		backgroundColor: "#00AFD7",
		color: "white",
	},
	poisonAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		margin: theme.spacing(1),
		backgroundColor: "#80468F",
	},
	iceAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		margin: theme.spacing(1),
		backgroundColor: "#3EC3EA",
	},
	root: {
		flexGrow: 1,
		backgroundColor: "#80468F",
	},
	toolbar: {
		minHeight: 40,
		alignItems: "flex-center",
		padding: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontSize: 20,
		alignSelf: "flex-center",
		fontFamily: "Roboto, Arial",
		color: "#ffffff",
	},
	basicMargin: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}));

const iceTheme = makeStyles((theme) => ({
	poisonAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		margin: theme.spacing(1),
		backgroundColor: "#80468F",
	},
	iceAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		margin: theme.spacing(1),
		backgroundColor: "#4AB0D9",
	},
	root: {
		flexGrow: 1,
		backgroundColor: "#4AB0D9",
	},
	toolbar: {
		minHeight: 40,
		alignItems: "flex-center",
		padding: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontSize: 20,
		alignSelf: "flex-center",
		fontFamily: "Roboto, Arial",
		color: "#ffffff",
	},
	basicMargin: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
}));
