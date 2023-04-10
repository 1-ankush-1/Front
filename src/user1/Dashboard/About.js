import React from 'react'
// import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//translate
import { useTranslation } from '../../Translate/i18n';



const About = () => {

    //Translate 
    const {t} = useTranslation();
  return (
    <div>
      <Paper
        sx={{
          padding: "80px",
          position: "relative",
          textAlign: "center",
          height: '300px',
          background: `url("https://res.cloudinary.com/dutk43ch5/image/upload/v1681110428/site/About_pcfv62.jpg") no-repeat `,
          backgroundPosition: "center center",
          backgroundSize: 'cover',
          display: "flex",
          alignItems: "center", // centers vertically
          justifyContent: "center", // c
        }}
      >
        <Grid
          container
          style={{
            position: "relative",
            margin: "auto"
          }}
        >
          <h1>
            {t("About")}
          </h1>
        </Grid>
      </Paper>
      <div className='container'>
        <Grid container spacing={2} sx={{marginTop:"30px",marginLeft:"30PX",maxWidth: '100%', overflow: 'hidden'}} >
          <Grid item xs={8}>
            <h2>{t("About")}</h2>
            <Typography variant='h6' color="text.secondary" sx={{ marginTop: "30px" }}>
             {t("AboutMore")}
            </Typography>
          </Grid>
          <Grid item  sx={{display:{xs:"8" , md:"6"} }}>
            <img alt='sub'  style={{ height: '160px' }} src={"https://res.cloudinary.com/dutk43ch5/image/upload/v1681110469/site/subAbout_ghuns4.jpg"}></img>
          </Grid>
          <Grid item xs={11}>
            <Typography variant='h6' color="text.secondary" sx={{ marginTop: "30px" }}>
            {t("AboutMore")} {t("AboutMore")}
            </Typography>
          </Grid>
        </Grid>
        </div>
    </div>
  )
}

export default About