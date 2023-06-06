import { doc, setDoc } from 'firebase/firestore';
import React, {  useEffect ,useState } from 'react'
import {db} from '../firebase'
import "../css/placeholder1.css"
export default function ContactUs(props) {
    let [subject,setSubject]=useState("")
    let [message,setMessage]=useState("")
    let [userId,setUserId]=useState("")

    let obj = {
        sub:subject,
        msg:message
    }
    useEffect(()=>{
            setUserId(props.uid)
        },[])

    const insertData=(async()=>{
        await setDoc(doc(db, "contactus",userId), obj);
        // console.log(obj);
        console.log("data inserted in db");
        document.getElementById("new").innerHTML="Submitted"
        })
    const check=()=>{
    
        if(subject==="" && message==="")
        {
            document.getElementById("new").innerHTML="Enter Subject and Description"
        }
        else if(subject==="")
        {
            document.getElementById("new").innerHTML="Enter Subject"
        }
        else if(message==="")
        {
            document.getElementById("new").innerHTML="Enter Description"
        }
        else{
            insertData();
        }
    }
    

    