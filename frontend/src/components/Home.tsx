import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@mui/material";
import { Link, Link as RouterLink, useHref } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';

import { UserInterface } from "../models/IUser";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { useEffect, useState } from "react";
import { width } from "@mui/system";

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      container: {
         marginTop: theme.spacing(2),
      },
      table: {
         minWidth: 650,
      },
      tableSpace: {
         marginTop: 20,
      },
   })
);



function Home() {
   let navigate = useNavigate();
   const [users, setUsers] = useState<UserInterface>();
   const [role, setRole] = useState<String | null>("");
   const [link, setLink] = useState<String>("");

   const apiUrl = "http://localhost:8080";
   const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   };

   // // console.log(users?.Role);
   
   // const getLink = async () => {
   //    const role = localStorage.getItem("role");
   //    console.log(role);
   // }

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
      const role = localStorage.getItem('role');
      if (role) {
         setRole(role);
      }
   }, []);

   const apiLink = [
      {path: "http://localhost:3000/", role: "admin" },
      {path: `http://192.168.137.`, role: "user" },
   ]

   return (
      <Box color='inherit'
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Box sx={{
            height: '100%',
            width: '100vh',
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
         }}>

            <Typography
               sx={{
                  display: 'grid',
                  justifyContent: 'center',
                  fontFamily: 'Bangna New',
                  fontWeight: 'bold',
                  fontSize: '30px',
               }}
            >
               {users?.Room}
               <h1>{users?.Firstname} {users?.Lastname}</h1>
            </Typography>


            <Box>
               <List sx={{ height: '100%' }}>
                  {apiLink.map(
                     (item, index) =>
                        role === item.role && (

                           <Button
                              // onClick={() => navigate(item.role)}
                              href={item.path+`${users?.Path}`}
                              // href={item.path}
                              // target="_blank"
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'left',
                                 fontFamily: 'Bangna New',
                                 fontWeight: 'bold',
                                 fontSize: '20px',
                                 width: '50px',
                                 height: '60px',
                                 borderRadius: '30px',
                                 boxShadow: '3',
                                 transition: 'all 0.6s',
                                 bgcolor: '#fcdc00',
                                 color: 'black',
                                 overflow: 'hidden',
                                 '&:hover': {
                                    width: '180px',
                                    // justifyContent: 'center',
                                    bgcolor: '#fcdc00',
                                    color: 'black',
                                    borderRadius: "50px",
                                 },

                              }}
                           >
                              {<ArrowForwardIosRoundedIcon style={{ marginRight: 10, marginLeft: 15 }} />}
                              <h2 style={{ marginLeft: 10, marginRight: 15 }}>Next</h2>
                           </Button>
                        )
                  )}
               </List>
            </Box>



            {/* <Box>
               <Button
                  // variant="contained"
                  // color="warning"
                  // onClick={() => navigate(`${users?.Role}`)}
                  sx={{
                     display: 'flex',
                     justifyContent: 'left',
                     fontFamily: 'Bangna New',
                     fontWeight: 'bold',
                     fontSize: '20px',
                     width: '50px',
                     height: '60px',
                     borderRadius: '30px',
                     boxShadow: '3',
                     transition: 'all 0.6s',
                     bgcolor: '#fcdc00',
                     color: 'black',
                     overflow: 'hidden',
                     '&:hover': {
                        width: '180px',
                        // justifyContent: 'center',
                        bgcolor: '#fcdc00',
                        color: 'black',
                        borderRadius: "50px",
                     },
                     
                  }}
               >
                  {<ArrowForwardIosRoundedIcon style={{ marginRight: 10, marginLeft: 15 }} />} 
                  <h2 style={{ marginLeft: 10, marginRight: 15 }}>Next</h2>
               
               </Button>
            </Box> */}

         </Box>
      </Box>
   );
}
export default Home;