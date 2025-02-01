import { useState } from "react";
import {
  InputAdornment,
  Box,
  OutlinedInput,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordField({ customTextFieldStyles, title , setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <FormControl
        variant="outlined"
        className="w-[16rem]"
        sx={{
          ...customTextFieldStyles,
        }}
      >
        {/* Automatically handles floating label */}
        <InputLabel htmlFor="password">{title}</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          label={title} // Sync with InputLabel
          onChange={(event)=>{setPassword(event.target.value)}}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
}

export default PasswordField;
