import '../ContactUs/ContactUs.css';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

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
import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

const ContactUs = () => {




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

<div class="container-xxl bg-white p-0">

<div class="container-xxl position-relative p-0">
    
    {/* <div class="container-xxl py-5  hero-header mb-5" style={{backgroundColor:"#555"}}>
        <div class="container text-center my-5 pt-5 pb-4">
            <h1 class="display-3 text-white animated slideInDown contactt">Contact Us</h1>
            
        </div>
    </div> */}

<h4 class="display-4 text-center my-5 pt-5 pb-4  animated slideInDown ">Contact Us</h4>

</div>

<div class="container-xxl py-5">
    <div class="container">
        <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
        </div>
        <div class="row g-4">
            <div class="col-12">
                <div class="row gy-4 d-flex  justify-content-between">
                    <div class="col-md-4">
                        <h5 class="section-title ff-secondary fw-normal text-start">Booking</h5>
                        <p><i class="fa fa-envelope-open  me-2" style={{color:"33CABB"}}></i>book@example.com</p>
                    </div>
                    <div class="col-md-4">
                        <h5 class="section-title ff-secondary fw-normal text-start ">General</h5>
                        <p><i class="fa fa-envelope-open  me-2" style={{color:"33CABB"}}></i>info@example.com</p>
                    </div>
                    <div class="col-md-4">
                        <h5 class="section-title ff-secondary fw-normal text-start ">Technical</h5>
                        <p><i class="fa fa-envelope-open  me-2" style={{color:"33CABB"}}></i>tech@example.com</p>
                    </div>
                </div>

{/*  */}
                
<div className='row'>

<div class="col-md-6 wow fadeIn container reveal fade-left" data-wow-delay="0.1s">
                        <iframe class="position-relative rounded w-100 h-100"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
                            frameborder="0" style={{minHeight: "350px", border:"0"}} allowfullscreen="" aria-hidden="false"
                            tabindex="0"></iframe>
                    </div>
                    <div class="col-md-6 container reveal fade-right">
                        <div class="wow fadeInUp" data-wow-delay="0.2s">
                            <form>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="name" placeholder="Your Name"/>
                                            <label for="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                            <input type="email" class="form-control" id="email" placeholder="Your Email"/>
                                            <label for="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="subject" placeholder="Subject"/>
                                            <label for="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-floating">
                                            <textarea class="form-control" placeholder="Leave a message here" id="message" style={{height: "150px"}}></textarea>
                                            <label for="message">Message</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="btn w-100 py-3" style={{backgroundColor:"#33CABB"}} type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
</div>



{/*  */}



            </div>
        
        </div>



    </div>
</div>



</div>
        </>
    );
}

export default ContactUs;