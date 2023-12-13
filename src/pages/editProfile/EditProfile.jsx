import React, { useContext, useState } from 'react'
import "./editProfile.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { AuthContext } from '../../Context/AuthContext'
import { v4 as uuidv4 } from 'uuid';
import { auth, db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const EditProfile = () => {
    const [img, setImg] = useState(null);
    const [error, setError] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        newEmail: "",
        oldPassword: "",
        phone: "",
        age: "",
        relationalShip: "",
        country: "",

    })

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleEdit = async (e) => {
        e.preventDefault();
        if (img) {
            const storageRef = ref(storage, "userImages/" + uuidv4());
            const uploadTask = uploadBytesResumable(storageRef, img);


            uploadTask.on(

                (error) => {
                    setError(true)
                    console.log(error);

                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log("Download URL:", downloadURL);
                        await updateProfile(auth.currentUser, {
                            displayName: data.name,
                            email: data.newEmail,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", currentUser.uid), {

                            uid: currentUser.uid,
                            photoURL: downloadURL,
                            displayName: data.name,
                            email: data.newEmail,
                            phone: data.phone,
                            age: data.age,
                            country: data.country,
                            relationalShip: data.relationalShip,
                            createdAt: serverTimestamp()

                        });

                        const credential = EmailAuthProvider.credential(
                            currentUser.email,
                            data.oldPassword
                        );

                        await reauthenticateWithCredential(currentUser, credential).then(

                            async () => {
                                await updateEmail(currentUser, data.newEmail)


                            })
                    })
                }


            )

        }

        else {

            await updateProfile(auth.currentUser, {
                displayName: data.name,
                email: data.newEmail,

            });
            await setDoc(doc(db, "users", currentUser.uid), {

                uid: currentUser.uid,
                displayName: data.name,
                email: data.newEmail,
                phone: data.phone,
                age: data.age,
                country: data.country,
                relationalShip: data.relationalShip,
                createdAt: serverTimestamp()

            });

            const credential = EmailAuthProvider.credential(
                currentUser.email,
                data.oldPassword
            );

            await reauthenticateWithCredential(currentUser, credential).then(

                async () => {
                    await updateEmail(currentUser, data.newEmail)


                })

        }
        navigate("/login")

    }
    console.log(data);
    return (
        <div className='editProfile'>
            <Navbar />
            <div className="editProfileWrapper">
                <Sidebar />

                <div className="profileRight">
                    <div className="profileTop">
                        <div className="profileCover">
                            <img src="/assets/ProfileCover/natural2.jpg" alt="" className="profileCoverImg" />
                            <img src={currentUser.photoURL} alt="" className="profileUserImg" />
                        </div>

                        <div className="profileInfo">
                            <h4 className="profileInfoName">{currentUser.displayName}</h4>
                            <span className="profileInfoDesk">Hi friends !</span>


                        </div>
                    </div>
                    <div className="editProfileRightBottom">
                        <div className="top"><h1>Edit User Profile</h1></div>
                        <div className="bottom">
                            <div className="left">
                                <img src={img
                                    ? URL.createObjectURL(img)
                                    : "/assets/profileCover/defaultimg.jpg"} alt="" />
                            </div>
                            <div className="right">
                                <form onSubmit={handleEdit}>
                                    <div className="formInput">
                                        <label htmlFor="file">
                                            Image:<DriveFolderUploadOutlined className='icon' />
                                            <input type="file" id="file" onChange={(e) => setImg(e.target.files[0])} style={{ display: "none" }} />
                                        </label>
                                    </div>

                                    <div className="formInput">
                                        <label>Name</label>
                                        <input type="text" name="name" placeholder='John Doe' onChange={handleChange} />
                                    </div>

                                    <div className="formInput">
                                        <label>Email</label>
                                        <input type="email" name="newEmail" placeholder='JohnDoe@gmail.com' onChange={handleChange} />
                                    </div>

                                    <div className="formInput">
                                        <label>PhoneNumber</label>
                                        <input type="text" name="phoneNumber" placeholder='+91 123 456 789' onChange={handleChange} />
                                    </div>

                                    <div className="formInput">
                                        <label>Age</label>
                                        <input type="text" name="age" placeholder="Enter your age" onChange={handleChange} />
                                    </div>

                                    <div className="formInput">
                                        <label>Country</label>
                                        <input type="text" name="country" placeholder='India' onChange={handleChange} />
                                    </div>

                                    <div className="formInput">
                                        <label>RelationalShip</label>
                                        <input type="text" name="relationalShip" placeholder='Enter your status' onChange={handleChange} />
                                    </div>

                                    <div className="formInput">
                                        <label>Password</label>
                                        <input type="password" name="oldPassword" placeholder='Enter your oldPassword' onChange={handleChange} />
                                    </div>

                                    <button type="submit" className="updateButton">UpdateProfile</button>

                                </form>





                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile