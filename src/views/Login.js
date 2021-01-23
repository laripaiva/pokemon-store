import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	FormGroup,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Button,
	Card,
	Typography,
	Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export default function Login() {
	const loggedUser = useSelector((state) => state.user.email);
	const theme = useSelector((state) => state.theme.name);
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState(null);
	const dispatch = useDispatch();
	const style = useStyle();
	const validator = require("validator");
	const history = useHistory();

	function overwriteEmail(value) {
		if (value === "") {
			setEmailError("O campo precisa estar preenchido.");
		} else {
			setEmailError(null);
		}
		setEmail(value);
	}

	function checkEmptyFields() {
		if (!validator.isEmpty(email) && validator.isEmail(email)) {
			login(email);
		}
	}

	function login(email) {
		const users = JSON.parse(localStorage.getItem("USERS"));
		const userExists = users.find((user) => user.email === email);
		if (userExists === undefined) {
			setEmailError("Email não cadastrado.");
		} else {
			dispatch({
				type: "SET_NAME",
				name: userExists.name,
			});

			dispatch({
				type: "SET_EMAIL",
				email: userExists.email,
			});

			localStorage.setItem("LOGGED_USER", JSON.stringify(userExists));
		}
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
		} else {
			history.push("/");
		}
	}

	useEffect(() => {
		isUserLoggedIn();
	});

	return (
		<Grid container className={style.root} alignItems="center" justify="center">
			<Card className={style.card} variant="outlined">
				<FormGroup row={false}>
					<FormControl justify="center">
						<InputLabel>Email</InputLabel>
						<Input onChange={(e) => overwriteEmail(e.target.value)} />
						<FormHelperText>
							<Typography
								variant="subtitle2"
								component="span"
								color="error"
								gutterBottom
							>
								{emailError}
							</Typography>
						</FormHelperText>
					</FormControl>
					<FormControl
						onClick={() => history.push("/cadastro")}
						className={style.container}
					>
						<Typography
							className={style.register}
							variant="subtitle2"
							component="span"
							gutterBottom
						>
							Clique aqui para cadastrar.
						</Typography>
					</FormControl>
					<FormControl>
						<Button
							onClick={() => checkEmptyFields()}
							variant="contained"
							disableElevation
							className={
								theme === "poison" ? style.poisonButton : style.iceButton
							}
						>
							Entrar
						</Button>
					</FormControl>
				</FormGroup>
			</Card>
		</Grid>
	);
}

const useStyle = makeStyles((theme) => ({
	root: {
		justifyContent: "center",
		padding: theme.spacing(3),
	},
	card: {
		width: 320,
		padding: theme.spacing(3),
	},
	margin: {
		margin: theme.spacing(3),
	},
	padding: {
		padding: theme.spacing(3),
	},
	poisonButton: {
		color: "#fff",
		backgroundColor: "#3C2042",
		margin: "auto",
		height: 48,
		width: 120,
		marginTop: theme.spacing(3),
	},
	iceButton: {
		color: "#fff",
		backgroundColor: "#0A5DA6",
		margin: "auto",
		height: 48,
		width: 120,
		marginTop: theme.spacing(3),
	},
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		marginTop: theme.spacing(3),
	},
	register: {
		fontSize: 12,
		color: "#777777",
		margin: 0,
		padding: 0,
	},
}));
