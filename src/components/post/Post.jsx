import React, { useState } from 'react'
import "./post.scss"
import { users } from "../../data"
import { IconButton } from '@mui/material'
import { Favorite, MoreVert, ThumbUpAltOutlined, ThumbUp, ChatBubbleOutline, ShareOutlined } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import { useContext } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from "./../../Context/AuthContext"
import { useEffect } from 'react'



const Post = ({ post }) => {
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentBoxVisible, setCommentBoxVisible] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [input, setInput] = useState("");
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const unSub = onSnapshot(collection(db, "posts", post.id, "likes"),
            (snapshot) => setLikes(snapshot.docs)
        );

        return () => {
            unSub()
        }

    }, [post.id]);

    useEffect(() => {
        setLiked(likes.findIndex((like) => like.id === currentUser.uid) !== -1)

    }, [likes, currentUser.uid])



    useEffect(() => {
        const unSub = onSnapshot(collection(db, "posts", post.id, "comments"),

            (snapshot) => {
                setComments(snapshot.docs.map((snapshot) => ({

                    id: snapshot.id,
                    data: snapshot.data(),
                }))
                )
            }
        )
        return () => {
            unSub();
        }
    }, [post.id])

    const likePost = async () => {
        if (liked) {
            await deleteDoc(doc(db, "posts", post.id, "likes", currentUser.uid))

        } else {
            await setDoc(doc(db, "posts", post.id, "likes", currentUser.uid), {
                userId: currentUser.uid,
            })
        }




    }

    const handleComment = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "posts", post.id, "comments"), {
            comment: input,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            timestamp: serverTimestamp(),
        })
        setCommentBoxVisible(false);
        setInput("")



    }
    console.log(comments)
    // const user = users.find((u) => u.id === post.userId);

    // if (!user) {
    //     // console.error(`User with id ${post.userId} not found`);
    //     return null; // or some fallback UI
    // }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to="/profile/userId">
                            <img src={post.data.photoURL}
                                alt="" className="postProfileImg" />

                        </Link>

                        <span className="postUsername">
                                @{post.data.displayName.replace(/\s+/g, "").toLowerCase()}
                        </span>
                        <span className="postDate">
                            <TimeAgo date={new Date(post.data?.timestamp?.toDate()).toLocaleString()}></TimeAgo>


                        </span>
                    </div>
                    <div className="postTopRight">
                        <IconButton>
                            <MoreVert className="postvertbutton" />

                        </IconButton>

                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.data.input}</span>
                    <img src={post.data.img} alt="" className="postImg" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <Favorite className='bottomLeftIcon' style={{ color: "red" }} />
                        <ThumbUp className='bottomLeftIcon' onClick={(e) => likePost()} style={{ color: "#011631" }} />
                        {likes.length > 0 && (<span className="postLikeCounter">{likes.length}</span>)}


                    </div>
                    <div className="postBottomRight" >
                        <span className="postCommentText" onClick={()=>setCommentOpen(!commentOpen)}>{comments.length} .comments .share</span>

                    </div>
                </div>

                <hr className="footerHr" />
                <div className="postBottomFooter">
                    <div className="postBottomFooterItem" onClick={(e) => likePost()}>
                        {liked ?
                            (<ThumbUp style={{ color: "#011631" }} className="footerIcon" />)
                            : (<ThumbUpAltOutlined className='footerIcon' />)}

                        <span className="footerText">Like</span>
                    </div>

                    <div className="postBottomFooterItem" onClick={() => setCommentBoxVisible(!commentBoxVisible)}>
                        <ChatBubbleOutline className='footerIcon' />
                        <span className="footerText">Comment</span>
                    </div>

                    <div className="postBottomFooterItem">
                        <ShareOutlined className='footerIcon' />
                        <span className="footerText">Share</span>
                    </div>
                </div>

            </div>
            {commentBoxVisible && (
                <form onSubmit={handleComment} className="commentBox">
                    <textarea className='commentInput' type="text" placeholder='Write a comment....' rows={1} style={{ resize: "none" }}
                        value={input} onChange={(e) => setInput(e.target.value)}
                    />

                    <button type="submit"  disabled={!input} className='commentPost'>comment</button>

                </form>
            )}

            {commentOpen > 0 && (
                <div className='comment'>
                    {comments.sort((a,b)=>b.data.timestamp - a.data.timestamp).map((c) => (
                        <div>
                            <div className='commentWrapper'>
                                <img className='commentProfileImg' src={c.data.photoURL} alt=""></img>
                                <div className='commentInfo'>
                                    <span className='commentUserName'> @{c.data.displayName.replace(/\s+/g, "").toLowerCase()}</span>
                                    <p className='commentText'>{c.data.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}



                </div>
            )}
        </div>
    )
}

export default Post