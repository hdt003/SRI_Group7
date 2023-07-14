import React, { useEffect, useState } from 'react'
import Item from './Item'
import {db} from '../firebase'
import { getDocs,query,where,orderBy,collectionGroup, updateDoc } from "firebase/firestore"; 
import { doc, setDoc} from "firebase/firestore"; 
import { deleteDoc } from 'firebase/firestore';
import ItemPage from './ItemPage';
// import docref
export default function Area(props) {
  // console.clear();

  let [array,setArray]=useState([])
  var ranonce = false;

  let [isTrue,setIsTrue]=useState(false)
  let [obj2,setobj2]=useState({})

  let [p,setP]=useState("k")//to check old props with new props
  let [lastmode,setlastmode]=useState("light")
  // let [once,setonce]=useState(0)
  const pull_data=(data) =>{
    setobj2(data)
    console.log("obj2:",obj2);
    setIsTrue(true)  
  }

  function timeBasedFood(date) {
    var hours = date.getHours();
    if((hours>=4 && hours<11) || (hours>=16 && hours<=17))
    return "Breakfast";
    else if(hours>=11 && hours<16)
    return "Lunch";
    else if((hours>=18 && hours<=23) || (hours>=0 && hours<=3) )
    return "Dinner";
  }
  function temp(){
    if(props.mode!==lastmode )
    {
      // console.log("lastmode: ",lastmode);
      // console.log("current mode: ",props.mode)
      fetchData();
      setlastmode(props.mode)
    }
    if(p==="k")
    {
      setP(timeBasedFood(new Date))
      setP(props.value)
    }
    else if(props.value!==p )
    {
      // console.log("p: ",p);
      // console.log("props.value: ",props.value)
      fetchData();
      setP(props.value);
      setIsTrue(false)
    }
}
setTimeout(temp, 0); 
    // if(props.mode!=lastmode)
    // {
    //   window.location.replace(`/${props.value}`);
    //   setlastmode(props.mode)
    // }
async function fetchData() {
    setArray([]);
    console.log("fetchdata")
    let q;
    if(`${props.field}`==="popularity")
    {
      if(`${props.value}`==="htol")
      {
        q = query(collectionGroup(db, "items"), orderBy("popularity","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
        
      }
      else if(`${props.value}`==="ltoh")
      {
        q = query(collectionGroup(db,"items"), orderBy("popularity"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
      }
    }
    else if(`${props.field}`==="price")
    {
      if(`${props.value}`==="price_htol")
      {
        q = query(collectionGroup(db, "items"), orderBy("price","desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
        
      }
      else if(`${props.value}`==="price_ltoh")
      {
        q = query(collectionGroup(db,"items"), orderBy("price","asc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      });
      }
    }
    else
    {
        q = query(collectionGroup(db,"items"), where(`${props.field}`, "==", `${props.value}`));  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name,doc.data().popularity,doc.data().description);
        setArray(array => [...array, doc.data()]);
      }); 
    }   

}
