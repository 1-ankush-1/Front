import { useEffect, useState } from "react";
import { useTranslation } from "../../../Translate/i18n";
import Pie from "../Graphs/Pie";

//Saving 
const Saving = ({ saving, age, setInvestAmt }) => {

  const { t } = useTranslation()

  useEffect(() => {
    InverstPie();
  })

  //state for Investment Type
  const [Gold, setGold] = useState(0);
  const [Debt, setDebt] = useState(0);
  const [smallCap, setSmallCap] = useState(0);
  const [midCap, setMidCap] = useState(0);
  const [largeCap, setLargeCap] = useState(0);


  //INVESTMENT function
  const InverstPie = () => {
    //invest 10% in gold 
    setGold(0.1 * saving)

    //Rest 90% data         
    const Amt = saving - (0.1 * saving);

    //data for debt(what is age percent) 
    const debtAmt = (age / 100) * saving;
    setDebt(debtAmt)

    //by deducting (what is age percent) to get Equity
    const equityAmt = Amt - debtAmt;

    setInvestAmt(equityAmt)

    if (age > 35) {
      //half(50%) of equity in midCap and half in largeCap
      setMidCap(0.5 * equityAmt);
      setLargeCap(0.5 * equityAmt);
    } else {
      //half of equity in smallCap and half in largeCap
      setSmallCap(0.5 * equityAmt);
      setLargeCap(0.5 * equityAmt);
    }
  }

  const data = smallCap > 0 ? [
    { title: 'Gold', value: Gold, color: '#E6425E', label: t("Gold") },
    { title: 'Debt', value: Debt, color: '#A64166', label: t("Debt") },
    { title: 'Equity S', value: smallCap, color: '#C13C37', label: t("Small_Cap") },
    { title: 'Equity L', value: largeCap, color: '#4DBD74', label: t("Large_Cap") },
  ] : [
    { title: 'Gold', value: Gold, color: '#E6425E', label: t("Gold") },
    { title: 'Debt', value: Debt, color: '#A64166', label: t("Debt") },
    { title: 'Equity M', value: midCap, color: '#E38627', label: t("Mid_Cap") },
    { title: 'Equity L', value: largeCap, color: '#C13C12', label: t("Large_Cap") },
  ]

  return (
    <>
        {/*Pie chart card*/}
        <div style={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px" }}>
          <Pie data={data} />
        </div>
    </>)
}
export default Saving;