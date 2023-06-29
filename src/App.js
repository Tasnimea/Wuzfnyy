import './App.css';
import Registeration from './Component/Loginone/loginone';
import Home from './Component/Home/home';
import ContactUs from './Component/ContactUs/ContactUs';
import JobOffers from './Component/JobOffers/JobOffers';
import SingleJob from './Component/JobOffers/single-job';
import AddJob from './Component/AddJob/AddJob';
import OurBlog from './Component/OurBlog/OurBlog';
import Profile from './Component/Pro/pro';
import FindPeople from './Component/FindPeople/findPeople';
import Page1 from './Component/Page1/page1';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './Component/Nav/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Protected from './Component/protected/protected';
import { onAuthStateChanged,} from "firebase/auth";
import {auth} from './firbase-confing'
import React, { useState ,useEffect} from 'react';
import Footer from './Component/Footer/footer';
import EditProfile from './Component/Pro/editPro';
import UserProfile from './Component/FindPeople/userProfile';
import NotFound from "./Component/NotFound/NotFound";
import { Provider } from 'react-redux'
import store from './Component/store/store/store'

function App() {
  const [isAuth,setAuth]= useState()
  useEffect(() => {
            onAuthStateChanged(auth, (currentUser) => {
              if (currentUser==null){
                setAuth(false)
  
                
              }else{
                setAuth(true)
  
              }
            });
          
          },)
  return (
    <>
      <Router>
        <NavBar />
        <Provider store={store}>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Home" exact component={Home} />
          <Route path="/Registeration" exact component={Registeration} />
          <Route path="/ContactUs" exact component={ContactUs} />
          <Route path="/EditProfile" exact component={EditProfile} />
          <Route path="/Page1" exact component={Page1} />
          <Route path="/Job" exact component={JobOffers} />
          <Route path="/SingleJob" exact component={SingleJob} />
          <Route path="/AddJob" exact component={AddJob}isLogin={isAuth} />
          <Route path="/OurBlog" exact component={OurBlog} />
          <Route path="/FindPeople" exact component={FindPeople} />
          <Protected path="/Profile" component={Profile} isLogin={isAuth}/>
          <Route path="/UserProfile" exact component={UserProfile} />
          <Route path="*" component={NotFound}/>

        </Switch>
        </Provider>

        <Footer />

      </Router>
    </>
  );
}

export default App;
