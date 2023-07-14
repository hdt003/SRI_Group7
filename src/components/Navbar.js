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
      <nav className="fw-bold fixed-top"style={{background: "white",color:"black !important"}} >
      <div className="left-side" >
        <input type="checkbox"/>
        <div className="nav-links" style={{background:"white",color:"black", "textDecoration": "none"}}>
          
          <h3><img src="https://www.linkpicture.com/q/7896.png" alt="..." height="38px" width="35px"/></h3>
          <h3 style={{color:"black", "textDecoration": "none"}}>TastyGo</h3>
          <div className="nav-link-wrapper hover-underline-animation"><Link style={{color:"black", "textDecoration": "none"}} to="/">Home</Link></div>
          
        <div className="nav-link-wrapper hover-underline-animation"><Link style={{color:"black", "textDecoration": "none"}} to="/contact">Contact Us</Link></div>
  
        </div>
      </div>
      <div className="right-side">
      
      <div className="">
        {auth.currentUser &&<div className="px-2 mx-2 hover-underline-animation" ><Link to="/Profile"  style={{color:"black", "textDecoration": "none"}}>Profile </Link></div>}
        {auth.currentUser && <div className="px-2 mx-2 nav-link-wrapper hover-underline-animation"><Link style={{color:"black", "textDecoration": "none"}}  onClick={logOutAndGoToSignUp}> Logout</Link></div>}
         {!auth.currentUser &&<div className="px-2 mx-2 hover-underline-animation"><Link to="/login" style={{color:"black", "textDecoration": "none"}}> Login </Link></div>}
        {!auth.currentUser && <div className="px-2 mx-2 hover-underline-animation"><Link to="/SignUp"  style={{color:"black", "textDecoration": "none"}}> SignUp </Link></div>} 
      </div>
        <div className={`menuu ${"light2"}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
    </>
  );
}
