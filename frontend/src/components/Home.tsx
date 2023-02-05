import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@mui/material";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';

import { RoomInterface } from "../models/IRoom";
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



function Home() {
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const classes = useStyles();

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getRoom = async () => {
    fetch(`${apiUrl}/rooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
            setRooms(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getRoom();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <Box
          sx={{ 
            fontFamily: "PK Krung Thep Medium",
            fontSize: "24px",
            background: "url(https://png.pngtree.com/thumb_back/fh260/background/20201009/pngtree-light-blue-background-design-image_405678.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Paper elevation={3}>
            <Box sx={{ 
              m: 1.5,
            }}
            >
              <Grid container spacing={3}>
                  {rooms.map((item: RoomInterface) => (
                    <Grid xs={4}>
                      <Typography 
                        align="center"
                        sx={{ 
                          fontFamily: "PK Krung Thep Medium",
                          fontSize: 35 
                        }} 
                        color="text.primary"
                      >
                        <b>ห้อง {item.Userrole}</b>
                      </Typography>
                      <Button 
                        component="span"
                        sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1,
                        m: 1,
                        boxShadow: 5,
                        borderRadius: 4,
                        bgcolor: '#00e676',
                        '&:hover': {
                          backgroundColor: '#00c853',
                        },
                        
                        }}
                      >
                        <Typography 
                          align="center"
                          sx={{ 
                            fontFamily: "PK Krung Thep Medium",
                          }} 
                          color="#fafafa"
                        >
                          <Typography 
                            align="center"
                            sx={{ 
                              fontFamily: "PK Krung Thep Medium",
                              fontSize: 40,
                            }} 
                            color="#fafafa"
                          >
                            <b><u>{item.Username}</u></b>
                          </Typography>
                          <h4>
                            <b>ขนาดห้อง:</b> {item.Usertel}<br/>
                          </h4>
                        </Typography>                      
                      </Button>
                    </Grid>
                    
                    
                  ))}
                  
              </Grid>
            </Box>
          </Paper>
        </Box>

        <Box
          sx={{ 
            fontFamily: "PK Krung Thep Medium",
            background: "url(https://png.pngtree.com/thumb_back/fh260/background/20201009/pngtree-light-blue-background-design-image_405678.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: 40 }}>ระบบควบคุมการทำงานของหลอดไฟ</h1>
        </Box>
        
        

        
      </Container>
    </div>
  );
}
export default Home;