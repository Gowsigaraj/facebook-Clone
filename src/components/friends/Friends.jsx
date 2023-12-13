import React from 'react'
import "./friends.scss"

const Friends = ({user}) => {
  return (
    <div className='friend'>
      <li className="sidebarFriend">
        <img src={user.profilePicture}
          alt=""
          className="sidebarFriendImg" />

        <span className="sidebarFriendName">{user.name}</span>
      </li>
    </div>
  )
}

export default Friends