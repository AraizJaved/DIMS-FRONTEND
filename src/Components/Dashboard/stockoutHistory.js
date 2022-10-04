import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from './Table/StockIn/stockinTable';

const StockoutHistory = () => {
    let history = useNavigate();
    return (
        <>

            <Header />

            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} 
            id="button-solid">go back to Dashboard</button>

            <div className="container">
                <Table stock={"stockout"}></Table>
            </div>
        </>
    );
}

export default StockoutHistory;

// GetStockOutForExcel