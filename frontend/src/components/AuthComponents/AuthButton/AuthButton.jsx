import { Button } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./AuthButton.module.css";

const AuthButton = ({ text, color, bgColor,onClick}) => {
  return (
    <Button
      className={styles.authButton}
      disableElevation
      variant="contained"
      onClick={onClick}
      sx={{
        textTransform: "none",
        color: color,
        fontSize: "24px",
        background: bgColor,
        height: 56,
        '&:hover': {
          backgroundColor: bgColor, // Maintain the same background color on hover
        },
        '&:focus': {
          backgroundColor: bgColor, // Maintain the same background color on focus
        },
        '&:active': {
          backgroundColor: bgColor, // Maintain the same background color on active state
        }
      }}
    >
      {text}
    </Button>
  );
};

AuthButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
};

export default AuthButton;
