import NavBar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile';
import ContactUs from './components/ContactUs';
import { auth } from './firebase';
import { useEffect,useState } from 'react';
function App() {
  const [Userid,setUserid]=useState("")
  const [mode,setMode]=useState("dark");
  const [aalert,setAlert]=useState("Light Mode Enabled")

  useEffect(()=>{ 
    
    auth.onAuthStateChanged((user)=>{
      // console.log("user:",user)
      if(user){
        setUserid(user.uid)
      }
    });
    togglemode();
  },[])

      //to change mode
      const togglemode=()=>{
        
        if(mode==="dark")
        {
          setMode("light")
            // document.body.style.backgroundColor="rgb(45,82,71)";
            document.body.style.backgroundImage="none"
            document.body.style.backgroundImage="linear-gradient(90deg, #3EADCF 0%, #ABE9CD 100%)";//blue //rgb(71, 194, 255)"//linear-gradient(90deg, #ff4800 0%, #dd2476 100%)
            document.body.style.color="black"
            setAlert("dark mode Enabled")
            // console.log("light")
            document.title="Menu App - Light mode"
        }
         if(mode==="light")
        {
          setMode("dark")//linear-gradient(to right, #0000ff, #add8e6)
          document.body.style.backgroundImage = "none";
          document.body.style.backgroundColor="rgb(48, 51, 51)";//black
          document.body.style.color="white"
          setAlert("Light mode Enabled")
          // console.log("dark")
          document.title="Menu App - Dark mode"
        }
    }

    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    
    function alertfunc() {
      var wrapper = document.createElement('div')
      wrapper.innerHTML = '<br/><div class="alert alert-success alert-dismissible text-dark text-center border-2 border-dark" role="alert">' + aalert + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
      alertPlaceholder.appendChild(wrapper)
      clc()
    }

  //to clear alert box every 5 seconds
  function clc(){
  setTimeout(() => {
    // clearBox()
    document.getElementById('liveAlertPlaceholder').innerHTML = "";
  }, 5000);
} 

  return (
    <>
    <div>
    <Router>
      <hr style={{width:"10px"}}/>
      <NavBar mode={mode} togglemode={togglemode} alert={alertfunc}/>
    <div className='mt-5 container ' id="liveAlertPlaceholder"></div>
    {/* <br/> */}
        <Routes>
            {/* <Route exact path="/" element={<Area uid={Userid } value={timeBasedFood(new Date)} field="type" pagename="home" mode={mode}/> }/> */}

            <Route exact path="/contact" element={<ContactUs uid={Userid } mode={mode}/>}/>

            <Route exact path="/login" element={<Login mode={mode}/>}/>
            <Route exact path="/SignUp" element={<SignUp mode={mode}/>}/>
            <Route exact path="/Profile" element={<Profile uid={Userid } mode={mode}/>}/>
        </Routes>
      </Router>
      </div>
    </>
  );
}

export default App;
