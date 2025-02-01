import React, { useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { postData } from "../services/service";
import { useDispatch } from "react-redux";
import { setError } from "../redux/actions/actions";
import { CredentialsAlreadyRegistered } from "../alerts/AlertForError";

function ImageUpload({ title, setImageFile, imageFile, setFilePath }) {
  const openSelectFile = useRef(null);
  const [errorHappens, setErrorHappens] = useState(false);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const payload = new FormData();
      payload.append("image", selectedFile);

      postData(payload, "UploadUserImage")
        .then((response) => {
          const data = response;
          const newFilePath = data.imageUrl;

          setFilePath((prevFilePaths) => [...prevFilePaths, newFilePath]);
          setImageFile((prevFiles) => [...prevFiles, newFilePath]);
        })
        .catch((error) => {
          setError(true);
          dispatch(setError("Error uploading image:", error));
        });
    }
  };

  const removeFile = (index) => {
    setImageFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleOpenChooseImage = () => {
    openSelectFile.current.click();
  };

  return (
    <Box className="flex flex-col justify-center items-center">
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box className="flex justify-center items-center">
        <Button
          variant="contained"
          onClick={handleOpenChooseImage}
          className="bg-[#0000ff]"
        >
          Choose File
        </Button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={openSelectFile}
          style={{ display: "none" }}
        />
      </Box>
      {imageFile && imageFile.length > 0 ? (
        <Box>
          {imageFile.map((file, index) => (
            <div key={index} className="flex items-center justify-between mt-2">
              <span className="text-white-700">
                {file.length > 15 ? `${file.substring(0, 30)}...` : file}
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTimes} className="text-customBlue" />
              </button>
            </div>
          ))}

          {errorHappens && (
            <CredentialsAlreadyRegistered
              open={errorHappens}
              handleClose={() => setErrorHappens(false)}
            />
          )}
        </Box>
      ) : (
        <Typography className="text-[#fff]">No image selected</Typography>
      )}
    </Box>
  );
}

export default ImageUpload;
