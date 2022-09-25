
import { AppBar, Toolbar, styled, Tooltip } from '@mui/material';
import "@fontsource/montez";
import { NavLink } from 'react-router-dom';
import React from "react";
import StorageIcon from '@mui/icons-material/Storage';
import PostAddIcon from '@mui/icons-material/PostAdd';



const Header = styled(AppBar)`
background-color: #757575;
`;
    
const Tabs = styled(NavLink)`
font-size: 20px;
margin-right: 25px;
color:inherit;
text-decoration:none
`;

const AppbarHeader = styled(NavLink)(() => ({
    padding: "4px",
    flexGrow: 1,
    fontSize: "35px",
    fontWeight: "bold",
    fontFamily: '"Montez", "cursive"',
    color: "#5d4037",
    textDecoration:"none"//this is to remove underline from the link
  }));


const NavBar = () => {
    return (
        <Header position="sticky">
            <Toolbar>
            <AppbarHeader to='/'>MERN CRUD</AppbarHeader>
                <Tabs to="all" exact>
                    <Tooltip title="All Data">
                    <StorageIcon sx={{fontSize:"30px"}}/>
                    </Tooltip>
                    </Tabs>
                <Tabs to="add" exact><Tooltip title="Add Data">
                    <PostAddIcon sx={{fontSize:"30px"}}/>
                    </Tooltip></Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;