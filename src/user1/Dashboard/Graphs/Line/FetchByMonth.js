import { useCallback, useEffect, useMemo, useState } from "react"
import { postData } from "../../../../api/serverServices"
import Line from "./line"
import { useContext } from "react"
import userContext from '../../../../context/users/userContext';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
//translate
// import { useTranslation } from '../../../../Translate/i18n';
import Swal from "sweetalert2";

const FetchByMonth = () => {

    //Translate 
    // const { t } = useTranslation();

    //useContext
    const context = useContext(userContext);
    const { age } = context

    const memoizedAge = useMemo(() => {
        return age;
    }, [age]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const date = new Date();
    const currentMonth = monthNames[date.getMonth()];
    const currentYear = date.getFullYear();

    function generateRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //STOCKS CODE
    const [stocksLabels, setStockLabels] = useState([])
    const [smallStock, setSmallStock] = useState([])
    const [midStock, setMidStock] = useState([])
    const [largeStock, setLargeStock] = useState([])

    const devideDataStock = useCallback((data) => {
        return data?.map((item) => {
            const color = generateRandomColor();
            return {
                label: item.name,
                backgroundColor: color + "33", // Add alpha value to the color for transparency
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: "#fff",
                data: item.data
            }
        });
    }, [])

    //useCallback return a memoized version of the callback function that only changes if one of the dependencies has changed(like a cache)
    const getmonthlyChangedataStock = useCallback(async ({ months, year }) => {
        const data = await postData("getmonthlystock", { email: JSON.parse(localStorage.getItem("data")).email, dob: JSON.parse(localStorage.getItem("data")).dateofbirth, month: months, year: year })

        // console.log(data.Time)
        if (data.status) {
            setDataOfSearch({ year: data.Time.year, month: data.Time.month })
            setStockLabels(data.days)
            const smallSet = devideDataStock(data.data.small)
            setSmallStock(smallSet)
            const midSet = devideDataStock(data.data.mid)
            setMidStock(midSet)
            const largeSet = devideDataStock(data.data.large)
            setLargeStock(largeSet)
        }
        else {
            setDataOfSearch(prevState => ({
                ...prevState,
                month: currentMonth,
                year: currentYear
              }));
            Swal.fire("No Stock found")
        }

    }, [devideDataStock, currentMonth, currentYear])

    //FUND CODE
    const [fundsLabels, setFundLabels] = useState([])
    const [smallFund, setSmallFund] = useState([])
    const [midFund, setMidFund] = useState([])
    const [largeFund, setLargeFund] = useState([])


    const devideDataFund = useCallback((data) => {
        return data?.map((item) => {
            const color = generateRandomColor();
            return {
                label: item.name,
                backgroundColor: color + "33", // Add alpha value to the color for transparency
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: "#fff",
                data: item.data
            }
        });
    }, [])


    const getmonthlyChangedataFund = useCallback(async ({ months = currentMonth, year }) => {
        const data = await postData("getmonthlyfund", { email: JSON.parse(localStorage.getItem("data")).email, dob: JSON.parse(localStorage.getItem("data")).dateofbirth, month: months, year: year })

        // console.log(data.Time)
        if (data.status) {
            setDataOfSearch({ year: data.Time.year, month: data.Time.month })
            setFundLabels(data.days)
            const smallSet = devideDataFund(data.data.small)
            setSmallFund(smallSet)
            const midSet = devideDataFund(data.data.mid)
            setMidFund(midSet)
            const largeSet = devideDataFund(data.data.large)
            setLargeFund(largeSet)
        }
        else {
            setDataOfSearch(prevState => ({
                ...prevState,
                month: currentMonth,
                year: currentYear
              }));
            Swal.fire("No Fund found")
        }

    }, [devideDataFund, currentMonth, currentYear])

    useEffect(() => {
        //first update data
        getmonthlyChangedataStock({ "months": currentMonth, "year": currentYear })
        getmonthlyChangedataFund({ "months": currentMonth, "year": currentYear })

    }, [currentMonth, currentYear, getmonthlyChangedataFund, getmonthlyChangedataStock]);


    //state of Search By Month
    const [dataOfsearch, setDataOfSearch] = useState({ year: "", month: "" })

    const TimeChange = (e) => {
        // setDataOfSearch({ ...dataOfsearch, [e.target.name]: e.target.value })
        setDataOfSearch({ ...dataOfsearch, [e.target.name]: e.target.value })
    }

    // console.log(dataOfsearch.month)

    return (
        <>
            {/*Search By month*/}
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '40px', overflowX: 'auto' }}>
                <FormControl style={{ margin: '10px', minWidth: '100px' }}>
                    <InputLabel id='month-label'>Month</InputLabel>
                    <Select
                        labelId='month-label'
                        id='month'
                        name="month"
                        value={dataOfsearch.month}
                        onChange={TimeChange}
                    >
                        <MenuItem value='Jan'>January</MenuItem>
                        <MenuItem value='Feb'>February</MenuItem>
                        <MenuItem value='Mar'>March</MenuItem>
                        <MenuItem value='Apr'>April</MenuItem>
                        <MenuItem value='May'>May</MenuItem>
                        <MenuItem value='June'>June</MenuItem>
                        <MenuItem value='July'>July</MenuItem>
                        <MenuItem value='Aug'>August</MenuItem>
                        <MenuItem value='Sept'>September</MenuItem>
                        <MenuItem value='Oct'>October</MenuItem>
                        <MenuItem value='Nov'>November</MenuItem>
                        <MenuItem value='Dec'>December</MenuItem>
                    </Select>
                </FormControl>
                <FormControl style={{ margin: '10px', minWidth: '100px' }}>
                    <TextField
                        id='year'
                        label='Year'
                        name="year"
                        type='number'
                        value={dataOfsearch.year}
                        onChange={TimeChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </FormControl>
                <Button variant='contained' style={{ margin: '10px' }} onClick={() => {getmonthlyChangedataStock({ months: dataOfsearch.month, year: dataOfsearch.year });getmonthlyChangedataFund({ months: dataOfsearch.month, year: dataOfsearch.year })}}>
                    Search
                </Button>
            </Container>

            {/*Stocks*/}
            <h2 style={{ textAlign: "center" }}>Stocks</h2>
            <Container sx={{ display: { md: 'flex', xs: 'block' } }}>
                {/*Pie chart card*/}
                <div style={{ width: "100%", margin: "5px" }}>
                    {/* <h3 style={{ textAlign: "center" }}>SmallCap</h3 > */}
                    <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                        <Line labels={stocksLabels} datasets={smallStock} />
                    </div>
                </div>

                <div style={{ width: "100%", margin: "5px" }}>
                    {memoizedAge < 35 ?
                        <>
                            {/* <h3 style={{ textAlign: "center" }}>MidCap</h3 > */}
                            <Line labels={stocksLabels} datasets={midStock} />
                        </> :
                        <>
                            {/* <h3 style={{ textAlign: "center" }}>LargeCap</h3> */}
                            <Line labels={stocksLabels} datasets={largeStock} />
                        </>
                    }
                </div>
            </Container>

            {/*Fund*/}
            <h2 style={{ textAlign: "center" }}>Funds</h2>
            <Container sx={{ display: { md: 'flex', xs: 'block' } }}>
                {/*Pie chart card*/}
                <div style={{ width: "100%", margin: "5px" }}>
                    {/* <h3 style={{ textAlign: "center" }}>SmallCap</h3 > */}
                    <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                        <Line labels={fundsLabels} datasets={smallFund} />
                    </div>
                </div>

                <div style={{ width: "100%", margin: "5px" }}>
                    {memoizedAge < 35 ?
                        <>
                            {/* <h3 style={{ textAlign: "center" }}>MidCap</h3 > */}
                            <Line labels={fundsLabels} datasets={midFund} />
                        </> :
                        <>
                            {/* <h3 style={{ textAlign: "center" }}>LargeCap</h3> */}
                            <Line labels={fundsLabels} datasets={largeFund} />
                        </>
                    }
                </div>
            </Container>


        </>)
}

export default FetchByMonth;