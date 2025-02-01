import React, { useState } from "react";
import { FormControl, TextField, Box, Button } from "@mui/material";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";
import { CredentialsAlreadyRegistered } from "../alerts/AlertForError";
import { postData } from "../services/service";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function SigninForm() {
  const [errorHappens, setErrorHappens] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpField, setOtpField] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForgetPassword = () => {
    navigate("/forgetPassword");
  };

  // const ForfindEmployeeInfo = async(userId, depart)=>{
  //   const data = await getEmployeeStatusByUserId(userId);
  //   if(data){
  //     setOtpField(true);
  //   }
  // }



  const handleSignIn = async () => {
    let siginInfo = {
      email: email,
      password: password,
    };

    try {
      const res = await postData(siginInfo, "Login");
      if (res === "error") {
        setErrorHappens(true);
      } else {
        setOtpField(true);
        // Store the token in sessionStorage
        alert("Opt successfully Send on given Email Id");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorHappens(true);
    }
  };

  const handleSignWithOtp = async () => {
    let siginInfo = {
      email: email,
      otp: otpValue,
    };

    try {
      const res = await postData(siginInfo, "Verfiy");
      if (res === "error") {
        setErrorHappens(true);
      } else {
        // Store the token in sessionStorage
        sessionStorage.setItem("JwtToken", res?.data?.token);

        // Retrieve and decode the token
        const token = sessionStorage.getItem("JwtToken");
        if (!token) {
          console.error("Failed to store or retrieve token from sessionStorage.");
          return;
        }

 
        const decoded = jwtDecode(token);

        if (!decoded.id) {
          console.error("Decoded token is missing required fields.");
          return;
        }

        navigate('/dashboard');
        // Process employee info based on the decoded token
        // ForfindEmployeeInfo(decoded.id);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorHappens(true);
    }
  };

  const customTextFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "#000",
      fontFamily: "Raleway",
      fontWeight: "bold",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000",
      },
      "& .MuiInputLabel-outlined": {
        color: "#fff",
        fontWeight: "bold",
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#000",
      },
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0000ff ",
    },
  };

  return (
    <div
      className="flex items-center justify-center p-[35px]"
      style={{
        background: "linear-gradient(to bottom, #3b7cef, #ffffff)",
      }}
    >
      <FormControl
        className="flex flex-col gap-[1rem] items-center justify-center rounded-md"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          padding: "1rem",
          width: "100%",
          maxWidth: "25rem",
          minHeight: "25rem",
          backgroundColor: "#fff",
        }}
      >
        <h1 className="text-[2rem] font-bold text-[#4180f0]">Sign In</h1>
        <Box>
          <TextField
            label="Email"
            variant="outlined"
            className="w-[16rem]"
            sx={{ ...customTextFieldStyles }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Box>

        <Box>
          { otpField ? 
          <TextField
            label="Otp"
            variant="outlined"
            className="w-[16rem]"
            sx={{ ...customTextFieldStyles }}
            onChange={(e) => {
              setOtpValue(e.target.value);
            }}
          />:<PasswordField
            customTextFieldStyles={customTextFieldStyles}
            title="Password"
            setPassword={setPassword}
          />}
        </Box>

        <Box className="flex flex-col gap-[1rem]">
          <Button
            variant="contained"
            className="bg-[#0000ff] text-[#fff]"
            onClick={otpField ? handleSignWithOtp : handleSignIn}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            className="text-[#0000ff] bg-[#fff]"
            onClick={handleSubmitForgetPassword}
          >
            Forget Password
          </Button>
        </Box>
        <Box className="flex gap-[0.225rem]">
          <p className="text-[#000]">You don't have an account?</p>
          <Link to="/signup" className="text-[#0000ff]">
            Sign Up
          </Link>
        </Box>
        {errorHappens && (
          <CredentialsAlreadyRegistered
            open={errorHappens}
            handleClose={() => setErrorHappens(false)}
          />
        )}
      </FormControl>
    </div>
  );
}

export default SigninForm;
