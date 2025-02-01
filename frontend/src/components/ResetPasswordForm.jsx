import React from "react";
import { Box, FormControl, TextField, Button } from "@mui/material";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postData } from "../services/service";
import { CredentialsAlreadyRegistered } from "../alerts/AlertForError";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ResetPasswordForm() {
  const [errorHappens, setErrorHappens] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  localStorage.setItem(
    "email",
    JSON.stringify(useSelector((state) => state.store.forResetEmail))
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const openNavigate = ()=>{
    navigate("/signin");
  }
  const handleSubmitResetForm = async () => {
    setLoading(true);
    let payload = {
      email: JSON.parse(localStorage.getItem("email")),
      otp: otp,
      newPassword: newPassword,
    };

    const res = await postData(payload, "ResetPassword");

    if (res === "error") {
      setLoading(false);
      setErrorHappens(true);
    } else {
      openNavigate();
    }
  };

  const customTextFieldStyles = {
    // Root class for the input field
    "& .MuiOutlinedInput-root": {
      color: "#000",
      fontFamily: "Raleway",
      fontWeight: "bold", // Corrected property name (was 'font-weight')

      // Styling for the border around the input field
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#000",
      },

      // Styling for the label of the input field
      "& .MuiInputLabel-outlined": {
        color: "#fff",
        fontWeight: "bold",
      },

      // Styling for the focused state of the label
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#000", // Optional: Change label color when focused
      },
    },
    // Styling for hover state
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0000ff ", //optional: Different color on hover
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
        className="flex flex-col gap-[1rem] items-center justify-center rounded-md bg-[#fff]"
        style={{
          "boxShadow":
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          padding: "1rem",
          width: "25rem",
          height: "25rem",
        }}
      >
        <h1 className="text-[2rem] font-bold text-[#4180f0]">Reset Password</h1>
        <Box>
          <TextField
            label="Enter Otp"
            variant="outlined"
            className="w-[16rem]"
            sx={customTextFieldStyles}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
        </Box>

        <Box>
          <PasswordField
            customTextFieldStyles={customTextFieldStyles}
            title="Enter New Password"
            setPassword={setNewPassword}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            className="bg-[#0000ff] text-[#fff]"
            onClick={handleSubmitResetForm}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
        <Box className="flex gap-[0.225rem]">
          <p className="text-[#000]">Back To </p>
          <Link to="/forgetPassword" className="text-[#0000ff]">
            Forget Password
          </Link>
        </Box>
        <Box className="flex gap-[0.225rem]">
          <p className="text-[#000]">Back To </p>
          <Link to="/signin" className="text-[#0000ff]">
            Sign In
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

export default ResetPasswordForm;
