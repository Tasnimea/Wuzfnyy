import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../../firbase-confing";
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
import "./../JobOffers/JobOffers.css";
const AddJob = () => {
  const [CompanyEmail, setCompanyEmail] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [Location, setLocation] = useState("");
const [JobType, setJobType] = useState("");
const [Image, setImage] = useState("")
const [profilePicUrl, setProfilePicUrl] = useState("");
;
  const [show, setshow] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const [progressValue, setProgressValue] = useState();

function addJob() {
  addDoc(collection(db, "job"), {
    CompanyEmail: CompanyEmail,
    CompanyName: CompanyName,
    JobTitle: JobTitle,
    Location: Location,
    JobType: JobType,
    pic: Image,
  })
    .then(() => {
      console.log("data submitted");
    })
    .catch((error) => {
      console.log(error.message);
    });
};




 // for profile image
//  function updatePic() {
//   const docRef = doc(db, "job","/");
//   const dataToUpdate = {
//     pic: Image,
//   };
//   updateDoc(docRef, dataToUpdate)
//     .then(() => {
//       console.log("pic updated successfully");
//     })
//     .catch((error) => {
//       console.error("Error updating pic:", error);
//     });
// }
const handlePicUpload = async (event) => {
  const file = event.target.files[0];
  const fileRef = ref(storage, file.name);

  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload progress: ${progress}%`);
      if (progress == 100) {
        setProgressValue(true);

        handleButtonClick();
        // updatePic();
      } else {
        setProgressValue(false);
      }
    },
    (error) => {
      console.error(error);
    },
    async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setImage(url);
      // updatePic();

      console.log(Image)
    }
  );
};

var handleButtonClick = () => {
  // Set showAlert state to true to display the alert.
  setShowAlert(true);

  // Set a timeout to hide the alert after 3 seconds (3000 milliseconds).
  setTimeout(() => {
    setShowAlert(false);
  }, 200);
};


  return (
    <>
      <div class="container content my-5 py-5">
    <section class="site-section">
      <div class="container">
        <div class="row align-items-center mb-5">
          <div class="col-lg-8 mb-4 mb-lg-0">
            <div class="d-flex align-items-center">
              <div>
                <h2>Post A Job</h2>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-6">
              </div>
              <div class="col-6">
                <a href="#" class="btn btn-block  btn-md" style={{backgroundColor:"#33CABB"}}>Save Job</a>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-lg-12">
            <form class="p-4 p-md-5 border rounded" method="post">
              <h3 class="text-black mb-5 border-bottom pb-2">Job Details</h3>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input   onChange={(event) => {
              setCompanyEmail(event.target.value);

              
            }} type="text" class="form-control" id="email" placeholder="you@yourdomain.com"/>
              </div>
              <div class="form-group">
                <label for="job-title">Job Title</label>
                <input  onChange={(event) => {
              setJobTitle(event.target.value);
            }} type="text" class="form-control" id="job-title" placeholder="Product Designer"/>
              </div>
              <div class="form-group">
                <label for="job-location">Location</label>
                <input  onChange={(event) => {
              setLocation(event.target.value);
            }} type="text" class="form-control" id="job-location" placeholder="e.g. New York"/>
              </div>

              <div class="form-group">
                <label for="job-type">Job Type</label>
                <select onChange={(e) =>
          setJobType(e.target.value)
        } class="selectpicker border rounded" id="job-type" data-style="btn-black" data-width="100%" data-live-search="true" title="Select Job Type">
                  <option value="part time">Part Time</option>
                  <option value="full time">Full Time</option>
                </select>
              </div>


              <div class="form-group">
                <label for="job-description">Job Description</label>
                <div class="editor" id="editor-1">
                <textarea  class="form-control" id="company-name" placeholder="Write Job Description!"></textarea>

                </div>


              </div>


              <h3 class="text-black my-5 border-bottom pb-2">Company Details</h3>
              <div class="form-group">
                <label for="company-name">Company Name</label>
                <input  type="text"   onChange={(event) => {
              setCompanyName(event.target.value);
            }}      class="form-control" id="company-name" placeholder="e.g. New York"/>
              </div>

              <div class="form-group">
                <label for="company-tagline">Tagline (Optional)</label>
                <input type="text" class="form-control" id="company-tagline" placeholder="e.g. New York"/>
              </div>


              <div class="form-group">
                <label for="company-website-tw d-block">Upload Logo</label> <br/>
                <label  class="btn  btn-md btn-file" style={{backgroundColor:"#33CABB"}}>
                Upload 
                              <input
                                style={{ backgroundColor: "white" }}
                                type="file"
                                placeholder="select picture"
                                onChange={handlePicUpload}
                              />
                </label>
              </div>

            </form>
          </div>

         
        </div>
        <div class="row align-items-center mb-5">
          
          <div class="col-lg-4 ml-auto">
            <div class="row">
              <div class="col-6">
                {/* <a href="#" class="btn btn-block btn-light btn-md"><span class="icon-open_in_new mr-2"></span>Preview</a> */}
              </div>
              <div class="col-6">
              <button onClick={()=>addJob()} href="#" class="btn btn-block  btn-md" style={{backgroundColor:"#33CABB"}}>Save Job</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      </div>
    </>
  );
};

export default AddJob;
