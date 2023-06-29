import "./findPeople.css";
import { BiSearchAlt } from 'react-icons/bi';
import Form from 'react-bootstrap/Form';
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
    limit,
    query,
    where,
    getDoc,
} from "firebase/firestore";
import { Item } from "semantic-ui-react";

const FindPeople = () => {

    const [input, setInput] = useState("");
    const [result, setResults] = useState([]);



    const getCategory = async () => {
        const data = await getDocs(collection(db, "users"));

        return data.docs.map((doc) => ({ ...doc.data(), main_id: doc.id }));
    };

    useEffect(() => {
        getCategory().then((res) => {
            setResults(res);
        });

    }, [result, input]);


    return (
        <>
            <div className="container-fluid">
                <div class="wrapper">

                    <div class="row header d-flex justify-content-between mb-3">

                        <div className="col-md-6 col-12 d-flex justify-content-center justify-content-md-start">
                            Find People
                        </div>
                        <div className="col-md-6 col-12 d-flex justify-content-end ">
                            <div class="search-box">
                                <button class="btn-search"><BiSearchAlt size={30} /></button>
                                <input type="text" class="input-search" placeholder="Type to Search..." onChange={(event) => {
                                    setInput(event.target.value?.toLowerCase());
                                }} />
                            </div>
                        </div>
                    </div>

                    <div class=" d-flex flex-wrap my-5 justify-content-center">
                        {result
                            .filter((x) => x.postion?.toLowerCase().includes(input))
                            .map((ele,i) => {

                                return (
                        <Link style={{ textDecoration: 'none' }} to={{
                  pathname: '/UserProfile',
                  state: {ele}
                    
                  
                }}   key={i}    >
                        <article  class="profile d-flex justify-content-center m-3 align-items-center">
                                        <div class="profile-image">
                                            <img src={ele.pic}  alt="."/>
                                        </div>
                                        <h2 class="profile-username" style={{ color: "#33cabb" }}>{ele.name}</h2>
                                        <small class="profile-user-handle">{ele.postion}</small>
                                        <div class="profile-actions">
                                            <button class="btn" style={{ backgroundColor: "#33cabb" }}>Follow</button>

                                        </div>
                                        <div class="profile-links">
                                            <a class="link link--icon">
                                                <i class="ph-twitter-logo"></i>
                                            </a>
                                            <a class="link link--icon">
                                                <i class="ph-facebook-logo"></i>
                                            </a>
                                            <a class="link link--icon">
                                                <i class="ph-instagram-logo"></i>
                                            </a>
                                        </div>
                                    </article>
                                 </Link>

                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FindPeople;