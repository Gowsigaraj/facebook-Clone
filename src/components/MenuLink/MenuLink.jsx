import React, { useContext } from 'react'
import "./MenuLink.scss"
import { AuthContext } from '../../Context/AuthContext';

const MenuLink = ({ icon, text }) => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className='menuLink'>
            {icon}
            <span className='menuLinkText'>{text}</span>
            <span className='menuLinkTextName'>{text === "LogOut"  && `(${currentUser.displayName})`}</span>

        </div>
    )
}

export default MenuLink