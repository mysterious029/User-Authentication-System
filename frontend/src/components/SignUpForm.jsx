import { FormControl, TextField, Box, Button } from "@mui/material";
import React from "react";
import ImageUpload from "./ImageUpload";
import PasswordField from "./PasswordField";
import ChooseDateComponent from "./ChooseDateComponent";
import { useState } from "react";
import { postData } from "../services/service";
import { CredentialsAlreadyRegistered } from "../alerts/AlertForError";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [dob, setDoB] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [filePath, setFilePath] = useState([]);
  const [errorHappens, setErrorHappens] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForRegisterUser = async () => {
    setLoading(true);
    let payload = {
      name: fullName,
      image: filePath[0],
      dob: dob,
      email: email,
      age: age,
      companyName: companyName,
      password: password,
    };

    const res = await postData(payload, "Register");

    // Check if the response status indicates an error
    if (res === "error") {
      setLoading(false);
      setErrorHappens(true);
    } else {
      navigate("/signin");
    }
  };

  const customTextFieldStyles = {
    // Root class for the input field
    "& .MuiOutlinedInput-root": {
      color: "#000",
      fontFamily: "Raleway",
      fontWeight: "bold",

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
      borderColor: "#0000ff ",
    },
  };

  return (
  <div>
    <div
      className="flex items-center justify-center p-[25px]"
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
        }}
      >
        <h1 className="text-[2rem] font-bold text-[#4180f0]">Sign Up</h1>
        <Box>
          <TextField
            label="Full Name"
            variant="outlined"
            className="w-[16rem]"
            sx={customTextFieldStyles}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        </Box>
        <Box>
          <TextField
            label="Age"
            variant="outlined"
            className="w-[16rem]"
            sx={customTextFieldStyles}
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
        </Box>

        <Box>
          <ChooseDateComponent
            customTextFieldStyles={customTextFieldStyles}
            setDoB={setDoB}
          />
        </Box>

        <Box className="flex items-center justify-center text-[#4180f0]">
          <ImageUpload
            title={"Upload Profile Image"}
            setImageFile={setImageFile}
            setFilePath={setFilePath}
            imageFile={imageFile}
          />
        </Box>

        <Box>
          <TextField
            label="Email"
            variant="outlined"
            className="w-[16rem]"
            sx={customTextFieldStyles}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Box>

        <Box>
          <TextField
            label="Company Name"
            variant="outlined"
            className="w-[16rem]"
            sx={customTextFieldStyles}
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
          />
        </Box>
        <Box>
          <PasswordField
            customTextFieldStyles={customTextFieldStyles}
            title="Password"
            setPassword={setPassword}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            className="text-[#fff] bg-[#0000ff]"
            onClick={() => handleSubmitForRegisterUser()}
            disabled={loading}
          >
              {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
        <Box className="flex gap-[0.125rem]">
          <p className="text-[#000]">You do have an account?</p>
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
    </div>
  );
};


export default SignUpForm;
