import '../JobOffers/JobOffers.css';

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
import { Link, useHistory } from 'react-router-dom'

import { useSelector ,useDispatch} from 'react-redux';
import SingleJobReducer from "./../store/actions/singleJob";
const JobOffers = () => {
  
  const dispatch= useDispatch(); 


  const [result, setResults] = useState([]);


  const getCategory = async () => {
    const data = await getDocs(collection(db, "job"));

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  useEffect(() => {
    getCategory().then((res) => {
      setResults(res);

    });
  }, [result]);

  function handleDetails(jobId) {
    console.log(jobId)
  }
 function handleSingleJob(value){
  dispatch(SingleJobReducer(value))
 }
 


 

  return (


    <>
      <div>
        <div class="row mb-5 justify-content-center mx-0 p-2">
          <div class="col-md-7 mt-5 text-center m-0 p-2">
            <h2 class="display-4  mb-2">{result.length} Job Listed</h2>
          </div>
        </div>
        <div className=' row m-0 p-0 d-flex  justify-content-center'>
          <div className='col-9'>
            <ul class="job-listings mb-5">
            {result.map((ele,i) => {
              return (
                <Link style={{ textDecoration: 'none' }} to={{
                  pathname: '/SingleJob',
                }} key={i}>
              <li onClick={()=> handleSingleJob(ele)}  class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                <div class="job-listing-logo">
                  <img src={ele.pic} alt="Free Website Template by Free-Template.co" class="img-fluid px-2" />
                </div>

                <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between  ">
                  <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0 px-4">
                    <h2>{ele.CompanyName}</h2>
                    <strong>{ele.description}</strong>
                  </div>
                  <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25 ">
                    <span class="icon-room"></span> cairo
                  </div>
                  <div class="job-listing-meta px-2">
                    <span class="badge badge-danger">{ele.JobType}</span>
                  </div>
                </div>
                <div>
               
                        
                         
                      
                </div>
              </li>
              </Link>
              )
            })}
            </ul>
          </div>
        </div>


      </div>




    </>
  );
}

export default JobOffers;