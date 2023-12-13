import React from 'react'
import "./rightbarHome.scss"
import Online from '../online/Online'
import { usersOnline } from "../../data"

const RightbarHome = () => {
  return (
    <div className='rightbarHome'>
      <div className="birthdayContainer">
        <img src="/assets/image/birthdayimage.png" alt=""
          className="birthdayImg"
        />
        <span className='birthdayText'><b>Ramu raja</b> and <b>other friends</b> have birthday</span>

      </div>
      <img src="/assets/image/birthdayimage2.jpg" alt="" className="rightbarAdvert" />

      <span className="rightbarTitle">Online Friends</span>
      <ul className="rightbarFriendList">
        {usersOnline.map((u) => (
          <Online key={u.id} onlineUser={u} />
        ))}


      </ul>
    </div>
  )
}

export default RightbarHome