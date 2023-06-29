import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
import { useHistory } from "react-router-dom";
// import { red } from "@material-ui/core/colors";
import "./logintwo.css";

const Registeration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [roleError, setRoleError] = useState("");

  const [user,setUser] = useState({
    userName: "" ,
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
    userPhone: "",
    userPosition: "",
    userRole: "",
  });
  const [error, setError] = useState({
    userNameError: null,
    userEmailError: null,
    userPasswordError: null,
    userConfirmPasswordError: null,
    userPhoneError: null,
    userPositionError: null,
    userRoleError: "",
  });
  const history = useHistory();

  // useEffect(()=>{
  //     const subscriber = onAuthStateChanged(auth, user => {

  //       if(user){

  //       navigation.navigate("Home")

  //       }

  //     });
  //     return subscriber;
  //   },[]);

  const handleSubmit = () => {
    //handleSignUp()
    if (email.length === 0) {
      setEmailError("Email is Required");
    } else {
      setEmailError("");
    }
    if (password.length === 0) {
      setPasswordError("Password is Required");
    } else {
      setPasswordError("");
    }
    if (position.length === 0) {
      setPositionError("Position is Required");
    } else {
      setPasswordError("");
    }
    if (name.length === 0) {
      setNameError(" Name is Required");
    } else {
      setNameError("");
    }
    if (phone.length === 0) {
      setPhoneError("Phone is Required");
    } else {
      setPhoneError("");
    }

    if (role === "company") {
      console.log("Option 1 is selected");
      // do something for option 1
    } else if (role === "candidate") {
      console.log("Option 2 is selected");
      // do something for option 2
    } else {
      console.log("Please select an option");
    }
  };

  const redirect = () => {
    history.push("/Home");
  };

  const handleSignUp = () => {
    // console.log(email, password)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setDoc(doc(db, "users", `${email.toLowerCase()}`), {
          name: name,

          password: password,

          email: email,

          phone: phone,

          postion: position,

          Role: role,

          cv: "",

          applied: [],

          pic: "",
        })
          .then(() => {
            console.log("data submitted");
          })
          .catch((error) => {
            console.log(error.messege);
          });

        console.log("signed up with : ", email);
      })
      .catch((error) =>
        alert("there was an error please try again Wazafnyy Team")
      );

    redirect();
  };

  const EmailRegex = /^[a-zA-Z0-9]{0,}(@)(yahoo|gmail|outlook)(.com)$/;
  const PassRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const AddingEmail = (evt) => {
    if (evt.target.name === "email") {
      setUser({
        ...user,
        userEmail: evt.target.value,
      });
      setError({
        ...error,
        userEmailError: !EmailRegex.test(evt.target.value)
          ? "please enter a valid email address"
          : null,
      });
    } else if (evt.target.name === "password") {
      setUser({
        ...user,
        userPassword: evt.target.value,
      });
      setError({
        ...error,
        userPasswordError: !PassRegex.test(evt.target.value)
          ? "please enter a valid password "
          : null,
      });
    } else if (evt.target.name === "position") {
      setUser({
        ...user,
        userPosition: evt.target.value,
      });
      setError({
        ...error,
        userPositionError:
          evt.target.value.length === 0 ? "this field is required" : null,
      });
    } else if (evt.target.name === "phone") {
      setUser({
        ...user,
        userPhone: evt.target.value,
      });
      setError({
        ...error,
        userPhoneError:
          evt.target.value.length === 0 ? "this field is required" : null,
      });
    } else if (evt.target.name === "role") {
      setUser({
        ...user,
        userRole: evt.target.value,
      });
      setError({
        ...error,
        userRoleError:
          evt.target.value.length === 0 ? "this field is required" : null,
      });
    } else if (evt.target.name === "userConfirmPassword") {
      setUser({
        ...user,
        userConfirmPassword: evt.target.value,
      });
      setError({
        ...error,
        userConfirmPasswordError: !(evt.target.value === user.userPassword)
          ? "password not match"
          : null,
      });
    }
  };

   // handler function to update state when radio button is changed
   const handleOptionChange = (event) => {
    setRole(event.target.value);
  };
    // check which radio button is selected
   
  


  return (
    <>
      <div>
        <p class="hint-text">Fill in this form to create your account!</p>
        <div class="form-group">
          <input
            type="email"
            onChange={(event) => {
              setEmail(event.target.value);
              AddingEmail(event);
            }}
            id="email"
            name="email"
            placeholder="Email"
            value={user.userEmail}
            onClick={handleSubmit}
            class="form-control"
          />
        </div>
        <small className="text-danger">{error.userEmailError}</small>

        <div class="form-group">
          <input
            onChange={(event) => {
              setPassword(event.target.value);
              AddingEmail(event);
            }}
            type="password"
            name="password"
            value={user.userPassword}
            id="password"
            placeholder="Password"
            onClick={handleSubmit}
            class="form-control"
          />
        </div>
        <small className="text-danger">{error.userPasswordError}</small>

        <div class="form-group">
          <input
            class="form-control"
            onChange={(event) => {
              setPassword(event.target.value);
              AddingEmail(event);
            }}
            type="password"
            id="ConfirmPassword"
            name="userConfirmPassword"
            placeholder="Password"
            value={user.userConfirmPassword}
            onClick={handleSubmit}
          />
        </div>
        <small className="text-danger">{error.userConfirmPasswordError}</small>

        <div class="form-group">
          <input
            class="form-control"
            onChange={(event) => setName(event.target.value)}
            type="text"
            id="name"
            placeholder="Name"
            onClick={handleSubmit}
          />
        </div>

        <div class="form-group">
          <input
            class="form-control"
            onChange={(event) => {
              setPosition(event.target.value);
              AddingEmail(event);
            }}
            type="text"
            id="position"
            name="position"
            placeholder="position"
            value={user.userPosition}
            onClick={handleSubmit}
          />

          
        </div>
        <small className="text-danger">{error.userPositionError}</small>

        <div class="form-group">
          <input
            class="form-control"
            onChange={(event) => {
              setPhone(event.target.value);
              AddingEmail(event);
            }}
            type="number"
            id="phone"
            name="phone"
            value={user.userPhone}
            placeholder="Phone Number"
            onClick={handleSubmit}
          />
        </div>
        <small className="text-danger">{error.userPhoneError}</small>

        {/* 
            <div class="form-group">
							<input  class="form-control" onChange={(event) => {setPhone(event.target.value);AddingEmail(event)}}
                    type="number"
                    id="phone"
                    name='phone'
                    value={user.userPhone}
                    placeholder="Phone Number"
                    onClick={handleSubmit} />



                    
						</div>



 */}

        <div class="form-check">
          <input
            class="form-check-input role"
            value="company"
            checked={role === "option1"} // check if this radio button is selected
            onChange={handleOptionChange}
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Company
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input role"
            value="Candidate"
            checked={role === "Candidate"} // check if this radio button is selected
            onChange={handleOptionChange}
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
          />
          <label class="form-check-label" for="flexRadioDefault2">
            Candidate
          </label>
        </div>
        <small className="text-danger">{error.userRoleError}</small>

        <button onClick={handleSignUp} class=" btn-primary btn-block btn mt-3">
          Login
        </button>
      </div>
    </>
  );
};

export default Registeration;
