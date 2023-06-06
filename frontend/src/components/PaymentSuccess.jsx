import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { techincianSubscription } from "../redux/actions/technicianActions.js";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  message: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
  },
}));

const Success = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const technicianUserLogin = useSelector((state) => state.technicianUserLogin);
  const { techUserInfo } = technicianUserLogin;

  useEffect(() => {
    setTimeout(() => {
      dispatch(techincianSubscription(techUserInfo.user._id)).then(() => {
        navigate("/technician/dashboard");
      });
    }, 3000);
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.message}>
        Payment is Successfully transferred!
      </Typography>
    </div>
  );
};

export default Success;
