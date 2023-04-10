import React, { useState } from "react";
import UserContext from "./userContext";
import { postData } from "../../api/serverServices";
import host from "../../host";

const UserState = (props) => {
  //USER

  //update image state
  const [imgFile, setImgFile] = useState({});
  //change image on UI                                                   
  const [imgurl, setImgUrl] = useState("");
  //Age state
  const [age, setAge] = useState(0);

  //ADMIN

  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([])
  const [admins, SetAdmins] = useState([])
  const [stocks, setStocks] = useState([])
  const [funds, setFunds] = useState([])
  const [gsts, setGsts] = useState([]);

/*                                                                                      USER SIDE CODE START                                                             */

  //EDIT PROFILE
  const editProfile = async (User) => {
    const { _id, firstname, lastname, email, dateofbirth, contactno, address, salary } = User;

    const response = await fetch(`${host}/updateuserbyid/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstname, lastname, email, dateofbirth, contactno, address, salary })
    });
    const res = await response.json();

    let newUsers = JSON.parse(JSON.stringify(users))

    for (let index = 0; index < newUsers.length; index++) {
      const element = newUsers[index];
      if (element._id === _id) {
        newUsers[index].firstname = firstname;
        newUsers[index].lastname = lastname;
        newUsers[index].email = email;
        newUsers[index].dateofbirth = dateofbirth;
        newUsers[index].contactno = contactno;
        newUsers[index].address = address;
        newUsers[index].salary = salary;
        break;
      }
    }
    setUsers(newUsers);

    //returning response
    return res.status;
  }

  //CHANGE PROFILE IMAGE
  const setProfileImage = async () => {
    //types allowed
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

    //if useref has the file and search if array include certain element or not
    if (imgFile && ALLOWED_TYPES.includes(imgFile.type)) {
      const { email } = await JSON.parse(localStorage.getItem('data'))

      //storing data in formdata to send  
      const Data = new FormData();
      Data.append('img', imgFile)
      Data.append('email', email)

      //(API)postdata takes input data and whether it is multipart/form-data or not 
      const res = await postData("editprofilepic", Data, true)

      //setImgurl - if res has img key
      if (res.hasOwnProperty('img')) {
        setImgUrl(res.img);             //set UI image
        return res.img                  //returning image url
      }
    }
    //if imgfile is empty than return localstorage img url
    return JSON.parse(localStorage.getItem('data')).userprofilepic;
  }

  /*                                                                                      ADMIN SIDE CODE START                                                             */

  const AddAdmin = async(Name,adminemail, adminPassword, mobilenumber) => {
    // //console.log("add admin called");
    const response = await fetch(`${host}/addadmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('admin_token')
      },
      body: JSON.stringify({Name, adminemail, adminPassword, mobilenumber })
    });
    const result = await response.json();
    return result
  }

  //GET ALL USER
  const getUsers = async () => {
    const response = await fetch(`${host}/getallusers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setUsers(json);
  }

  //EDIT USER STATUS
  const editUser = async (id, approval) => {
    const response = await fetch(`${host}/api/admin/updateuserbyid/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ approval })
    });
    const json = await response.json();
    //console.log(json);

    let newUsers = JSON.parse(JSON.stringify(users))
    for (let index = 0; index < newUsers.length; index++) {
      const element = newUsers[index];
      if (element._id === id) {
        if (newUsers[index].approval === true) {
          newUsers[index].approval = false;
        } else {
          newUsers[index].approval = true;
        }

        break;
      }
    }
    setUsers(newUsers);
  }

  //DELETE USER 
  const deleteUser = async (id) => {
    const response = await fetch(`${host}/deleteuserbyid/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token':localStorage.getItem('token')
      },
    });
    const res = response.json();
    //console.log(res);

    //console.log("Deleting");
    const newUsers = users.filter((user) => { return user._id !== id })
    setUsers(newUsers)
  }


  //PERMIT USER
  const PermitUser = async (id) => {
    const permission = "YES"
    const response = await fetch(`${host}/updateuserbyid/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permission })
    });
    const json = await response.json();
    //console.log(json);

    let newUsers = JSON.parse(JSON.stringify(users))
    for (let index = 0; index < newUsers.length; index++) {
      const element = newUsers[index];
      if (element._id === id) {
        newUsers[index].permission = 'YES'
        break;
      }
    }
    setUsers(newUsers);
  }

  //DISAPPROVE USER
  const UnPermitUser = async (id) => {
    const permission = "NO"
    const response = await fetch(`${host}/updateuserbyid/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permission })
    });
    const json = await response.json();
    //console.log(json);

    let newUsers = JSON.parse(JSON.stringify(users))
    for (let index = 0; index < newUsers.length; index++) {
      const element = newUsers[index];
      if (element._id === id) {
        newUsers[index].permission = 'NO'
        break;
      }
    }
    setUsers(newUsers);
  }



  const getGsts = async () => {
    const response = await fetch(`${host}/getallgst`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // //console.log(json);
    setGsts(json)
    // //console.log(users);
  }

  //to get all stocks
  const getStocks = async () => {
    const response = await fetch(`${host}/getallstocks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // //console.log(json);
    setStocks(json)
    // //console.log(users);
  }

  //to get all stocks
  const getFunds = async () => {
    const response = await fetch(`${host}/getallfunds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    // //console.log(json);
    setFunds(json)
    // //console.log(users);
  }

  //to get all admins
  const getAdmins = async () => {
    const response = await fetch(`${host}/getalladmins`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('admin_token')
      },
    });
    const json = await response.json();
    //console.log(json);
    SetAdmins(json)
    //console.log(users);
  }

  const getFeedbacks = async () => {
    const response = await fetch(`${host}/getfeedback`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    //console.log(json.data);
    setFeedbacks(json.data)
    //console.log(feedbacks);
  }

  //to permit feedback
  const PermitFeedback = async (id) => {
    const feedbackpermission = "YES"
    const response = await fetch(`${host}/updatefeedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedbackpermission })
    });
    const json = await response.json();
    //console.log(json);

    let newFeedbacks = JSON.parse(JSON.stringify(feedbacks))
    for (let index = 0; index < newFeedbacks.length; index++) {
      const element = newFeedbacks[index];
      if (element._id === id) {
        newFeedbacks[index].feedbackpermission = 'YES'
        break;
      }
    }
    setFeedbacks(newFeedbacks);
  }

  //to disapprove feedback
  const UnPermitFeedback = async (id) => {
    const feedbackpermission = "NO"
    const response = await fetch(`${host}/updatefeedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedbackpermission })
    });
    const json = await response.json();
    //console.log(json);

    let newFeedbacks = JSON.parse(JSON.stringify(feedbacks))
    for (let index = 0; index < newFeedbacks.length; index++) {
      const element = newFeedbacks[index];
      if (element._id === id) {
        newFeedbacks[index].feedbackpermission = 'NO'
        break;
      }
    }
    setFeedbacks(newFeedbacks);
  }

  //to delete feedback
  const deleteFeedback = async (id) => {
    const response = await fetch(`${host}/deletefeedback/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // 'auth-token':localStorage.getItem('token')
      },
    });
    const res = response.json();
    //console.log(res);

    //console.log("Deleting");
    const newFeedbacks = feedbacks.filter((feedback) => { return feedback._id !== id })
    setFeedbacks(newFeedbacks)
  }


  return (
    //it is global data which can be shared between childrens
    <UserContext.Provider value={{ users, deleteUser, editUser, getUsers, PermitUser, UnPermitUser, editProfile, setProfileImage, setImgFile, imgurl, setImgUrl, age, setAge, AddAdmin, gsts, getGsts, feedbacks, getFeedbacks, deleteFeedback, PermitFeedback, UnPermitFeedback, admins, getAdmins, stocks, getStocks, funds, getFunds }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
