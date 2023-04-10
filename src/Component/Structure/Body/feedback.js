import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {Typography,Card,CardContent} from '@mui/material/';
import Rating from '@mui/material/Rating';
import host from '../../../host';
//translate
import { useTranslation } from '../../../Translate/i18n';

export const FeedBack = () => {
  const { t } = useTranslation();

    const [feed,setFeed]=useState([])
    const GetFeedback=async()=>{        
        await axios.get(`${host}/getfeedback`).then((res)=>{
            setFeed(res.data.data)
        })    
      }

    useEffect(function(){
        GetFeedback()   
    },[])

  return (
    <div data-aos="fade-up" data-aos-duration="2000">
    <h2  style={{ margin: "50px 0 20px 0",textAlign:'center' }}>{t("Feedback")}</h2>
    <div  className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: "wrap" }}>
        
        {feed.map((item, index) => (
          <Card style={{ width: "300px",height:'180px', margin: "20px " }} key={index} >

            <div className='cardDiv' style={{ display: 'flex', justifyContent: 'center', width: "100%" }}>
                <Rating name="half-rating-read" defaultValue={parseInt(item.stars)} precision={0.5} readOnly />
            </div>

            {/* <CardHeader> */}
              <Typography sx={{textAlign:'center',marginTop:'5px'}} variant="body2" color="text.primary">
                {item.name}
              </Typography>
            {/* </CardHeader> */}

            <CardContent sx={{maxWidth:true,textAlign:"center"}}>
              <Typography variant="body2" color="text.secondary" >
                {item.message}
              </Typography>
            </CardContent>
         
          </Card>
        ))}

      </div>
      </div>
  )
}