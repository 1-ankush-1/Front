import axios from 'axios';
import host from '../host';

//search machine ipadress with port (http://192.168.1.2:2000)in phone to see app running in mobile and make wifi network private

//for user postData
export const postData = async (url, body, isFile = false) => {
   
    try {
        //check if we are giving file in body 
        const headers = {
            headers: {
                "content-type": isFile ? "multipart/form-data" : "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}` || null // if token is found in local storage then autherized , bearer - get token
            }
        }
        //it will store the response    {it takes url and get url from any component}
        const result = await axios.post(`${host}/${url}`, body, headers)           //it calls post request

        //error - resolved issue is cors()
        const res = await result.data;

        //returning re data
        return res
    }
    catch (err) {
        console.log(err);
        return false
    }
}

//for user getData
export const gettData = async (url, body, isFile = false) => {
   
    try {
        //check if we are giving file in body 
        const headers = {
            headers: {
                "content-type": isFile ? "multipart/form-data" : "application/json",
                "authorization": `Bearer ${localStorage.getItem("token")}` || null // if token is found in local storage then autherized , bearer - get token
            }
        }
        //it will store the response    {it takes url and get url from any component}
        const result = await axios.get(`${host}/${url}`,{ params: body }, headers)           //it calls post request

        //error - resolved issue is cors()
        const res = await result.data;

        //returning re data
        return res
    }
    catch (err) {
        console.log(err);
        return false
    }
}

