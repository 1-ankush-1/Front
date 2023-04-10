import React from 'react'
import { Box,Typography} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
//translate
import { useTranslation } from '../../Translate/i18n';

const Contact = () => {
  //Translate 
  const { t } = useTranslation();

  return (
    <div>
      <Box
        display="flex"
        justifyContent="center"
      ><Typography fontSize="28px" margin="20px">{t("contact")}</Typography>

      </Box>

      <Box>
        <div className="container overflow-hidden">
          <Typography fontSize="22px" className='pb-3'>{t("HOffice")}</Typography>
          <div className="row gx-5" style={{width:"100%"}}>
            <div className="col mt-4" >
              <div className="p-3 border" style={{height:"340px"}}>
                <div className='d-flex'>
                <BusinessIcon sx={{ m: 2 }} />
                  <div style={{marginTop:15}} className='d-flex'>
                  {t("PFRPL")}<br/>
                  {t("Udyog_Vihar_Phase")},<br/>
                  {t("Gurgaon")}-122015  
                  </div>
                </div>

                <p style={{marginTop:37}}><MailOutlineIcon sx={{ m: 2}} />mail@praedicoglobalresearch.com</p>
                <p style={{marginTop:37}}><PhoneIcon sx={{ m: 2 }} />+91 8319335916</p></div>
            </div>
            <div className="col mt-4">
              <div className="p-3 border"> <iframe title="main office" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14025.647593290645!2d77.06657373193845!3d28.49725266953995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d196b0d7637b3%3A0xef51ae0ebb2ad385!2sPhase%20IV%2C%20Udyog%20Vihar%2C%20Sector%2018%2C%20Gurugram%2C%20Haryana%20122022!5e0!3m2!1sen!2sin!4v1596003715628!5m2!1sen!2sin" width="100%" height="300"></iframe></div>
            </div>
          </div>
        </div>

        <div className="container overflow-hidden">
          <Typography fontSize="22px" className='pt-4' >{t("Data_center")}</Typography>
          <div className="row gx-5 pb-1 pt-3" style={{width:"100%"}}>
            <div className="col mt-4">
              <div className="p-3 border" style={{height:"340px"}}>
                <div className='d-flex'>
                <BusinessIcon sx={{ m: 2 }} />
                  <div style={{marginTop:15}} className='d-flex'>
                  {t("PFRPL")}<br/>
                  {t("First_Floor")},<br/>
                  {t("GWL")}-474001  
                  </div>
                </div>
                <p style={{marginTop:37}}><MailOutlineIcon sx={{ m: 2 }} />mail@praedicoglobalresearch.com</p>
                <p style={{marginTop:37}}><PhoneIcon sx={{ m: 2 }} /> +91 9009054508</p>
              </div>
            </div>
            <div className="col mt-4">
              <div className="p-3 border "> <iframe title="subOffice" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1789.8382053145033!2d78.16352807468999!3d26.20720267814431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c429171aa4ad%3A0xe18c9818b9f2639!2sGarima%20Arcade%2C%20Nogja%20Rd%2C%20Shinde%20Ki%20Chhawani%2C%20Gwalior%2C%20Madhya%20Pradesh%20474001!5e0!3m2!1sen!2sin!4v1596002123814!5m2!1sen!2sin" width="100%" height="300" ></iframe></div>
            </div>

          </div>
        </div>
      </Box >
    </div>
  )
}

export default Contact