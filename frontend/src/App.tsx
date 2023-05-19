import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";


import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';


import Home from "./components/Home";
import HomeAdmin from "./components/HomeAdmin";

import Users from "./components/Users";
import UserCreate from "./components/UserCreate";
import { UserInterface } from "./models/IUser";


import SignIn from "./components/SignIn";
import { Grid } from "@mui/material";
import Index from "./components/Index";
import UserUpdate from "./components/UserUpdate";


const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
   open?: boolean;
}

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   }),
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
         overflowX: "hidden",
         transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
         }),
         width: theme.spacing(7),
         [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
         },
      }),
   },
}));

const mdTheme = createTheme();





function App() {
   const [users, setUsers] = useState<UserInterface>();
   const [token, setToken] = useState<String>("");
   const [role, setRole] = useState<String | null>("");
   const [open, setOpen] = React.useState(false);
   const toggleDrawer = () => {
      setOpen(!open);
   };

   const menu = [
      { name: "Add Room", icon: <PersonAddRoundedIcon />, path: "/users", role: 'admin' },
      { name: "Hame Page", icon: <RoofingRoundedIcon />, path: "/", role: `${users?.Role}` },

   ];

   const apiUrl = "http://localhost:8080";
   const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   };



   const getUsers = async () => {
      const uid = localStorage.getItem("uid");
      fetch(`${apiUrl}/user/${uid}`, requestOptions)
         .then((response) => response.json())
         .then((res) => {
            if (res.data) {
               setUsers(res.data);
            } else {
               console.log("else");
            }
         });
   };

   useEffect(() => {
      getUsers();
      const token = localStorage.getItem("token");
      const role = localStorage.getItem('role');
      if (token) {
         setToken(token);
         setRole(role);
      }
   }, []);

   if (!token) {
      return <SignIn />;
   }

   const signout = () => {
      localStorage.clear();
      window.location.href = "/";
   };

   return (
      <Router>
         <Box>
            <AppBar position="absolute" open={open}>
               <Toolbar
                  sx={{
                     // pr: "24px", // keep right padding when drawer closed
                     backgroundImage: "url(https://img.freepik.com/premium-photo/abstract-wave-pattern-blue-yellow-background_527140-1023.jpg?size=626&ext=jpg&ga=GA1.1.2075763464.1682155417&semt=sph)",
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                     height: '70px',
                     // bgcolor: '#dce775',
                     overflow: 'hidden',
                  }}
               >
                  <Typography
                     component="h1"
                     variant="h1"
                     color="inherit"
                     sx={{
                        width: '40%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1,
                        fontFamily: "a Apple Tea",
                        fontWeight: 'bold',
                        // fontFamily: "Ubuntu Condensed",
                        fontSize: "30px",
                        color: '#2c82c9',
                     }}
                  >
                     LED Controller System
                  </Typography>



                  <Box sx={{
                     height: '100%',
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'right',
                     alignItems: 'center',
                  }}>

                     <List sx={{ height: '100%' }}>
                        {menu.map(
                           (item, index) =>
                              role === item.role && (
                                 <Link
                                    to={item.path}
                                    key={item.name}
                                    style={{ textDecoration: "none", color: "inherit", }}
                                 >
                                    <Button
                                       sx={{
                                          height: '100%',
                                          width: 'auto',
                                          color: '#473e66',
                                          transition: 'all .4s',
                                          '&:hover': {
                                             background: 'rgba(255, 255, 255, 0.2)',
                                             transform: 'scale(1.3)'
                                          },
                                       }}
                                    >
                                       {item.icon}
                                    </Button>
                                 </Link>
                              )
                        )}
                     </List>

                     <Button onClick={signout}
                        sx={{
                           height: '100%',
                           width: 'auto',
                           color: '#473e66',
                           transition: 'all .4s',
                           '&:hover': {
                              background: 'rgba(255, 255, 255, 0.2)',
                              transform: 'scale(1.5)',
                           },
                        }}
                     >
                        {<LogoutIcon />}
                     </Button>
                  </Box>

               </Toolbar>
            </AppBar>
         </Box>

         <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
               item
               xs={12}
               // sm={4}
               // md={7}
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundImage: "url(https://img.freepik.com/premium-photo/abstract-wave-pattern-blue-yellow-background_527140-1023.jpg?size=626&ext=jpg&ga=GA1.1.2075763464.1682155417&semt=sph)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
               }}
            >
               <Box sx={{
                  mt: '90px',
                  height: '85%',
                  width: '90%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  boxShadow: 5,

               }}>


                  <Box sx={{
                     width: '95%',
                     height: '95%',
                     display: 'flex',
                     justifyContent: 'center',
                     // alignItems: 'center',
                  }}>

                     <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<HomeAdmin />} />
                        <Route path="/user" element={<Index />} />

                        <Route path="/users" element={<Users />} />
                        <Route path="/user/create" element={<UserCreate />} />
                        <Route path="/users/:id" element={<UserUpdate />} />
                     </Routes>


                  </Box>

               </Box>
            </Grid>
         </Grid>
      </Router>
   );
}

export default App;