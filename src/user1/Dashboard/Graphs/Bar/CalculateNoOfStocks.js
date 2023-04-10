const Stocks = (investAMt, devidedAmt, cap) => {
    // console.log(investAMt, devidedAmt, cap)
    //Total devidedAmt
    let Totalamt = investAMt;
    //To subtract data (used slice because array and object are passed as refrence so slice will create a copy of devidedAmt)
    // let origAmt = devidedAmt.slice()
    //distribute data
    let amtToInvest = devidedAmt.slice()
    //current share price
    const priceOfShare = cap?.price;
    //to store no of stocks
    let stocks = [0, 0, 0, 0, 0];
    //left amount
    let amtLeft = 0;
    //sort data 
    const sortedpriceOfShare = cap?.price?.slice(0).sort((a, b) => a - b);

    if (sortedpriceOfShare && sortedpriceOfShare.length > 0) {

        //until total devidedAmt is not became zero
        while (Totalamt > sortedpriceOfShare[0]) {

            let check = 0;
            //to iterate through every element - priceshare lenght is 5
            for (let i = 0; i < priceOfShare?.length; i++) {

                // console.log(amtToInvest[i] )
                //subtract devidedAmt to invest from total amount
                Totalamt = Totalamt - amtToInvest[i];
                // console.log("amount is ",i,amtToInvest[i],priceOfShare[i],amtToInvest,amtLeft)
                // console.log(count++, i, Totalamt)
                //if price of stock is less than devidedAmt we have
                if (amtToInvest[i] > priceOfShare[i]) {
                    //check if it added any stock
                    check = check + 1;
                    //get exact value that it can buy stocks
                    stocks[i] = stocks[i] + parseInt(amtToInvest[i] / priceOfShare[i])
                    //get rest of the amount after invest
                    const restAmt = amtToInvest[i] % priceOfShare[i];

                    if (i === priceOfShare.length - 1) {
                        amtToInvest[0] = restAmt;
                        amtLeft += restAmt;

                    }
                    //save left amount in next company
                    if (i !== priceOfShare.length - 1) {
                        amtToInvest[i + 1] = amtToInvest[i + 1] + restAmt;
                    }
                    amtToInvest[i] = 0;
                } else {
                    if (i === priceOfShare.length - 1) {
                        amtToInvest[0] = amtToInvest[amtToInvest.length - 1];
                        amtLeft = amtToInvest[amtToInvest.length - 1]
                    }
                    //save amount to this company in next company
                    if (i !== priceOfShare.length - 1) {
                        amtToInvest[i + 1] = amtToInvest[i + 1] + amtToInvest[i];
                    }
                    amtToInvest[i] = 0;
                }
            }

            if (check === 0) {
                break;
            }

            // console.log(amtLeft)
            //add rest of the data in total data so loop will iterate again
            Totalamt = amtLeft
        }
    };

    let TotalInvestedamt = 0;
    let individualinvestedAmt = [];
    let amountGained = 0;

    for (let j = 0; j < cap?.price?.length; j++) {
        //no of share
        const shares = parseInt(stocks[j]);

        //amount invested in share
        const investedAmt = Math.round(cap.price[j] * shares);
        TotalInvestedamt += investedAmt;
        individualinvestedAmt[j] = investedAmt;

        //percentage of return (proportion of our investment in each share are diff)
        const percentage = parseFloat(cap.returns[j]);

        amountGained += (investedAmt * (percentage / 100));
        // console.log("weight is ",investedAmt,(investedAmt * (percentage/100)),weightedAveragePercentage)
    }


    //if no of share gt than 0 then devide by no of shares(why not devided by no of companies proportion of our investment in each share are diff))
    // if (totalShares > 0) {
    //     weightedAveragePercentage /= totalShares;
    // }

    //adding data in single object
    cap["amountGained"] = amountGained
    cap["Total_Amt"] = investAMt
    cap["amtInvested"] = individualinvestedAmt
    cap["quantity"] = stocks
    cap["amtLeft"] = amtLeft
    cap["AmtInvested"] = TotalInvestedamt
    // console.log(cap)
    return cap;
}

export const CalcStock = (FirstStock, SecondStock) => {
    const FirstData = { ...FirstStock };
    const SecondData = { ...SecondStock };
    for (let key in SecondData) {
        if (FirstData.hasOwnProperty(key)) {
            if (typeof SecondData[key] === 'number' || typeof SecondData[key] === 'string') {
                FirstData[key] = parseFloat(FirstData[key]) + parseFloat(SecondData[key]);
            } else if (Array.isArray(SecondData[key])) {
                FirstData[key] = FirstData[key].concat(SecondData[key]);
            }
        }
    }

    //percent diff
    // const NewAMt = parseFloat(FirstData.AmtInvested + FirstData.amountGained);
    // const diff = FirstData.amountGained;
    // let weightedAveragePercentage = 0;
    // weightedAveragePercentage=((diff) /NewAMt )* 100;
    const NewAMt = parseFloat(FirstData.Total_Amt + FirstData.amountGained);
    const diff = FirstData.amountGained;
    let AveragePercentage = 0;
    AveragePercentage=((diff) /NewAMt )* 100;
    FirstData["ResultantAmt"] = parseInt(FirstData.Total_Amt+FirstData.amountGained)
    FirstData["percentageDiff"] =  AveragePercentage
   
    return FirstData
}
export default Stocks;