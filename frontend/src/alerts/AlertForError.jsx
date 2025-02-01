import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CredentialsAlreadyRegistered = ({open, handleClose}) => {
const errorMessage = useSelector((state) => state.store.errorMessage);
    return (
        <Dialog
            open={open}
            aria-describedby="alert-dialog-description"
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{"Warning"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};
