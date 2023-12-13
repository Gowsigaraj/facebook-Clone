import React from 'react'
import "./home.scss";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';




const home = () => {
    return (
        <div className='home'>
            <Navbar />
            <div className='homeContainer'>
                <Sidebar />
                <Feed />
                <Rightbar />
            </div>
        </div>
    )
}

export default home