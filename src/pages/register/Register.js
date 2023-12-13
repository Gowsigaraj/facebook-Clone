import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./register.css"
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { DriveFolderUploadOutlined } from '@mui/icons-material';
const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [gender, setGender] = useState("");
    const [error, setError] = useState(false);
    const [img, setImg] = useState(null);
    const navigate = useNavigate();



    const handleregister = async (e) => {
        e.preventDefault();

        try {
            // Register the user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, `userImages/${firstName} ${surName}`);



            const uploadTask = uploadBytesResumable(storageRef, img);

            

            uploadTask.on(
                (error) => {
                    setError(true)
                    console.error('Storage Upload Error:', error);

                },
                () => {
            

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('Download URL:', downloadURL);

                        await updateProfile(res.user, {
                            displayName: firstName + ' ' + surName,
                            photoURL: downloadURL
                        });


                        // Store user details in Cloud Firestore
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName: firstName + ' ' + surName,
                            email,
                            day,
                            month,
                            year,
                            gender,
                            photoURL: downloadURL
                        })
                        // Optionally, you can setDoc for other collections related to the user
                        const userPostsDocRef = doc(db, 'userPosts', res.user.uid);
                        await setDoc(userPostsDocRef, {
                            messages: [],
                        });


                   
                    });
                }
                
            )


        }

        catch (error) {
            setError(true);
            console.error("Firebase Authentication Error:", error.message)

        }
        navigate('/login');
    }
    








    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

    return (
        <div className='registerPage'>
            <div className='registerContainer'>

                <div className='register'>
                    <h1>Sign up</h1>
                    <div className='profileImg'>

                    </div>
                    <span >x</span>
                </div>
                <p className='easy'>It's quick and easy.</p>

                <div className='top'>
                    <img
                        src={img ? URL.createObjectURL(img)
                            : "/assets/ProfileCover/default-pic.jpg"}
                        alt="" />
                    <div className='formInput'>
                        <label htmlFor='file'>
                            ProfileImage:<DriveFolderUploadOutlined className='icon' />
                            <input type="file"
                                name="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}

                                onChange={(e) => setImg(e.target.files[0])}>
                            </input>
                        </label>
                    </div>

                </div>
                <div className='hr'></div>
                <form onSubmit={handleregister}>

                    <div className='row'>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First Name'
                            className='registerName'></input>

                        <input type="text" value={surName} onChange={(e) => setSurName(e.target.value)}
                            placeholder='Sur Name'
                            className='registerName'></input>

                    </div>
                    <div className='email'>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}

                            placeholder='Email address or Mobile number'></input>


                    </div>
                    <div className='password'>
                        <input type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'></input>

                    </div>
                    <h5 className='registerDate'>Date of Birth ?</h5>
                    <div className='rowDate'>
                        <label>Day</label>
                        <select value={day} onChange={(e) => setDay(e.target.value)}>
                            {days.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>))}
                        </select>

                        <label>Month</label>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            {months.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <label>Year</label>
                        <select value={year} onChange={(e) => setYear(e.target.value)}>
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>

                            ))}
                        </select>
                    </div>
                    <h5 className='registerGender'>Gender ?</h5>
                    <div className='registerRadioContainer'>
                        <div className='wrapper'>
                            <label>Female</label>
                            <input type="radio" name="gender" onChange={() => setGender("female")} value="male"></input>
                        </div>
                        <div className='wrapper'>
                            <label>Male</label>
                            <input type="radio" name="gender" onChange={() => setGender("male")} value="female"></input>
                        </div>
                        <div className='wrapper'>
                            <label>Custom</label>
                            <input type="radio" name="gender" onChange={() => setGender("custom")} value="custom"></input>
                        </div>
                    </div>
                    <p className='registerPolicy'>
                        People who use our service may have uploaded your contact information to  Facebook. <span> Learn more</span>.</p>
                    <p className='registerPolicy'> By clicking sign up, you agree to our <span>Terms ,Privacy, Policy</span> and <span>Cookies policy</span> You may receive SMS notification from us and can opt out at any time.

                    </p>

                    <div className='registerBtn'>
                        {/* <Link to="/login"> */}
                        <button type="submit" style={{ backgroundColor: "#03a301", color: "white" }}>Sign Up</button>
                        {/* </Link> */}
                    </div>
                    {error && <span>Something went wrong....</span>}
                </form>


            </div>

        </div>
    )

}
                            
export default Register