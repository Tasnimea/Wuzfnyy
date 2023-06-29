import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom'
import {AiOutlineAlignLeft} from 'react-icons/ai';
import {BsRocketTakeoff} from 'react-icons/bs';
import {ImBook} from 'react-icons/im';
import {BsFillBookmarkCheckFill} from 'react-icons/bs';
import {AiFillHeart} from 'react-icons/ai';
import { useSelector ,useDispatch} from 'react-redux';
import FavouritMovies from "./../store/actions/actions";
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


const SingleJob = () => {

  const [result, setResults] = useState({});
  const [Loc, setLoc] = useState({});


  const getCategory = async () => {
    const data = await getDocs(collection(db, "job"));

    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  useEffect(() => {
    getCategory().then((res) => {
      setResults(res);
    });
setLoc(favs.singleJobR)
  }, [result]);

  function handleDetails(jobId) {
  }

//////////////////////////--------------////////////////////////////////////////
const favs = useSelector(state=>state)

const dispatch= useDispatch(); 


const removeFromFav = (removedId)=>{
  let removedMovie = favs.favMovies.find((fav)=>{
  return fav.id === removedId;
  })
  favs.favMovies.splice(favs.favMovies.indexOf(removedMovie),1)
}

const addtoFav =(mov)=>{
    let FindMovie = favs.favMovies.find((fav)=>{
      return fav.id === mov.id;
      });
    if (!FindMovie)
    {
        dispatch(FavouritMovies(mov))

    }
    if (FindMovie)
    {
      removeFromFav(mov.id)

    }

}

  return (


    <>

  <div className=" mt-5 container  justify-content-center ">
    
    
  <div class="row mb-5  ">
          <div class="col-lg-8 mb-4 mb-lg-0">
            <div class="d-flex align-items-center">
              <div class="border  d-inline-block mr-3 rounded">
                <img src={Loc.pic} style={{width:"90%"}} alt="Image"/>
              </div>
              <div>
                <h2>{Loc.name}</h2>
                <div>
                  <span class="ml-0 mr-2 mb-2"><span class="icon-briefcase mr-2"></span>Puma</span>
                  <span class="m-2"><span class="icon-room mr-2"></span>New York City</span>
                  <span class="m-2"><span class="icon-clock-o mr-2"></span><span class=""   style={{color:"#33CABB"}}>Full Time</span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row mx-5">
            <div class="col-md-6  col-12">
                <a href="#" class="btn btn-block btn-light btn-md"><AiFillHeart  color={favs.favMovies.find((fav) => fav.id === Loc.id)?"red":'black'} onClick={() => addtoFav(Loc)}   className="me-2"/>Save Job</a>
              </div>
              <div class="col-md-6 mt-2 mt-md-0 col-12">
                <a href="#" class="btn btn-block  btn-md"  style={{backgroundColor:"#33CABB"}}>Apply Now</a>
              </div>
            </div>
          </div>
      </div>
      <div class="row ">
          <div class="col-lg-8">
            <div class="mb-5">
              <figure class=""><img src={require("./../image/job_single_img_1.jpg")} alt="Image" class="img-fluid rounded"/></figure>
              <h3 class="h5 d-flex align-items-center mb-4 text-" style={{color:"#33CABB"}}><AiOutlineAlignLeft className="me-2"/>Job Description</h3>
              <p>{Loc.description}</p>
            </div>
            <div class="mb-5">
              <h3 class="h5 d-flex align-items-center mb-4 text-" style={{color:"#33CABB"}}><BsRocketTakeoff className="me-2"/>Responsibilities</h3>
              <ul class="list-unstyled m-0 p-0">
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Necessitatibus quibusdam facilis</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Velit unde aliquam et voluptas reiciendis n Velit unde aliquam et voluptas reiciendis non sapiente labore</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Commodi quae ipsum quas est itaque</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Deleniti asperiores blanditiis nihil quia officiis dolor</span></li>
              </ul>
            </div>

            <div class="mb-5">
              <h3 class="h5 d-flex align-items-center mb-4 text-" style={{color:"#33CABB"}}><ImBook className="me-2"/>Education + Experience</h3>
              <ul class="list-unstyled m-0 p-0">
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Necessitatibus quibusdam facilis</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Velit unde aliquam et voluptas reiciendis non sapiente labore</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Commodi quae ipsum quas est itaque</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Deleniti asperiores blanditiis nihil quia officiis dolor</span></li>
              </ul>
            </div>

            <div class="mb-5">
              <h3 class="h5 d-flex align-items-center mb-4 text-" style={{color:"#33CABB"}}><BsFillBookmarkCheckFill className="me-2"/>Other Benifits</h3>
              <ul class="list-unstyled m-0 p-0">
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Necessitatibus quibusdam facilis</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Velit unde aliquam et voluptas reiciendis non sapiente labore</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Commodi quae ipsum quas est itaque</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit</span></li>
                <li class="d-flex align-items-start mb-2"><span class="icon-check_circle mr-2 text-muted"></span><span>Deleniti asperiores blanditiis nihil quia officiis dolor</span></li>
              </ul>
            </div>

            <div class="row mb-5">
              <div class="col-md-6  col-12">
                <a href="#" class="btn btn2 btn-block btn-light btn-md"><AiFillHeart color="red" className="me-2"/>Save Job</a>
              </div>
              <div class="col-md-6 mt-2 mt-md-0 col-12">
                <a href="#" class="btn btn2 btn-block btn- btn-md"  style={{backgroundColor:"#33CABB"}}>Apply Now</a>
              </div>
            </div>

          </div>
          <div class="col-lg-4">
            <div class="bg-light p-3 border rounded mb-4">
              <h3 class="text-  mt-3 h5 pl-3 mb-3 " style={{color:"#33CABB"}}>Job Summary</h3>
              <ul class="list-unstyled pl-3 mb-0">
                <li class="mb-2"><strong class="text-black">Published on:</strong> April 14, 2019</li>
                <li class="mb-2"><strong class="text-black">Vacancy:</strong> 20</li>
                <li class="mb-2"><strong class="text-black">Employment Status:</strong> Full-time</li>
                <li class="mb-2"><strong class="text-black">Experience:</strong> 2 to 3 year(s)</li>
                <li class="mb-2"><strong class="text-black">Job Location:</strong> New ork City</li>
                <li class="mb-2"><strong class="text-black">Salary:</strong> $60k - $100k</li>
                <li class="mb-2"><strong class="text-black">Gender:</strong> Any</li>
                <li class="mb-2"><strong class="text-black">Application Deadline:</strong> April 28, 2019</li>
              </ul>
            </div>

            

          </div>
        </div>
      
      
      </div>    


    </>
  );
}

export default SingleJob;