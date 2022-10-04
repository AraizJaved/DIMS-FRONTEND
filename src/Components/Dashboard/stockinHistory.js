import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, FormGroup } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import Table from './Table/StockIn/stockinTable';

const required = (val) => val && val.length;
const StockinHistory = () => {
    let history = useNavigate();
    const [fromDate,setFromDate]=useState("");
    const [toDate,setToDate]=useState("");
    return (
        <>
            <Header />

            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} 
            id="button-solid">go back to Dashboard</button>
           <div className="container">
           {/* <LocalForm >
                <div className="row">
                    <div className="col-sm-3">
                        <FormGroup md={10}>
                            <span style={{ color: "#8fb339" }} htmlFor="fromDate">From Date*</span>
                            <Control.text style={{ width:'300px',border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                model=".fromDate"
                                placeholder="Drug Name"
                                className="form-control"
                                value={fromDate}
                                type='date'
                                onChange={(e) => { setFromDate(e.target.value) }}
                            />
                        
                        </FormGroup>
                    </div>
                    <div className="col-sm-3">
                        <FormGroup md={10}>
                            <span style={{ color: "#8fb339" }} htmlFor="toDate">To date*</span>
                            <Control.text style={{  width:'300px',border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".toDate"
                                className="form-control"
                                value={toDate}
                                type='date'
                                onChange={(e) => { setToDate(e.target.value) }}
                            />
                           
                        </FormGroup>
                    </div>
                </div> 
            </LocalForm>*/}
            <Table stock={"stockin"}></Table>
           </div>

        </>
    );
}

export default StockinHistory;