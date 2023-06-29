import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "./../../firbase-confing";
import { Link, useHistory } from "react-router-dom";
import Registeration from "../Loginone/loginone";
import Login from "../Loginone/LoginForm";
import { BiLogOutCircle } from "react-icons/bi";
import "./nav.css";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const NavBar = () => {
  const history = useHistory();

  const [show, setshow] = useState();
  const [userr, setUserr] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [data, setdata] = useState();

  const [isAuth, setAuth] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser == null) {
        setAuth(false);
        setshow(false);
      } else {
        setAuth(true);
        setshow(true);
        setUserr(currentUser);
       

      }

      getUserData();
    });
	// console.log(data);

	
  });

  const getUserData = async () => {
    await getDoc(doc(db, `users/${userr.email}`)).then((res) => {
      setdata(res.data());
    },[data]);
  };
  const handleLogin = async (event) => {
    //    event.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("item_key");
    history.push("/Home");
  };
  return (
    <>
      <nav class="navbar px-5 navbar-expand-lg navbar-light bg-light ">
        <Link
          to="/Home"
          className="nav-link col-md-2 col-6 "
          aria-current="page"
        >
          <a href="#." class="navbar-brand">
            <b style={{ fontSize: "1.8rem" }}>Wazafnyy</b>
          </a>
        </Link>

        <button
          type="button"
          class="navbar-toggler col-sm-1 col-3"
          data-toggle="collapse"
          data-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          id="navbarCollapse"
          class="collapse navbar-collapse justify-content-start"
        >
          <form class="navbar-form form-inline mx-4">
            <div class="input-group search-box">
              <input
                type="text"
                id="search"
                class="form-control"
                placeholder="Search here..."
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="material-icons">&#xE8B6;</i>
                </span>
              </div>
            </div>
          </form>

          <div class="navbar-nav">
            <a href="#" class="nav-item nav-link">
              <Link to="/Home" className="nav-link " aria-current="page">
                Home
              </Link>
            </a>

            <a href="#" class="nav-item nav-link">
              <Link to="/FindPeople" className="nav-link " aria-current="page">
                Find Peopel
              </Link>
            </a>
            <a href="#" class="nav-item nav-link">
              <Link to="/Job" className="nav-link   " aria-current="page">
                Job Offers
              </Link>
            </a>

            <a href="#" class="nav-item nav-link">
              <Link to="/ContactUs" className="nav-link " aria-current="page">
                Contact Us
              </Link>
            </a>

            {show === true && (
              <a href="#" class="nav-item nav-link">
                <Link to="/Profile" className="nav-link  " aria-current="page">
                  Profile
                </Link>
              </a>
            )}

            {show ===true && data &&data.Role==="company"&& (
              <a href="#" class="nav-item nav-link ">
                <Link
                  to="/AddJob"
                  className="nav-link  "
                  aria-current="page"
                  style={{ border: ".5px solid grey" }}
                >
                  {" "}
                  + Post a Job
                </Link>
              </a>
            )}
          </div>
          {show === false && (
            <div class="navbar-nav ml-auto action-buttons">
              <div class="nav-item dropdown">
                <a
                  href="#"
                  data-toggle="dropdown"
                  class="nav-link dropdown-toggle mr-4"
                >
                  Login
                </a>
                <div class="dropdown-menu action-form">
                  <Login></Login>
                </div>
              </div>
              <div class="nav-item dropdown">
                <a
                  href="#"
                  data-toggle="dropdown"
                  class="btn btn-primary dropdown-toggle sign-up-btn"
                >
                  Sign up
                </a>
                <div class="dropdown-menu action-form">
                  <Registeration> </Registeration>
                </div>
              </div>
            </div>
          )}
          {show === true && (
            <a
              href="#"
              onClick={logout}
              class="btn ml-auto btn-primary sign-up-btn"
            >
              <div className="d-flex align-items-center">
                {" "}
                <BiLogOutCircle /> <span>Logout</span>{" "}
              </div>
            </a>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
