import { collection, deleteDoc, doc } from 'firebase/firestore';
import React, {  useEffect ,useState } from 'react'
import {db} from '../firebase'
import { getDocs,query,getDoc } from "firebase/firestore";
import { auth } from '../firebase';
import deletee from "../images/delete.png"
export default function Cart(props) {
    // console.clear();
    let [userId,setUserId]=useState("")
    let [array,setArray]=useState([])
    let [runonce,setrunonce]=useState(0)
    let [ct,setct]=useState(0)
    let [sum,setsum]=useState(0)
    let [totcalory,settotcalory]=useState(0)
    let [dailycalory,setdailycalory]=useState(Number.MAX_VALUE)
    let [overload,setoverload]=useState(0)
    let temp=0,temp2=0
    let dc=Number.MAX_VALUE;//dailycalory
    async function fetchcartData() {
      setct(0)
      setArray([]);
      // console.log("fetchdata")
      const querySnapshot = await getDocs(query(collection(db,"cart",props.uid,"orders")));
      querySnapshot.forEach((doc) => {
      setct(++ct)
      temp+=doc.data().price
      setsum(temp)
      temp2+=doc.data().calories
      settotcalory(temp2)
      if(temp2>dc)
      {
        setoverload(1);
      }
      if(temp2<=dc)
      {
        setoverload(0);
      }
      setArray(array => [...array, doc.data()]);
      });
    }
    async function fetchUserData() {
      const docRef =  doc(db, "users", props.uid);
      // await setDoc(doc(db, "users",user_id), docData);
      const docSnap =  await getDoc(docRef);
      if (docSnap.exists()) {
          let data=docSnap.data();
          console.log("Userdata:",data);
          setdailycalory(data.calory);
          dc=data.calory;
          console.log("user data successfully fetched");
      }
      else {
      // doc.data() will be undefined in this case
      console.log("Data not load!");
      }     
    }
    // async function checkcalory(){
    //   console.log("tot",totcalory)
    //   console.log("daily",dailycalory)
    //   if(totcalory>dailycalory)
    //   setoverload(1);
    // }
      useEffect(()=>{
          if(runonce===0){
          setct(0);
          setUserId(props.uid)
          fetchUserData();
          fetchcartData();
          // checkcalory();
          setrunonce(1);
          console.log(overload)
          }
      },[])
