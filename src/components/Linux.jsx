import React from "react";
import Default from "@components/Default";
import LinuxContent from "@elements/Linux/LinuxContent";

const Linux = () => {
	return (
		<Default heading="qemu" contextMenu={true} resizable={false} programName="Qemu">
			<LinuxContent />
		</Default>
	);
};

export default Linux;
