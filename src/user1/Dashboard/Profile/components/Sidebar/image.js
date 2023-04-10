import {  VStack, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState,useContext } from 'react'
import userContext from '../../../../../context/users/userContext';

const UserImage = () => {

    //userdata state
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('data')))
    }, [])

    //setImage and get url of image
    const context = useContext(userContext);
    const {setImgFile,imgurl} = context

    //to store image 
    const inputImage = useRef(null)

    //give popup to choose image
    const openChooseImage = () => {
        inputImage.current.click()  
    }

    return (
    
        <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
            {/* <Avatar style={{ background: '#063970' }} size="2xl" cursor="pointer" alt={user.firstname} name="img" src={"https://bit.ly/dan-abramov"} ></Avatar> */}
            <div style={{ borderRadius: "50%", height: "150px", width: "150px", objectFit: "none", border: "1px solid black" }}>

                <img style={{ borderRadius: "50%", objectFit: "cover", width: " 100 %", height: "100%", cursor: "pointer" }} alt={`${user.firstname} ${user.lastname}`} src={imgurl}  onClick={openChooseImage}/>

            </div>
            {/*used input to get popup dialogbox to get data from user*/}
            <input hidden type="file" ref={inputImage} onChange={()=>setImgFile(inputImage.current.files[0])}/>   {/*(useContext)to send imageFile data to AccountSetting */}
            <Text fontSize='3xl' >{user.firstname} {user.lastname}</Text>
            
        </VStack>
    )
}

export default UserImage;