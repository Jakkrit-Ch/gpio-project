import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from '@mui/material/TextField';
import styled from "@emotion/styled";


import { UserInterface } from "../models/IUser";

export const TextFielPrice = styled(TextField)`
  fieldset {
    border-radius: 20px;
    height: 60px;
    // background: gray;
    center: center;
  }
`;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserCreate() {
  const [user, setUser] = React.useState<Partial<UserInterface>>({});

  const [firstname, setFirstname] = useState<String>("");
  const [lastname, setLastname] = useState<String>("");
  const [room, setRoom] = useState<String>("");
  const [tel, setTel] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");


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


  function submit() {
    let data = {
      FirstName: firstname,
      LastName: lastname,
      Tel: tel,
      Room: "A" + room,
      Email: email,
      Password: password,
      Role: 'user',
      Path: room,
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

  }

  return (
    <Box color='inherit' sx={{ width: '80%' }}>
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
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{
            fontFamily: 'Bangna New',
            // fontFamily: 'WDB Bangna',
            fontSize: "35px",
            color: '#2c82c9',

          }}
            component="h1"
            variant="h6"
            color="primary"
            gutterBottom
          >
            <b>Register</b>

          </Typography>
        </Box>
        <Divider />

        <Grid container spacing={3} sx={{
          padding: 2,
          fontFamily: "Bangna New",
          fontSize: "22px",
          fontWeight: 'bold',
        }}>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              Firstname
              <TextFielPrice
                id="Name"
                onChange={(event) => setFirstname(event.target.value)}
                label={<Typography sx={{ fontFamily: "Bangna New", fontSize: "20px", fontWeight: 'bold' }}>
                  Enter your Firstname
                </Typography>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              Lastname
              <TextFielPrice
                id="Name"
                onChange={(event) => setLastname(event.target.value)}
                label={<Typography sx={{ fontFamily: "Bangna New", fontSize: "20px", fontWeight: 'bold', }}>
                  Enter your Lastname
                </Typography>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              Tel
              <TextFielPrice
                id="Tel"
                onChange={(event) => setTel(event.target.value)}
                label={<Typography sx={{ fontFamily: "Bangna New", fontSize: "20px", fontWeight: 'bold', }}>
                  Enter your Tel
                </Typography>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              Room
              <TextFielPrice
                id="Role"
                onChange={(event) => setRoom(event.target.value)}
                label={<Typography sx={{ fontFamily: "Bangna New", fontSize: "20px", fontWeight: 'bold', }}>
                  Room number
                </Typography>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              Email
              <TextFielPrice
                id="Email"
                onChange={(event) => setEmail(event.target.value)}
                label={<Typography sx={{ fontFamily: "Bangna New", fontSize: "20px", fontWeight: 'bold', }}>
                  Enter email
                </Typography>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              Password
              <TextFielPrice
                id="Password"
                variant="outlined"
                type="Password"
                onChange={(event) => setPassword(event.target.value)}
                label={<Typography sx={{ fontFamily: "Bangna New", fontSize: "20px", fontWeight: 'bold' }}>
                  Enter password
                </Typography>}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{
          mt: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <Button
            component={RouterLink}
            to="/users"
            color="inherit"
            sx={{
              mr: '15px',
              height: '40px',
              width: '100px',
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
          >
            <b>Back</b>
          </Button>

          <Button
            onClick={submit}
            sx={{
              ml: '10px',
              height: '40px',
              width: '100px',
              fontFamily: "Bangna New",
              fontSize: "18px",
              bgcolor: '#2cc990',
              color: 'white',
              borderRadius: "20px",
              boxShadow: '3',
              transition: 'all 0.3s',
              '&:hover': {
                scale: '1.1',
                bgcolor: '#2cc990',
                color: 'white',
                borderRadius: "20px",
              },
            }}
          >
            <b>Save</b>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UserCreate;