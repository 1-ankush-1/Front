import { CChart } from "@coreui/react-chartjs";
import { useTranslation } from "../../../../Translate/i18n";

export const StockInvest = ({ cap }) => {
	//translate
	const { t } = useTranslation();

	return (
		<CChart
			width={330}
			height={400}
			type="bar"
			data={{
				labels: cap?.company,
				datasets: [
					{
						label: `${(cap?.returns.reduce((total, current) => total + current, 0) / cap.returns.length).toFixed(2)} %chng`,
						backgroundColor: cap?.returns ? cap.returns.map(value => value < 0 ? '#C13C37' : '#4DBD74') : [],
						data: cap?.returns,
					},
				],
			}}
			labels={t("Stocks")}
		/>
	)
}

//mutual fund invest
export const FundInvest = ({ cap }) => {

	return (
		<CChart
		width={330}
			height={400}
			type="bar"
			data={{
				labels: cap?.company,
				datasets: [
					{
						label: `${(cap?.returns.reduce((total, current) => total + current, 0) / cap.returns.length).toFixed(2)} %chng`,
						backgroundColor: cap?.returns ? cap.returns.map(value => value < 0 ? '#C13C37' : '#4DBD74') : [],
						data: cap?.returns,
					},
				],
			}}
			labels={"Months"}
		/>
	)
}













// import { CChart } from "@coreui/react-chartjs";
// import { Container } from "@mui/material";
// import { useTranslation } from "../../../../Translate/i18n";
// import {FundPortfolio, Portfolio} from "./portfolio";

// export const StockInvest = ({ cap, percentChng, investAMt }) => {

// 	//translate
// 	const { t } = useTranslation();

// 	return (

// 		<Container sx={{ display: { md: 'flex', xs: 'block' } }}>
// 			<div style={{ width: "100%", margin: "5px" }}>
// 				<div >
// 					<CChart
// 						type="bar"
// 						data={{
// 							labels: cap?.company,
// 							datasets: [
// 								{
// 									label: `${percentChng} %chng`,
// 									backgroundColor: cap?.returns ? cap.returns.map(value => value < 0 ? '#C13C37' : '#4DBD74') : [],
// 									data: cap?.returns,
// 								},
// 							],
// 						}}
// 						labels={t("Stocks")}
// 					/>
// 				</div>
// 			</div>
// 			<div style={{ width: "100%", margin: "5px" }}>
// 				<Portfolio investAMt={investAMt} cap={cap} />        {/*giving compnay data and 1/4th of investment amount(not include gold and debt amount)*/}
// 			</div>

// 		</Container>
// 	)
// }

// export const FundInvest = ({ capFund, investAMt }) => {
// 	//translate
// 	const { t } = useTranslation();
// 	const percentChange = capFund.returns?.reduce((a, b) => a + b, 0).toFixed(2)

// 	return (
// 		<Container sx={{ display: { md: 'flex', xs: 'block' } }}>
// 			<div style={{ width: "100%", margin: "5px" }}>
// 				<div >
// 					<CChart
// 						type="bar"
// 						data={{
// 							labels: capFund?.company,
// 							datasets: [
// 								{
// 									label: `${percentChange} %chng`,
// 									backgroundColor: capFund?.returns ? capFund.returns.map(value => value < 0 ? '#C13C37' : '#4DBD74') : [],
// 									data: capFund?.returns,
// 								},
// 							],
// 						}}
// 						labels={t("Months")}

// 					/>
// 				</div>
// 			</div>
// 			<div style={{ width: "100%", margin: "5px" }}>
// 				<FundPortfolio investAMt={investAMt} cap={capFund} />
// 			</div>
// 		</Container>)
// }