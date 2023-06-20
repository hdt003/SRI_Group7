import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { getDoc,updateDoc } from "firebase/firestore"; 
import { doc } from "firebase/firestore"; 
import edit from "../images/edit.png"
import editlight from "../images/edit-light.png"
import "../css/profileplaceholder.css"
export default function Profile(props) {
    // console.clear();
    let [fname,setFName]=useState("")
    let [lname,setLName]=useState("")
    let [email,setEmail]=useState("")
    let first="";
    let last="";
async function fetchData() {
      const docRef =  doc(db, "users", props.uid);
      // await setDoc(doc(db, "users",user_id), docData);
      const docSnap =  await getDoc(docRef);
      if (docSnap.exists()) {
          let data=docSnap.data();
          // console.log("Userdata:",data);
          setEmail(data.email);
          setFName(data.fname);
          setLName(data.lname);
          // setDietplan(data.dietplan);
          // setcalory(data.calory);
      }
      else {
      // doc.data() will be undefined in this case
      console.log("Data not load!");
      }     
  }
    useEffect(() => {
        
        fetchData();
      },[]);
     
      function updateFname()
      {
        const docRef = doc(db, "users", props.uid);
        const data = {
          // fname: fname,
          fname:first,
          // lname:last
        };
        updateDoc(docRef, data)
        .then(docRef => {
            console.log("A New First name Field has been added ");
        })
        .catch(error => {
            console.log(error);
        })
      }
      function updateLname()
      {
        const docRef = doc(db, "users", props.uid);
        const data = {
          // fname: fname,
          lname:last
        };
        updateDoc(docRef, data)
        .then(docRef => {
            console.log("A New First name Field has been added ");
        })
        .catch(error => {
            console.log(error);
        })
      }
    //   function checknum()
    // { 
    //   if (isNaN(calory)) 
    //   {
    //     return false;
    //   }
    // }
    function setupdatefirst(temp)
    {
      setFName(temp);
      first=temp;               
      updateFname()
    }
    function setupdatelast(temp)
    {
      setLName(temp);
      last=temp;               
      updateLname()
    }     
    return (
      <div>
          <div className="container">
  
              <h3 className='text-center' style={{color: `${props.mode==="dark"?"white":"black"}`}}>Your Profile</h3>
              <div >
                  <div className='row'>
                  <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>First Name:</h5>
                  {/*  */}
                  <div className='col-8 px-2 'style={{minWidth:"99px"}}>
                  <input className={`${props.mode==="light"?"light1":"dark1"} px-3 fw-bold col-12 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"} bg-opacity-25 border border-light rounded-3`} style={{minWidth:"90px",minHeight:"62px",fontSize:"23px",background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput3" value={fname!==""?fname:""} placeholder={fname!==""?"":"Enter First Name"} onChange={(event)=>{setupdatefirst(event.target.value)}}/>
                  </div>
                          
                  {/*  */}
                  </div>
                  <div className='row'>
                  <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{minWidth:"90px"}}>Last Name:</h5>
                  <div className='col-8 px-2 'style={{minWidth:"99px"}}>
                  <input className={`${props.mode==="light"?"light1":"dark1"} px-3 col-12 fw-bold bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"} bg-opacity-25 border border-light rounded-3`} style={{minWidth:"90px",minHeight:"62px",fontSize:"23px",background:`${props.mode==="light"?"white":"rgb(24,24,24)"}`,color:`${props.mode==="light"?"black":"white"}`}} id="exampleFormControlInput4" value={lname!==""?lname:""} placeholder={lname!==""?"":"Enter Last Name"} onChange={(event)=>{setupdatelast(event.target.value)}}/>
                  </div>
                  </div>
                  <div className='row' >
                  <h5 className={`p-3 col-2 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} >Email:</h5>
                  <h5 className={`p-3 mx-2 col-8 bg-${props.mode==="light"?"white bg-gradient":"dark bg-gradient"}  bg-opacity-25 border border-light  rounded-3`} style={{maxWidth:"744px"}}>{email}</h5>
                  </div>
          </div>
      </div>
      </div>
    )
}