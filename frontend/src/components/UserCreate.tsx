import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from '@mui/material/TextField';


import { UserInterface } from "../models/IUser";
import { RoomInterface } from "../models/IRoom";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserCreate() {
  const [user, setUser] = React.useState<Partial<UserInterface>>({});
  const [room, setRooms] = React.useState<Partial<RoomInterface>>({});


  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = "http://localhost:8080";



  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof UserCreate;
    const { value } = event.target;
    setUser({ ...user, [id]: value });
    setRooms({ ...room, [id]: value });

  };



  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  function submit() {
    let data = {
        Name:       user.Name ?? "",
        Tel:        user.Tel ?? "",
        Email:      user.Email ?? "",
        Password:   user.Password ?? "",
        Role:       user.Role ?? "",


        Username:       user.Name ?? "",
        Usertel:        user.Tel ?? "",
        Useremail:      user.Email ?? "",
        Userrole:       user.Role ?? "",
       
        
    };


    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/users`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true)
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true)
          setErrorMessage(res.error)
        }
      });

      fetch(`${apiUrl}/rooms`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true)
          setErrorMessage("")
        } else {
          console.log("บันทึกไม่ได้")
          setError(true)
          setErrorMessage(res.error)
        }
      });

  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "24px"
              }}
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ลงทะเบียน

            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2,
          fontFamily: "PK Krung Thep Medium",
          fontSize: "22px"
        }}>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
           <p>Name</p>
            <TextField
                id="Name"
                label="Enter your name"
                placeholder=""
                onChange={handleInputChange}
            />
           </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
           <p>Tel</p>
            <TextField
                id="Tel"
                label="Enter your tel"
                placeholder=""
                onChange={handleInputChange}
            />
           </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
           <p>Email</p>
            <TextField
                id="Email"
                label="Enter email"
                placeholder=""
                onChange={handleInputChange}
            />
           </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
           <p>Password</p>
            <TextField
                id="Password"
                variant="outlined"
                label="password"
                type="Password"
                placeholder=""
                onChange={handleInputChange}
            />
           </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
           <p>Room</p>
            <TextField
                id="Role"
                label="Enter room number"
                placeholder=""
                onChange={handleInputChange}
            />
           </FormControl>
          </Grid> 

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/users"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}              
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserCreate;