import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { autocompleteClasses, Box, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Container } from '@mui/system';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(5),
      alignContent: "center",
      alignItems: "center",
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
    
  })
);

const IOSSwitch = styled((props: SwitchProps) => (
     <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
   ))(({ theme }) => ({
     width: 42,
     height: 26,
     padding: 0,
     '& .MuiSwitch-switchBase': {
       padding: 0,
       margin: 2,
       transitionDuration: '300ms',
       '&.Mui-checked': {
         transform: 'translateX(16px)',
         color: '#fff',
         '& + .MuiSwitch-track': {
           backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
           opacity: 1,
           border: 0,
         },
         '&.Mui-disabled + .MuiSwitch-track': {
           opacity: 0.5,
         },
       },
       '&.Mui-focusVisible .MuiSwitch-thumb': {
         color: '#33cf4d',
         border: '6px solid #fff',
       },
       '&.Mui-disabled .MuiSwitch-thumb': {
         color:
           theme.palette.mode === 'light'
             ? theme.palette.grey[100]
             : theme.palette.grey[600],
       },
       '&.Mui-disabled + .MuiSwitch-track': {
         opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
       },
     },
     '& .MuiSwitch-thumb': {
       boxSizing: 'border-box',
       width: 22,
       height: 22,
     },
     '& .MuiSwitch-track': {
       borderRadius: 26 / 2,
       backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
       opacity: 1,
       transition: theme.transitions.create(['background-color'], {
         duration: 500,
       }),
     },
   }));

function Index() {
     const classes = useStyles();

     const apiUrl = "http://localhost:8080";

     return (
         <div>
            <Container className={classes.container} maxWidth="md">
               <Box sx={{ 
                     display: 'flex',
                     justifyContent: 'space-around',
                     p: 1,
                     m: 1,
                     fontFamily: "PK Krung Thep Medium",
                     background: "url(https://png.pngtree.com/thumb_back/fh260/background/20201009/pngtree-light-blue-background-design-image_405678.jpg)",
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                  }}   
               >
                  <Grid container spacing={3}>
                     <Grid xs={12} display="flex" justifyContent="center">
                        <h1 style={{ textAlign: "center", fontSize: 40 }}>
                           ระบบควบคุมการทำงานของหลอดไฟ
                        </h1>
                     </Grid>
                     
                     <Grid xs={3} display="flex" justifyContent="center"
                        marginTop={5}
                     >
                        <FormControlLabel
                           control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                           label="LED 1"
                           id="GPIO6"
                        />
                     </Grid>

                     <Grid xs={3} display="flex" justifyContent="center"
                        marginTop={5}
                     >

                        <FormControlLabel
                           control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                           label="LED 2"
                           id="GPIO13"
                        />
                     </Grid>

                     <Grid xs={3} display="flex" justifyContent="center"
                        marginTop={5}
                     >
                        <FormControlLabel
                           control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                           label="LED 3"
                           id="GPIO22"
                        />
                     </Grid>

                     <Grid xs={3} display="flex" justifyContent="center"
                        marginTop={5}
                     >
                        <FormControlLabel
                           control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                           label="LED 4"
                           id="GPIO27"
                        />
                     </Grid>

                  </Grid>
  
               </Box>
               <script src="/socket.io/socket.io.js"></script>
               <script src="http://192.168.137.11/"></script>
            </Container>
            
         </div>
          

          

     );

}
export default Index;