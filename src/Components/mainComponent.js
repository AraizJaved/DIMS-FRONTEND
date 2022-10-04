import React from "react";
import "./index.css";
import LoginComponent from "./Authentication/LoginComponent";
import SignupComponent from "./Authentication/SignUpComponent";
import Dashboard from '../Components/Dashboard/dashboard';
import EssentialDrugList from "./Dashboard/EssentialDrugList";
import DistributerProfile from "./Dashboard/DistributerProfile";
import DrugProfile from "./Dashboard/DrugProfile";
import StockRegister from './Dashboard/StockRegister';
import SaleRegsiter from './Dashboard/SaleRegister';
import StockinHistory from './Dashboard/stockinHistory';
import StockoutHistory from './Dashboard/stockoutHistory';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

export default function MainComponent() {
    return (
        <div >
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/signup" element={<SignupComponent />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/EssentialDrugList" element={<EssentialDrugList />} />
                    <Route path="/dashboard/DistributerProfile" element={<DistributerProfile />} />
                    <Route path="/dashboard/DrugProfile" element={<DrugProfile />} />
                    <Route path="/dashboard/StockRegister" element={<StockRegister />} />
                    <Route path="/dashboard/SaleRegsiter" element={<SaleRegsiter />} />
                    <Route path="/dashboard/StockinHistory" element={<StockinHistory />} />
                    <Route path="/dashboard/StockoutHistory" element={<StockoutHistory />} />
                    <Route path="/" element={<LoginComponent />} />
                </Routes>
            </Router>
        </div>
    )
}