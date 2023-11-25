import React from 'react'
import { FaCartPlus, FaEnvelopeOpenText } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: "Home",
        path: '/',
        icon: <AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: "Reports",
        path: '/reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: "Products",
        path: '/products',
        icon: <FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: "Team",
        path: '/team',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: "Messages",
        path: '/messages',
        icon: <FaEnvelopeOpenText />,
        cName: 'nav-text'
    }
]