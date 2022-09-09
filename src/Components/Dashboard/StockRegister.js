import React from "react";
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { Button, FormGroup } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import Table from "./Table/table";
// import data from "./mock-data.json";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { nanoid } from "nanoid";



const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const Length = () => (val) => !val || val.length == 11;
export default function StockRegister() {
    let history = useNavigate();
    const [open, setOpen] = useState(false);
    const [Msg, setMsg] = useState(false);
    const [productName, setProductName] = useState('');
    const [openingBlnc, setOpeningBlnc] = useState("");
    const [batch, setBatch] = useState();
    const [expDate, setExpDate] = useState("");
    const [mrp, setMrp] = useState("");
    const [qty, setQty] = useState("");
    const [qtyInUnits, setQtyInUnits] = useState('');
    const [drugInfos, setdrugInfos] = useState([]);
    const [showButton,setShowButton]=useState(false);
    useEffect(() => {
        if (!showButton) {
            document.getElementById("finilize").style.display = "none"
        } else {
            document.getElementById("finilize").style.display = "block"
        }
    })

    const [editFormData, setEditFormData] = useState({
        productName: "",
        openingBlnc: "",
        batch: "",
        expDate: "",
        mrp: "",
        qty: "",
    });

    const [editdrugInfoId, setEditdrugInfoId] = useState(null);

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        debugger
        const newdrugInfo = {
            id: nanoid(),
            productName: productName,
            openingBlnc: openingBlnc,
            batch: batch,
            expDate: expDate,
            mrp: mrp,
            qty: qty
        };

        const newdrugInfos = [...drugInfos, newdrugInfo];
        setdrugInfos(newdrugInfos);
        console.log(drugInfos)
        setShowButton(true)
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editeddrugInfo = {
            id: editdrugInfoId,
            productName: editFormData.productName,
            openingBlnc: editFormData.openingBlnc,
            batch: editFormData.batch,
            expDate: editFormData.expDate,
            mrp: editFormData.mrp,
            qty: editFormData.qty,
        };

        const newdrugInfos = [...drugInfos];

        const index = drugInfos.findIndex((drugInfo) => drugInfo.id === editdrugInfoId);

        newdrugInfos[index] = editeddrugInfo;

        setdrugInfos(newdrugInfos);
        setEditdrugInfoId(null);
    };

    const handleEditClick = (event, drugInfo) => {
        event.preventDefault();
        setEditdrugInfoId(drugInfo.id);

        const formValues = {
            productName: drugInfo?.productName,
            openingBlnc: drugInfo?.openingBlnc,
            batch: drugInfo?.batch,
            expDate: drugInfo?.expDate,
            mrp: drugInfo?.mrp,
            qty: drugInfo?.qty,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditdrugInfoId(null);
    };

    const handleDeleteClick = (drugInfoId) => {
        const newdrugInfos = [...drugInfos];

        const index = drugInfos.findIndex((drugInfo) => drugInfo.id === drugInfoId);

        newdrugInfos.splice(index, 1);

        setdrugInfos(newdrugInfos);
    }
    return (
        <>
            <Header />
            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} class="button-solid">go back to Dashboard</button>
            <LocalForm >
                <div className="container">
                    <div className='row' style={{ marginTop: '20px' }} >
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="productName">Product Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".productName"
                                    placeholder="Product Name"
                                    className="form-control"
                                    value={productName}
                                    onChange={(e) => { setProductName(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".productName"
                                    show="touched"
                                    messages={{
                                        required: "Product Name is required "
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="openingBlnc">Opening Balance *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".openingBlnc"
                                    placeholder="Opening Balance"
                                    className="form-control"
                                    type='number'
                                    value={openingBlnc}
                                    maxLength='11'
                                    onChange={(e) => { setOpeningBlnc(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".openingBlnc"
                                    show="touched"
                                    messages={{
                                        required: "Opening Balance is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="batch">Batch *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".batch"
                                    placeholder="Enter Batch"
                                    className="form-control"
                                    value={batch}
                                    type='number'
                                    onChange={(e) => { setBatch(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".batch"
                                    show="touched"
                                    messages={{
                                        required: "Batch is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="expDate">Expiry Date*</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".expDate"
                                    placeholder="Drug Name"
                                    className="form-control"
                                    value={expDate}
                                    type='date'
                                    onChange={(e) => { setExpDate(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".expDate"
                                    show="touched"
                                    messages={{
                                        required: "Expiry Date is required "
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="mrp">MRP/Pack *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".mrp"
                                    placeholder="MRP/Pack"
                                    className="form-control"
                                    type='number'
                                    value={mrp}
                                    maxLength='11'
                                    onChange={(e) => { setMrp(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".mrp"
                                    show="touched"
                                    messages={{
                                        required: "MRP/Pack is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="qty">Qunatity *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".qty"
                                    placeholder="Enter qunatity"
                                    className="form-control"
                                    value={qty}
                                    maxLength='11'
                                    onChange={(e) => { setQty(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".qty"
                                    show="touched"
                                    messages={{
                                        required: "Qunatity is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="qtyInUnits">Quantity in Units *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".qtyInUnits"
                                    className="form-control"
                                    value={63.54}
                                    disabled
                                    onChange={(e) => { setQtyInUnits(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div style={{ paddingTop: '30px' }}>
                        <Button className='mx-auto d-block'
                            style={{
                                width: '200px',
                                background: '#8fb339',
                                height: '40px',
                                borderRadius: '10px',
                                justifyContent: 'center',
                                boxShadow: '0 0 0px #8fb339',
                            }}
                            onClick={(e) => { handleAddFormSubmit(e) }}

                            size='md'>
                            Save
                        </Button>
                    </div>

                </div>

            </LocalForm>
            <div className="container" style={{ marginTop: '20px' }}>
                <form onSubmit={handleEditFormSubmit}>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Opening Balance</th>
                                <th scope="col">Batch</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">MRP/Pack</th>
                                <th scope="col">Qunatity</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugInfos.map((drugInfo) => (
                                <Fragment>
                                    {editdrugInfoId === drugInfo.id ? (
                                        <EditableRow
                                            editFormData={editFormData}
                                            handleEditFormChange={handleEditFormChange}
                                            handleCancelClick={handleCancelClick}
                                        />
                                    ) : (
                                        <ReadOnlyRow
                                            drugInfo={drugInfo}
                                            handleEditClick={handleEditClick}
                                            handleDeleteClick={handleDeleteClick}
                                        />
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </form>
                <div id="finilize">
                    <Button className='mx-auto d-block'
                        style={{
                            width: '200px',
                            background: '#8fb339',
                            height: '40px',
                            borderRadius: '10px',
                            justifyContent: 'center',
                            boxShadow: '0 0 0px #8fb339',
                        }}
                        onClick={console.log("i am cliked")}

                        size='md'>
                        Finilize
                    </Button>
                </div>
            </div>
        </>
    )
}