import React, { useEffect, useState } from 'react'
import {db} from '../firebase'
import { getDoc,updateDoc } from "firebase/firestore"; 
import { doc } from "firebase/firestore"; 
import diet from "../images/diet.png"
import edit from "../images/edit.png"
import editlight from "../images/edit-light.png"
import "../css/profileplaceholder.css"
export default function Profile(props) {
    // console.clear();
    let [fname,setFName]=useState("")
    let [lname,setLName]=useState("")
    let [email,setEmail]=useState("")
    
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
          setDietplan(data.dietplan);
          setcalory(data.calory);
      }
      else {
      // doc.data() will be undefined in this case
      console.log("Data not load!");
      }     
  }
    useEffect(() => {
        
        fetchData();
      },[]);
