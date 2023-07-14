import React from "react";
import "../css/Navbar.css";
import {auth} from "../firebase"
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

function logout(){
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("log-out successful.")
  }).catch((error) => {
    // An error happened.
    console.log("log-out Unsuccessful.Try again.")
  });
}
function logOutAndGoToSignUp()
{
  logout();
  window.location.replace("/SignUp");
}
export default function NavBar(props) {
  // useState(()=>{
  //   props.togglemode()
  // },[])
  return (
    <>
      <nav className="fw-bold fixed-top"style={{background: `${props.mode==="light"?"white":"black"}`,color:"black !important"}} >
      <div className="left-side" >
        <input type="checkbox"/>
        <div className="nav-links" style={{background:`${props.mode==="light"?"white":""}`,color: `${props.mode==="light"?"black":"white"}`, "textDecoration": "none"}}>
          
