import React from 'react'
import HeadsetIcon from '@material-ui/icons/Headset';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { Home } from '@material-ui/icons';

export const SidebarData =[
    {
       title: "Discover",
       icon:<HeadsetIcon/> ,
       link: "/discover"
    },
    {
        title: "Search",
        icon:<SearchIcon/>,
        link: "/search"
     },
     {
        title: "Favourites", 
        icon:<FavoriteIcon/>,
        link: "/favourite"
     },
     {
        title:" Playlists", 
        icon:<PlaylistPlayIcon/>,
        link: "playlist"
     },
     {
        title: "Charts",
        icon: <ClearAllIcon/>,
        link: "/charts"
     },
]

