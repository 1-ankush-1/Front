const CalcFund = (amt,FirstFund,SecondFund)=>{

    //creating a copy of object so do not affect original data
    const FirstData = { ...FirstFund };
    const SecondData = {...SecondFund};
    
    //check if data exist if not return
    if(!FirstData.hasOwnProperty("company")){
        return false
    }
  
    //array holds value distributive values
    const amtArray = [5000,  15000, 25000,35000, 45000,10000, 20000, 30000, 40000, 50000];
   
    //new array to hold yes or no
    const resultArray = [];
    //store Total Amt
    let TotalAmtInvest = 0
    let large = 0 

    for(let i=0;i<amtArray.length;i++){
       
        //if amt is gt thn distibutive value
        if(amt >= amtArray[i]){
            //the laargest value that return yes is our TotalAMt
            if(large < amtArray[i] ){
                TotalAmtInvest = amtArray[i];
                large = amtArray[i];
            }
            //storing yes at that position
            resultArray[i] = "yes"
        }else{
            resultArray[i] = "no"
        }
    }

    //because both object have same key so merging data
    for (let key in SecondData) {
        //check if key exist
        if (FirstData.hasOwnProperty(key)) {
            //if key store no or string than do addition
            if (typeof SecondData[key] === 'number' || typeof SecondData[key] === 'string') {
                FirstData[key] += SecondData[key];
                
            } else if (Array.isArray(SecondData[key])) {  //if it is a array concat 
                FirstData[key] = FirstData[key].concat(SecondData[key]);
            }
        }
    }
    //adding keys to object
    FirstData["TotalAmt"] = TotalAmtInvest
    FirstData["invest"] = resultArray
   
    //diff
    let gains = 0

    //to calculate Average return
    for(let i=0;i<FirstData.company.length;i++){
        //if invest is yes then add and increase count by 1
        if(FirstData.invest[i] === "yes"){
            gains += (5000*FirstData.returns[i]/100)
        }
    }

    //diff btw total and new total amount percentage
    const NewAMt = parseFloat(FirstData.TotalAmt+gains);
    const diff = gains;
    let AveragePercentage = 0;
    if(NewAMt !== FirstData.TotalAmt){
    AveragePercentage=((diff) /NewAMt )* 100;
    }
   
    //adding key to object
    FirstData["AmtAfterGains"] = parseInt(NewAMt)
    FirstData["Percentage"] = AveragePercentage

    // console.log(FirstData)
    //return data
    return FirstData
}

export default CalcFund;