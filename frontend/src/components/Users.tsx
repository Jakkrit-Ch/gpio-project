import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from '@mui/material/Unstable_Grid2';
import { deepOrange, deepPurple, green } from '@mui/material/colors';


import { UserInterface } from "../models/IUser";
import { Divider } from "@mui/material";
import { Chip } from "@material-ui/core";
import Avatar from '@mui/material/Avatar';


function Users() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  
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


  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 2 }} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography sx={{
              fontFamily: "PK Krung Thep Medium",
              fontSize: "30px"
            }}
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ระบบจัด User
            </Typography>
          </Box>
          <Box>
            <Button 
              sx={{
                fontFamily: "PK Krung Thep Medium",
                fontSize: "18px"
              }}
              component={RouterLink}
              to="/user/create"
              variant="contained"
              color="primary"
            >
              Add User
            </Button>
          </Box>
        </Box>
        
        <TableContainer component={Paper} sx={{ minWidth: 650 }}>
          <Table sx={{ marginTop: 2, fontFamily: "PK Krung Thep Medium", }} aria-label="simple table">
            <TableHead >
              <TableRow>
              <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="10%">
                  ชื่อ
                </TableCell>
                <TableCell align="center" width="15%">
                  Email
                </TableCell>
                <TableCell align="center" width="10%">
                  สิทธิ์
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item: UserInterface) => (
                <TableRow key={item.ID}>
                <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Name}</TableCell>
                  <TableCell align="center">{item.Email}</TableCell>
                  <TableCell align="center">{item.Role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Users;