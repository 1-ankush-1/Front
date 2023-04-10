import React, { useState } from 'react';
import { InputLabel, MenuItem, FormControl, Select, Button, Box, TextField } from '@mui/material'

const Calculator = () => {

  //STATES of Dialog Box
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPayer, setSelectedPayer] = useState('');
  const [section_115BAC, setSection_115BAC] = useState(true)
  const [selectedCategary, setSelectedcategary] = useState('');
  const [selectedResidental, setSelectedResidental] = useState('');
  const [newregime, setNewRegime] = useState(true);

  //DATA
  const year = ['2022-23', '2021-22', '2020-21', '2019-20', '2018-19', '2017-18', '2016-17', '2015-16', '2014-15', '2013-14', '2012-13']
  const payer = ['Individual', 'HUF', 'AOPs/BOI', 'Domestic company', 'Foreign company', 'Firms', 'LLP', 'Co-operative society']
  const categories = ['Male', 'Female', 'Senior Citizen', 'Super Senior Citizen']
  const residental = ['Resident', 'Non-Resident', 'Non-ordinary Resident']

  //handel change for regieme
  function handleOldregime() {
    setNewRegime(false);
  }

  //handel change for regieme
  function handleNewregime() {
    setNewRegime(true);
    //by default 115Bac is true
    setSection_115BAC(true);
  }

  //handel change for year
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  //handel change for Payer
  const handlePayerChange = (e) => {
    setSelectedPayer(e.target.value);
  };

  //handel change for Section
  function handleSectionChange() {
    setSection_115BAC(!section_115BAC);
  }

  //handel change for Category
  function handleCategoryChange(e) {
    setSelectedcategary(e.target.value)
  }

  //handel chnage for residental
  function handleResidentalChange(e) {
    setSelectedResidental(e.target.value)
  }

  //STATES of text box
  const [income, setIncome] = useState(0);
  const [otherSource, SetOtherSource] = useState(0)
  const [deductions, setDeductions] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [Surcharge, SetSurcharge] = useState(0);
  const [Cess, SetCess] = useState(0);
  const [Tax, SetTax] = useState(0);

  //handel change of Income
  function handleIncomeChange(e) {
    setIncome(parseInt(e.target.value));
  }

  //handel change of deduction
  function handleDeductionsChange(e) {
    setDeductions(parseInt(e.target.value));
  }

  function handleOtherSourceChange(e) {
    SetOtherSource(parseInt(e.target.value));
  }


  //Regieme
  function calculateTax() {
    if (income > 0) {
      //standard deduction applicable on all types of tax after 20 it is 50000 in before 20 it is 0 in 20 400000
      const standard_deduction = (parseInt(selectedYear.slice(-2)) > 20) ? 50000 : (parseInt(selectedYear.slice(-2)) === 20) ? 40000 : 0;

      let surcharge = 0;
      let cess = 0;
      let tax, taxable = 0;

      //new tax regieme
      if (newregime) {
        let { subtax, subtaxable } = NewTax({ standard_deduction })
        tax = subtax;
        taxable = subtaxable;

        //rebate according to 87A applied on net income before education cess
        if (taxable <= 700000) {

          if (tax <= 25000) {
            tax = 0;
          }
          else {
            tax = tax - 25000;
          }
        }
      }
      //old tax regieme
      else {

        if (selectedPayer === 'Individual' && selectedResidental === 'Resident') {
          if (section_115BAC === true || selectedCategary === 'Male' || selectedCategary === 'Female') {
            let { subtax, subtaxable } = IndividualTax({ standard_deduction });
            tax = subtax;
            taxable = subtaxable;
          }                                                 //because super senior added in 21
          else if (selectedCategary === 'Senior Citizen' || (parseInt(selectedYear.slice(-2)) > 21)) {
            let { subtax, subtaxable } = SeniorTax()
            tax = subtax;
            taxable = subtaxable;
          }
          else if (selectedCategary === 'Super Senior Citizen') {
            let { subtax, subtaxable } = SuperTax()
            tax = subtax;
            taxable = subtaxable;
          }
        }

        //rebate according to 87A applied on net income before education and health cess
        if (taxable <= 500000) {

          if (tax <= 12500) {
            tax = 0;
          }
          else {
            tax = tax - 12500;
          }
        }
      }

      //set tax 
      SetTax(tax);

      //surcharge - if after reduction income is more than 50lakh(2022 - 37% in 2023 - 25%)
      if ((parseInt(selectedYear.slice(-2)) < 23)) {
        if (taxable > 5000000 && taxable <= 10000000) {
          surcharge = tax * 0.10;
        } else if (taxable > 10000000 && taxable <= 20000000) {
          surcharge = tax * 0.15;
        } else if (taxable > 20000000 && taxable <= 50000000) {
          surcharge = tax * 0.25;
        } else if (taxable > 50000000) {
          surcharge = tax * 0.37;
        }
      }
      else {
        if (taxable > 5000000 && taxable <= 10000000) {
          surcharge = tax * 0.10;
        } else if (taxable > 10000000 && taxable <= 20000000) {
          surcharge = tax * 0.15;
        } else if (taxable > 20000000) {
          surcharge = tax * 0.25;
        }
      }

      //set surcharge
      SetSurcharge(surcharge);
      // console.log("tax :", tax, surcharge)

      //calculating Heath and education cess 4%
      cess = (tax + surcharge) * 0.04;

      //set cess
      SetCess(cess)

      //total tax - tax on taxable income + surcharge
      const totalTax = tax + surcharge + cess;

      //settotal tax
      setTaxAmount(totalTax);
    }
  }


  //INDIVIDUAL FUNCTION
  function IndividualTax({ standard_deduction }) {
    //taxable income after deduction
    let subtaxable = income + otherSource;

    //set taxable income
    setTaxableIncome(subtaxable);

    let subtax = 0;

    //if follow section_115BAC  - before standard deduction
    if (section_115BAC === true) {
      console.log(subtaxable, deductions)
      subtaxable = subtaxable - deductions;

      //set taxable income
      setTaxableIncome(subtaxable);

      if (subtaxable <= 250000) {
        subtax = 0;
      } else if (subtaxable > 250000 && subtaxable <= 500000) {
        subtax = (subtaxable - 250000) * 0.05;
      } else if (subtaxable > 500000 && subtaxable <= 750000) {
        subtax = 12500 + (subtaxable - 500000) * 0.10;
      } else if (subtaxable > 750000 && subtaxable <= 1000000) {
        subtax = 37500 + (subtaxable - 750000) * 0.15;
      } else if (subtaxable > 1000000 && subtaxable <= 1250000) {
        subtax = 75000 + (subtaxable - 1000000) * 0.20;
      } else if (subtaxable > 1250000 && subtaxable <= 1500000) {
        subtax = 125000 + (subtaxable - 1250000) * 0.25;
      } else if (subtaxable > 1500000) {
        subtax = 187500 + (subtaxable - 1500000) * 0.30;
      }

    }
    else {

      console.log(subtaxable, standard_deduction, deductions)
      //taxable income after deduction
      subtaxable = (subtaxable - standard_deduction) - deductions;

      //set taxable income
      setTaxableIncome(subtaxable);

      //tax - tax on how much more money than limit                                  
      if (subtaxable <= 250000) {
        subtax = 0;
      } else if (subtaxable > 250000 && subtaxable <= 500000) {
        subtax = (subtaxable - 250000) * 0.05;
      } else if (subtaxable > 500000 && subtaxable <= 1000000) {
        subtax = 12500 + (subtaxable - 500000) * 0.20;
      } else if (subtaxable > 1000000) {
        subtax = 112500 + (subtaxable - 1000000) * 0.30;
      }
    }
    //return tax and netTaxable income
    return { subtaxable, subtax };
  }

  //senier
  function SeniorTax() {
    const subtaxable = income - deductions;
    setTaxableIncome(subtaxable);

    let subtax = 0;

    if (subtaxable <= 300000) {
      subtax = 0;
    } else if (subtaxable > 300000 && subtaxable <= 500000) {
      subtax = (subtaxable - 300000) * 0.05;
    } else if (subtaxable > 500000 && subtaxable <= 1000000) {
      subtax = 10000 + (subtaxable - 500000) * 0.20;
    } else {
      subtax = 110000 + (subtaxable - 1000000) * 0.30;
    }

    return { subtaxable, subtax };
  }


  //SUPER SENIOR
  function SuperTax() {
    const subtaxable = income - deductions;

    setTaxableIncome(subtaxable);

    let subtax = 0;

    if (subtaxable <= 500000) {
      subtax = 0;
    } else if (subtaxable > 500000 && subtaxable <= 1000000) {
      subtax = (subtaxable - 500000) * 0.20;
    } else {
      subtax = 100000 + (subtaxable - 1000000) * 0.30;
    }

    return { subtaxable, subtax };
  }


  //NEW REGIEME
  function NewTax({ standard_deduction }) {
    //income + all other source income or net taxable
    let subtaxable = income + otherSource;

    //deduct standard deduction 500000
    subtaxable = (subtaxable - standard_deduction) - deductions;

    //setaNetTaxable income
    setTaxableIncome(subtaxable);

    //tax
    let subtax = 0;

    //calculate tax
    if (subtaxable <= 300000) {
      subtax = 0;
    } else if (subtaxable > 300000 && subtaxable <= 600000) {
      subtax = (subtaxable - 300000) * 0.05;
    } else if (subtaxable > 600000 && subtaxable <= 900000) {
      subtax = 15000 + (subtaxable - 600000) * 0.10;
    } else if (subtaxable > 900000 && subtaxable <= 1200000) {
      subtax = 45000 + (subtaxable - 900000) * 0.15;
    } else if (subtaxable > 1200000 && subtaxable <= 1500000) {
      subtax = 90000 + (subtaxable - 1200000) * 0.20;
    } else {
      subtax = 150000 + (subtaxable - 1500000) * 0.30;
    }

    //return tax and netTaxable income
    return { subtaxable, subtax };
  }


  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "10px", marginTop: "70px" }}>

      {/*Heading*/}
      <div className="head"><h1>Calculator</h1></div>

      {/*regieme change button */}
      <div style={{ width: '400px', display: 'flex', justifyContent: 'space-evenly', padding: '10px' }}>
        <div ><Button title='new regime' variant='contained' sx={{ background: '#063970' }} onClick={handleNewregime}>New Calculator</Button></div>
        <div ><Button title='old regime' variant='contained' color='warning' onClick={handleOldregime}>old Calculator</Button></div>
      </div>

      {/*Main div of all input and dropdown*/}
      <Box>

        {/*dropdown*/}

        {/*Year - if new regieme than hide all dropdown*/}
        {!newregime &&
          <div style={{ padding: '10px', borderRadius: '10px', width: '100%', backgroundColor: "#D3D3D3", display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
              Year
            </label>
            <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
            </label>
            <FormControl sx={{ width: { xs: "120px", md: "190px" } }}>
              <InputLabel>Year</InputLabel>
              <Select name="Year" value={selectedYear} onChange={handleYearChange}>
                <MenuItem value="">-- Select Year --</MenuItem>
                {year.map((option, index) => (
                  <MenuItem value={option} key={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }

        {/*Payer*/}
        <div style={{ padding: '10px', borderRadius: '10px', width: '100%', backgroundColor: "white", display: 'flex', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
            Tax Payer
          </label>
          <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
          </label>
          <FormControl sx={{ width: { xs: "120px", md: "190px" } }}>
            <InputLabel>Payer</InputLabel>
            <Select name="Year" value={selectedPayer} style={{ width: "100%" }} onChange={handlePayerChange}>
              <MenuItem value="">-- Select Payer --</MenuItem>
              {payer.map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>


        {/*Section-115BAC - condition if last 2 digits are greater than 20 and payer is individual or HUF*/}
        {!newregime && (parseInt(selectedYear.slice(-2)) > 21 && (selectedPayer === 'Individual' || selectedPayer === 'HUF')) &&
          <div style={{ padding: '10px', borderRadius: '10px', width: '100%', backgroundColor: "#D3D3D3", display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
              taxation under Section 115BAC?
            </label>
            <FormControl sx={{ width: { xs: "120px", md: "190px" } }}>
              <InputLabel>select</InputLabel>
              <Select value={section_115BAC} onChange={handleSectionChange}>
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}> False</MenuItem>
              </Select>
            </FormControl>
          </div>}


        {/*Category - if payer is individual*/}
        {selectedPayer === 'Individual' &&
          <div style={{ padding: '10px', borderRadius: '10px', width: '100%', backgroundColor: "white", display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
              Male / Female / Senior Citizen
            </label>
            <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
            </label>
            <FormControl sx={{ width: { xs: "120px", md: "190px" } }}>
              <InputLabel>Categories</InputLabel>
              <Select value={selectedCategary} onChange={handleCategoryChange}>
                <MenuItem value="">-- Select Year --</MenuItem>
                {categories.map((option, index) => (
                  <MenuItem value={option} key={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>}

        {/*Residental*/}
        <div style={{ padding: '10px', borderRadius: '10px', width: '100%', backgroundColor: "#D3D3D3", display: 'flex', justifyContent: 'space-between' }}>
          <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
            Residential Status
          </label>
          <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
          </label>
          <FormControl sx={{ width: { xs: "120px", md: "190px" } }}>
            <InputLabel>Status</InputLabel>
            <Select value={selectedResidental} onChange={handleResidentalChange}>
              <MenuItem value="">-- Select Year --</MenuItem>
              {residental.map((option, index) => (
                <MenuItem value={option} key={index}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>


        {/*Text Fields*/}

        {/*Income*/}
        <div style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "white", display: "flex", justifyContent: "space-between" }}>

          {section_115BAC === true ? <label style={{ fontSize: "20px", width: "70%" }}>Enter you Income (Before Standard Deduction)</label>
            : <label style={{ fontSize: "20px", width: "70%" }}>Enter you Income (After Standard Deduction)</label>}
          <TextField type="number" sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={income} onChange={handleIncomeChange} />
        </div>

        {/*OTHER SOURCE*/}
        <div title="From Interest/Commission/Lottery" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "#D3D3D3", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Income From Other Sources</label>
          <TextField type="number" sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={otherSource} onChange={handleOtherSourceChange} />
        </div>

        {/*DEDUCTION*/}
        <div title="LIC/PPF/TUTION Fee for Children/Pension Fund/Other" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "white", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Deductions</label>
          <TextField type="number" sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" defaultValue={deductions} onChange={handleDeductionsChange} />
        </div>

        {/*read only Text Field*/}
        {/*TAXABLE INCOME*/}
        <div title="Income after deduction" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "#D3D3D3", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Net Taxable Income</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={taxableIncome} inputProps={{ readOnly: true }} />
        </div>

        {/*TAX*/}
        <div title="Tax Amount" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "white", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Tax</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={Tax} inputProps={{ readOnly: true }} />
        </div>

        {/*SURCHARGE*/}
        <div title="Tax on If Net Taxable Income Exceed more than 50lakh" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "#D3D3D3", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Surcharge</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={Surcharge} inputProps={{ readOnly: true }} />
        </div>

        {/*CESS TAX*/}
        <div title="Tax for Health and Education" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "white", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Health and Education Cess</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={Cess} inputProps={{ readOnly: true }} />
        </div>

        {/*TAX AMT*/}
        <div title="Total Tax Amount" style={{ padding: "10px", borderRadius: "10px", width: "100%", backgroundColor: "#D3D3D3", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>Tax Amount</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={taxAmount} inputProps={{ readOnly: true }} />
        </div>
      </Box>

      <div ><Button title='new regime' variant='contained' onClick={calculateTax} sx={{ background: '#063970', marginTop: "10px" }}>Calculate</Button></div>
     
    </div>
  );
}

export default Calculator;