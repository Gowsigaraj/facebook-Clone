import React, { useContext } from 'react'
import"./stories.scss"
import StoryCard from '../storyCard/StoryCard'
import {users} from "../../data"
import { AuthContext } from '../../Context/AuthContext'

const Stories = () => {
    const { currentUser } = useContext(AuthContext);

  return (
    <div className='stories'>
        <div className="storyCard">
              <div className='overlay'></div>
              <img src={currentUser.photoURL}
                  alt=""
                  className="storyProfile" />

              <img src={currentUser.photoURL}
                  alt=""
                  className="storybackground" />

              <img src="/assets/image/addimg.jpeg"
                  alt=""
                  className="storyadd" />
              <span className='text'>{currentUser.displayName}</span>
           
        </div>
        {users.map((u)=>(
            <StoryCard  key={u.id} user={u}/>
        ))}

      
    </div>
  )
}

export default Stories