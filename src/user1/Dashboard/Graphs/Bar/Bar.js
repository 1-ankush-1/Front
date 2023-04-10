import React, { useState, useEffect, useContext } from 'react';
import userContext from '../../../../context/users/userContext';
import { postData } from '../../../../api/serverServices';
// import { useTranslation } from '../../../../Translate/i18n';
import { Container, Typography } from '@mui/material';
import { StockInvest, FundInvest } from './Structure';
import Stocks, { CalcStock } from './CalculateNoOfStocks';
import Loading from '../../../assets/Loading';
import { StockPortfolio } from './StockPortfolio';
import CalcFund from './FundCalculator';
import FundPortfolio from './FundPortfolio';

export default function Bar({ investAMt }) {
	//translate
	// const { t } = useTranslation();

	//TO get age
	const context = useContext(userContext)
	const { age } = context


	//Stock
	const [smallcap, setSmallCap] = useState({})
	const [midcap, setMidcap] = useState({})
	const [largecap, setLargecap] = useState({})

	//Fund
	const [smallcapFund, setSmallCapFund] = useState({})
	const [midcapFund, setMidcapFund] = useState({})
	const [largecapFund, setLargecapFund] = useState({})


	//set stocks
	function ChangeStock(res, name) {
		//if object is empty return
		if (Object.keys(res).length === 0) {
			return
		}
		let data = { company: [], returns: [], price: [] }
		//getting company name and its percentage change per day
		if (res.data) {
			for (let i = 0; i < res.data.length; i++) {
				const el = res.data[i];
				data.company.push(el[0]);
				data.price.push(parseFloat(el[1]));
				data.returns.push(parseFloat(el[2]));
			}
		}
		//setting data in state
		if (name === "small") { setSmallCap(data); } else if (name === "mid") { setMidcap(data); } else { setLargecap(data); }
	}


	//setFund
	function ChangeFund(res, name) {
		//if object is empty return
		if (Object.keys(res).length === 0) {
			return
		}

		let data = { company: [], returns: [], price: [] }
		if (res.data) {
			for (let i = 0; i < res.data.length; i++) {
				const el = res.data[i];
				const company = el[0].slice(0, el[0].indexOf("Cap"));
				if (company !== "") {
					data.company.push(company);
					data.price.push(parseFloat(el[2]));
					data.returns.push(parseFloat(el[3]));
				}
			}
		}
		//setting state
		if (name === "small") {
			setSmallCapFund(data)
		} else if (name === "mid") {
			setMidcapFund(data)
		} else {
			setLargecapFund(data)
		};
	}

	useEffect(() => {
		//STOCK Exchange
		const GetStock = async () => {
			//sending dob and email as request
			const result = await postData('getstock', { dob: JSON.parse(localStorage.getItem("data"))?.dateofbirth, email: JSON.parse(localStorage.getItem("data"))?.email })
			// console.log(result.data) check if it is an array or object
			const small = Array.isArray(result.data) ? JSON.parse(result.data[0].smallcap) : JSON.parse(result.data.smallcap)
			const mid = Array.isArray(result.data) ? JSON.parse(result.data[0].midcap) : JSON.parse(result.data.midcap)
			const large = Array.isArray(result.data) ? JSON.parse(result.data[0].largecap) : JSON.parse(result.data.largecap)
			//to changeStock
			ChangeStock(small, "small");
			ChangeStock(mid, "mid")
			ChangeStock(large, "large")

		}
		//first update data
		GetStock();
		//Mutual Fund
		const GetFund = async () => {
			const result = await postData('getfund', { dob: JSON.parse(localStorage.getItem("data"))?.dateofbirth, email: JSON.parse(localStorage.getItem("data"))?.email })
			const small = Array.isArray(result.data) ? JSON.parse(result.data[0].smallcap) : JSON.parse(result.data.smallcap)
			const mid = Array.isArray(result.data) ? JSON.parse(result.data[0].midcap) : JSON.parse(result.data.midcap)
			const large = Array.isArray(result.data) ? JSON.parse(result.data[0].largecap) : JSON.parse(result.data.largecap)
			ChangeFund(small, "small");
			ChangeFund(mid, "mid")
			ChangeFund(large, "large")
		}
		GetFund();
	}, [])   // if we add dependency age than it will call two times

	/*-----------------------------------------------------------Data of Average Percentage Of Stocks----------------------------------*/
	const AmtToInvest = 0.50 * investAMt > 5000 ? 0.25 * investAMt + Math.floor(((0.50 * investAMt) % 5000) / 2) : 0.50 * investAMt;

	const amt = [
		Math.round(AmtToInvest * 0.3),
		Math.round(AmtToInvest * 0.25),
		Math.round(AmtToInvest * 0.25),
		Math.round(AmtToInvest * 0.1),
		Math.round(AmtToInvest * 0.1)
	];

	// const CalculateMergeData = (FirstData, SecondData) => {
	// 	const percentage = (parseFloat(FirstData.averagePercentage) + parseFloat(FirstData.averagePercentage)) / 2
	// 	const Left = parseInt(FirstData.amtLeft + SecondData.amtLeft)
	// 	const TotalAmt = FirstData.AmtInvested + SecondData.AmtInvested + Left
	// 	const data = { percentage, TotalAmt, Left }
	// 	return data
	// }

	const FirstData = Stocks(AmtToInvest, amt, smallcap)
	const SecondData = age < 35 ? Stocks(AmtToInvest, amt, midcap) : Stocks(AmtToInvest, amt, largecap)
	const MergeData = CalcStock(FirstData, SecondData)
	// const ResultantAmt = Math.round( MergeData.AmtInvested * ((MergeData.averagePercentage > 0) ? (1 + MergeData.averagePercentage / 100) : (1 - Math.abs(MergeData.averagePercentage / 100)))+MergeData.amtLeft)
	// const percentageDiff = ((ResultantAmt - MergeData.Total_Amt) / MergeData.Total_Amt) * 100;
	// console.log(MergeData)

	//get date
	const date = new Date();
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const month = monthNames[date.getMonth()];
	const day = date.getDate().toString().padStart(2, '0');
	const year = date.getFullYear().toString();
	// const hours = date.getHours().toString().padStart(2, '0');
	// const minutes = date.getMinutes().toString().padStart(2, '0');

	/*-----------------------------------------------------------Data of Average Percentage Of Funds----------------------------------*/
	const InvestFund = CalcFund((0.50 * investAMt), smallcapFund, age <= 35 ? midcapFund : largecapFund)
	// console.log(InvestFund)

	/*-----------------------------------------------------------Total of Fund and Stocks----------------------------------*/
	//the amt gain from InvestFund
	const val1 = (InvestFund.Percentage / 100) * InvestFund.TotalAmt
	// console.log((InvestFund.Percentage / 100 )* InvestFund.TotalAmt)
	//the amt gain from MergeData
	const val2 = (MergeData.percentageDiff / 100) *  MergeData.ResultantAmt
	// console.log((MergeData.percentageDiff / 100) *  MergeData.Total_Amt)
	
	//Total percental of total income
	const TotalPercentage = ((val1 + val2) / investAMt) * 100
	// console.log(investAMt * (1 + TotalPercentage / 100))
	//finding total amt gain or loss
	const Totalgain = investAMt * (TotalPercentage > 0 ? (1 + TotalPercentage / 100) : (1 - Math.abs(TotalPercentage / 100)))

	//below only one condition if age is gt 35 display large else display mid 
	return (
		<div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
			<h2 style={{ fontSize: "1.6rem" }}>Portfolio</h2 >
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<div>
					<div>
						<Typography variant="h6">
							Amount Invested:{parseInt(investAMt).toLocaleString()}
						</Typography>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Typography style={{ marginRight: '4px' }}>
							{TotalPercentage.toFixed(2)}%
						</Typography>
						{TotalPercentage >= 0 ?
							(<div style={{ width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid green' }} />)
							: (<div style={{
								width: '0',
								height: '0',
								borderLeft: "8px solid transparent",
								borderRight: "8px solid transparent",
								borderTop: "8px solid #f00"
							}} />
							)}
					</div>
					<div>
						<Typography variant="h6">
							Amount:{Math.round(Totalgain).toLocaleString()}
						</Typography>
					</div>
					<Typography>
						{`${day} ${month}, ${year} `}
					</Typography>
				</div>
			</div>
			<div style={{ marginTop: "30px" }}>
				<h2 style={{ fontSize: "1.6rem" }}>Stocks Portfolio</h2 >
				{MergeData.hasOwnProperty("company") ?
					(<div>
						<Container sx={{ display: { md: 'flex', xs: 'block' } }}>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
								<div>
									<div>
										<Typography variant="h6">
											Amount Invested:{parseInt(MergeData.Total_Amt).toLocaleString()}
										</Typography>
									</div>
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<Typography style={{ marginRight: '4px' }}>
											{MergeData.percentageDiff.toFixed(2)}%
										</Typography>
										{MergeData.percentageDiff >= 0 ?
											(<div style={{ width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid #4DBD74' }} />)
											: (<div style={{
												width: '0',
												height: '0',
												borderLeft: "8px solid transparent",
												borderRight: "8px solid transparent",
												borderTop: "8px solid #f00"
											}} />
											)}
									</div>
									<div>
										<Typography variant="h6">
											Amount:{MergeData.ResultantAmt.toLocaleString()}
										</Typography>
								
									</div>
									<Typography>
										{`${day} ${month}, ${year} `}
									</Typography>
								</div>
							</div>

							<div style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px" }}>
								{/* <Typography style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>SMALLCAP </Typography>   1/4amt + (1/4(this return ex-value is 17000 return 2000))/ divide this by 2 31850 *0.25 = 7962.5 + (15925%5000 = 925)/2 = 8424 */}
								<StockInvest type="small" cap={MergeData} />
							</div>
						</Container>
						<div >
							<StockPortfolio cap={MergeData} />        {/*giving compnay data and 1/4th of investment amount(not include gold and debt amount)*/}
						</div>
						
					</div>)
					:
					(
						<Loading />
					)}
			</div>

			<div style={{ marginTop: "30px" }}>
				<h2 style={{ fontSize: "1.6rem" }}>Funds Portfolio</h2 >
				{InvestFund.hasOwnProperty("company") ?
					(<>
						<Container sx={{ display: { md: 'flex', xs: 'block' } }}>
							<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "100%" }}>
								<div>
									<div>
										<Typography variant="h6">
											Amount Invested:{InvestFund.TotalAmt.toLocaleString()}
										</Typography>
									</div>
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
										<Typography style={{ marginRight: '4px' }}>
											{InvestFund.Percentage.toFixed(2)}%
										</Typography>
										{InvestFund.Percentage >= 0 ?
											(<div style={{ width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderBottom: '14px solid green' }} />)
											: (<div style={{
												width: '0',
												height: '0',
												borderLeft: "8px solid transparent",
												borderRight: "8px solid transparent",
												borderTop: "8px solid #f00"
											}} />)}
									</div>
									<div>
										<Typography variant="h6">
											Amount:{InvestFund.AmtAfterGains.toLocaleString()}
										</Typography>
									</div>

									<Typography>
										{`${day} ${month}, ${year} `}
									</Typography>
								</div>
							</div>

							<div style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20px" }}>
								{/* <Typography style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>SMALLCAP </Typography>   1/4amt + (1/4(this return ex-value is 17000 return 2000))/ divide this by 2 31850 *0.25 = 7962.5 + (15925%5000 = 925)/2 = 8424 */}
								<FundInvest type="small" cap={InvestFund} />
							</div>
						</Container>
						<div style={{ width: "100%", margin: "5px" }}>
							<FundPortfolio cap={InvestFund} />        {/*giving compnay data and 1/4th of investment amount(not include gold and debt amount)*/}
						</div>
					</>
					)
					:
					(
						<Loading />
					)}
			</div>
		</div >);
}
