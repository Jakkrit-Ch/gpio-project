import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import List from "@mui/material/List";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';

import TungstenRoundedIcon from '@mui/icons-material/TungstenRounded';
import TungstenTwoToneIcon from '@mui/icons-material/TungstenTwoTone';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

import { UserInterface } from "../models/IUser";

import { useEffect, useState } from "react";

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


const members = [
   { name: "A11", path: "http://192.168.137.11" },
   { name: "A12", path: "http://192.168.137.12" },
   { name: "A13", path: "http://192.168.137.13" },
   { name: "A14", path: "http://192.168.137.14" },
   { name: "A15", path: "http://192.168.137.15" },
   { name: "A16", path: "http://192.168.137.16" },
   
   { name: "A21", path: "http://192.168.137.21" },
   { name: "A22", path: "http://192.168.137.22" },
   { name: "A23", path: "http://192.168.137.23" },
   { name: "A24", path: "http://192.168.137.24" },
   { name: "A25", path: "http://192.168.137.25" },
   { name: "A26", path: "http://192.168.137.26" },

   { name: "A31", path: "http://192.168.137.31" },
   { name: "A32", path: "http://192.168.137.32" },
   { name: "A33", path: "http://192.168.137.33" },
   { name: "A34", path: "http://192.168.137.34" },
   { name: "A35", path: "http://192.168.137.35" },
   { name: "A36", path: "http://192.168.137.36" },

   { name: "A41", path: "http://192.168.137.41" },
   { name: "A42", path: "http://192.168.137.42" },
   { name: "A43", path: "http://192.168.137.43" },
   { name: "A44", path: "http://192.168.137.44" },
   { name: "A45", path: "http://192.168.137.45" },
   { name: "A46", path: "http://192.168.137.46" },

]


function HomeAdmin() {
   const classes = useStyles();
   const [users, setUsers] = useState<UserInterface>();

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
            console.log(res.data);
            if (res.data) {
               setUsers(res.data);
            } else {
               console.log("else");
            }
         });
   };

   useEffect(() => {
      getUsers();
   }, []);

   return (
      <Box color='inherit'
         sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <Box sx={{
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
            // bgcolor: 'lightgray',
         }}>
            <List sx={{
               height: '100%',
               width: '90%',
            }}>

               <Grid container spacing={3} sx={{
                  padding: 2,
                  fontFamily: "Bangna New",
                  fontSize: "22px",
                  fontWeight: 'bold',

               }}>
                  {members.map(item =>

                     <Grid xs={2}>
                        <Button
                           href={item.path}
                           // target="_blank"
                           sx={{
                              // backgroundImage: 'url(https://i.pinimg.com/564x/66/a8/d4/66a8d47225f333ae0c7d673481c76ca9.jpg)',
                              // backgroundRepeat: 'no-repeat',
                              // backgroundSize: 'cover',
                              backgroundPosition: 'right',
                              fontFamily: "Bangna New",
                              fontSize: "32px",
                              color: 'black',
                              height: '100px',
                              width: '100%',
                              background: 'rgba(255, 255, 255, 0.2)',
                              borderRadius: "20px",
                              // borderColor: "White",
                              // boxShadow: "10px 10px 60px #bebebe, -10px -10px 60px #ffffff",
                              boxShadow: 5,
                              transition: 'all .3s',
                              '&:hover': {
                                 // backgroundPosition: "bottom",
                                 transform: 'scale(1.08)',
                                 bgcolor: '#FFEB3B',
                                 color: 'black',
                                 borderRadius: "20px",
                              }
                           }}
                        >
                           {/* { item.icon } */}
                           {<EmojiObjectsOutlinedIcon color="warning"/>}
                           <b>{item.name}</b>
                        </Button>
                     </Grid>
                  )}
               </Grid>
            </List>
         </Box>
      </Box>
   );
}
export default HomeAdmin;