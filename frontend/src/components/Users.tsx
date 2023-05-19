import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from "react-router-dom";

import { UserInterface } from "../models/IUser";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditIcon from '@mui/icons-material/ModeEdit';



function Users() {
   let navigate = useNavigate();
   const [users, setUsers] = useState<UserInterface[]>([]);

   const [success, setSuccess] = useState(false);
   const [error, setError] = useState(false);
   const [ErrorMessage, setErrorMessage] = useState("");

   const apiUrl = "http://localhost:8080";
   const requestOptions = {
      method: "GET",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   };

   const getUser = async () => {
      fetch(`${apiUrl}/users`, requestOptions)
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

   const DeleteUser = async (id: string | number | undefined) => {
      const requestOptions = {
         method: "DELETE",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      };

      fetch(`${apiUrl}/users/${id}`, requestOptions)
         .then((response) => response.json())
         .then(
            (res) => {
               if (res.data) {
                  setSuccess(true)
                  console.log("ลบข้อมูลสำเร็จ")
                  setErrorMessage("")
               }
               else {
                  setErrorMessage(res.error)
                  setError(true)
                  console.log("ลบข้อมูลไม่สำเร็จ")
               }
               getUser();
            }
         )

   }


   useEffect(() => {
      getUser();
   }, []);

   return (
      <Box color='inherit'
         sx={{
            // bgcolor: 'lightgray',
            height: "100%",
            width: "80%",
            display: 'flex',
            justifyContent: 'center',

         }}
      >
         <Grid container component="main"
            sx={{
               height: "85vh",
               width: '100%',
               display: 'flex',
               justifyContent: 'center',
            }}
         >
            <Box
               sx={{
                  height: '5vh',
                  width: '100%',
                  display: 'grid',
                  alignItems: 'center',
               }}
            >
               <Box sx={{
                  mt: '10px',
                  mb: '10px',
                  display: 'flex',
                  alignItems: 'center',
               }}>
                  <Box flexGrow={1}>
                     <Typography sx={{
                        fontFamily: "Bangna New",
                        fontSize: "30px",
                        color: '#2c82c9',
                     }}
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                     >
                        <b>User Table</b>
                     </Typography>
                  </Box>
                  <Box>
                     <Button
                        sx={{
                           height: '40px',
                           width: '40px',
                           fontFamily: "Bangna New",
                           fontSize: "18px",
                           bgcolor: '#2c82c9',
                           color: 'white',
                           borderRadius: "20px",
                           boxShadow: '3',
                           transition: 'all 0.3s',
                           '&:hover': {
                              scale: '1.1',
                              bgcolor: '#2c82c9',
                           color: 'white',
                              borderRadius: "20px",
                           },
                        }}
                        component={RouterLink}
                        to="/user/create"
                     >
                        <b>Add</b>
                     </Button>
                  </Box>
               </Box>

               <Box>
                  <TableContainer>
                     <Table sx={{ marginTop: 2, fontFamily: "Bangna New", }} aria-label="simple table">
                        <TableHead >
                           <TableRow>

                              <TableCell align="center" width="5%" sx={{
                                 fontFamily: "Bangna New",
                                 fontSize: "18px",
                                 fontWeight: "bold",
                              }}>
                                 <b>ID:</b>
                              </TableCell>

                              <TableCell align="center" width="20%" sx={{
                                 fontFamily: "Bangna New",
                                 fontSize: "18px",
                                 fontWeight: "bold",
                              }}>
                                 <b>Name:</b>
                              </TableCell>

                              <TableCell align="center" width="15%" sx={{
                                 fontFamily: "Bangna New",
                                 fontSize: "18px",
                                 fontWeight: "bold",
                              }}>
                                 <b>Tel:</b>
                              </TableCell>

                              <TableCell align="center" width="5%" sx={{
                                 fontFamily: "Bangna New",
                                 fontSize: "18px",
                                 fontWeight: "bold",
                              }}>
                                 <b>Room:</b>
                              </TableCell>

                              <TableCell align="center" width="15%" sx={{
                                 fontFamily: "Bangna New",
                                 fontSize: "18px",
                                 fontWeight: "bold",
                              }}>
                                 <b>Email:</b>
                              </TableCell>

                              <TableCell align="center" width="10%">

                              </TableCell>

                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {users.map((item: UserInterface) => (
                              <TableRow key={item.ID}>
                                 <TableCell align="center" sx={{
                                    fontFamily: "Bangna New",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                 }}>{item.ID}</TableCell>

                                 <TableCell align="center" sx={{
                                    fontFamily: "Bangna New",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                 }}>{item.Firstname} {item.Lastname}</TableCell>

                                 <TableCell align="center" sx={{
                                    fontFamily: "Bangna New",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                 }}>{item.Tel}</TableCell>

                                 <TableCell align="center" sx={{
                                    fontFamily: "Bangna New",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                 }}>{item.Room}</TableCell>

                                 <TableCell align="center" sx={{
                                    fontFamily: "Bangna New",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                 }}>{item.Email}</TableCell>

                                 <TableCell align="center">
                                    <div style={{
                                       display: 'flex',
                                       justifyContent: 'center',
                                       marginTop: 2,
                                       marginBottom: 'auto',
                                       marginLeft: 5,
                                       marginRight: 10,
                                    }}>
                                       <Button
                                          sx={{
                                             color: '#2c82c9',
                                             transition: 'all 0.5s',
                                             borderRadius: '20px',
                                             '&:hover': {
                                                bgcolor: '#fbe4d8',
                                                transform: 'scale(1.2)'
                                             },
                                          }}
                                          onClick={() => navigate(`${item.ID}`)}
                                       >
                                          {<ModeEditIcon />}
                                       </Button>
                                       <Button
                                          sx={{
                                             color: '#b51a2b',
                                             transition: 'all 0.3s',
                                             borderRadius: '20px',
                                             '&:hover': {
                                                transform: 'scale(1.2)'
                                             },
                                          }}
                                          aria-label="delete"
                                          onClick={() => DeleteUser(item.ID)}
                                       >
                                          {<DeleteRoundedIcon />}
                                       </Button>
                                    </div>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            </Box>
         </Grid>
      </Box>
   );
}

export default Users;