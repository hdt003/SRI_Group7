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
