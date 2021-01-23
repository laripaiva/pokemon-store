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

export default function Register() {
	const theme = useSelector((state) => state.theme.name);
	const loggedUser = useSelector((state) => state.user.email);
	const style = useStyle();
	const [users, setUsers] = useState([]);
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [emailError, setEmailError] = useState(null);
	const [nameError, setNameError] = useState(null);
	const validator = require("validator");
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		verifyUsers();
		isUserLoggedIn();
	});

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

	function verifyUsers() {
		const items = JSON.parse(localStorage.getItem("USERS"));
		if (items) {
			if (items.length !== users.length) {
				setUsers(items);
			}
		}
	}

	function addUser() {
		const repeatedUser = isUserRepeated({
			name: name,
			email: email,
		});

		if (repeatedUser) {
			setEmailError("Email inválido.");
		} else {
			let newList = [
				users,
				{
					name: name,
					email: email,
				},
			];
			newList = newList.flat();
			localStorage.setItem("USERS", JSON.stringify(newList));
			history.push("/login");
		}
		verifyUsers();
	}

	function isUserRepeated(newUser) {
		if (users.length > 0) {
			return users.some((user) => user.email === newUser.email);
		} else {
			return false;
		}
	}

	function validateName(value) {
		if (validator.isEmpty(value)) {
			setNameError("O campo precisa estar preenchido.");
		} else {
			setNameError(null);
		}
		setName(value);
	}

	function validateEmail(value) {
		if (validator.isEmpty(value)) {
			setEmailError("O campo precisa estar preenchido.");
		} else {
			if (validator.isEmail(value)) {
				setEmail(value);
				setEmailError(null);
			} else {
				setEmail("");
				setEmailError("Email inválido.");
			}
		}
	}

	function checkEmptyFields() {
		if (
			!validator.isEmpty(email) &&
			validator.isEmail(email) &&
			!validator.isEmpty(name)
		) {
			verifyUsers();
			addUser();
		}
	}

	return (
		<Grid container className={style.root} alignItems="center" justify="center">
			<Card className={style.card} variant="outlined">
				<FormGroup row={false}>
					<FormControl justify="center">
						<InputLabel htmlFor="my-input">Nome</InputLabel>
						<Input onChange={(e) => validateName(e.target.value)} />
						<FormHelperText>
							<Typography
								variant="subtitle2"
								component="span"
								color="error"
								gutterBottom
							>
								{nameError}
							</Typography>
						</FormHelperText>
					</FormControl>
					<FormControl justify="center">
						<InputLabel>Email</InputLabel>
						<Input onChange={(e) => validateEmail(e.target.value)} />
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
					<FormControl>
						<Button
							onClick={() => checkEmptyFields()}
							variant="contained"
							disableElevation
							className={
								theme === "poison" ? style.poisonButton : style.iceButton
							}
						>
							Cadastrar
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
}));
