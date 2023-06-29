import "./logintwo.css";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./../../firbase-confing";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [isAuth, setAuth] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser == null) {
        setAuth(false);
      } else {
        setAuth(true);
    localStorage.setItem("email" , currentUser.email);

      }
    });
  });

  const handleLogin = async (event) => {
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
    }
  };



  

  return (
    <>
      <div class="container content">
        <div className="row">
          <div>
            <p class="hint-text">Sign in with your social media account</p>
            <div class="form-group social-btn clearfix">
              <a href="#" class="btn btn-secondary facebook-btn float-left">
                 Facebook
              </a>
              <a href="#" class="btn btn-secondary twitter-btn float-right">
                Twitter
              </a>
            </div>
            <div class="or-seperator">
              <b>or</b>
            </div>
            <div class="form-group">
              <input
                defaultValue={email || ""}
                type="email"
                name="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                class="form-control"
                placeholder="Email"
                required="required"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                defaultValue={password || ""}
                class="form-control"
                placeholder="Password"
                required="required"
              />
            </div>
            <button onClick={handleLogin} class="btn btn-primary btn-block"  >login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
