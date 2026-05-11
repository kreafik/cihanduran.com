import React, { Suspense, lazy } from "react";
import Default from "@components/Default";
import Loader from "@elements/Loader/Loader";
import SEO from "@components/SEO";
const IBANContent = lazy(() => import("@elements/IBAN/IBANContent"));

const IBAN = () => {
	return (
		<>
			<SEO
				title="Banka Hesapları — IBAN"
				description="Cihan Duran İş Bankası ve Ziraat Bankası IBAN numaraları."
				canonical="/iban"
			/>
			<Default
				heading="Banka Hesapları"
				resizable={false}
				programName="Banka Hesapları"
			>
				<Suspense fallback={<Loader />}>
					<IBANContent />
				</Suspense>
			</Default>
		</>
	);
};

export default IBAN;
