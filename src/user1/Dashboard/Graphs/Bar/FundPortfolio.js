import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

export const FundPortfolio = (props) => {

	//The NAV (on a per-share basis) represents .

	return (<>
		<TableContainer >
			<Table >
				<TableHead>
					<TableRow>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>Company Name</Typography></TableCell>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>change%</Typography></TableCell>
						<TableCell title="the price at which investors can buy or sell units of the fund"><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>NAV(per share)</Typography></TableCell>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>Invest(Min ₹5000)</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.cap.company?.map((data, i) => (
						<TableRow key={i} style={{background: props.cap?.invest[i]=== "yes" && "#4DBD74"}}>
							<TableCell>{data}</TableCell>
							<TableCell>{props.cap.returns[i]}</TableCell>
							<TableCell>{props.cap?.price[i]}</TableCell>
							<TableCell>{props.cap?.invest[i]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</>)
}

export default FundPortfolio;