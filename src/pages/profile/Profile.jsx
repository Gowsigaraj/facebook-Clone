import React from 'react'
import "./profile.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from "../../components/feed/Feed"
import Rightbar from '../../components/rightbar/Rightbar'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

import UsersPost from '../../components/UserPosts/UsersPost'


const Profile = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className='profile'>
            <Navbar />
            <div className="profileWrapper">
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
                    <div className="profileRightBottom">
                        <UsersPost/>
                        
                        <Rightbar profile />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile