import React, { useEffect, useState } from 'react'
import "../css/Itempage.css"
import vegg from "../images/veg.png"
import nonvegg from "../images/nonveg.png"
import { doc, setDoc,updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import "../css/rating.css"
import $ from 'jquery';
export default function ItemPage(props) {
  const navigate = useNavigate();
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let [p,setp]=useState({})
  let [str,setStr]=useState(generateString(15))
  useEffect(()=>{
    setp({
    img:props.img ,
    description:props.description,
    food_type:props.food_type,
    price:props.price,
    popularity: props.popularity,
    type:props.type,
    review:props.review,
    video:props.video ,
    name:props.name,
    address:props.address,
    calories:props.calories,
    totalRating:props.totalRating,
    usersRated:props.usersRated,
    uid:props.uid,
    oid:str
  })
  console.log(props.price)
  console.log("total rating :",props.totalRating)
  console.log("usersRated :",props.usersRated)
  },[])
  let rate=0;
  $(':radio').change(function() {
    console.log('New rating: ' + this.value);
    rate=parseFloat(this.value)//1 to 5
    updateuserRating()
  });
  function databaseRating()
  {
    // console.log("description:",props.description)
    var arr=[];
    console.log(props.review)
    if(props.review)
    {
      var i=1
      for(;i<=props.review;i++)
      {
        arr.push(<span className="fa fa-star checked"></span>)
      }
      for(;i<=5;i++)
      {
        arr.push(<span className="fa fa-star"></span>)
      }
      return arr;
    }
    return null;
  }