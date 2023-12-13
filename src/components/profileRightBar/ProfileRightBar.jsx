import React, { useContext, useEffect, useState } from 'react'
import "./profileRightBar.scss"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const ProfileRightBar = () => {
    const[getUserInfo,setGetUserInfo] = useState({});
    const {currentUser}= useContext(AuthContext);

    useEffect(()=>{
        const getInfo=()=>{
            const unSub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
                setGetUserInfo(doc.data());
            })
            return () => {
                unSub();
            }

        }
        
        currentUser.uid && getInfo();

    },[currentUser.uid])

    console.log(getUserInfo);


  return (
    <div className='profileRightBar'>
        <div className="profileRightBarHeading">
            <span className="profileRightBarTitle">User Information</span>
              <Link to={`/profile/${currentUser.displayName}/edit`} style={{ textDecoration: "none" }}>         
             <span className="editButton">Edit Profile</span>
              </Link>

        </div>
        <div className="profileRightBarInfo">
            <div className="profileRightBarInfoItem">
                <span className="profileRightBarInfoKey">Email:</span>
                  <span className="profileRightBarInfoValue">{getUserInfo.email? getUserInfo.email:currentUser.email}</span>
            </div>

              <div className="profileRightBarInfoItem">
                  <span className="profileRightBarInfoKey">PhoneNumber:</span>
                  <span className="profileRightBarInfoValue">{getUserInfo.phone}</span>
              </div>

              <div className="profileRightBarInfoItem">
                  <span className="profileRightBarInfoKey">Age:</span>
                  <span className="profileRightBarInfoValue">{getUserInfo.age}Years</span>
              </div>

              <div className="profileRightBarInfoItem">
                  <span className="profileRightBarInfoKey">Country:</span>
                  <span className="profileRightBarInfoValue">{getUserInfo.country}</span>
              </div>

              <div className="profileRightBarInfoItem">
                  <span className="profileRightBarInfoKey">RelationalShip:</span>
                  <span className="profileRightBarInfoValue">{getUserInfo.relationalShip}</span>
              </div>


             
        </div>

        <h4 className="profileRightBarTitle">Close Friends</h4>
        <div className="profileRightBarFollowings">
              <div className="profileRightBarFollowing">
                  <img src="/assets/profile/profile1.jpg" alt="" className="profileRightBarFollowingImg" />
                  <span className="profileRightBarFollowingImgName">Dharmik</span>
              </div>

              <div className="profileRightBarFollowing">
                  <img src="/assets/profile/profile2.jpg" alt="" className="profileRightBarFollowingImg" />
                  <span className="profileRightBarFollowingImgName">Gowri</span>
              </div>

              <div className="profileRightBarFollowing">
                  <img src="/assets/profile/profile3.jpg" alt="" className="profileRightBarFollowingImg" />
                  <span className="profileRightBarFollowingImgName">Ragu</span>
              </div>

              <div className="profileRightBarFollowing">
                  <img src="/assets/profile/profile4.jpg" alt="" className="profileRightBarFollowingImg" />
                  <span className="profileRightBarFollowingImgName">Guna</span>
              </div>

              <div className="profileRightBarFollowing">
                  <img src="/assets/profile/profile5.jpeg" alt="" className="profileRightBarFollowingImg" />
                  <span className="profileRightBarFollowingImgName">Selva</span>
              </div>

              <div className="profileRightBarFollowing">
                  <img src="/assets/profile/profile6.webp" alt="" className="profileRightBarFollowingImg" />
                  <span className="profileRightBarFollowingImgName">Ramnath</span>
              </div>
        </div>
    </div>
  )
}

export default ProfileRightBar