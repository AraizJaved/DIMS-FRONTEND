import { useNavigate } from 'react-router-dom';
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import countryList from 'react-select-country-list'
import { useState, useMemo, useEffect } from 'react';
import { Button, FormGroup } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import object from '../Services/getMedData.js';
import "react-widgets/styles.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const Length = () => (val) => !val || val.length == 11;
const DrugProfile = () => {
    let history = useNavigate();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [Msg, setMsg] = useState(false);
    const [country, setCountry] = useState('Pakistan');
    const [drugName, setDrugName] = useState("");
    const [drugRegistrationNo, setDrugRegistrationNo] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [address, setAddress] = useState("");
    const [dmlNo, setDmlNo] = useState("");
    const [pakistanImporter, setPakistanImporter] = useState("");
    const [pakistanImporterAddress, setImporterPakistanAdress] = useState("");
    const [strength, setStrength] = useState("");
    const [strengthUnits, setStrengthUnits] = useState("");
    const [volume, setVolume] = useState("");
    const [volUnits, setVolUnits] = useState("");
    const [pcktSize, setPcktSize] = useState("");
    const [dosageForm, setDosageForm] = useState("");
    const [mrp, setMrp] = useState("");
    const [importLicenseNo, setImportLicenseNo] = useState("");
    const options = useMemo(() => countryList().getData(), []);
    const [medicine, setMedicine] = useState('');
    function resetForm() {
        setDrugName("")
        setDrugRegistrationNo("")
        setAddress("")
        setDmlNo("")
        setPakistanImporter("")
        setImporterPakistanAdress("")
        setStrength("")
        setStrengthUnits("select")
        setVolume("")
        setVolUnits("Select")
        setPcktSize("")
        setDosageForm("Select Dosage Form");
        setMrp("")
        setImportLicenseNo("")
        setMedicine("")
    }
    let [MedData, setMedData] = useState([])
    let _MedData = [];
    useEffect(() => {
        console.log(".....................................................")
        if (country === 'Pakistan') {
            document.getElementById("Importer").style.display = "none"
            document.getElementById("Address").style.display = "none"
            document.getElementById("LicenseNo").style.display = "none"
        } else {
            document.getElementById("Importer").style.display = "block"
            document.getElementById("Address").style.display = "block"
            document.getElementById("LicenseNo").style.display = "block"
        }
    })
    // const changeValue = (e) => {
    //     console.log(" i am clicked", e);
    //     setMedicine(e.target)
    //     axios.post('http://localhost:3001/api/getMedicines', {
    //         values: e
    //     }).then((res) => {
    //         res.data.recordsets[0].forEach(element => {
    //             _MedData.push(Object.values(element))
    //         });
    //         setMedData(_MedData)
    //     }).catch(() => {
    //         console.log("error........!")
    //     })
    // }
    const handleClose = () => {

        setOpen(false);
        setOpen2(false);
    };
    function handleChangeCounties(e) {
        debugger
        setCountry(e.target.value)
        console.log(e.target.value);
    }

    function handleChangeUnits(e) {
        debugger
        setStrengthUnits(e.target.value)
    }

    function handleChangeVolUnits(e) {
        debugger
        setVolUnits(e.target.value)
    }

    function handleChangeDosafeForm(e) {
        debugger
        setDosageForm(e.target.value)
    }


    function sendData() {
        debugger
        if (drugName === "") {
            setMsg("Please enter drug name");
            setOpen(true);
            return setMsg;
        } else if (drugRegistrationNo === "") {
            setMsg("Please enter drug registration no.");
            setOpen(true);
            return setMsg;
        } else if (medicine === "") {
            setMsg("Please enter medicine");
            setOpen(true);
            return setMsg;
        } else if (country === "") {
            setMsg("Please enter country");
            setOpen(true);
            return setMsg;
        } else if (address === "") {
            setMsg("Please enter address");
            setOpen(true);
            return setMsg;
        } else if (dmlNo === "") {
            setMsg("Please enter DML No");
            setOpen(true);
            return setMsg;
        } else if (country !== "Pakistan" && pakistanImporter === "") {
            setMsg("Please enter pakistan importer");
            setOpen(true);
            return setMsg;
        } else if (country !== "Pakistan" && pakistanImporterAddress === "") {
            setMsg("Please enter pakistan importer address");
            setOpen(true);
            return setMsg;
        } else if (country !== "Pakistan" && importLicenseNo === "") {
            setMsg("Please enter import license no");
            setOpen(true);
            return setMsg;
        } else if (dosageForm === "") {
            setMsg("Please enter dosage form");
            setOpen(true);
            return setMsg;
        } else if (strength === "") {
            setMsg("Please enter strength");
            setOpen(true);
            return setMsg;
        } else if (strengthUnits === "") {
            setMsg("Please enter strength units");
            setOpen(true);
            return setMsg;
        } else if (volume === "") {
            setMsg("Please enter volume");
            setOpen(true);
            return setMsg;
        } else if (volUnits === "") {
            setMsg("Please enter vol units");
            setOpen(true);
            return setMsg;
        } else if (pcktSize === "") {
            setMsg("Please enter packet size");
            setOpen(true);
            return setMsg;
        } else if (mrp === "") {
            setMsg("Please enter MRP");
            setOpen(true);
            return setMsg;
        } else {
            debugger
            let drugProfile = {
                drugName: drugName,
                drugRegistrationNo: drugRegistrationNo,
                medicine: medicine,
                country: country,
                manufacturer: manufacturer,
                address: address,
                dmlNo: dmlNo,
                pakistanImporter: pakistanImporter,
                pakistanImporterAddress: pakistanImporterAddress,
                importLicenseNo: importLicenseNo,
                dosageForm: dosageForm,
                strength: strength,
                strengthUnits: strengthUnits,
                volume: volume,
                volUnits: volUnits,
                pcktSize: pcktSize,
                mrp: mrp
            }
            setOpen2(true);
            object.saveData(drugProfile);
            setMsg("Record Saved Successfully !")
            resetForm();
        }
    }

    return (
        <div>
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
                <div className="container" >
                    <div className='row' style={{ marginTop: '20px' }} >
                        <div className="col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="drugName">Drug Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".drugName"
                                    placeholder="Drug Name"
                                    className="form-control"
                                    value={drugName}
                                    onChange={(e) => { setDrugName(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".drugName"
                                    show="touched"
                                    messages={{
                                        required: "Drug Name is required "
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="drugRegistrationNo">Drug Registration No. *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".drugRegistrationNo"
                                    placeholder="Drug Registration No."
                                    className="form-control"
                                    type='number'
                                    value={drugRegistrationNo}
                                    maxLength='11'
                                    onChange={(e) => { setDrugRegistrationNo(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".drugRegistrationNo"
                                    show="touched"
                                    messages={{
                                        required: "Drug Resistration No is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className="col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="medicine">Brand Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".medicine"
                                    placeholder="Brand Name"
                                    className="form-control"
                                    value={medicine}
                                    maxLength='11'
                                    onChange={(e) => { setMedicine(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".medicine"
                                    show="touched"
                                    messages={{
                                        required: "Brand Name is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Importer *</span>

                            <select onChange={handleChangeCounties}
                                style={{
                                    border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339',
                                    borderRadius: '8px', height: '35px'
                                }}
                                select
                                class="form-control" aria-label="Default select example">
                                <option value="Pakistan">Pakistan</option>
                                {options.map(({ value, label }, index) => <option value={label} >{label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="manufacturer">Manufacturer *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".manufacturer"
                                    placeholder="Manufacturer"
                                    className="form-control"
                                    disabled
                                    value={country}
                                    onChange={(e) => { setManufacturer(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".manufacturer"
                                    show="touched"
                                    messages={{
                                        required: "Manufacturer is required "
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="address">Address*</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".address"
                                    placeholder="Address"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".address"
                                    show="touched"
                                    messages={{
                                        required: "Address is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="dmlNo">DML No *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".dmlNo"
                                    placeholder="DML No"
                                    className="form-control"
                                    value={dmlNo}
                                    type='number'
                                    maxLength='11'
                                    onChange={(e) => { setDmlNo(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".dmlNo"
                                    show="touched"
                                    messages={{
                                        required: "DML number is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div id="Importer" className="col-sm-4">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="pakistanImporter">Pakistan Importer *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".pakistanImporter"
                                    placeholder="Pakistan Importer"
                                    className="form-control"
                                    value={pakistanImporter}
                                    onChange={(e) => { setPakistanImporter(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".pakistanImporter"
                                    show="touched"
                                    messages={{
                                        required: "Required "
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div id="Address" className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="pakistanImporterAddress">Address*</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".pakistanImporterAddress"
                                    placeholder="Address"
                                    className="form-control"
                                    value={pakistanImporterAddress}
                                    onChange={(e) => { setImporterPakistanAdress(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".pakistanImporterAddress"
                                    show="touched"
                                    messages={{
                                        required: "Address is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div id="LicenseNo" className='col-sm-4'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="importLicenseNo">Import Licencse No. *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".importLicenseNo"
                                    placeholder="Import Licencse No."
                                    className="form-control"
                                    value={importLicenseNo}
                                    maxLength='11'
                                    onChange={(e) => { setImportLicenseNo(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".importLicenseNo"
                                    show="touched"
                                    messages={{
                                        required: "Import License No. is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Dosage Form *</span>
                            <select onChange={handleChangeDosafeForm}
                                style={{
                                    border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339',
                                    borderRadius: '8px', height: '35px'
                                }}
                                select
                                class="form-control"
                                aria-label="Default select example">
                                <option >Select Dosage Form</option>
                                <option value="GEL METERED">GEL, METERED</option>
                                <option value="INJECTABLE">INJECTABLE</option>
                                <option value="LIQUID GEL">LIQUID GEL</option>
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="strength">Strength *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".strength"
                                    placeholder="Strength"
                                    className="form-control"
                                    value={strength}
                                    type='number'
                                    maxLength='4'
                                    onChange={(e) => { setStrength(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".strength"
                                    show="touched"
                                    messages={{
                                        required: "Strength is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Units *</span>
                            <select onChange={handleChangeUnits}
                                style={{
                                    border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339',
                                    borderRadius: '8px', height: '35px'
                                }}
                                select
                                class="form-control"
                                aria-label="Default select example">
                                <option>Select</option>
                                <option value='mg'>mg</option>
                                <option value='ml'>ml</option>
                            </select>
                        </div>
                        <div className="col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="volume">Volume/Unit *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".volume"
                                    placeholder="Volume/Unit"
                                    className="form-control"
                                    value={volume}
                                    type='number'
                                    maxLength='4'
                                    onChange={(e) => { setVolume(e.target.value) }}
                                    validators={{
                                        required,
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".volume"
                                    show="touched"
                                    messages={{
                                        required: "Unit is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                    </div>

                    <div className='row' style={{ marginTop: '20px' }}>
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Units *</span>
                            <select onChange={handleChangeVolUnits} 
                               style={{
                                border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', 
                                borderRadius: '8px',height: '35px'
                            }} 
                            select 
                            class="form-control"
                            aria-label="Default select example">
                                <option>Select</option>
                                <option value='mg'>mg</option>
                                <option value='ml'>ml</option>
                            </select>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="pcktSize">Pack Size (Units/Pack) *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".pcktSize"
                                    placeholder="Volume/Unit"
                                    className="form-control"
                                    value={pcktSize}
                                    type='number'
                                    maxLength='4'
                                    onChange={(e) => { setPcktSize(e.target.value) }}
                                    validators={{
                                        required,
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".pcktSize"
                                    show="touched"
                                    messages={{
                                        required: "Pack Size is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="mrp">MRP (PKR/Pack) *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".mrp"
                                    placeholder="Volume/Unit"
                                    className="form-control"
                                    value={mrp}
                                    type='number'
                                    maxLength='4'
                                    onChange={(e) => { setMrp(e.target.value) }}
                                    validators={{
                                        required,
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".mrp"
                                    show="touched"
                                    messages={{
                                        required: "Pack Size is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                    </div>
                </div>
            </LocalForm>

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
                    onClick={() => { sendData() }}

                    size='md'>
                    Save
                </Button>
                {/* <Button onClick={() => { _toggle() }}>button</Button> */}
            </div>
        </div>
    )
}

export default DrugProfile;