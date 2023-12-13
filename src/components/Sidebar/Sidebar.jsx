import React, { useContext } from 'react'
import "./Sidebar.scss"
import MenuLink from '../MenuLink/MenuLink';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { users } from '../../data';
import Friends from '../friends/Friends';
import { DarkModeContext } from './../../Context/darkModeContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';




const Sidebar = () => {
    const { dispatch } = useContext(DarkModeContext)


  
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <MenuLink icon={<RssFeedIcon />} text="Feed" />
                <MenuLink icon={<ChatIcon />} text="Chat" />
                <MenuLink icon={<EventIcon />} text="Event" />
                <MenuLink icon={<PeopleAltIcon />} text="People" />
                <MenuLink icon={< BookmarksIcon />} text="Bookmark" />
                <MenuLink icon={< StorefrontIcon />} text="MarketPlace" />
                <MenuLink icon={<VideoCameraBackIcon />} text="Video" />
                <span onClick={() => dispatch({ type: "TOGGLE" })}>
                    <MenuLink icon={<Brightness4Icon />} text="Theme" />
                </span>
                <span onClick={()=>signOut(auth)}>
                <MenuLink icon={< ExitToAppIcon />} text="LogOut" />
                </span>

                <button className="sidebarButton">See more</button>
                <hr className="sidebarHr" />

                <ul className="sidebarFriendList">

                    {users.map((u) => (
                        <Friends key={u.id} user={u} />

                    ))}


                </ul>


            </div>
        </div>
    )
}

export default Sidebar