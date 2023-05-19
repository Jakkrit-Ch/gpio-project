import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SigninInterface } from "../models/ISignin";
import { Login } from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function SignIn() {
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const submit = async () => {
    let res = await Login(signin);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            อีเมลหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Grid
          item
          xs={12}
          // sm={4}
          // md={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: "url(https://img.freepik.com/free-vector/minimal-geometric-stripe-shape-background_1409-1014.jpg?w=1060&t=st=1682155563~exp=1682156163~hmac=fba806e5fa83ba7720cc2efe3af620b4b989562eb82ede2b9d90062f848e836a)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box 
            sx={{
              mt: "auto",
              mb: "auto",
              height: 'auto',
              width: '700px',
              borderRadius: "20px",
              backgroundColor: "rgba(255,255,255,0.8)",

            }}
          >
            <Box
              sx={{
                my: 4,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>

              <Typography 
                component="h1" 
                variant="h5"
                sx={{
                  fontFamily: 'Bangna New',
                  fontWeight: 'bold',
                }}
              >
                <h2>Sign in</h2>
              </Typography>

              <Box sx={{ mt: 1, display: 'grid', width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={signin.Email || ""}
                  onChange={handleInputChange}
                  inputProps={{
                    style: { fontFamily: "Bangna New", fontSize: 20, fontWeight: "bold" },
                 }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="Password"
                  autoComplete="current-password"
                  value={signin.Password || ""}
                  onChange={handleInputChange}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="success" />}
                  // label="Remember me"
                  label={<Typography style={{ fontFamily: "Bangna New", fontSize: 20, fontWeight: "bold" }}>
                    Remember me
                  </Typography>}
                />
                <Button
                  type="submit"
                  color="success"
                  fullWidth
                  variant="contained"
                  onClick={submit}
                  sx={{
                    mt: '3',
                    mb: '2',
                    ml: 'auto',
                    mr: 'auto',
                    fontFamily: "Bangna New",
                    fontWeight: 'bold',
                    fontSize: '20px',
                    borderRadius: '15px',
                    width: '300px',

                  }}
                >
                  Log in
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;