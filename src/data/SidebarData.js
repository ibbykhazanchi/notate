import React from 'react'
import { FaToolbox } from "react-icons/fa";
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
        path: '/reports',
        icon: <FaToolbox />,
        cName: 'nav-text'
    },
    {
        title: "Settings",
        path: '/products',
        icon: <AiFillSetting />,
        cName: 'nav-text'
    },
]