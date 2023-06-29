import "../Pro/pro.css";
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
import { Link, useHistory } from "react-router-dom";

import "firebase/database";

import { Justify } from "react-bootstrap-icons";

import { AiFillSetting } from "react-icons/ai";
import { ImDownload3 } from "react-icons/im";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUniversity } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import FavouritMovies from "./../store/actions/actions";
import FavouriteStoreArray from "./../store/actions/newFvAfterDelete";

const Profile = (ele) => {
  const [showw, setShoww] = useState(false);

  const handleClose = () => setShoww(false);
  const handleShow = () => setShoww(true);

  const [downloadUrl, setDownloadUrl] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");
  const [userData, setdata] = useState({});
  const [show, setshow] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const [progressValue, setProgressValue] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [checkOnImg, setcheckOnImg] = useState(false);

  const favs = useSelector((state) => state.favMovies);

  const dispatch = useDispatch();

  const removeFromFav = (removedId) => {
    let removedMovie = favs.find((fav) => {
      return fav.id === removedId;
    });
    favs.splice(favs.indexOf(removedMovie), 1);
    dispatch(FavouriteStoreArray(favs));
  };

  var item_value = localStorage.getItem("email");

  const getUserData = async () => {
    await getDoc(doc(db, `users/${item_value}`)).then((res) => {
      setdata(res.data());

      if (res.data().pic == "") {
        setcheckOnImg(false);
        console.log("undifind hna");
      } else {
        setcheckOnImg(true);
        console.log(checkOnImg);
      }
    });
  };

  var handleButtonClick = () => {
    // Set showAlert state to true to display the alert.
    setShowAlert(true);

    // Set a timeout to hide the alert after 3 seconds (3000 milliseconds).
    setTimeout(() => {
      setShowAlert(false);
    }, 200);
  };

  // for profile image
  function updatePic() {
    const docRef = doc(db, "users", item_value);
    const dataToUpdate = {
      pic: profilePicUrl,
    };
    updateDoc(docRef, dataToUpdate)
      .then(() => {
        console.log("pic updated successfully");
      })
      .catch((error) => {
        console.error("Error updating pic:", error);
      });
  }
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
          updatePic();
        } else {
          setProgressValue(false);
        }
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setProfilePicUrl(url);
        // updatePic();
      }
    );
  };

  // for cover image
  const updateCoverPic = async () => {
    const docRef = doc(db, "users", item_value);
    const dataToUpdate = {
      Coverpic: coverPicUrl,
    };

    updateDoc(docRef, dataToUpdate)
      .then(() => {
        console.log("pic updated successfully");
      })
      .catch((error) => {
        console.error("Error updating pic:", error);
      });
  };
  const handleCoverPicUpload = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    const fileRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setCoverPicUrl(url);
        // updateCoverPic();
      }
    );
  };

  // for cv file
  function updateDocument() {
    const docRef = doc(db, "users", item_value);
    const dataToUpdate = {
      cv: downloadUrl,
    };
    updateDoc(docRef, dataToUpdate)
      .then(() => {
        console.log("Document updated successfully");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  }
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const fileRef = ref(storage, file.name);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        setDownloadUrl(url);
        updateDocument();
      }
    );
  };

  const updateUserData = () => {
    updateDoc(doc(db, "users", `${item_value}`), {
      name: name || userData.name,

      phone: phone || userData.phone,

      cv: downloadUrl || userData.cv,

      pic: profilePicUrl || userData.pic,
    })
      .then(() => {
        getUserData();
        handleClose();
      })
      .catch((error) => {
        console.log(error.messege);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
        sessionStorage.setItem("item_key", user.email);
        setshow(true);
      } else {
        setshow(false);
      }
    });

    getUserData();
  }, [email, userData, checkOnImg, userData.applied]);

  return (
    <>
      <div class="container-fluid mt-3">
        <div class="row mb-3 flex-grow-1">
          <div class="col-lg-3 col-12 flex-grow-1 ">
            <div class="card ">
              {checkOnImg && (
                <div>
                  <img
                    src={userData.pic}
                    class="card-img-top "
                    alt=".hh.."
                    style={{ height: "300px" }}
                  />
                  <div class="card-img-overlay position-relative">
                    <p
                      class="card-title fs-3 fw-bold  position-absolute bottom-100 start-0"
                      style={{ color: "white" }}
                    >
                      {userData.name}
                    </p>
                  </div>
                </div>
              )}
              {!checkOnImg && (
                <div>
                  <img
                    src={require("./../image/no-Profile.webp")}
                    class="card-img-top "
                    alt=".no.."
                    style={{ height: "300px" }}
                  />
                  <div class="card-img-overlay position-relative">
                    <p
                      class="card-title fs-3 fw-bold  position-absolute bottom-100 start-0"
                      style={{ color: "white" }}
                    >
                      {userData.name}
                    </p>
                  </div>
                </div>
              )}
              <div class="card-body">
                <h4 class="card-text ">
                  <i class="bi bi-person colora"></i>
                  {userData.name}
                </h4>
                <p class="card-text ">
                  <i class="bi bi-briefcase-fill colora"></i> {userData.postion}
                </p>

                <p class="card-text">
                  <i class="bi bi-house-door-fill colora"></i> cairo-egypt
                </p>
                <p class="card-text">
                  <i class="bi bi-envelope-fill colora"></i> {userData.email}
                </p>
                <p class="card-text">
                  <i class="bi bi-telephone-fill colora"></i> {userData.phone}
                </p>

                <p class="card-text">
                  <i class="bi bi-arrow-down-square-fill colora"></i>
                  <a
                    href={userData.cv}
                    download
                    style={{ color: "black" }}
                    className="download"
                  >
                    {" "}
                    click to download CV
                  </a>
                </p>
                <h5
                  class="card-text"
                  onClick={handleShow}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <i class="bi bi-gear-fill colora"></i> Edit Profile
                </h5>
                <Modal
                  show={showw}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>update Your Personal Data</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div
                      class="card mt-3   p-lg-1 "
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                      }}
                    >
                      <div class="card-body ">
                        <p
                          className="fw-bold my-3 mx-lg-2"
                          style={{ fontSize: "30px" }}
                        ></p>

                        <form
                          class="row g-3 needs-validation d-flex d-column justify-content- pt-4"
                          novalidate
                        >
                          {checkOnImg == true && (
                            <div class="col-md-10">
                              <img
                                src={userData.pic}
                                class="img-fluid "
                                style={{ height: "11rem" }}
                                alt="..."
                              />

                              <input
                                style={{ backgroundColor: "white" }}
                                type="file"
                                placeholder="select picture"
                                onChange={handlePicUpload}
                              />
                            </div>
                          )}
                          {checkOnImg == false && (
                            <div class="col-md-10">
                              <img
                                src={require("./../image/no-Profile.webp")}
                                class="img-fluid "
                                style={{ height: "11rem" }}
                                alt="..."
                              />

                              <input
                                style={{ backgroundColor: "white" }}
                                type="file"
                                placeholder="select picture"
                                onChange={handlePicUpload}
                              />
                            </div>
                          )}

                          <div class="col-md-10">
                            <label for="validationCustom01" class="form-label">
                              name
                            </label>
                            <input
                              placeholder={userData.name}
                              value={name}
                              type="text"
                              onChange={(event) => {
                                setName(event.target.value);
                              }}
                              class="form-control"
                              style={{
                                borderColor: "#996E43",
                                borderRadius: "30px",
                              }}
                              id="validationCustom01"
                              required
                            />
                          </div>

                          <div class="col-md-10">
                            <label for="validationCustom01" class="form-label">
                              phone
                            </label>
                            <input
                              placeholder={userData.phone}
                              type="number"
                              value={phone}
                              onChange={(event) => {
                                setPhone(event.target.value);
                              }}
                              class="form-control"
                              style={{
                                borderColor: "#996E43",
                                borderRadius: "30px",
                              }}
                              id="validationCustom01"
                              required
                            />
                          </div>

                          <div class="col-md-10">
                            <h3 class="card-text bold pt-3">
                              <small class="text-body-secondary bold">
                                upload cv{" "}
                              </small>
                            </h3>

                            <input
                              style={{ backgroundColor: "white" }}
                              type="file"
                              onChange={handleFileUpload}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button onClick={updateUserData} variant="primary">
                      update
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <ul class="list-group list-group-flush ">
                <li class="list-group-item lh-lg ">
                  <p class="card-text">
                    <i class="bi bi-asterisk colora"></i> Skills
                  </p>
                  <p class="card-text">Adobe Photoshop</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg"
                      role="progressbar"
                      style={{ width: "90%" }}
                      aria-valuenow="85"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p class="card-text">Photography</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg"
                      role="progressbar"
                      style={{ width: "85%" }}
                      aria-valuenow="85"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p class="card-text">Illustrator</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg"
                      role="progressbar"
                      style={{ width: "75%" }}
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p class="card-text">Media</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </li>

                <li class="list-group-item lh-lg">
                  <p class="card-text">English</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg "
                      role="progressbar "
                      style={{ width: "90%" }}
                      aria-valuenow="100%"
                      aria-valuemin="100"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <p class="card-text">Spanish</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg"
                      role="progressbar"
                      style={{ width: "60%" }}
                      aria-valuenow="85"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p class="card-text">German</p>
                  <div class="progress">
                    <div
                      class="progress-bar colorbg"
                      role="progressbar"
                      style={{ width: "35%" }}
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-xl-9  col-12 ">
            <div class="card cc" style={{ width: "100%" }}>
              <div class="card-body">
                <h2 class="card-title text-muted  lh-lg ">
                  <i class="bi bi-briefcase-fill colora "></i> Work Experience
                </h2>
              </div>
              <div class="card-body">
                <p class="card-subtitle mb-1 text-muted fw-bold">
                  FrontEnd Developer / W3schools.com
                </p>
                <div>
                  <div class="d-flex flex-row px-2 ">
                    <p class="">
                      {" "}
                      <i class="bi bi-calendar-minus-fill colora pe-1"></i> Jan
                      2015 -{" "}
                    </p>

                    <div
                      class="badge text-wrap colorbg "
                      style={{ width: "9%", height: "28%" }}
                    >
                      current
                    </div>
                  </div>
                </div>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <hr />
              </div>
              <div class="card-body ">
                <p class="card-subtitle mb-2 text-muted fw-bold">
                  FrontEnd Developer / W3schools.com
                </p>
                <p>
                  {" "}
                  <i class="bi bi-calendar-minus-fill colora"></i> Jan 2015 -
                  feb 2020{" "}
                </p>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <hr />
              </div>
              <div class="card-body ">
                <p class="card-subtitle mb-2 text-muted fw-bold">
                  FrontEnd Developer / W3schools.com
                </p>
                <p>
                  {" "}
                  <i class="bi bi-calendar-minus-fill colora"></i> Jan 2015 -
                  jul 2011
                </p>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>

            <div class="card mt-3" style={{ width: "100%" }}>
              <div class="card-body lh-lg">
                <h2 class="card-title text-muted ">
                  <FaUniversity className="colora" size={50} /> Education
                </h2>
              </div>
              <div class="card-body ">
                <p class="card-subtitle mb-2 text-muted fw-bold">
                  Must University for science and technology
                </p>
                <p>
                  {" "}
                  <i class="bi bi-calendar-minus-fill colora"></i> may 2023 -{" "}
                </p>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <hr />
              </div>
            </div>
{/*  */}


<div class="card cc" style={{ width: "100%" }}>
              <div class="card-body">
                <h2 class="card-title text-muted  lh-lg ">
                <a class="card-action" href="#"><i class="fa fa-heart" style={{color:"red"}}></i></a>

                  Job Saved 
                </h2>
              </div>
              <div className="card mt-3">
              {favs.map((m) => {
                return (

              <div class="card-body d-flex flex-row align-items-center">
                <p class="card-subtitle mb-1 text-muted fw-bold">
              {m.CompanyName}
                </p>
                <div>
                  <div class="d-flex flex-row px-2 ">
              
                  </div>
                </div>
                <p class="card-text">
                <span id={m.id} onClick={()=>{removeFromFav(m.id)}}  >
                                <i className="fa-solid fa-trash-can text-danger m-2 fs-5"></i>
                            </span>  
                </p>
                <hr />
              </div>
              );
            })}
            </div>
                
               
            </div>
{/*  */}

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
