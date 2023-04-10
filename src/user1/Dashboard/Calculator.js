import React, { useState, useContext, useEffect } from 'react';
import { Paper, InputLabel, MenuItem, FormControl, Select, Button,  TextField } from '@mui/material'
import userContext from '../../context/users/userContext';
import { useTranslation } from '../../Translate/i18n';

const Calculator = () => {

  useEffect(() => {
    calculateTax();
  }, [])

  const { t } = useTranslation();


  //STATES of Dialog Box
  const [section_115BAC, setSection_115BAC] = useState(true)
  const [newregime, setNewRegime] = useState(1);

  //to fix newregieme and section_115BAC
  useEffect(() => {
    calculateTax();
  }, [newregime, section_115BAC])

  //useContext
  const context = useContext(userContext);
  const { age } = context

  //DATA
  const year = '2022-23';
  const category = age < 60 ? JSON.parse(localStorage.getItem("data")).gender : age > 60 && age < 80 ? 'Super Senior Citizen' : 'Senior Citizen'

  //handel change for regieme
  function handleOldregime() {
    setNewRegime(0);
    calculateTax();
  }

  //handel change for regieme
  function handleNewregime() {
    setNewRegime(1);
    calculateTax();
  }

  //handel change for Section
  function handleSectionChange() {
    setSection_115BAC(!section_115BAC);

  }

  //STATES of text box
  const [income, setIncome] = useState(JSON.parse(localStorage.getItem("data")).salary);
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
    if (JSON.parse(localStorage.getItem("data")).isFarmer === "true") {
      return
    }
    if (income > 0) {
      //standard deduction applicable on all types of tax after 20 it is 50000 in before 20 it is 0 in 20 400000
      const standard_deduction = 50000;

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

        if (category === 'male' || category === 'female') {
          let { subtax, subtaxable } = IndividualTax({ standard_deduction });
          tax = subtax;
          taxable = subtaxable;
        }                                                 //because super senior added in 21
        else if (category === 'Senior Citizen') {
          let { subtax, subtaxable } = SeniorTax()
          tax = subtax;
          taxable = subtaxable;
        }
        else if (category === 'Super Senior Citizen') {
          let { subtax, subtaxable } = SuperTax()
          tax = subtax;
          taxable = subtaxable;
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
      if ((parseInt(year.slice(-2)) < 23)) {
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
    let subtaxable = parseInt(income) + parseInt(otherSource);

    //set taxable income
    setTaxableIncome(subtaxable);

    let subtax = 0;

    //if follow section_115BAC  - before standard deduction
    if (!section_115BAC) {

      subtaxable = subtaxable - deductions;

      //set taxable income
      setTaxableIncome(subtaxable);
      // console.log(subtaxable);

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

      // console.log(subtaxable, standard_deduction, deductions, section_115BAC)
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
    let subtaxable = parseInt(income) + parseInt(otherSource);
   

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

      {JSON.parse(localStorage.getItem("data"))?.isFarmer === "true" &&
        <div style={{ marginBottom: '30px', marginTop: '10px', backgroundColor: 'gray', padding: '10px' }} className='container'>
          <h3>Note:</h3>
          <div style={{ font: '20px' }} >
            {t("AgricultureHead")} <br />{t("Agriculture1")}
            <br />{t("Agriculture2")}
            <br />{t("Agriculture3")}
            <br />{t("Agriculture4")}
            <br />{t("Agriculture5")}
          </div>
        </div>
      }

      {/*Heading*/}
      <div className="head"><h1>{t("Calculator")}</h1></div>

      {/*regieme change button */}
      <div style={{ width: '400px', display: 'flex', justifyContent: 'space-evenly', padding: '10px' }}>
        <div ><Button title='new regime' variant='contained' onClick={handleNewregime}>{t("New")} {t("calculator")}</Button></div>
        <div ><Button title='old regime' variant='contained' onClick={handleOldregime}>{t("Old")} {t("calculator")}</Button></div>
      </div>

      {/*Main div of all input and dropdown*/}
      <Paper>

        {/*dropdown*/}

        {/*Section-115BAC - condition if last 2 digits are greater than 20 and payer is individual or HUF*/}
        {!newregime &&
          <div style={{ padding: '10px', borderRadius: '10px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '20px' }} sx={{ width: { xs: '100%', md: '25%' } }}>
              {t("Sec115BAC")}
            </label>
            <FormControl sx={{ width: { xs: "120px", md: "190px" } }}>
              <InputLabel>{t("Select")}</InputLabel>
              <Select value={section_115BAC} onChange={handleSectionChange}>
                <MenuItem value={true}>{t("True")}</MenuItem>
                <MenuItem value={false}> {t("False")}</MenuItem>
              </Select>
            </FormControl>
          </div>}

        {/*Text Fields*/}

        {/*Income*/}
        <div style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>

          {section_115BAC === true ? <label style={{ fontSize: "20px", width: "70%" }}>{t("EnterIncomeBefore")}</label>
            : <label style={{ fontSize: "20px", width: "70%" }}>{t("EnterIncomeAfter")}</label>}
          <TextField type="number" sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={income} onChange={handleIncomeChange} />
        </div>

        {/*OTHER SOURCE*/}
        <div title="From Interest/Commission/Lottery" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("IncomeOther")}</label>
          <TextField type="number" sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={otherSource} onChange={handleOtherSourceChange} />
        </div>

        {/*DEDUCTION*/}
        <div title="LIC/PPF/TUTION Fee for Children/Pension Fund/Other" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("Deductions")}</label>
          <TextField type="number" sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" defaultValue={deductions} onChange={handleDeductionsChange} />
        </div>

        {/*read only Text Field*/}
        {/*TAXABLE INCOME*/}
        <div title="Income after deduction" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("NetTaxIncome")}</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={taxableIncome} inputProps={{ readOnly: true }} />
        </div>

        {/*TAX*/}
        <div title="Tax Amount" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("Tax")}</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={Tax} inputProps={{ readOnly: true }} />
        </div>

        {/*SURCHARGE*/}
        <div title="Tax on If Net Taxable Income Exceed more than 50lakh" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("Surcharge")}</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={Surcharge} inputProps={{ readOnly: true }} />
        </div>

        {/*CESS TAX*/}
        <div title="Tax for Health and Education" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("HealthEducation")}</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={Cess} inputProps={{ readOnly: true }} />
        </div>

        {/*TAX AMT*/}
        <div title="Total Tax Amount" style={{ padding: "10px", borderRadius: "10px", width: "100%", display: "flex", justifyContent: "space-between" }}>
          <label style={{ fontSize: "20px", width: "70%" }}>{t("Tax_Amount")}</label>
          <TextField sx={{ flex: 1, width: "30%" }} size="small" id="outlined-size-small" value={taxAmount} inputProps={{ readOnly: true }} />
        </div>
      </Paper>

    </div>
  );
}

export default Calculator;