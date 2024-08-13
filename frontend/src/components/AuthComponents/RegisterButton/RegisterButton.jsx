import { Button } from "@mui/material";
import styles from "./RegisterButton.module.css";

const RegisterButton = ({text,onClick}) => {
  return (
    <Button
      className={styles.registerButton}
      disableElevation
      variant="contained"
      onClick={onClick}
      sx={{
        textTransform: "none",
        color: "#fff",
        fontSize: "16px",
        borderRadius: "5px",
        bgcolor: "#0163FD",
        height: "45px",
        width: "100%",
        "&:hover": {
          bgcolor: "#014bb2",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default RegisterButton;
