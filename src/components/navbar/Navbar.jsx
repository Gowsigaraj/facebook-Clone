import React, { useContext } from 'react'
import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MessageIcon from '@mui/icons-material/Message';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext)

    // Check if currentUser is null
    if (!currentUser) {
        // You can return a loading state or handle this case accordingly
        return <div>Loading...</div>;
    }

    return (
        <div className='navbarContainer'>
            <div className='navbarLeft'>
                <div className='dflex'>
                    <div className='logos'>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <span className='logo'>Facebook</span>
                        </Link>
                    </div>
                    <div className='searchBar'>
                        <SearchIcon className='searchIcon' />
                        <input type="text" id="text" placeholder='Search for friend post or videos' className='searchInput'></input>


                    </div>


                </div>

            </div>
            <div className='navbarCenter'>
             
                <div className='navIcons'>
                    <ul className='ulist'>
                        <li className='navIconsList'>
                           < HomeIcon/>
                        </li>

                        <li className='navIconsList'>
                            < OndemandVideoIcon />
                        </li>

                        <li className='navIconsList'>
                            < PeopleIcon />
                        </li>

                        <li className='navIconsList'>
                            < StorefrontIcon />
                        </li>
                        <li className='navIconsList'>
                            < MessageIcon />
                        </li>
                    </ul>
                </div>
            </div>
            <div className='navbarRight'>
               
                <div className='navbarIcons'>
                    <div className='navbarItems'>
                        <PersonIcon />
                        <span className='navbarIconBadge'>2</span>
                    </div>
                    <div className='navbarItems'>
                        <ChatBubbleIcon />
                        <span className='navbarIconBadge'>10</span>
                    </div>
                    <div className='navbarItems'>
                        <NotificationsIcon />
                        <span className='navbarIconBadge'>8</span>
                    </div>
                    

                </div>
                <Link to={`/profile/${currentUser.displayName}`}>
                    <div className='profileImg'>
                    <img src={currentUser.photoURL} alt="" className="navbarImg" />
                    </div>
                </Link>


            </div>
        </div>
    )
}

export default Navbar