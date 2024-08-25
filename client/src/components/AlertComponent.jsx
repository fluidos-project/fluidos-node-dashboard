import { Alert } from "@mui/material";
import { useState, useEffect } from "react";

export function AlertComponent(props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.alert.type !== "") {
            setVisible(true);  // Rendi visibile l'Alert
            const timer = setTimeout(() => {
                setVisible(false);  // Nascondi l'Alert dopo 2 secondi
                props.configureAlert({ type: "", message: "" });  // Resetta l'alert
            }, 2000);

            return () => clearTimeout(timer);  // Pulisce il timer
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