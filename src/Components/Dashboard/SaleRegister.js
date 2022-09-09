import React from "react";
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


export default function SaleRegister() {
    let history = useNavigate();
    return (

        <>
            <Header />
            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} class="button-solid">go back to Dashboard</button>
        </>

    )
}