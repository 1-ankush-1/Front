import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { postData } from '../../api/serverServices';
//translate
import { useTranslation } from '../../Translate/i18n';

const steps = ['', '', ''];

export default function Gst() {

  //Translate 
  const { t } = useTranslation();

  const navigate = useNavigate()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [turnover, setTurnOver] = React.useState('')
  const [businesstype, setBusinessType] = React.useState('')

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 1) {
      let body = { email: "naveenmittal@gmail.com", turnover: turnover, businesstype: businesstype }
      let response = postData('setgst', body)
      alert(JSON.stringify(response))
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);



  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };


  const handleselectbutton = (val) => {
    if (val === "40L+") {
      setTurnOver("40+")
      handleNext()
    }
    else
      Swal.fire({
        title: t('doyouknow'),
        html: t("gstAct"),
        showCancelButton: true,
        confirmButtonText: t('continue'),
        // denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          setTurnOver("40-")
          handleNext()

        } else if (result.isDenied) {
          // Swal.fire('Changes are not saved', '', 'info')
        }
      })
  }

  const Tunover = () => {
    return (

      <div>
        <div>

          <h1>
            {t("Turnover")}?
          </h1>

        </div>

        <div className='d-flex flex-column justify-content-left' >

          <div className='m-2'>
            <Button style={{ width: 100, height: 50, }} variant='contained' value="40L+" onClick={(event) => handleselectbutton(event.target.value)}>40+</Button>
          </div>

          <div className='m-2'>
            <Button style={{ width: 100, height: 50 }} variant='contained' value="40L-" onClick={(event) => handleselectbutton(event.target.value)}>40-</Button>
          </div>

        </div>

      </div>

    )
  }

  const Ques2 = () => {
    return (
      <>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">{t("choose")}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Pvt_Ltd" onChange={(event) => setBusinessType(event.target.value)} control={<Radio />} label={t("pvtLtd")} />
            <FormControlLabel value="proprietor" onChange={(event) => { setBusinessType(event.target.value) }} control={<Radio />} label={t("proprietor")} />
            <FormControlLabel value="Partnership" onChange={(event) => { setBusinessType(event.target.value) }} control={<Radio />} label={t("Partnership")} />
            <FormControlLabel value="Legal_Liability_Company" onChange={(event) => setBusinessType(event.target.value)} control={<Radio />} label={t("LegalLiabilityCompany")} />
          </RadioGroup>
        </FormControl>
      </>
    )
  }

  const Thankyou = () => {

    return (
      <>
        <h4 style={{ marginBottom: 164 }}>{t("Done")}</h4>
      </>
    )
  }

  return (
    <div className='container mt-5' style={{ height: '630px', paddingTop: "50px" }}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>

          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption"></Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps} >
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}

        </Stepper>
        {activeStep === steps.length ? (
          navigate("/User/")
        ) : (
          <>
            <div sx={{ mt: 2, mb: 1 }}> {activeStep === 0 ? <Tunover /> : ""} {activeStep === 1 ? <Ques2 /> : ""} {activeStep === 2 && <Thankyou />}</div>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t("back")}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  {t("skip")}
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? t('Submit') : t('next')}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  );
}
