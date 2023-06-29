import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";
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
import { auth, db, storage } from "../../firbase-confing";

const Page1 = () => {

    const location = useLocation();

    const [userData, setdata] = useState({})
    const [email, setEmail] = useState("")
    const [applyMessage,setApplyMessage]=useState(true)

    var item_value = sessionStorage.getItem("item_key");
    const getUserData = async () => {

        await getDoc(doc(db, `users/${item_value}`)).then((res) => {
            setdata(res.data())

            if (!res.data().applied.includes(location.state.x.id)) { // check if the ID is not already present in the array
                setApplyMessage(true)
            }else{
                setApplyMessage(false)
            }

        })
    }

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email)
                sessionStorage.setItem("item_key", user.email);
            } else{
            }
        });

         getUserData();
         

    }, [email, userData, applyMessage]);



    const applyJob = async () => {

        const docRef = doc(db, 'users', email);

        const dataToUpdate = {
            applied: [
                ...userData.applied,
                location.state.x.id
            ]

        };
        if (!userData.applied.includes(location.state.x.id)) { // check if the ID is not already present in the array
            updateDoc(docRef, dataToUpdate)
            .then(() => {
                console.log('data updated successfully');
            })
            .catch((error) => {
                console.error('Error updating data:', error);
            });
        }else{
            setApplyMessage(false)
        }
       
    }

    return (<>
        <div className='container mt-5 py-2'>
            <div className='row'>
                <div className="card mb-3 p-5 shadow" style={{ maxWidth: "540px;" }}>
                    <div className="row g-0">
                        <div className="col-md-4 col-12 d-flex justify-content-center">
                            <img src={location.state.x.pic} class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="card-body">
                                <h1 className="card-title fw-bold">{location.state.x.name}</h1>
                                <p className="card-text">{location.state.x.description}</p>
                                <p className="card-text"><small class="text-body-secondary fw-bold">{location.state.x.type}</small></p>
                            </div>
                            <div className='ms-3 mt-3'>
                                {applyMessage == true &&
                            <button className="btn btn-primary p-3 col-md-4 col-12" onClick={applyJob}>Apply This Job</button>
                                }
                                {applyMessage == false && 
                                <button className="btn btn-danger p-3 col-md-4 col-12" disabled>You applied this job</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="card mb-3 p-5 shadow" style={{ maxWidth: "540px;" }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title fw-bold">Job Description</h3>
                                <h6 className="card-title fw-bold">The Shop Drawing Architect's duties include :</h6>
                                <p className="card-text mt-5">{location.state.x.fullDescription}</p>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title fw-bold mb-4">Job Requirements</h3>
                                <ul>
                                    <li>Gender: Any.</li>
                                    <li>College / University, Bachelor of Engineering Architecture or civil only.</li>
                                    <li>Required 5 - 8 experience.</li>
                                    <li>Knowledge of Rivet & Sketchup.</li>
                                    <li>Perfect in B.O.Q & ID materials.</li>
                                    <li>Knowledge of MS Project or Primavera.</li>
                                    <li>Excellent in Microsoft Office (Word, Excel, PowerPoint).</li>
                                    <li>Excellent communication skills.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/EXAMPLE/" data-instgrm-version="13">
<a href="https://www.instagram.com/p/EXAMPLE/" target="_blank"></a>
</blockquote>
<script async src="//www.instagram.com/embed.js"></script>
    </>);
}

export default Page1;