import i18next from 'i18next';
import React,{useContext} from 'react';

// Initialize i18next with the default language and translations
i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to my app! ',
        FName: "First Name",
        LName: "Last Name",
        login: 'Log in',
        Email: "Email",
        phone: "Contact no",
        Salary: "Annual Salary",
        pass: "Password",
        DOB: "Date Of Birth",
        Addr: "Address",
        RePass: "Re-enter Password",
        img: "image",
        Gender: "Gender",
        Male: "Male",
        Female: "Female",
        signup: "Registration page",
        regbtn: "Register",
        T_C:"Terms and Conditions",
        I_agree:"I Agree To These",
        Lang:"Language",
        Having_Trouble:"Having Trouble?",
        Forget:"Forget password",
        dont_have_account:"dont have account?",
        services:"Services",
        contact:"Contact",
        About:"About",
        OTP:"Enter OTP",
        OTP_sent:"OTP sent to registered to you mail Id",
        Submit:"Submit",
        Cancel:"Cancel",
        Error:"Error",
        FAQ:"FAQ",
        What_is_virtualCA:"What is virtualCA",
        What_are_the_services_we_are_providing:"What are the services we are providing",
        passsend:"Password sent to your registered mail id",
        Enter_regis_mobile_no:"please enter your registered Mobile number",
        service:"Service",
        Months:"Months",
        RS:"RS",
        Get_Started:"Get Started",
        HOffice:"Head Office",
        Data_center:"Data center:",
        PFRPL:"Praedico Global Research.Pvt.Ltd",
        Udyog_Vihar_Phase:"Udyog Vihar, Phase",
        Gurgaon:"Gurgaon",
        First_Floor:"First Floor, Garima Arcade",
        GWL:"Gwalior",
        Saving:"Saving",
        Expense:"Expense:",
        GST:"GST",
        LANG:"LANG",
        Feedback:"Feedback",
        Year:"Year", //for expense.js
        Month:"Month",
        Monthly_Income:"Monthly Income",
        Expense:"Expense",
        Expense_Type:"Expense Type",
        Amount:"Amount",
        Edit_Expense:"Edit Expense",
        Add_Expense:"Add Expense",
        Small_Cap:"Small Cap",
        Small_Cap_Info:"Companies with small market capitalization, often new and more volatile.",
        Mid_Cap:"Mid Cap",
        Mid_Cap_Info:"Companies with market capitalization between small and large caps, established with stable growth.",
        Large_Cap:"Large Cap",
        Large_Cap_Info:"Companies with market capitalization above a certain threshold, well-established with stable growth.",
        Gold:"Gold",
        Gold_Info:"Precious metal valued for centuries, seen as a safe-haven investment during economic uncertainty.",
        Debt:"Debt",
        Debt_Info:"Money borrowed and paid back with interest, can be in the form of bonds with a steady stream of income but also comes with default risk.",
        Stocks:"Stocks",
        Mutual_Funds:"Mutual Funds",
        designation:"Designation",//navbar
        gst:"GST",
        calculator:"Calculator",
        Expenditure:"Expenditure",
        Advisory:"Advisory",
        Profile:"Profile",
        AgricultureHead: " Agricultural income is not taxable under Section 10 (1) of the Income Tax Act as it is not counted as a part of an individual's total income.It is categorised as a valid source of income and basically includes income from sources that comprise :- ",
        Agriculture1: "1. Renting/leasing agricultural land for agriculture, storeroom, residential place and outhouse.",
        Agriculture2: "2. Money earned from trees growing in nurseries as seedlings or saplings.",
        Agriculture3: " 3. Renting/leasing agricultural land for by cultivator or farmer.",
        Agriculture4: " 4. income due to commercial use of agricultural land.",
        Agriculture5: "5. agricultural land  or the land where the building is located, is being assessed for land revenue or subject to a local rate assessed . ",
        New: "New",
        Old: "Old",
        Sec115BAC: "taxation under Section 115BAC?",
        Select: "Select",
        Farmer:"Farmer",
        True: "True",
        False: "false",
        EnterIncomeBefore: "Enter you Income (Before Standard Deduction)",
        EnterIncomeAfter: "Enter you Income (After Standard Deduction)",
        IncomeOther: "Income From Other Sources",
        Deductions: "Deductions",
        NetTaxIncome: "Net Taxable Income",
        Tax: "Tax",
        Surcharge: "Surcharge",
        HealthEducation: "Health and Education Cess",
        Tax_Amount: "Tax Amount",
        AboutMore:" Virtual CA is a smart sourced finance business partner. In the highly competitive SME space, let us bring you the finance expertise that will take your business to the next level, enabling you to focus on your passion while we keep you solidly grounded financially and strategically."
        ,Turnover:"Your Turnover",
        pvtLtd:"Pvt Ltd",
        proprietor:"proprietor",
        Partnership:"Partnership",
        LegalLiabilityCompany:"Legal Liability Company",
        Done:"Your will get a confirmation mail Soon",
        gstAct:"According to the Goods and Services Tax Act, 2017, any business with a turnover of Rs. 40 lakh and below Does not require GST."
      ,wantToContinue:"Still want GST click continue",
      continue:"Continue",
      doyouknow:"Do You Know",
      skip:"Skip",
      next:"Next",
        back:"Back",
        choose:"Choose"
      }
    },
    hindi: {
      translation: {
        welcome: 'ऐप में आपका स्वागत है!',
        FName: "पहला नाम",
        Email: "ईमेल",
        phone: "नंबर",
        Salary: "वेतन",
        pass: "पासवर्ड",
        LName: "उपनाम",
        DOB: "जन्म की तारीख",
        Addr: "पता",
        RePass: "पासवर्ड फिर से लिखें",
        img: "फ़ोटो",
        Gender: "लिंग",
        Male: "पुरुष",
        Female: "महिला",
        signup: "रजिस्ट्रेशन पेज",
        regbtn: "रजिस्टर करें",
        login: 'लॉग इन करें',
        T_C:"नियम व शर्तें",
        I_agree:"मैं सहमत हूं इन",
        Lang:"भाषा चुनें",
        Having_Trouble:" ",
        Forget:"पासवर्ड याद नही ?",
        dont_have_account: "नया अकाउंट बनाए?",
        services:"सेवाए",
        contact:"संपर्क करें",
        About:"हमारे बारे में",
        OTP:"ओटीपी डाले",
        OTP_sent:"ओटीपी मेल आईडी पर भेज दिया गया है",
        Submit:"भेजें",
        Cancel:"रद्द करे",
        Error:"क्षमा करें",
        FAQ:"सामान्य प्रश्न",
        What_is_virtualCA:"वर्चुअलसीए क्या है",
        What_are_the_services_we_are_providing:"हम क्या सेवाएं प्रदान कर रहे हैं",
        passsend:"मेल आईडी पर पासवर्ड भेज दिया गया है",
        Enter_regis_mobile_no:"कृपया अपना पंजीकृत मोबाइल नंबर दर्ज करें",
        service:"सेवा",
        Months:"महीने",
        RS:"रु",
        Get_Started:"शुरू करें",
        HOffice:"प्रधान कार्यालय",
        Data_center:"डाटा सेंटर",
        PFRPL:"प्रेडिको ग्लोबल रिसर्च प्रा. लि",
        Udyog_Vihar_Phase:"उद्योग विहार, फेज",
        Gurgaon:"गुड़गांव",
        First_Floor:"पहली मंजिल, गरिमा आर्केड",
        GWL:"ग्वालियर",
        Saving:"बचत",
        Expense:"खर्च",
        GST:"G",
        LANG:"भाषा",
        Feedback:"प्रतिक्रिया",
        Year:"वर्ष", //for expense.js
        Month:"महीना",
        Monthly_Income:"मासिक आय",
        Expense:"व्यय",
        Expense_Type:"व्यय प्रकार",
        Amount:"राशि",
        Edit_Expense:"व्यय संपादित करें",
        Add_Expense:"व्यय जोड़ें",   
        Small_Cap:"स्मॉल-कैप कंपनियां",
        Mid_Cap:"मीडियम-कैप",
        Large_Cap:"लार्ज-कैप",
        Gold:"सोना",
        Debt:"कर्ज",
        Stocks:"शेयर",
        Mutual_Funds:"म्यूचुअल फंड्स",
        Small_Cap_Info:"छोटे बाजार पूंजीकरण वाली कंपनियाँ, अक्सर नई और अधिक अस्थिर।",
        Mid_Cap_Info:"छोटे और बड़े कैप के बीच बाजार पूंजीकरण वाली कंपनियां, स्थिर विकास के साथ स्थापित।",
        Large_Cap_Info:"एक निश्चित सीमा से ऊपर बाजार पूंजीकरण वाली कंपनियां, स्थिर विकास के साथ अच्छी तरह से स्थापित।",
        Gold_Info:"कीमती धातु सदियों से मूल्यवान है, जिसे आर्थिक अनिश्चितता के दौरान एक सुरक्षित निवेश के रूप में देखा जाता है।",
        Debt_Info:`
        उधार लिया गया पैसा और ब्याज सहित वापस चुकाया गया धन आय की एक स्थिर धारा के साथ बांड के रूप में हो सकता है लेकिन डिफ़ॉल्ट जोखिम के साथ भी आता है।`,
        designation:"पद",//navbar
        gst:"जीएसटी",
        calculator:"कैलकुलेटर",
        Expenditure:"व्यय",
        Advisory:"सलाहकार",
        Profile:"प्रोफ़ाइल",
        AgricultureHead: "कृषि आय आयकर अधिनियम की धारा 10(1) के तहत कर योग्य नहीं है क्योंकि इसे किसी व्यक्ति की कुल आय के हिस्से के रूप में नहीं गिना जाता है। इसे आय के वैध स्रोत के रूप में वर्गीकृत किया गया है और मूल रूप से इसमें शामिल स्रोतों से आय शामिल है: -",
        Agriculture1: "1. कृषि के लिए कृषि भूमि, भंडार कक्ष, आवासीय स्थान और आउटहाउस किराए पर लेना/पट्टे पर देना।",
        Agriculture2: "पौधशालाओं में पौध या पौध के रूप में उगने वाले वृक्षों से अर्जित धन। ",
        Agriculture3: "3. कृषक या किसान द्वारा कृषि भूमि को किराए पर देना/पट्टे पर देना। ",
        Agriculture4: "4. कृषि भूमि के व्यावसायिक उपयोग से होने वाली आय। ",
        Agriculture5: "5. कृषि भूमि या वह भूमि जहाँ भवन स्थित है, का मूल्यांकन भू-राजस्व के लिए किया जा रहा है या स्थानीय दर के अधीन मूल्यांकन किया जा रहा है। ",
        New: "नया",
        Old: "पुराना",
        Sec115BAC: "धारा 115BAC के तहत कराधान?",
        Select: "चुनिए",
        True: "हाँ",
        False: "नही",
        EnterIncomeBefore: "अपनी आय दर्ज करें (मानक कटौती से पहले)",
        EnterIncomeAfter: "अपनी आय दर्ज करें (मानक कटौती के बाद)",
        IncomeOther: "अन्य स्रोतों से आय",
        Deductions: "कटौती",
        NetTaxIncome: "करदायी आय",
        Tax: "कर",
        Surcharge: "अधिभार",
        HealthEducation: "स्वास्थ्य और शिक्षा उपकर",
        Tax_Amount: "कर राशि",
        AboutMore:"वर्चुअल सीए एक स्मार्ट सोर्स्ड फाइनेंस बिजनेस पार्टनर है। अत्यधिक प्रतिस्पर्धी एसएमई स्पेस में, आइए हम आपको वित्त विशेषज्ञता लाएं जो आपके व्यवसाय को अगले स्तर पर ले जाएगी, जिससे आप अपने जुनून पर ध्यान केंद्रित कर सकते हैं, जबकि हम आपको वित्तीय और रणनीतिक रूप से ठोस रूप से जमीन पर रखते हैं।"
        ,Turnover:"कारोबार",
        pvtLtd:"प्राइवेट लिमिटेड",
        proprietor:"मालिक",
        Partnership:"साझेदारी",
        LegalLiabilityCompany:"कानूनी देयता कंपनी",
        Done:"आपको जल्द ही एक पुष्टिकरण मेल मिलेगा",
        gstAct: "वस्तु एवं सेवा कर अधिनियम, 2017 के अनुसार, 40 लाख रुपये और उससे कम के कारोबार वाले किसी भी व्यवसाय को जीएसटी की आवश्यकता नहीं है।",
        wantToContinue:"अभी भी चाहते हैं कि जीएसटी क्लिक जारी रहे"
        ,continue:"जारी रखे",
        doyouknow:"क्या आप जानते है",
        next:"आगे",
        back:"वापस",
        skip:"छोड़े",
        choose:"चुने",
        Farmer:"किसान"
      }
    }
  }// {t("")}
});

// Create a new React context to provide the language and translations
export const i18nContext = React.createContext({lang: 'en',t: i18next.t.bind(i18next)});

// Create a custom hook to access the language and translation function
export const useTranslation = () => {
  const { lang, t } = useContext(i18nContext);
  return { lang, t };
};


// Set the language based on the user's preferences
export const setLanguage = (lang) => {i18next.changeLanguage(lang);};
