import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Collapse, Typography} from '@mui/material/';
//translate
import { useTranslation } from '../../../Translate/i18n';

//animation on scroll
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Services() {

  //Translate 
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    AOS.init();
  }, [])

  const data1 = [{ "About": "It calculates Goods and Services Tax (GST) obligations accurately and efficiently. Our team stays up-to-date with the latest GST regulations and guidelines to ensure our clients are in compliance with the law.","alt":"gst","pic":"https://res.cloudinary.com/dutk43ch5/image/upload/v1681110491/site/GST_jqsf2j.png" },
  {"About":"Our income tax calculator service ensures that individuals and businesses pay the correct amount of income tax and maximize tax savings through various deductions and exemptions. Our team of tax professionals uses the latest tax laws to calculate your tax liability and provide personalized financial planning advice.","pic":"https://res.cloudinary.com/dutk43ch5/image/upload/v1681110485/site/accounting_r0zrts.png","alt":"income tax" }
  ]

  const data2 = [{ "About": "It Provide a range of financial planning services, including expense calculation, and provide personalized financial planning advice. Our investment advice on stocks and mutual funds is tailored to your unique needs and risk tolerance.","pic":"https://res.cloudinary.com/dutk43ch5/image/upload/v1681110474/site/expense_kedrai.png","alt":"expenditure" },
  { "About": "If you want to learn more about managing your finances, as a CA, I can provide you with valuable insights and advice. From understanding your expenses to creating a budget, managing your taxes, or planning for your retirement, I have the expertise to help you make informed decisions that align with your unique financial goals." ,"pic":"https://res.cloudinary.com/dutk43ch5/image/upload/v1681110479/site/CA_bpmajd.png","alt":"CA"}
  ]


  return (
    <div >
      <div style={{ textAlign: 'center', marginTop: "20px" }} >
        <h2 >{t("services")}</h2>
      </div>


      {/* first row of services */}
      <div data-aos="fade-up" data-aos-duration="2000" className='container' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: "wrap" }}>
        {data1.map((el, index) => (
          <Card style={{ width: "300px", height: "300px", margin: "20px " }} key={index} >

            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
              <CardHeader
                sx={{ paddingBottom: '0px' }}
                avatar={
                  <img style={{ borderRadius: "50%", objectFit: "cover", width: " 60px", height: "60px", cursor: "pointer"}} alt={el.alt} src={el.pic} />
                }
              />
            </div>

            <CardContent>
              <Typography variant="body2" color="text.primary">
                {el.About}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>


            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>

              </CardContent>
            </Collapse>
          </Card>
        ))}

      </div>

      {/* second row of services */}
      <div data-aos="fade-up" data-aos-duration="2000" className='container' style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: "wrap" }}>
        {data2.map((el, index) => (
          <Card style={{ width: "300px", height: "300px", margin: "20px " }} key={index + 3} >

            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
              <CardHeader
                sx={{ paddingBottom: '0px' }}
                avatar={

                  
                    <img style={{ borderRadius: "50%", objectFit: "cover", width: " 60px", height: "60px", cursor: "pointer" }} alt={el.alt} src={el.pic} />
                 
                }
              />
            </div>

            <CardContent>
              <Typography variant="body2" color="text.primary">
                {el.About}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>


            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>

              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>
    </div>
  );
}