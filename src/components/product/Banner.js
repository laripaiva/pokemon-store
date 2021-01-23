import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

import poisonPrimaryXs from "../../assets/poisonPrimary/xs.png";
import poisonPrimarySm from "../../assets/poisonPrimary/sm.png";
import poisonPrimaryMd from "../../assets/poisonPrimary/md.png";
import poisonPrimaryLg from "../../assets/poisonPrimary/lg.png";

import poisonSecondaryXs from "../../assets/poisonSecondary/xs.png";
import poisonSecondarySm from "../../assets/poisonSecondary/sm.png";
import poisonSecondaryMd from "../../assets/poisonSecondary/md.png";
import poisonSecondaryLg from "../../assets/poisonSecondary/lg.png";

import icePrimaryXs from "../../assets/icePrimary/xs.png";
import icePrimarySm from "../../assets/icePrimary/sm.png";
import icePrimaryMd from "../../assets/icePrimary/md.png";
import icePrimaryLg from "../../assets/icePrimary/lg.png";

import iceSecondaryXs from "../../assets/iceSecondary/xs.png";
import iceSecondarySm from "../../assets/iceSecondary/sm.png";
import iceSecondaryMd from "../../assets/iceSecondary/md.png";
import iceSecondaryLg from "../../assets/iceSecondary/lg.png";

export default function Banner() {
	const theme = useSelector((state) => state.theme.name);
	const size = useWindowSize();
	const style = useStyle();

	return (
		<Grid container={true}>
			{theme === "poison" && (
				<Grid item xs={12} className={style.bannerContainer}>
					{size < 375 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonPrimaryXs}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonSecondaryXs}
								alt="Poison images"
							/>
						</Carousel>
					)}
					{size > 374 && size < 600 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonPrimarySm}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonSecondarySm}
								alt="Poison images"
							/>
						</Carousel>
					)}
					{size > 599 && size < 960 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonPrimaryMd}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonSecondaryMd}
								alt="Poison images"
							/>
						</Carousel>
					)}
					{size > 959 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonPrimaryLg}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={poisonSecondaryLg}
								alt="Poison images"
							/>
						</Carousel>
					)}
				</Grid>
			)}
			{theme === "ice" && (
				<Grid item xs={12} className={style.bannerContainer}>
					{size < 375 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={icePrimaryXs}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={iceSecondaryXs}
								alt="Poison images"
							/>
						</Carousel>
					)}
					{size > 374 && size < 600 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={icePrimarySm}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={iceSecondarySm}
								alt="Poison images"
							/>
						</Carousel>
					)}
					{size > 599 && size < 960 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={icePrimaryMd}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={iceSecondaryMd}
								alt="Poison images"
							/>
						</Carousel>
					)}
					{size > 959 && (
						<Carousel>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={icePrimaryLg}
								alt="Poison images"
							/>
							<img
								style={{
									width: "100%",
									height: "auto",
									backgroundSize: "contain",
								}}
								src={iceSecondaryLg}
								alt="Poison images"
							/>
						</Carousel>
					)}
				</Grid>
			)}
		</Grid>
	);
}

function useWindowSize() {
	const [windowSize, setWindowSize] = useState(0);

	useEffect(() => {
		function handleResize() {
			setWindowSize(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

const useStyle = makeStyles((theme) => ({
	bannerContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));
