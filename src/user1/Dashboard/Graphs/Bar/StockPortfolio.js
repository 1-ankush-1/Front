import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

export const StockPortfolio = (props) => {
	return (<>
		<TableContainer >
			<Table >
				<TableHead>
					<TableRow>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>Company Name</Typography></TableCell>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>change%</Typography></TableCell>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>Price(per share)</Typography></TableCell>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>Invest</Typography></TableCell>
						<TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.1rem', }}>Stocks Quantity</Typography></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.cap.company?.map((data, i) => (
						<TableRow key={i}>
							<TableCell>{data}</TableCell>
							<TableCell>{props.cap.returns[i]}</TableCell>
							<TableCell>{Math.round(props.cap.price[i])}</TableCell>
							<TableCell>{props.cap.amtInvested[i]}</TableCell>
							<TableCell>{props.cap.quantity[i]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
		<Typography>{`Left AMT ${props.cap.amtLeft.toFixed(2)}`}</Typography>
	</>)
}

