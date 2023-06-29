import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
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



const OurBlog = () => {




    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);



    const handleLogin = async (event) => {
        //    event.preventDefault();
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful');
        } catch (error) {
            setError(error.message);
        }
    };

    return (

        <>
            <div className="container">
                <div className="row shadow my-5">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                        <h1 className="m-5 col-9" style={{textAlign:"center", color:"#008080", fontWeight:"600"}}>Every One Is Looking For A Good Job So This Is The Best Website To Follow Your Dream</h1>
                        <img className="my-5" src={require("../image/51_20171006103203.jpg")} width={"50%"} alt="" />
                        <p className="fs-4" style={{fontWeight:"400", textAlign:"center"}}>On This Site, We Are Within You To Find The Appropriate Job For Your Field Also, We Guarantee You To Find The Complete Privacy Of Your Information And There Are More Than 1,000 Opportunities To Work In All Fields Here Your Dream Will Start To Investigate. You Will Find The Right Job For You To Be Rich In Information And Money. Here, The Challenge Between You And Yourself Will Start To Find The Job That You Dreamed Of Throughout Your Life Here In Wazafnny</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurBlog;