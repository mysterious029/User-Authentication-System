import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Avatar,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import NrmlLoading from "./NrmlLoading";
import { jwtDecode } from "jwt-decode";

const backendUrl = `${process.env.REACT_APP_URL}`;

function DashBoard() {
  const [formData, setFormData] = useState({
    id: "",
    image: "",
    name: "",
    dob: "",
    age: "",
    companyName: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForgetPassword = () => {
    navigate("/forgetPassword");
  };

  useEffect(() => {
    const fetchUserProfileData = async () => {
      const token = sessionStorage.getItem("JwtToken");
      if (!token) {
        setError("No token provided");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log(decoded, "Decoded Token");
        setFormData({
          id: decoded?.id || "",
          image: decoded?.image || "",
          name: decoded?.name || "",
          dob: decoded?.dob || "",
          age: decoded?.age || "",
          email: decoded?.email || "",
          companyName: decoded?.companyName || "",
        });

        setLoading(false);
      } catch (err) {
        setError("Invalid or expired token");
        setLoading(false);
      }
    };

    fetchUserProfileData();
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = sessionStorage.getItem("JwtToken");
      if (!token) {
        alert("You must be logged in to delete your account.");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded?.id;

      if (!userId) {
        alert("User ID not found in token.");
        return;
      }

      const response = await axios.delete(`${backendUrl}/user/${userId}`);

      if (response.data.success) {
        alert("Account deleted successfully!");
        sessionStorage.removeItem("JwtToken");
        navigate("/signin");
      } else {
        alert(response.data.message || "Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem("JwtToken");
    navigate("/signin");
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50">
      {loading ? (
        <NrmlLoading />
      ) : (
        <div
          style={{
            padding: "2rem 0",
          }}
        >
          <Box
            maxWidth="600px"
            margin="2rem auto 0"
            padding="2rem"
            borderRadius="12px"
            boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
            bgcolor="#ffffff"
          >
            {showAlert && (
              <Alert
                severity={error ? "error" : "success"}
                onClose={() => setShowAlert(false)}
                style={{ marginBottom: "1.5rem" }}
              ></Alert>
            )}
            <Grid container spacing={4}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Avatar
                  src={formData.image}
                  alt="Profile Pic"
                  style={{
                    width: "130px",
                    height: "130px",
                    margin: "0 auto",
                    border: "3px solid #1976d2",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  style={{
                    fontWeight: "bold",
                    color: "#2563eb",
                    fontSize: "1.8rem",
                  }}
                >
                  {`Welcome, ${formData.name || "Your Profile"}`}
                </Typography>
              </Grid>
              {[
                { label: "Full Name", name: "name", disabled: true },
                { label: "Age", name: "age", disabled: true },
                { label: "Date of Birth", name: "dob", disabled: true },
                { label: "Email", name: "email", disabled: true },
                { label: "Company Name", name: "companyName", disabled: true },
              ].map(({ label, name, disabled = false }) => (
                <Grid item xs={12} key={name}>
                  <TextField
                    label={label}
                    name={name}
                    value={formData[name]}
                    // disabled={disabled}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    fullWidth
                    margin="normal"
                    disabled={disabled}
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleSubmitForgetPassword}
                  fullWidth
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 2px 6px rgba(233, 28, 216, 0.3)",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Change Password
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogoutClick}
                  fullWidth
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 2px 6px rgba(25, 118, 210, 0.3)",
                    transition: "transform 0.2s ease",
                    marginTop: "1rem",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Logout
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteAccount}
                  fullWidth
                  style={{
                    borderRadius: "20px",
                    boxShadow: "0 2px 6px rgba(237, 33, 18, 0.3)",
                    transition: "transform 0.2s ease",
                    backgroundColor: "#E33333",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Remove Account
                </Button>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </div>
  );
}

export default DashBoard;
