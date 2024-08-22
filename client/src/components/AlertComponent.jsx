import { Alert } from "@mui/material";
import { useState } from "react";

export function AlertComponent(props){
    const [hide, setHide] = useState(false);
    //console.log(props.alert);

    const hideAlert = ()=> {
        props.configureAlert({type:"", message:""});
        setHide(true);

    }

    return(
        <>{
            (props.alert.type!="") && <Alert onClose={hideAlert} hidden={hide}variant="filled" severity={props.alert.type}>{props.alert.message}</Alert>
        }
        </>
    )

}