import React from "react";
import "@styles/dock.scss";
import TerminalIcon from "@static/terminal.png";
import CodeIcon from "@static/code.png";
import GithubIcon from "@static/github.png";
import FolderIcon from "@static/folder.png";
import ToolsIcon from "@static/krea.png";
import { Link } from "react-router-dom";

const DockContent = () => {
	return (
		<div className="main-contain">
			<div className="container">
				<div className="dock">
					<span></span>
					<div className="dock-nav">
						<ul>
							<Link to="/">
								<li
									data-title="Terminal"
									className="full-width-icon"
								>
									<img
										src={TerminalIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
							<Link to="/vscode">
								<li data-title="VS Code">
									<img
										src={CodeIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
							<Link to="/git">
								<li data-title="Git Log">
									<img
										src={GithubIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
							<a href="https://qr.krea.dev" target="_blank" rel="noreferrer">
								<li data-title="QR Code Generator">
									<img
										src={ToolsIcon}
										className="img-fluid"
										alt="dope"
									/>
								</li>
							</a>
							<a href="https://tools.krea.dev" target="_blank" rel="noreferrer">
								<li data-title="Tools For Web">
									<img
										src={ToolsIcon}
										className="img-fluid"
										alt="dope"
									/>
								</li>
							</a>
							<div className="separator" />
							<Link to="/resume">
								<li data-title="Resume">
									<img
										src={FolderIcon}
										className="img-fluid"
										alt="mac"
									/>
								</li>
							</Link>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DockContent;
