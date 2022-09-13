import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import { Button, FormGroup } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import object from '../Services/getMedData';

import Header from "./header";
import '../../Components/style.css';

const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const Length = () => (val) => !val || val.length == 11;
const DistributerProfile = () => {
    let history = useNavigate();
    useEffect(() => {
        if (importer === 'No') {

            document.getElementById("araiz").style.display = "none";
        }
    })
    const [importerLicenseNo, setImporterLicenseNo] = useState("");
    const [licenseNo, setLicenseNo] = useState("");
    const [importerLicenseNum, setimporterLicenseNum] = useState("");
    const [nameOfDistributer, setNameOfDistributer] = useState("");
    const [propreitorName, setPropreitorName] = useState("");
    const [qualifiedPersonName, setQualifiedPersonName] = useState("");
    const [licenseValidUpto, setLicenseValidUpto] = useState("");
    const [focalPersonName, setFocalPersonName] = useState("");
    const [PropreitorContact, setPropreitorContact] = useState("");
    const [qualifiedPersonContact, setQualifiedPersonContact] = useState("");
    const [focalPersonContact, setFocalPersonContact] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [importer, setImporter] = useState("No");
    const [district, setDistrict] = useState("");
    const [town, setTown] = useState("");
    const [townId, setTownId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [districtCode, setDistrictCode] = useState("");
    const [msg, setMsg] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setOpen2(false);
    };


    function handleChangeValue(e) {
        // debugger
        setImporter(e.target.value)
        if (e.target.value === 'Yes') {
            document.getElementById("araiz").style.display = "block";
        } else {
            document.getElementById("araiz").style.display = "none";
        }
    }

    function handleChangeDistrict(e) {
        debugger
        setDistrict(e.target.value)
        console.log(district);
    }


    if (importer === "No") {
        if (document.getElementById("licenseNum") != null) {
            document.getElementById("licenseNum").style.display = "none"
        }
    }

    const resetForm = () => {
        setLicenseNo("");
        setimporterLicenseNum("");
        setNameOfDistributer("");
        setPropreitorName("");
        setQualifiedPersonName("");
        setLicenseValidUpto("");
        setFocalPersonName("");
        setPropreitorContact("");
        setQualifiedPersonContact("");
        setFocalPersonContact("");
        setAddress("");
        setDesignation("");
        setImporter("");
        setDistrict("");
        setTown("");
        setTownId("");
        setDistrictId("");
        setDistrictCode("");
    }

    async function sendData() {
        if (licenseNo === "") {
            setMsg("Please enter license No");
            setOpen(true);
            return msg
        }
        else if (PropreitorContact === "") {
            setMsg("Please enter propreitor contact");
            setOpen(true);
            return msg
        }
        else if (qualifiedPersonContact === "") {
            setMsg("Please enter qualified person contact");
            setOpen(true);
            return msg
        }
        else if (importer === "Yes" && importerLicenseNum === "") {
            setMsg("Please enter importer license No.");
            setOpen(true);
            return msg
        }
        else if (focalPersonName === "") {
            setMsg("Please enter focal person name");
            setOpen(true);
            return msg
        }
        else if (designation === "") {
            setMsg("Please enter designation");
            setOpen(true);
            return msg
        }
        else if (focalPersonContact === "") {
            setMsg("Please enter focal person contact no");
            setOpen(true);
            return msg
        } else {
            let distributerProfile = {
                licenseNo: licenseNo,
                importerLicenseNum: importerLicenseNum,
                nameOfDistributer: nameOfDistributer,
                propreitorName: propreitorName,
                qualifiedPersonName: qualifiedPersonName,
                licenseValidUpto: licenseValidUpto,
                focalPersonName: focalPersonName,
                PropreitorContact: PropreitorContact,
                qualifiedPersonContact: qualifiedPersonContact,
                focalPersonContact: focalPersonContact,
                address: address,
                designation: designation,
                district: district,
                town: town,
                townId: townId,
                districtId: districtId,
                districtCode: districtCode
            }
            debugger
            let result = await object.saveDistributerData(distributerProfile)
            if (result != null) {
                console.log("data saved sucessfully");
                setMsg("Data saved sucessfully");
                setOpen2(true);
                resetForm();
                return msg
            }
        }
    }

    async function findLicenseNo() {
        const license = licenseNo.split("-");
        debugger
        if (licenseNo[licenseNo.length - 1] !== 'D') {
            setOpen(true)
            setMsg("License No is not valid");
        } else if (license.length !== 4) {
            setOpen(true)
            setMsg("License No is not valid");
        } else {
            let result = await object.getDistributerData(licenseNo)
            const data = result.data.recordsets[0][0];
            if (result.data.recordsets[0].length > 0) {
                setNameOfDistributer(data.Proprietor_Of_MS);
                setDistrict(data.District_Name);
                setLicenseValidUpto((data.ExpirayDate).split("T")[0]);
                setAddress(data.Premises_Address);
                setTown(data.Town_Name);
                setPropreitorName(data.propreitorName);
                setQualifiedPersonName(data.qualifiedPersonName);
                setTownId(data.Town_ID)
                setDistrictId(data.District_ID)
                setDistrictCode(data.District_Code)
            } else {
                setOpen(true)
                setMsg("License No not found");
            }
        }
    }

    const options = [
        { value: 'Attock', label: 'Attock' },
        { value: 'Bahawalnagar', label: 'Bahawalnagar' },
        { value: 'Bahawalpur', label: 'Bahawalpur' },
        { value: 'Bhakkar', label: 'Bhakkar' },
        { value: 'Chakwal', label: 'Chakwal' },
        { value: 'Chiniot', label: 'Chiniot' },
        { value: 'Dera Ghazi Khan', label: 'Dera Ghazi Khan' },
        { value: 'Faisalabad', label: 'Faisalabad' },
        { value: 'Gujranwala', label: 'Gujranwala' },
        { value: 'Gujrat', label: 'Gujrat' },
        { value: 'Hafizabad', label: 'Hafizabad' },
        { value: 'Jhang', label: 'Jhang' },
        { value: 'Jhelum', label: 'Jhelum' },
        { value: 'Kasur', label: 'Kasur' },
        { value: 'Khanewal', label: 'Khanewal' },
        { value: 'Khushab', label: 'Khushab' },
        { value: 'Lahore', label: 'Lahore' },
        { value: 'Layyah', label: 'Layyah' },
        { value: 'Lodhran', label: 'Lodhran' },
        { value: 'Mandi Bahuddin', label: 'Mandi Bahuddin' },
        { value: 'Mianwali', label: 'Mianwali' },
        { value: 'Multan', label: 'Multan' },
        { value: 'Muzaffargarh', label: 'Muzaffargarh' },
        { value: 'Nankana Sahib', label: 'Nankana Sahib' },
        { value: 'Narowal', label: 'Narowal' },
        { value: 'Okara', label: 'Okara' },
        { value: 'Pakpattan', label: 'Pakpattan' },
        { value: 'Rahim Yar Khan', label: 'Rahim Yar Khan' },
        { value: 'Rajanpur', label: 'Rajanpur' },
        { value: 'Rawalpindi', label: 'Rawalpindi' },
        { value: 'Sahiwal', label: 'Sahiwal' }
    ];

    return (
        <div>
            <Header />
            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} class="button-solid">go back to Dashboard</button>
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
                                {msg}
                            </DialogContentText>
                        ) : (
                            <DialogContentText style={{ textAlign: 'center', fontSize: '23px', color: 'red' }} id="alert-dialog-description">
                                {msg}
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
                    <div className='row' style={{ marginTop: '50px' }}>
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
                    <div className="row" >
                        <div className="col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="userName">Name of Distributer *</span>
                                <Control.text

                                    style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                    model=".nameOfDistributer"
                                    placeholder="Name of Distributer"
                                    className="form-control"
                                    value={nameOfDistributer}
                                    disabled
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".nameOfDistributer"
                                    show="touched"
                                    messages={{
                                        required: "Name of Distributer is required "
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">District *</span>
                            <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                model=".propreitorName"
                                placeholder="Propreitor's Name"
                                className="form-control"
                                value={district}
                                disabled
                                validators={{
                                    required
                                }}
                            />
                        </div>
                        <div className='col-sm-6'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="address">Address*</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".address"
                                    placeholder="Enter Address"
                                    className="form-control"
                                    value={address}
                                    disabled
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

                    </div>

                    <div className='row' >
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Town *</span>
                            <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                model=".propreitorName"
                                placeholder="Propreitor's Name"
                                className="form-control"
                                value={town}
                                disabled
                                validators={{
                                    required
                                }}
                            />
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="propreitorName">Propreitor's Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".propreitorName"
                                    placeholder="Propreitor's Name"
                                    className="form-control"
                                    value={propreitorName}
                                    disabled
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".propreitorName"
                                    show="touched"
                                    messages={{
                                        required: "Propreitor's Name is required ",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="PropreitorContact">Contact Number *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".PropreitorContact"
                                    placeholder="Contact Number"
                                    className="form-control"
                                    value={PropreitorContact}
                                    maxLength='11'
                                    onChange={(e) => { setPropreitorContact(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".PropreitorContact"
                                    show="touched"
                                    messages={{
                                        required: "Contact number is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="qualifiedPersonName">Qualified Person Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".qualifiedPersonName"
                                    placeholder="Propreitor's Name"
                                    className="form-control"
                                    value={qualifiedPersonName}
                                    disabled
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".qualifiedPersonName"
                                    show="touched"
                                    messages={{
                                        required: "Qualified Person Name is required ",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>

                    </div>

                    <div className="row" >
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="qualifiedPersonContact">Contact Number *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".qualifiedPersonContact"
                                    placeholder="Contact Number"
                                    className="form-control"
                                    value={qualifiedPersonContact}
                                    maxLength='11'
                                    onChange={(e) => { setQualifiedPersonContact(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".qualifiedPersonContact"
                                    show="touched"
                                    messages={{
                                        required: "Contact number is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="licenseValidUpto">License Valid Upto *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".licenseValidUpto"
                                    placeholder="License Valid Upto Date"
                                    className="form-control"
                                    value={licenseValidUpto}
                                    type={Date}
                                    disabled
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".licenseValidUpto"
                                    show="touched"
                                    messages={{
                                        required: "License Valid Upto is required ",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="focalPersonName">Focal Person Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".focalPersonName"
                                    placeholder="License Valid Upto Date"
                                    className="form-control"
                                    value={focalPersonName}
                                    type={Date}
                                    onChange={(e) => { setFocalPersonName(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".focalPersonName"
                                    show="touched"
                                    messages={{
                                        required: "Focal Person Name is required ",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="designation">Designation *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".designation"
                                    placeholder="Designation"
                                    className="form-control"
                                    value={designation}
                                    type={Date}
                                    onChange={(e) => { setDesignation(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".designation"
                                    show="touched"
                                    messages={{
                                        required: "Designation is required ",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>

                    </div>

                    <div className='row'>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="focalPersonContact">Contact Number *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".focalPersonContact"
                                    placeholder="Contact Number"
                                    className="form-control"
                                    value={focalPersonContact}
                                    maxLength='11'
                                    onChange={(e) => { setFocalPersonContact(e.target.value) }}
                                    validators={{
                                        required,
                                        length: Length(11),
                                        isNumber
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".focalPersonContact"
                                    show="touched"
                                    messages={{
                                        required: "Contact number is required",
                                    }}
                                ></Errors>
                            </FormGroup>
                        </div>
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Importer *</span>
                            <select onChange={handleChangeValue} style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} class="form-select" aria-label="Default select example">
                                <option selected>Select</option>
                                <option value="Yes">Yes</option>
                                <option selected value="No">No</option>
                            </select>
                        </div>
                        <div id="araiz" className="licenseNum col-sm-3">
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="importerLicenseNum">Importer License No *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".importerLicenseNum"
                                    placeholder="License No"
                                    className="form-control"
                                    value={importerLicenseNum}
                                    onChange={(e) => { setimporterLicenseNum(e.target.value) }}
                                    validators={{
                                        required
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".importerLicenseNum"
                                    show="touched"
                                    messages={{
                                        required: "License No is required ",
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
            </div>
        </div>
    )
}

export default DistributerProfile;


