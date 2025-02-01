import React, { useState } from "react";
import { Box, FormControl, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postData } from "../services/service";
import { setEmailForNewPassword } from "../redux/actions/actions";
import { CredentialsAlreadyRegistered } from "../alerts/AlertForError";
import { Link } from "react-router-dom";

function ForgetPasswordForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorHappens, setErrorHappens] = useState(false);
  const [loading, setLoading] = useState(false);

  const [forgetInfo, setForgetInfo] = useState("");

  const openNavigate = () => {
    console.log("cLLLEDDD")
    navigate("/resetPassword");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { email: forgetInfo };

      const res = await postData(payload, "ForgetPassword");

      if (res === "error") {
        setLoading(false);
        setErrorHappens(true);
      } else {
        // Dispatch the email for the next step
        console.log(forgetInfo);
        dispatch(setEmailForNewPassword(forgetInfo));
        openNavigate();
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
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

    "& .MuiInputLabel-root": {
      whiteSpace: "nowrap", // Prevents wrapping of the label text
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
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          padding: "1rem",
          width: "25rem",
          height: "20rem",
        }}
      >
        <h1 className="text-[2rem] font-bold text-[#4180f0]">
          Forget Password
        </h1>
        <Box>
          <TextField
            label="Email"
            variant="outlined"
            className="w-[16rem]"
            sx={customTextFieldStyles}
            onChange={(e) => {
              setForgetInfo(e.target.value);
            }}
          />
        </Box>

        <Box>
          <Button
            variant="contained"
            className="bg-[#0000ff] text-[#fff]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
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

export default ForgetPasswordForm;
