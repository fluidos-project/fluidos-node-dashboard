import { Alert } from "@mui/material";
import { useState, useEffect } from "react";

export function AlertComponent(props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.alert.type !== "") {
            setVisible(true); 
            const timer = setTimeout(() => {
                setVisible(false);  // Hide Alert after 2 seconds
                props.configureAlert({ type: "", message: "" }); 
            }, 2000);

            return () => clearTimeout(timer); 
        }
    }, [props.alert]);

    return (
        <>
            {visible && (
                <Alert
                    onClose={() => setVisible(false)}
                    variant="filled"
                    severity={props.alert.type}
                    sx={{
                        position: 'fixed',
                        top: '70px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1300,
                        width: '80%',
                        maxWidth: '600px'
                    }}
                >
                    {props.alert.message.toString()}
                </Alert>
            )}
        </>
    );
}