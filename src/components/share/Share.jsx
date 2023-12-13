import React, { useContext, useState } from 'react'
import "./share.scss"
import { EmojiEmotions, PermMedia, VideoCameraFront, Close } from '@mui/icons-material'
import { AuthContext } from "./../../Context/AuthContext"
import { db, storage } from '../../firebase'
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Timestamp, addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Picker from '@emoji-mart/react'


const Share = () => {
    const [img, setImg] = useState(null);
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);
    const { currentUser } = useContext(AuthContext);


  
    const handlePost = async () => {
        if (img) {


            
            const storageRef = ref(storage, "posts/" + uuidv4());


            const uploadTask = uploadBytesResumable(storageRef, img);
 

            uploadTask.on(

                (error) => {
                    setError(true)
                    console.log(error);

                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log("Download URL:", downloadURL);
                        await addDoc(collection(db, "posts"), {
                            uid: currentUser.uid,
                            photoURL: currentUser.photoURL,
                            displayName: currentUser.displayName,
                            input,
                            img: downloadURL,
                            timestamp: serverTimestamp()


                        });

                        await updateDoc(doc(db, "userPosts", currentUser.uid), {
                            messages: arrayUnion({

                                id: uuidv4(),
                                uid: currentUser.uid,
                                photoURL: currentUser.photoURL,
                                displayName: currentUser.displayName,
                                input,
                                img: downloadURL,
                                timestamp: Timestamp.now()
                            })
                        })



                    })


                }

            )



        }
        else {
            await addDoc(collection(db, "posts"), {
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
                input,
                timestamp: serverTimestamp()


            });

            await updateDoc(doc(db, "userPosts", currentUser.uid), {
                messages: arrayUnion({

                    id: uuidv4(),
                    uid: currentUser.uid,
                    photoURL: currentUser.photoURL,
                    displayName: currentUser.displayName,
                    input: input,
                    timestamp: Timestamp.now()
                })
            })




        }
        setInput("");
        setImg(null);
        setShowEmojis(false);

    }



    const handleKey = (e) => {
        e.code === "Enter" && handlePost();

    };

    const addEmoji = (emoji) => {
        setInput((prevInput) => prevInput + emoji.native);
    };
    const removeImg = () => {
        setImg(null);
    }

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className="shareTop">
                    <img src={currentUser.photoURL}
                        alt=""
                        className="shareProfileImg" />
                    <textarea type="text" rows={2} style={{ resize: "none", overflow: "hidden" }} id="tex"
                        placeholder={"What's on your Mind  " + currentUser.displayName + "?"}
                        value={input} onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        className="shareInput" />
                </div>
                <hr className="shareHr" />

                {img && (<div className='shareImgContainer'>
                    <img src={URL.createObjectURL(img)} alt="" className="shareImg" />
                    <Close className='shareCancelImg' onClick={removeImg} />

                </div>
                )}
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">

                            <VideoCameraFront className='shareIcon' style={{ color: "#bb0000f2" }} />
                            <span className='shareOptionText'>Live Video</span>
                        </div>

                        <label htmlFor='file' className="shareOption">
                            <PermMedia className='shareIcon' style={{ color: "#2e0196f1" }} />
                            <span className='shareOptionText'>Photo /Video</span>
                            <input type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={(e) => setImg(e.target.files[0])}>

                            </input>
                        </label>

                        <div onClick={() => setShowEmojis(!showEmojis)} className="shareOption">
                            <EmojiEmotions className='shareIcon' style={{ color: "#bfc600ec" }} />
                            <span className='shareOptionText'>Feelings / activity</span>
                        </div>
                    </div>

                </div>
                {showEmojis &&

                    <div className='emoji'>
                        <Picker onEmojiSelect={addEmoji} />
                    </div>

                }

            </div>
        </div>
    )
}

export default Share