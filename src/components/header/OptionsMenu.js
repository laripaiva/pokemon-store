import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Avatar, Divider, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function OptionsMenu() {
	const dispatch = useDispatch();
	const history = useHistory();
	const theme = useSelector((state) => state.theme.name);
	const loggedUser = useSelector((state) => state.user.email);
	const items = useSelector((state) => state.cart);
	const styles = useStyles();

	function verifyTheme() {
		if (theme === null) {
			if (localStorage.getItem("THEME")) {
				changeTheme(localStorage.getItem("THEME"));
			} else {
				changeTheme("poison");
			}
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

	useEffect(() => {
		verifyTheme();
		isUserLoggedIn();
	});

	return (
		<Grid container className={styles.root}>
			<Grid item xs={12}>
				<Typography variant="overline" display="block" gutterBottom>
					Lojas temáticas
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				onClick={() => changeTheme("poison")}
				className={styles.clickable}
			>
				<Grid container className={styles.avatarContainer}>
					<Grid item>
						<Avatar className={styles.poisonAvatar} variant="square">
							P
						</Avatar>
					</Grid>
					<Grid item style={{ paddingLeft: 12 }}>
						<Typography variant="button" component="span">
							Poison Pokémon
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				item
				xs={12}
				onClick={() => changeTheme("ice")}
				className={styles.clickable}
			>
				<Grid container className={styles.avatarContainer}>
					<Grid item>
						<Avatar className={styles.iceAvatar} variant="square">
							I
						</Avatar>
					</Grid>
					<Grid item style={{ paddingLeft: 12 }}>
						<Typography variant="button" display="block" gutterBottom>
							Ice Pokémon
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			{loggedUser === undefined && (
				<Grid item xs={12}>
					<Divider className={styles.divider}></Divider>
				</Grid>
			)}
			{loggedUser === undefined && (
				<Grid
					item
					xs={12}
					onClick={() => history.push("/login")}
					className={styles.clickable}
				>
					<Typography variant="button" display="block" gutterBottom>
						Login
					</Typography>
				</Grid>
			)}
			{loggedUser !== undefined && (
				<Grid item xs={12}>
					<Divider className={styles.divider}></Divider>
				</Grid>
			)}
			{loggedUser !== undefined && (
				<Grid
					item
					xs={12}
					onClick={() => logout()}
					className={styles.clickable}
				>
					<Typography variant="button" component="span">
						Sair
					</Typography>
				</Grid>
			)}
		</Grid>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1),
		width: 250,
	},
	poisonAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		backgroundColor: "#80468F",
	},
	iceAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		backgroundColor: "#3EC3EA",
	},
	margin: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	clickable: {
		cursor: "pointer",
	},
	avatarContainer: {
		display: "flex",
		alignItems: "center",
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	divider: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));
