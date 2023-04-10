//translate
import { useEffect } from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from '../../../Translate/i18n';
import AOS from 'aos';
import 'aos/dist/aos.css'

const Faq = () => {

    //Translate 
    const { t } = useTranslation();

    useEffect(() => {
        AOS.init();
      }, [])

    const QueNAns = [{ Question: t("What_is_virtualCA"), Answer: " our investment advice on stocks and mutual funds is customized to fit your specific financial goals, preferences, and level of risk tolerance. We take into account your personal circumstances, such as your age, income, expenses, and financial objectives, and recommend investments that align with your needs and risk tolerance. This personalized approach helps you achieve your financial goals while minimizing the risk of potential losses." },
    { Question: t("What_are_the_services_we_are_providing"), Answer: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the , though the transition does limit overflow." },
    ]

    return (

        <div data-aos="fade-up" data-aos-duration="2000" className="d-flex flex-column align-items-center justify-content-center" style={{ margin: "20px 0 20px 0" }} >
            <h2>{t("FAQ")}</h2>
            {/*size of container same as service component*/}       {/*accordion is flex and center item*/}
            <div style={{ width: "70vw" }} className="accordion d-flex flex-column align-items-center justify-content-center " >
                
                {QueNAns.map((faq, i) => {
                    return (
                        <Accordion key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                
                            >
                                <Typography>{faq.Question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {faq.Answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>)
                })}
            </div>
        </div>
    )
}

export default Faq;