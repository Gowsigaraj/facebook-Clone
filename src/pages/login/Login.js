import React, { useState } from 'react'
import "./login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const handleLoginBtn = (e) => {
        e.preventDefault();
        console.log(email, password)
        try {

            signInWithEmailAndPassword(auth, email, password)
            navigate("/")


        }
        catch (error) {
            setError(true);
            console.error("Error during login:", error.code, error.message);


        }

    }

    const handleCreateBtn = () => {

    }

    return (
        <div className='Login'>
            <div className='container'>
                <div className='facebook'>
                    <h1 className='book' style={{ color: "#1979f4" }}>facebook</h1>
                    <p>Facebook helps you connect and share with people in your life.</p>
                </div>
                <div className="loginContainer">
                    <h2 className='books' style={{ color: "#1979f4" }}>facebook</h2>
                    <form  onSubmit={handleLoginBtn}>
                        <div className='inputAction'>
                            <input type="email" placeholder='Email address or Phone number' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='inputAction'>
                            <input type="password" placeholder='Password' minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='loginbtn input'>
                            <button type="submit" style={{ backgroundColor: "#1979f4", color: "white", }} >Login</button>
                        </div>
                        <div className='forgetPssword input'>
                            < span style={{ color: "blue" }}>forgetten password ?</span>
                        </div>
                        <div className='empty input'>

                        </div>
                        <div className='createbtn'>
                            <Link to="/register">
                                <button type="submit" onClick={handleCreateBtn} style={{ backgroundColor: "#40b927", color: "white" }}>Create New Account</button>
                            </Link>
                        </div>
                        {error && <span>Something went wrong...</span>}


                    </form>
                    <div className='createpage'>
                        <p><span style={{ fontWeight: "bold", fontSize: "18px" }}>Create a Page</span> for celebrity, brand or bussiness.</p>
                    </div>

                </div>
            </div>


        </div>
    )

}


export default Login