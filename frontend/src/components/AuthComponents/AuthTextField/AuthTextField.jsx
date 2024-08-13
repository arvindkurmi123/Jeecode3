import React from 'react';
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./AuthTextField.module.css";

const AuthTextField = ({ placeholder, type, value, onChange }) => {
  return (
    <TextField
      type={type}
      value={value}
      onChange={onChange}
      className={styles.usernameValue}
      placeholder={placeholder}
      variant="outlined"
      sx={{
        "& fieldset": {
          borderColor: "#695413",
          borderWidth: "0.1px",
        },
        "&:hover fieldset": {
          borderColor: "#695413",
          borderWidth: "2px",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#695413",
          borderWidth: "2px",
        },
        "& .MuiInputBase-root": {
          height: "40.2px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          fontSize: "16px",
          fontWeight: "light",
        },
        "& .MuiInputBase-input": {
          color: "#000",
        },
      }}
    />
  );
};

AuthTextField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AuthTextField;
