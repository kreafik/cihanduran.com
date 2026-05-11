import "@styles/menubar.scss";
import AppleIcon from "@static/apple.png";
import BatteryIcon from "@static/battery.png";
import WifiIcon from "@static/wifi.png";
import ControlCenterIcon from "@static/controlcenter.png";
import * as Menubar from "@radix-ui/react-menubar";
import React from "react";
import { useNavigate } from "react-router-dom";

const formatMinutes = min => {
	return min < 10 ? "0" + min : min;
};

const convertToReadableDate = timestamp => {
	const shortenedDaysOfTheWeek = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
	];
	const shortenedMonth = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const currentDate = new Date(timestamp);
	return (
		<>
			{shortenedDaysOfTheWeek[currentDate.getDay()]}{" "}
			{currentDate.getDate()} {shortenedMonth[currentDate.getMonth()]}{" "}
			<span className="time">
				{currentDate.getHours()}:
				{formatMinutes(currentDate.getMinutes())}
			</span>
		</>
	);
};

const MenuItems = props => {
	const navigate = useNavigate();
	switch (props.menuType) {
		case "File":
			return (
				<Menubar.Content className="menu-content">
					<Menubar.Item onSelect={() => navigate("/")}>Terminal</Menubar.Item>
					<Menubar.Item onSelect={() => navigate("/resume")}>Özgeçmiş</Menubar.Item>
					<Menubar.Item onSelect={() => navigate("/projects")}>Projeler</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item onSelect={() => navigate("/hizmetler")}>Hizmetler</Menubar.Item>
					<Menubar.Item onSelect={() => navigate("/git")}>GitHub</Menubar.Item>
					<Menubar.Item onSelect={() => navigate("/iban")}>Banka Hesapları</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item onSelect={() => navigate("/contact")}>İletişim</Menubar.Item>
				</Menubar.Content>
			);
		case props.programName:
			return (
				<Menubar.Content className="menu-content">
					<Menubar.Item onSelect={() => window.open("https://cihanduran.com", "_blank")}>cihanduran.com</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item onSelect={() => window.open("mailto:tasarim@cihanduran.com")}>tasarim@cihanduran.com</Menubar.Item>
					<Menubar.Item onSelect={() => window.open("https://wa.me/905415755520", "_blank")}>WhatsApp: +90 541 575 55 20</Menubar.Item>
					<Menubar.Separator />
					<Menubar.Item onSelect={() => window.open("https://github.com/kreafik", "_blank")}>GitHub: @kreafik</Menubar.Item>
				</Menubar.Content>
			);
		default:
			return (
				<Menubar.Content className="menu-content">
					<Menubar.Item>Yakında...</Menubar.Item>
				</Menubar.Content>
			);
	}
};

const MenuContent = props => {
	const menuItems = [
		[
			<img src={AppleIcon} alt="Apple logo" className="apple" />,
			props.programName,
			"File",
			"Edit",
			"View",
			"Window",
			"Help",
		],
		[
			<img src={BatteryIcon} alt="Battery icon" className="right-icon" />,
			<img src={WifiIcon} alt="Wifi icon" className="right-icon" />,
			<img
				src={ControlCenterIcon}
				alt="Control Center icon"
				className="right-icon"
			/>,
			convertToReadableDate(Date.now()),
		],
	];
	return (
		<Menubar.Root className="menu-bar">
			<Menubar.Menu>
				<div className="app-menus">
					{menuItems[0].map((item, index) => {
						return (
							<React.Fragment key={index}>
								<Menubar.Trigger
									className={`${
										typeof item !== "string"
											? `img-container`
											: `menu-trigger`
									}`}
								>
									{item}
								</Menubar.Trigger>
								<Menubar.Portal container={document.body}>
									<MenuItems menuType={item} programName={props.programName} />
								</Menubar.Portal>
							</React.Fragment>
						);
					})}
				</div>
			</Menubar.Menu>
			<div className="right-side">
				{menuItems[1].map((item, index) => {
					return (
						<div
							className={`${
								index !== menuItems[1].length - 1
									? `img-container`
									: ``
							}`}
							key={index}
						>
							{item}
						</div>
					);
				})}
			</div>
		</Menubar.Root>
	);
};

export default MenuContent;
