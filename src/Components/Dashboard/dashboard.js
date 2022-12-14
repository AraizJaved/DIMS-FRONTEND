
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { CardImg, Button } from 'reactstrap';
import essentialDrugList from '../../assets/essentialDrugList.PNG';
import distributerProfile from '../../assets/distributerProfile.PNG';
import drugProfile from '../../assets/drugProfile.PNG';
import stockRegister from '../../assets/stockRegister.PNG';
import saleRegister from '../../assets/saleRegister.PNG';

import Header from "./header";

export default function Dashboard() {
    let history = useNavigate();
    useEffect(() => {
        document.body.style.backgroundImage = `linear-gradient(to left, #FFFFFF 100%`;
    });

    let val = sessionStorage.getItem('autherization')
    if (val === "false") {
        return <Navigate to={'/login'} />
    } else {
        return (
            <div>

                {document.body.style.background = ""}
                <Header />
                <div className='col d-flex justify-content-center' style={{ paddingTop: '30px' }} >

                    <div className="row align-items-start">
                        <div className="m-5" >
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/EssentialDrugList", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={essentialDrugList}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '55px', top: '5px' }}>Essential Drug List</p>
                            </div>
                        </div>
                        <div className="m-5" >
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/DistributerProfile", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={distributerProfile}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '55px', top: '5px' }}>Distributer Profile</p>
                            </div>
                        </div>
                        <div className="m-5" >
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/DrugProfile", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={drugProfile}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '80px', top: '5px' }}>Drug Profile</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col d-flex justify-content-center' style={{ paddingTop: '20px' }} >
                    <div className="row align-items-start">
                        <div className="m-5">
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/SaleRegsiter", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={saleRegister}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '75px', top: '10px' }}>Sale Register</p>
                            </div>
                        </div>
                        <div className="m-5">
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/StockinHistory", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={stockRegister}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '75px', top: '10px' }}>StockIn history</p>
                            </div>
                        </div>
                        <div className="m-5" >
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/StockRegister", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={stockRegister}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '75px', top: '10px' }}>Stock Register</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col d-flex justify-content-center' style={{ paddingTop: '30px' }} >
                    <div className="row align-items-start">
                        <div className="m-5" >
                            <div style={{ borderRadius: '15px', height: 200, width: 250, boxShadow: "0 3px 10px rgb(0 0 0 / 0.4)" }}>
                                <CardImg className="dashboardCards" onClick={() => { history("../dashboard/StockoutHistory", { replace: true }) }} style={{ height: 150, width: 200, position: 'relative', left: '20px', top: '5px' }}
                                    src={saleRegister}
                                    alt="GFG Logo" />
                                <p style={{ position: 'relative', left: '65px', top: '10px' }}>Stockout history</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}