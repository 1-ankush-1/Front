import { Container, Dialog, DialogTitle, DialogContent, TextField, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText } from '@mui/material';
import React, { useState, useEffect, useContext, useCallback } from 'react'
import { postData } from '../../../api/serverServices';
import Pie from '../Graphs/Pie';
import Swal from 'sweetalert2';
import userContext from '../../../context/users/userContext';
// import Bar from '../Graphs/Bar/Bar';
import Saving from './Saving';
//translate
import { useTranslation } from '../../../Translate/i18n';
import MaterialTableSkeleton from '../../assets/SkelTable';
import AllPortfolio from './PortFolios/portfolio';

const Expense = () => {
  //Translate 
  const { t } = useTranslation();

  //Dialog open close state
  const [expense, setExpense] = useState(false);

  //Table Data state - by default it is null
  const [expenseTableData, setExpenseTableData] = useState([{ type: "", amount: null }])

  //State htmlForPie
  const [pieval, setPieval] = useState({ "saving": 0, "expense": 0 });

  //state of Search By Month
  const [dataOfsearch, setDataOfSearch] = useState({ year: "", month: "", total_income: "", TotalExpense: "" })

  //UPDATE EXPENSE
  const [updateExpense, setUpdateExpense] = useState(false);

  //chain this
  const [investAMt, setInvestAmt] = useState(0);

  //total income
  const [totalIncome, setTotalIncome] = useState(0);

  //Array of months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const currentMonth = months[new Date().getMonth()]

  //Function to search Expense
  const getExpenseByMonth = useCallback(async ({ months }) => {
    //getting email from localstorage
    const email = JSON.parse(localStorage.getItem("data"))?.email;

    //change no to string with month array
    const month = months;
    const year = new Date().getFullYear();

    //getting data of current month
    const Data = await postData('searchMonth', { "email": email, "month": month, "year": year })

    if (Data.status) {
      //get saving from data

      //save data in localstorage
      localStorage.setItem("totalIncome", Data.data.totalincome)
      setTotalIncome(Data.data.totalincome)

      const saving = Data.data.totalincome - Data.data.totalexpense;

      const piedata = { "saving": parseInt(saving), "expense": parseInt(Data.data.totalexpense) }

      //setting value of pie
      setPieval(piedata)

      //setting value of search
      setDataOfSearch({ year: Data.data.year, month: Data.data.month, total_income: Data.data.totalincome, TotalExpense: Data.data.totalexpense })

      //setData of table
      setExpenseTableData(Data.data.expensetype)

      //set edit Expense type
      setUpdateVal(Data.data.expensetype);
    }
    else {
      Swal.fire("ADD EXPENSE For this Month . Expense Data does not exist")
    }
  }, [])


  useEffect(() => {
    //passing as a prop the value of current month
    getExpenseByMonth({ "months": currentMonth })
  }, [currentMonth, getExpenseByMonth])

  const monthChange = (e) => {
    // setDataOfSearch({ ...dataOfsearch, [e.target.name]: e.target.value })
    getExpenseByMonth({ "months": e.target.value });
  }

  //To open dialog box of addExpense
  const OpenAddExpense = async () => {

    //check if record exist then give alert
    if (expenseTableData[0]?.type) {
      return Swal.fire("Already Filled data for this month")
    }
    setExpense(true);
  }

  //To close dialog box of addExpense
  const closeAddExpense = () => {
    setExpense(false)
  }

  //To open dialog box of UpdateExpense
  const OpenUpdateExpense = () => {
    //because of update 
    setINP(expenseTableData)
    setUpdateExpense(true);
  }

  //To close dialog box of Update Expense
  const closeUpdateExpense = () => {
    setUpdateExpense(false);
  }

  //data
  const data = [
    { title: t("Expense"), value: pieval.expense, color: '#C13C37', label: t("Expense") },
    { title: t("Saving"), value: pieval.saving, color: '#4DBD74', label: t("Saving") },
  ];

  //ARRAY of expense type
  const expense_type = ["Monthly_Income", "Education_Fee", "House_Rent", "Grocery_Shopping", "Mobile_Electric_Bill", "Medical_Bill", "Others"]

  //STATE of dialog box
  const [inpval, setINP] = useState({})
  const [updateVal, setUpdateVal] = useState([])

  //ONCHANGE of Dialog box of update
  const setdata = (event) => {
    const { name, value } = event.target;
    setUpdateVal((prevState) =>
      prevState.map((item) => {
        if (item.type === name) {
          return { ...item, amount: value };
        }
        return item;
      })
    );
  };
  //ONCHANGE of Dialog box of add
  const changeAddData = (event) => {
    const { name, value } = event.target;
    setINP({ ...inpval, [name]: value })
  }

  //ONSUBMIT of Dialog                  
  const addData = async () => {
    const email = JSON.parse(localStorage.getItem("data")).email
    //sending add data request
    const res = await postData('addexpense', { inpval, email });

    if (res.status) {
      setExpense(false)
      window.location.reload()
      Swal.fire("successfull")
    } else {
      setExpense(false)
      Swal.fire("Failed")
    }
  }

  //UpdateExpense
  const updateDatafunc = async () => {
    const email = JSON.parse(localStorage.getItem("data")).email

    //get month as String
    const month = months[new Date().getMonth()]
    const year = new Date().getFullYear()
    //sending add data request
    const res = await postData('updateexpense', { email, month, year, updateVal, totalIncome })

    if (res.status) {
      setUpdateExpense(false);
      window.location.reload();
      Swal.fire("successfull")
    } else {
      setUpdateExpense(false);
      Swal.fire("Failed")
    }
  }

  //useContext
  const context = useContext(userContext);
  const { age } = context

  return (
    <div style={{ paddingBottom: "40px" }} >


      {/*Find Expense*/}
      <Container sx={{ display: { md: 'flex', xs: 'block' }, paddingTop: "20px" }}>
        <Paper style={{ width: "100%", margin: "5px" }}>
          {/* <div className="card-body"> */}
          <div style={{ display: "flex", justifyContent: "center", textAlign: "center", width: "100%" }}>

            {/*Year*/}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "20px", width: "100%", flexWrap: "wrap" }}>
              <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px " }}>

                <label htmlFor="year" style={{ fontSize: "20px", marginRight: "10px" }}>{t("Year")}</label>
                <input defaultValue={dataOfsearch.year} className='form-control' type="number" name="year" id="year" style={{ fontSize: "19px", width: "135px" }} />
              </div>

              {/* <div style={{ display: "flex", justifyContent: "space-between", borderRadius: "10px 10px  0 0", alignItems: "center", fontSize: "20px" }} className="field1"> */}
              <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px " }}>
                <label htmlFor="month" style={{ fontSize: "20px", marginRight: "10px" }}>{t("Month")}</label>
                {/* </div> */}

                <select value={dataOfsearch.month} className='form-control' id="month" style={{ fontSize: "19px", width: "135px" }} name="month" onChange={monthChange}>
                  <option value="select">Select</option>
                  <option value="Jan">January</option>
                  <option value="Feb">February</option>
                  <option value="Mar">March</option>
                  <option value="Apr">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="Aug">August</option>
                  <option value="Sept">September</option>
                  <option value="Oct">October</option>
                  <option value="Nov">November</option>
                  <option value="Dec">December</option>
                </select>
              </div>


              {/* <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 5px 5px 20px", margin: "2px", alignItems: "center", width: "25vw", fontSize: "20px", }} className="field1"> */}
              <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px " }}>
                <label htmlFor="income" style={{ fontSize: "20px", marginRight: "10px" }}>{t("Monthly_Income")}</label>
                <input defaultValue={dataOfsearch.total_income} className='form-control' title='Enter you Income' type="number" name="income" id="income" style={{ fontSize: "19px", width: "135px" }} placeholder="0" readOnly />
              </div>


              {/* <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 5px 5px 20px", margin: "2px", alignItems: "center", width: "25vw", fontSize: "20px", }} className="field1"> */}
              <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px " }}>
                <label htmlFor="expense" style={{ fontSize: "20px", marginRight: "10px" }}>{t("Expense")}</label>
                <input defaultValue={dataOfsearch.TotalExpense} className='form-control' title='Enter you Expense' type="number" name="expense" id="expense" style={{ fontSize: "19px", width: "135px" }} placeholder="0" readOnly />
              </div>
            </div>
          </div>

        </Paper>
      </Container>
      {/*End Expense*/}

      {/*type table*/}
      <Container sx={{ display: { md: 'flex', xs: 'block' } }}>
        {/*Pie chart card*/}
        <div style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "40px" }}>
          <Pie data={data} />
        </div>


       
        {/*Expense Table Card*/}
        <div style={{ width: "100%", margin: "5px" }}>
          <div >
          {!!expenseTableData[0]?.amount ?
            <div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography style={{ fontWeight: 'bold', fontSize: '1.2rem', }}>{t("Expense_Type")}</Typography>
                      </TableCell>
                      <TableCell><Typography style={{ fontWeight: 'bold', fontSize: '1.2rem', }}>{t("Amount")}</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expenseTableData.map((el, i) => (
                      <TableRow key={i}>
                        <TableCell>{el.type}</TableCell>
                        <TableCell>{el.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            :<MaterialTableSkeleton/>}

            {/*To Add Expense Button*/}
            <div style={{ display: "flex", justifyContent: "space-evenly", margin: "5px" }}>
              <Button style={{ width: "140px", }} type="button" onClick={OpenUpdateExpense} variant="contained">{t("Edit_Expense")}</Button>
              <Button style={{ width: "140px" }} type="button" variant="contained" onClick={OpenAddExpense}>{t("Add_Expense")}</Button>
            </div>

          </div>
        </div>
      </Container>

      {/* <Container style={{ display: "flex", justifyContent: "center", marginBottom: '30px', marginTop: '10px', padding: '10px' }} className='container'>
        <h4><span style={{ fontSize: "1.8rem" }}> Note:  For Educational Purpose</span></h4>
      </Container> */}

      {/*saving and About caps*/}
      <Container sx={{ display: { md: 'flex', xs: 'block' } }}>
        <Saving saving={pieval.saving} age={age} setInvestAmt={setInvestAmt} />
        <div style={{ width: "100%", margin: "5px" }}>
          <div >
          </div>
          <List>
            <ListItem>
              <ListItemText primary={t("Small_Cap")} secondary={t("Small_Cap_Info")} />
            </ListItem>
            <ListItem>
              {age < 35 ? <ListItemText primary={t("Mid_Cap")} secondary={t("Mid_Cap_Info")} /> :
                <ListItemText primary={t("Large_Cap")} secondary={t("Large_Cap_Info")} />}
            </ListItem>
            <ListItem>
              <ListItemText primary={t("Gold")} secondary={t("Gold_Info")} />
            </ListItem>
            <ListItem>
              <ListItemText primary={t("Debt")} secondary={t("Debt_Info")} />
            </ListItem>
          </List>
          {/* <iframe title="alldata" src="https://s.tradingview.com/goldprice/widgetembed/?frameElementId=tradingview_1727e&symbol=TVC%3AGOLD&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f5f5f5&watchlist=TVC%3AGOLD%1FTVC%3ASILVER%1FTVC%3APLATINUM%1FTVC%3APALLADIUM%1FTVC%3AGOLDSILVER%1FTVC%3AUSOIL%1FOANDA%3AEURUSD%1FFX_IDC%3AUSDJPY%1FINDEX%3AHUI%1FINDEX%3AXAU%1FCOINBASE%3ABTCUSD&details=1&studies=%5B%5D&hideideas=1&theme=White&style=1&timezone=America%2FNew_York&hideideasbutton=1&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=goldprice.org&utm_medium=widget&utm_campaign=chart&utm_term=TVC%3AGOLD#%7B%22page-uri%22%3A%22goldprice.org%2F%22%7D" style={{ width: "600px", height: "340px" }}></iframe> */}
        </div>
      </Container>

      {investAMt && <AllPortfolio investAMt={investAMt}/> }

      {/*Container for bar and data of fund and stocks*/}
      {/* <Container>
        <Bar investAMt={investAMt} />
      </Container> */}
      {/*GOLD*/}
      {/* <Container >
        <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          <h2>GOLD</h2 >
          <iframe title="gold" src="https://goldbroker.com/widget/live/XAU?currency=INR&height=320&weight_unit=g" style={{ width: "100%", height: "300px" }}>GoldBroker.com</iframe>
        </div>
      </Container> */}
      {/* <Container>
      <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          <h2>STOCKS</h2 >
      <iframe id="tradingview_c37b5" name="tradingview_c37b5" src="https://www.moneycontrol.com/mc/assets/js/charting_library-v22/charting_library/en-tv-chart.e2a841ff.html#symbol=BIRLACORPN&ampinterval=D&ampwidgetbar=%7B%22details%22%3Afalse%2C%22watchlist%22%3Afalse%2C%22watchlist_settings%22%3A%7B%22default_symbols%22%3A%5B%5D%7D%7D&amptimeFrames=%5B%7B%22text%22%3A%221D%22%2C%22resolution%22%3A%221%22%7D%2C%7B%22text%22%3A%225D%22%2C%22resolution%22%3A%225%22%7D%2C%7B%22text%22%3A%221M%22%2C%22resolution%22%3A%2230%22%7D%2C%7B%22text%22%3A%223M%22%2C%22resolution%22%3A%2260%22%7D%2C%7B%22text%22%3A%226M%22%2C%22resolution%22%3A%221D%22%7D%2C%7B%22text%22%3A%221Y%22%2C%22resolution%22%3A%221D%22%7D%2C%7B%22text%22%3A%225Y%22%2C%22resolution%22%3A%22W%22%7D%2C%7B%22text%22%3A%22100y%22%2C%22resolution%22%3A%22M%22%2C%22description%22%3A%22Max%22%2C%22title%22%3A%22Max%22%7D%5D&amplocale=en&ampuid=tradingview_c37b5&ampclientId=stock.moneycontrol.com&ampuserId=Ym05MWMyVnlMVGN3ZUdoMGJUSTFZamwyTmpWa04yND0%3D&ampchartsStorageUrl=https%3A%2F%2Fwww.moneycontrol.com%2Fadvance-chart&ampchartsStorageVer=1.1&ampcustomCSS=https%3A%2F%2Fwww.moneycontrol.com%2Fmc%2Fassets%2Fcss%2Ftrading-chart.css&ampautoSaveDelay=1&ampdebug=false&amptimezone=Asia%2FKolkata" title="Financial Chart"  allowtransparency="true"  allowFullScreen style={{display: "block", width: "100%", height: "100%"}}></iframe>
      </div>
      </Container> */}
     

      {/*Dialog Box of AddExpense*/}
      <Dialog open={expense} onClose={closeAddExpense}>
        <DialogTitle variant='h5' sx={{ fontWeight: 'bold' }} fontFamily='Sans-serif' align="center">Expense details</DialogTitle>
        <DialogContent>
          <hr />
          {expense_type.map((item, i) => {
            return (
              <TextField
                autoFocus
                key={i}
                margin="dense"
                id={item}
                label={item}
                type="number"
                fullWidth
                variant="standard"
                name={item}
                defaultValue={0}
                value={inpval.item}
                onChange={changeAddData}
              />
            )
          })}

          <Button style={{ marginTop: '30px' }} variant="contained" onClick={addData} fullWidth >Add Expense</Button>

        </DialogContent>

      </Dialog>

      {/*Dialog box update Expense*/}
      <Dialog open={updateExpense} onClose={closeUpdateExpense}>
        <DialogTitle variant='h5' sx={{ fontWeight: 'bold' }} fontFamily='Sans-serif' align="center">Expense details</DialogTitle>
        <DialogContent>
          <hr />
          <TextField autoFocus
            margin="dense"
            label="Monthly income"
            type="number"
            fullWidth
            variant="standard"
            name="Total income"
            value={totalIncome}
            onChange={(e) => {
              setTotalIncome(
                e.target.value
              )
            }}
          >
          </TextField>
          {updateVal?.map((item, i) => {
            return (
              <TextField
                autoFocus
                key={i}
                margin="dense"
                label={item.type}
                type="number"
                fullWidth
                variant="standard"
                name={item.type}
                value={item.amount}
                onChange={setdata}
              />
            );
          })}

          <Button style={{ marginTop: '30px' }} variant="contained" onClick={updateDatafunc} fullWidth >Update Expense</Button>

        </DialogContent>

      </Dialog>

    </div>
  )
}

export default Expense