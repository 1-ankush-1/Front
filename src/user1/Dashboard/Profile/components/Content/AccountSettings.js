import { FormControl, FormLabel, Grid, Input } from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import userContext from '../../../../../context/users/userContext'
import Swal from 'sweetalert2';
//translate
import { useTranslation } from '../../../../../Translate/i18n'

function AccountSettings() {

   //Translate 
   const {t} = useTranslation();

  //creating a state to store data of user
  const [userData, setUserData] = useState({})
  const [loading,setLoading] = useState(false)

  //it is called firstly we set user data in state
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('data')))
  }, [])

  //onchange method it trigered when using any input field 
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  //to navigate 
  const navigate = useNavigate();

  //to close dialog box
  const handleClose = () => {
    navigate(-1);
  };

  //edit
  //variable initialised with use Context
  const context = useContext(userContext);
  const { editProfile, setProfileImage } = context;

  //to save data
  const editfunction = async (User) => {
    
    try {
      setLoading(true);
      //if updatuser failed then return
      if (!await editProfile(User)) {        //sending data to editProfile in usecontext
        return;
      }

      //updating profile Image on backend and localstorage
      User.userprofilepic = await setProfileImage();

      //updating data in localstorage
      localStorage.setItem('data', JSON.stringify(User));

      Swal.fire('Updated');
      setLoading(false);

    } catch (error) {
      Swal.fire('Failed');
    }

  }


  return (

    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6}>
      {/*user data from*/}
      <>
        <FormControl>                                                        
          <FormLabel>{t("FName")}</FormLabel>                                 {/*to avoid controlled or unctrolled added or condition*/}
          <Input  type="text" name='firstname' value={userData.firstname || ''} onChange={handelChange} />
        </FormControl>

        <FormControl >
          <FormLabel>{t("LName")}</FormLabel>
          <Input  type="text" name="lastname" value={userData.lastname || ''} onChange={handelChange} />
        </FormControl>

        <FormControl >
          <FormLabel>{t("phone")}</FormLabel>
          <Input  type="tel" name="contactno" value={userData.contactno || ''} onChange={handelChange} />
        </FormControl>

        <FormControl >
          <FormLabel>{t("Email")}</FormLabel>
          <Input
             type="email" name="email" value={userData.email || ''} onChange={handelChange} />
        </FormControl>

        <FormControl >
          <FormLabel>{t("Salary")}</FormLabel>
          <Input  type="email" name="salary" value={userData.salary || ''} onChange={handelChange} />
        </FormControl>

        <FormControl >
          <FormLabel>{t("DOB")}</FormLabel>
          <Input  type="date" name="dateofbirth" value={userData.dateofbirth || ''} onChange={handelChange} />
        </FormControl>

        <FormControl >
          <FormLabel>{t("Addr")}</FormLabel>
          <Input  type="text" name="address" value={userData.address || ''} onChange={handelChange} />
        </FormControl>
      </>
      {/*button div*/}
      <div style={{ paddingTop: '20px', margin: '0 auto', textAlign: 'center' }}>
        <Button style={{ background: 'grey' }} onClick={() => { editfunction(userData) }}>{loading ? "Updating..." :t("Submit")}</Button>
        <Button style={{ marginLeft: "10px" , background: 'grey' }} onClick={handleClose}>{t("Cancel")}</Button>
      </div>

    </Grid>
  )
}
export default AccountSettings
