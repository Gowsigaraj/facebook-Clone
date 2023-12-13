import React, { useContext, useEffect, useState } from 'react'
import "./UsersPost.scss"
import Stories from '../stories/Stories'
import Share from '../share/Share'
import { AuthContext } from '../../Context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { MoreVert } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'



const UsersPost = () => {
    const [userPosts, setUserPosts] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {


        const getUsersPosts = () => {
            const unSub = onSnapshot(doc(db, "userPosts", currentUser.uid),
                (doc) => {
                    doc.exists() && setUserPosts(doc.data().messages);
                    console.log(doc.data().messages)
                });
            return () => {
                unSub();
            }

        }
        currentUser.uid && getUsersPosts();


    }, [currentUser.uid])

    return (
        <div className='feedUserPosts'>
            <div className="feedUserPostWrapper">
                <Stories />
                <Share />
                {userPosts.sort((a,b)=>b.timestamp - a.timestamp).map((m) => (
                    <div className='userPosts' key={m.id}>
                        <div className="userPostsWrapper">
                            <div className="postTop">
                                <div className="postTopLeft">
                                    <Link to="/profile/userId">
                                        <div className="postProfileImg">
                                            <img src={m.photoURL}
                                                alt="" className="postProfileImg" />
                                        </div>

                                    </Link>

                                    <span className="postUsername">
                                        @{m.displayName.replace(/\s+/g, "").toLowerCase()}
                                    </span>
                                    <span className="postDate">
                                        <TimeAgo date={new Date(m.timestamp?.toDate()).toLocaleString()}></TimeAgo>


                                    </span>
                                </div>
                                <div className="postTopRight">
                                    <IconButton>
                                        <MoreVert className="postvertbutton" />

                                    </IconButton>

                                </div>
                            </div>
                            <div className="postCenter">
                                <span className="postText">{m.input}</span>
                                <div className='postImg'>
                                    <img src={m.img} alt="" className="postImg" /></div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default UsersPost