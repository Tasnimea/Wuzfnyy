import '../Pro/pro.css';
import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db, storage } from "../../firbase-confing";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
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
import { Justify } from 'react-bootstrap-icons';

import { BsBoxArrowInLeft } from 'react-icons/bs';

import { Link, useHistory } from 'react-router-dom'

const EditProfile = (event) => {


    const [downloadUrl, setDownloadUrl] = useState('');
    const [email, setEmail] = useState("")
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [coverPicUrl, setCoverPicUrl] = useState('');
    const [userData, setdata] = useState({})
    const [show,setshow]= useState()
    const [showAlert, setShowAlert] = useState(false);
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [phone,setPhone]=useState("")

    const [progressValue,setProgressValue]= useState()


    


    var item_value = sessionStorage.getItem("item_key");


    const getUserData = async () => {

        await getDoc(doc(db, `users/${item_value}`)).then((res) => {
            setdata(res.data())
            
        })
    }


      
    
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
        const docRef = doc(db, 'users', email);
        const dataToUpdate = {
          pic : profilePicUrl
        };
        updateDoc(docRef, dataToUpdate)
          .then(() => {
            console.log('pic updated successfully');
          })
          .catch((error) => {
            console.error('Error updating pic:', error);
          });
        }
    const handlePicUpload = async (event) => {
        const file = event.target.files[0];
        const fileRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload progress: ${progress}%`);
                if(progress==100)
                {
                    setProgressValue(true);
                    
                    handleButtonClick();
                    updatePic();
                }
                else{
                    setProgressValue(false)
                }
                    
            },
            (error) => {
                console.error(error);
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                setProfilePicUrl(url);
                 updatePic();
            }
        )


    };


// for cover image
    const updateCoverPic = async () => {
        const docRef = doc(db, 'users', email);
        const dataToUpdate = {
        Coverpic : coverPicUrl

        };
      
      
         updateDoc(docRef, dataToUpdate)
          .then(() => {
            console.log('pic updated successfully');
          })
          .catch((error) => {
            console.error('Error updating pic:', error);
          });
        }
    const handleCoverPicUpload = async (event) => {
        const file = event.target.files[0];
        console.log(file)
        const fileRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        )


        
    };


// for cv file
    function updateDocument() {
        const docRef = doc(db, 'users', email);
        const dataToUpdate = {
          cv : downloadUrl
        };
        updateDoc(docRef, dataToUpdate)
          .then(() => {
            console.log('Document updated successfully');
          })
          .catch((error) => {
            console.error('Error updating document:', error);
          });
        }
   const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const fileRef = ref(storage, file.name);

        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        )


    };




    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
                sessionStorage.setItem("item_key", user.email);
                setshow(true)
            }else{
                setshow(false)
        
            }
        });

        getUserData();
    }, [email,userData]);


        return (
            <>
        

        <div className='mx-5  mt-4'>
<div class="card mb-3 mx-2 col-12" style={{maxWidth: "100%", border:"none"}}>
  <div class="row g-0">
    

    
    <div class="col-md-10 ">
      <div class="card-body">
      <div>
      <img src={userData.pic} class="img-fluid " style={{height:"11rem"}} alt="..." />

            <input style={{ backgroundColor: "white" }} type="file" placeholder='select picture' onChange={handlePicUpload} />
            </div>

        <h4 class="card-title bold name_h2 pt-3">
        Name:
        <input type="text"  class="field" placeholder={userData.name}  onChange={(event)=>{
                            setName(event.target.value)
                        }} /> 
        </h4>
        <h4 class="card-text pt-3"> 
        phone:
        <input type="text"  class="field" placeholder={userData.phone}  onChange={(event)=>{
                            setPhone(event.target.value)
                        }} /> 
                        </h4> 
                        

        <h3 class="card-text bold pt-3"><small class="text-body-secondary bold">upload cv </small></h3>

 <div>
            <input style={{ backgroundColor: "white" }} type="file" onChange={handleFileUpload} />
            </div>

</div>
    </div>
    <div className='col-md-2 d-flex justify-content-end' >
    <Link to="/Profile" style={{textDecoration:"none"}}  >
    <h3 style={{cursor:"pointer", color:"black" , textDecoration:"none"}}><BsBoxArrowInLeft/>
 back to profile</h3> 
    </Link>


 

    </div>
  </div>
</div>
</div>




        </>

    );

}

export default EditProfile;