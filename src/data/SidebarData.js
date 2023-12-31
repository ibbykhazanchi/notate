import React from 'react'
import { FaUser } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

export const SidebarData = [
    {
        title: "Home",
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: "Account",
        path: '/account',
        icon: <FaUser />,
        cName: 'nav-text'
    },
]