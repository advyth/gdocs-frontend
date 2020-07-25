import React from "react";
import {ReactComponent as ErrorLogo} from "../assets/icons/cancel-24px.svg";
import {ReactComponent as CorrectLogo} from "../assets/icons/check-24px.svg";


const PasswordLogo = ({type}) =>{
    console.log(type);
    if(type){
        return <CorrectLogo id="password-confirm-icon" height={20} width={20} className="icon-color-white"/>
    }
    else
    {
        return <ErrorLogo id="password-confirm-icon" height={20} width={20} className="icon-color-white"/>
    }
}

export default PasswordLogo;