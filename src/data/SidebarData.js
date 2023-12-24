import React from 'react'
import { FaUser } from "react-icons/fa";
import { AiFillHome, AiFillSetting } from "react-icons/ai";

export const SidebarData = [
    {
        title: "Home",
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: "Configure",
        path: '/configure',
        icon: <AiFillSetting />,
        cName: 'nav-text'
    },
    {
        title: "Account",
        path: '/account',
        icon: <FaUser />,
        cName: 'nav-text'
    },
]