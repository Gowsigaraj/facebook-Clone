import React, { useEffect, useState } from 'react'
import "./feed.scss"
import Stories from '../stories/Stories'
import Share from '../share/Share'
import Post from '../post/Post'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
// import {posts} from "../../data"

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const unsub = onSnapshot(collection(db, "posts"), (snapShot) => {
            setPosts(snapShot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
        });

        return () => {
            unsub();
        }



    }, [])
    console.log(posts)
    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <Stories />
                <Share />
                {posts.sort((a, b) => b.data.timestamp - a.data.timestamp)
                    .map((p) => (
                        <Post key={p.id} post={p} />
                    ))}


            </div>
        </div>
    )
}

export default Feed