import React from "react";
import "@styles/dock.scss";
import TerminalIcon from "@static/terminal.png";
import CodeIcon from "@static/code.png";
import FolderIcon from "@static/folder.png";
import ContactIcon from "@static/contact.png";
import BankIcon from "@static/bank.svg";
import ServicesIcon from "@static/services.svg";
import { Link } from "react-router-dom";
import { useDockStore } from "@contexts/Dock/Dock";
import DockItem from "./DockItem";

const DockContent = () => {
	const setMousePosX = useDockStore(state => state.setMousePosX);
	const handleMouseOver = e => {
		let x;
		if (
			e.type === "touchstart" ||
			e.type === "touchmove" ||
			e.type === "touchend" ||
			e.type === "touchcancel"
		) {
			let evt =
				typeof e.originalEvent === "undefined" ? e : e.originalEvent;
			let touch = evt.touches[0] || evt.changedTouches[0];
			x = touch.pageX;
		} else if (
			e.type === "mousedown" ||
			e.type === "mouseup" ||
			e.type === "mousemove" ||
			e.type === "mouseover" ||
			e.type === "mouseout" ||
			e.type === "mouseenter" ||
			e.type === "mouseleave"
		) {
			x = e.clientX;
		}
		setMousePosX(window.innerWidth > 640 ? x : null);
	};

	const handleMouseOut = () => {
		setMousePosX(null);
	};
	return (
		<div className="main-contain">
			<div className="container">
				<div
					className="dock"
					onMouseMove={handleMouseOver}
					onMouseLeave={handleMouseOut}
					onTouchMove={handleMouseOver}
					onTouchCancel={handleMouseOut}
					onTouchEnd={handleMouseOut}
				>
					<span></span>
					<div className="dock-nav">
						<ul>
							<Link to="/">
								<DockItem
									img={TerminalIcon}
									title="Terminal"
									fullWidth
								/>
							</Link>
							<Link to="/vscode">
								<DockItem img={CodeIcon} title="VS Code" />
							</Link>
							<Link to="/git">
								<DockItem img={FolderIcon} title="GitHub Projeleri" />
							</Link>
							<Link to="/hizmetler">
								<DockItem
									img={ServicesIcon}
									fullWidth
									title="Hizmetler"
								/>
							</Link>
							<div className="separator" />
							<Link to="/resume">
								<DockItem
									img={FolderIcon}
									title="Özgeçmiş"
								/>
							</Link>
							<Link to="/contact">
								<DockItem
									img={ContactIcon}
									fullWidth
									title="İletişim"
								/>
							</Link>
							<Link to="/iban">
								<DockItem
									img={BankIcon}
									fullWidth
									title="Banka Hesapları"
								/>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DockContent;
