import React, { useCallback } from "react";
import Header from "./header";
import './table.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { Button, FormGroup, Table } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { nanoid } from "nanoid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Combobox from "react-widgets/Combobox";
import axios from 'axios';
import ReadOnlyRow from "./Table/ReadOnlyRow";
import EditableRow from "./Table/EditableRow";
import object from '../Services/getMedData';
import { FunctionsTwoTone } from "@mui/icons-material";
import countryList from "react-select-country-list";




const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const Length = () => (val) => !val || val.length == 11;
let temp = null;
export default function StockRegister() {
    let history = useNavigate();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [Msg, setMsg] = useState(false);
    const [productName, setProductName] = useState('');
    const [openingBlnc, setOpeningBlnc] = useState("");
    const [batch, setBatch] = useState("");
    const [expDate, setExpDate] = useState("");
    const [mrp, setMrp] = useState("");
    const [qty, setQty] = useState("");
    const [qtyInUnits, setQtyInUnits] = useState('');
    const [drugInfos, setdrugInfos] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [disbale, setDisable] = useState(false);
    const [medicine, setMedicine] = useState('');
    let [MedData, setMedData] = useState([]);
    const [packSize, setPackSize] = useState("");
    const [licenseNo, setLicenseNo] = useState("");
    const [msName, setMsName] = useState("");
    const [options, setOptions] = useState([]);
    const [detail, setDetail] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    let _MedData = [];
    useEffect(() => {
        if (!showButton) {
            document.getElementById("finilize").style.display = "none"
        } else {
            document.getElementById("finilize").style.display = "block"
        }
        // console.log('1111111111111111',medicine[0])
    })

    const [editFormData, setEditFormData] = useState({
        licenseNo: "",
        msName: "",
        productName: "",
        openingBlnc: "",
        batch: "",
        expDate: "",
        mrp: "",
        qty: "",
        qtyInUnits: ""
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

        if (licenseNo === "") {
            setMsg("License No. is not entered");
            setOpen(true);
            return setMsg;
        }
        else if (productName === "") {
            setMsg("Please enter product name");
            setOpen(true);
            return setMsg;
        }
        else if (openingBlnc === "") {
            setMsg("Please enter opening balance");
            setOpen(true);
            return setMsg;
        }
        else if (batch === "") {
            setMsg("Please enter batch");
            setOpen(true);
            return setMsg;
        }
        else if (expDate === "") {
            setMsg("Please enter expiry date");
            setOpen(true);
            return setMsg;
        }
        else if (mrp === "") {
            setMsg("Please enter MRP");
            setOpen(true);
            return setMsg;
        }
        else if (qty === "") {
            setMsg("Please enter quantity");
            setOpen(true);
            return setMsg;
        } else {
            // debugger
            const newdrugInfo = {
                id: nanoid(),
                licenseNo: licenseNo,
                msName: msName,
                productName: productName,
                openingBlnc: openingBlnc,
                batch: batch,
                expDate: expDate,
                mrp: mrp,
                qty: qty,
                qtyInUnits: qtyInUnits
            };
            object.checkQuantity(productName, batch, qty).then((res) => {
                debugger
                console.log(batch);
                if (res.data.recordset.length > 0) {
                    const newdrugInfos = [...drugInfos, newdrugInfo];
                    setdrugInfos(newdrugInfos);
                    console.log(drugInfos)
                    setShowButton(true)
                    resetForm();
                } else {
                    setOpen(true);
                    setMsg("Quantity not available");
                }
            }).catch((err) => {
                console.log(err.message);
            })

        }
    };

    const handleEditFormSubmit = (event) => {

        object.checkQuantity(productName, batch, qty).then((res) => {
            debugger
            console.log(batch);
            if (res.data.recordset.length > 0) {
                event.preventDefault();
                setDisable(false);
                setIsOpen(false);
                resetForm();
                const editeddrugInfo = {
                    id: editdrugInfoId,
                    licenseNo: editFormData.licenseNo,
                    msName: editFormData.msName,
                    productName: productName,
                    openingBlnc: openingBlnc,
                    batch: batch,
                    expDate: expDate,
                    mrp: mrp,
                    qty: qty,
                    qtyInUnits: qtyInUnits
                };

                const newdrugInfos = [...drugInfos];

                const index = drugInfos.findIndex((drugInfo) => drugInfo.id === editdrugInfoId);

                newdrugInfos[index] = editeddrugInfo;

                setdrugInfos(newdrugInfos);
                setEditdrugInfoId(null);
            } else {
                setOpen(true);
                setMsg("Quantity not available");
            }
        }).catch((err) => {
            console.log(err.message);
        })
    };

    const handleEditClick = (event, drugInfo) => {
        setDisable(true);
        setIsOpen(true);
        event.preventDefault();
        setEditdrugInfoId(drugInfo.id);

        const formValues = {
            licenseNo: drugInfo?.licenseNo,
            msName: drugInfo?.msName,
            productName: drugInfo?.productName,
            openingBlnc: drugInfo?.openingBlnc,
            batch: drugInfo?.batch,
            expDate: drugInfo?.expDate,
            mrp: drugInfo?.mrp,
            qty: drugInfo?.qty,
            qtyInUnits: drugInfo?.qtyInUnits
        };

        setMedicine(formValues.productName);
        setProductName(formValues.productName);
        setOpeningBlnc(formValues.openingBlnc);
        // setBatch(formValues.batch)
        setExpDate(formValues.expDate);
        setMrp(formValues.mrp);
        setQty(formValues.qty);
        setQtyInUnits(formValues.qtyInUnits);
        setBatch("")
    };

    const handleCancelClick = () => {
        setDisable(false);
        setEditdrugInfoId(null);
    };
    const handleClose = () => {

        setOpen(false);
        setOpen2(false);
    };

    const handleDeleteClick = (drugInfoId) => {
        const newdrugInfos = [...drugInfos];

        const index = drugInfos.findIndex((drugInfo) => drugInfo.id === drugInfoId);

        newdrugInfos.splice(index, 1);

        setdrugInfos(newdrugInfos);
        if (drugInfos.length === 0)
            setShowButton(false)
    }

    const resetForm = () => {
        setLicenseNo("");
        setMedicine("");
        setProductName("");
        setOpeningBlnc("");
        setBatch("");
        setExpDate("");
        setMrp("");
        setQty("");
        setQtyInUnits("");
        setMsName("");
        setDetail([]);
        setOptions([]);
        console.log('........................', setDetail);
    }

    const sendData = () => {
        console.log('////////////////////////', drugInfos)

        object.finilzeStockOut(drugInfos).then((res) => {
            if (res.data) {
                setdrugInfos([]);
                setShowButton(false)
                setOpen2(true);
                setMsg("Stockout Successfully");
                resetForm();
            } else {
                setOpen(true);
                setMsg("Quantity not available");
            }
        }).catch(() => {
            console.log("error........!")
        })
    }
    const changeValue = (e) => {
        // console.log(" i am cjdsjhdsjkflicked", e);
        setOpeningBlnc("");
        setBatch("");
        setExpDate("");
        setMrp("");
        setQty("");
        setQtyInUnits("");
        setDetail([]);
        setOptions([]);
        setMedicine(e)
        // debugger
        axios.post('http://localhost:3001/api/getMedicines', {
            values: e
        }).then((res) => {
            res.data.recordsets[0].forEach(element => {
                _MedData.push(Object.values(element))
            });
            setMedData(_MedData)
        }).catch(() => {
            console.log("error........!")
        })


        axios.post('http://localhost:3001/api/medData', {
            values: e
        }).then((res) => {
            setMrp(res.data.recordsets[0][0]?.MRP);
            setPackSize(res.data.recordsets[0][0]?.PackSize)
            setProductName(res.data.recordsets[0][0]?.DrugName)
        }).catch((err) => {
            console.log(err.message);
        })

    }

    const changeValues = (e) => {
        debugger
        console.log(e.target.value);
        setQty(e.target.value)
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQtyInUnits(value * packSize);
        } else {
            setQtyInUnits("");
        }
    }

    async function findLicenseNo() {
        const license = licenseNo.split("-");
        debugger
        if (license.length !== 4) {
            setOpen(true)
            setMsg("License No is not valid");
        } else {
            let result = await object.getDistributerData(licenseNo)
            const data = result.data.recordsets[0][0];
            if (result.data.recordsets[0].length > 0) {
                setMsName(data.Proprietor_Of_MS)
                // console.log(data.Proprietor_Of_MS);
            } else {
                setOpen(true)
                setMsg("License No not found");
            }
        }
    }
    async function changeBatch(e) {
        debugger

        setBatch(e.target.value);
        console.log("i am clicked...!");
        let res = await object.findBatchNo(productName)
        setOptions([...options, res.data.recordsets])
        res.data.recordsets?.forEach((res) => {
            debugger
            res?.forEach((res2) => {
                debugger
                console.log(res2);
                if (detail.length < 2) {
                    detail.push(res2);
                } else {
                    return
                }
            })
        })
    }


    return (
        <>
            <Header />
            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })}
                id="button-solid">go back to Dashboard</button>
            <Dialog
                open={
                    open2 ? (
                        open2
                    ) : (
                        open
                    )
                }
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {
                        open2 === true ? (

                            <CheckCircleOutlineIcon style={{ width: '100%', color: '#8fb339' }} sx={{ fontSize: 40 }} />
                        ) : (

                            <CancelIcon style={{ width: '100%', color: 'red' }} sx={{ fontSize: 40 }} />
                        )
                    }
                </DialogTitle>
                <DialogContent>
                    {
                        open2 === true ? (
                            <DialogContentText style={{ textAlign: 'center', fontSize: '23px', color: '#8fb339' }} id="alert-dialog-description">
                                {Msg}
                            </DialogContentText>
                        ) : (
                            <DialogContentText style={{ textAlign: 'center', fontSize: '23px', color: 'red' }} id="alert-dialog-description">
                                {Msg}
                            </DialogContentText>
                        )
                    }

                </DialogContent>
                <DialogActions>
                    <div class="container">
                        <div class="row">
                            <div class="col text-center">
                                {
                                    open2 ? (

                                        <Button style={{ backgroundColor: '#8fb339' }} onClick={() => { handleClose() }}>OK</Button>
                                    ) : (

                                        <Button onClick={() => { handleClose() }}>OK</Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
            <LocalForm >
                <div className="container">
                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="licenseNo">License No *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', width: '325px' }}
                                    model=".licenseNo"
                                    placeholder="License No"
                                    className="form-control"
                                    selected={'sdjjsad'}
                                    value={licenseNo}
                                    onChange={(e) => { setLicenseNo(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".licenseNo"
                                    show="touched"
                                    messages={{
                                        required: "License No is required ",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className="col-sm-2">
                            {/* <span style={{ color: "#8fb339" }} htmlFor="licenseNo">......</span> */}

                            <Button
                                style={{
                                    width: '120px',
                                    background: '#8fb339',
                                    height: '40px',
                                    borderRadius: '10px',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 0px #8fb339',
                                    marginTop: '20px'
                                }}
                                onClick={() => { findLicenseNo() }}

                                size='md'>
                                search
                            </Button>
                        </div>
                    </div>
                    <div className='row'  >
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="licenseNo">M/S Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', width: '325px' }}
                                    model=".licenseNo"
                                    placeholder="M/S Name"
                                    className="form-control"
                                    selected={'sdjjsad'}
                                    value={msName}
                                    disabled
                                    onChange={(e) => { setLicenseNo(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className='row'  >
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="productName">Product Name *</span>
                                <Combobox
                                    data={MedData}
                                    textField="name"
                                    value={medicine}
                                    onChange={(e) => { changeValue(e) }}
                                />
                            </FormGroup>
                        </div>
                        <div className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="batch">Batch *</span>
                                <br></br>
                                <select onClick={(e) => changeBatch(e)}
                                    style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', borderRadius: '8px', height: '35px' }} select
                                    className="form-control" aria-label="Default select example">
                                    <option>Select</option>
                                    {detail?.map((data) => <option value={data.Batch} >Batch({data.Batch})-Expriy({data.Expiry.split("T")[0]})-Quantity({data.Quantity})</option>)}
                                </select>
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
                                    disabled
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
                                <span style={{ color: "#8fb339" }} htmlFor="qty">Quantity *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".qty"
                                    placeholder="Enter qunatity"
                                    className="form-control"
                                    value={qty}
                                    type='number'
                                    onChange={(e) => { changeValues(e) }}
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
                                    value={qtyInUnits}
                                    disabled
                                    onChange={(e) => { setQtyInUnits(packSize * qty) }}
                                    validators={{
                                        required
                                    }}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div style={{ paddingTop: '30px' }}>
                        {
                            !isOpen ? (
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
                            ) : (
                                <Button className='mx-auto d-block'
                                    style={{
                                        width: '200px',
                                        background: '#8fb339',
                                        height: '40px',
                                        borderRadius: '10px',
                                        justifyContent: 'center',
                                        boxShadow: '0 0 0px #8fb339',
                                    }}
                                    onClick={(e) => { handleEditFormSubmit(e) }}

                                    size='md'>
                                    Update
                                </Button>
                            )
                        }
                    </div>

                </div>

            </LocalForm>
            <div className="container" style={{ marginTop: '20px' }}>
                <form onSubmit={handleEditFormSubmit}>
                    <Table >
                        <thead>
                            <tr>
                                <th scope="row">Product Name</th>
                                <th scope="row">Opening Balance</th>
                                <th scope="row">Batch</th>
                                <th scope="row">Expiry Date</th>
                                <th scope="row">MRP/Pack</th>
                                <th scope="row">Qunatity</th>
                                <th scope="row">Edit</th>
                                <th scope="row">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drugInfos.map((drugInfo) => (
                                <Fragment>
                                    <ReadOnlyRow
                                        drugInfo={drugInfo}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                </Fragment>
                            ))}
                        </tbody>
                    </Table>
                </form>
                <div id="finilize">
                    <Button className='mx-auto d-block'
                        style={{
                            width: '200px',
                            background: '#8fb339',
                            height: '40px',
                            borderRadius: '10px',
                            justifyContent: 'center',
                            boxShadow: '0 0 0px #8fb339'
                        }}
                        onClick={() => { sendData() }}
                        disabled={disbale}
                        size='md'>
                        Finilize
                    </Button>
                </div>
            </div>
        </>
    )
}