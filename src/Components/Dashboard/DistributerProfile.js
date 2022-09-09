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
import CancelIcon from '@mui/icons-material/Cancel';

import Header from "./header";
import '../../Components/style.css';

const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const Length = () => (val) => !val || val.length == 11;
const DistributerProfile = () => {
    let history = useNavigate();
    // useEffect(()=>{
    //     document.getElementById("licenseNum").style.display = "none";
    // })
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
    const [open, setOpen] = useState(false);

    const handleClose = () => {

        setOpen(false);
    };
    useEffect(() => {

        console.log("////////////////////////////////////")
        if (importer === 'No') {

            document.getElementById("araiz").style.display = "none";
        }
    })

    function handleChangeValue(e) {
        // debugger
        setImporter(e.target.value)
        if (e.target.value === 'Yes') {
            console.log(e.target.value)
            document.getElementById("araiz").style.display = "block";
        } else {
            document.getElementById("araiz").style.display = "none";
        }
    }

    function handleChangeDistrict(e) {
        debugger
        setDistrict(e.target.value)
    }


    if (importer === "No") {
        console.log("jsdhfdsfhkjsdh")
        if (document.getElementById("licenseNum") != null) {
            document.getElementById("licenseNum").style.display = "none"
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
            {/* {document.getElementById("licenseNum").style.display="none"} */}
            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} class="button-solid">go back to Dashboard</button>
            <LocalForm >
                <div className="container" >
                    <div className='row' style={{ marginTop: '50px' }}>
                        <div className="col-sm-4">
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
                                    onChange={(e) => { setNameOfDistributer(e.target.value) }}
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
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Divisions *</span>
                            <select onChange={handleChangeDistrict} style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} select class="form-select" aria-label="Default select example">
                                {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </select>
                        </div>
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="address">Address*</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".address"
                                    placeholder="Enter Address"
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
                        <div className='col-sm-3'>
                            <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Districts *</span>
                            <select onChange={handleChangeDistrict} style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} select class="form-select" aria-label="Default select example">
                                {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className='row' >
                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="propreitorName">Propreitor's Name *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".propreitorName"
                                    placeholder="Propreitor's Name"
                                    className="form-control"
                                    value={propreitorName}
                                    onChange={(e) => { setPropreitorName(e.target.value) }}
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
                                    onChange={(e) => { setQualifiedPersonName(e.target.value) }}
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
                    </div>

                    <div className="row" >

                        <div className='col-sm-3'>
                            <FormGroup md={10}>
                                <span style={{ color: "#8fb339" }} htmlFor="licenseValidUpto">License Valid Upto *</span>
                                <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                    model=".licenseValidUpto"
                                    placeholder="License Valid Upto Date"
                                    className="form-control"
                                    value={licenseValidUpto}
                                    type={Date}
                                    onChange={(e) => { setLicenseValidUpto(e.target.value) }}
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
                    </div>

                    <div className='row'>
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
                    onClick={() => { console.log('i am clicked...!'); }}

                    size='md'>
                    Save
                </Button>
                {/* <Button onClick={() => { _toggle() }}>button</Button> */}
            </div>
        </div>
    )
}

export default DistributerProfile;


