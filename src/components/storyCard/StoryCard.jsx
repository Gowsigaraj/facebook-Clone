import React from 'react'
import "./storyCard.scss"

const StoryCard = ({user}) => {
  return (
    <div className='storyCard'>
        <div className='overlay'></div>
          <img src={user.profilePicture}
              alt=""
              className="storyProfile" />

          <img src={user.profilePicture}
              alt=""
              className="storybackground" />

      
          <span className='text'>{user.name}</span>
    </div>

  )

}

export default StoryCard