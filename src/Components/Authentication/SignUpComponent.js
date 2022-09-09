import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, FormGroup } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import punjabLogo from '../../assets/punjabLogo.PNG';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import '../../Components/style.css'

const required = (val) => val && val.length;
const isNumber = (val) => !isNaN(Number(val));
const Length = () => (val) => !val || val.length == 11;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
var validpassword = (val) => /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i.test(val);

function SignupComponent() {
    const [fullName, setfName] = useState("");
    const [userName, setuserName] = useState("");
    const [cnic, setCnic] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [district, setDistrict] = useState("");
    const [open, setOpen] = useState(false);
    const [errMsg, setErrsg] = useState(false);
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
    let history = useNavigate();

    useEffect(() => {
        document.body.style.backgroundImage = `linear-gradient(to left, #FFFFFF 50%, #8fb339 50%`;
    });

    const handleClickOpen = (fullName, userName, cnic, contact, email,address, password, confirmPassword,gender,district) => {
        // console.log(gender);
        debugger
        if (fullName === "") {
            setErrsg("Please enter fullname")
            setOpen(true);
            return errMsg
        }
        else if (userName === "") {
            setErrsg("Please enter username")
            setOpen(true);
            return errMsg
        }
        else if (cnic === "") {
            setErrsg("Please enter cnic")
            setOpen(true);
            return errMsg
        }
        else if (cnic.length !== 13) {
            setErrsg("Please vaild cnic number")
            setOpen(true);
            return errMsg
        }
        else if (contact === "") {
            setErrsg("Please enter contact number")
            setOpen(true);
            return errMsg
        }
        else if (isNaN(Number(contact)) || contact.length !== 11) {
            setErrsg("Please enter valid contact number")
            setOpen(true);
            return errMsg
        }
        else if (email === "") {
            setErrsg("Please enter email")
            setOpen(true);
            return errMsg
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrsg("Please enter valid email")
            setOpen(true);
            return errMsg
        }
        else if (address === "") {
            setErrsg("Please enter address")
            setOpen(true);
            return errMsg
        }
        else if (password === "") {
            setErrsg("Please enter password")
            setOpen(true);
            return errMsg
        }
        else if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/i.test(password)) {
            setErrsg("Please enter valid password")
            setOpen(true);
            return errMsg
        }
        else if (confirmPassword === "") {
            setErrsg("Please enter confirm password")
            setOpen(true);
            return errMsg
        }
        else if (confirmPassword !== password) {
            setErrsg("confirm password is not same")
            setOpen(true);
            return errMsg
        }
        else {


            axios.post('http://localhost:3001/api/signup',{
                fullName:fullName,
                userName:userName,
                cnic:cnic,
                contact:contact,
                email:email,
                address,
                password:password,
                confirmPassword:confirmPassword,
                gender:gender,
                district:district
            }).then(()=>{
                console.log("sucess")
            }).catch(()=>{
                console.log("erroe........!")
            })
            history("../login", { replace: true })
        }
    };

    const handleClose = () => {

        setOpen(false);
    };

    function handleChangeGender(e) {
        debugger
        setGender(e.target.value)
        // console.log(gender);
    }
    function handleChangeDistrict(e) {
        debugger
        setDistrict(e.target.value)
        // console.log(gender);
    }

    return (
        <div className=" d-flex justify-content-center" >
            <div className='card' style={{ width: '700px' }}>
                <div className="d-flex justify-content-center">
                    <img style={{ height: '100px' }} class="img-fluid" src={punjabLogo} alt={"not found"} />
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <CancelIcon style={{ width: '100%', color: 'red' }} sx={{ fontSize: 40 }} />
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ textAlign: 'center', fontSize: '23px', color: 'red' }} id="alert-dialog-description">
                            {errMsg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div class="container">
                            <div class="row">
                                <div class="col text-center">
                                    <Button onClick={() => { handleClose() }}>OK</Button>
                                </div>
                            </div>
                        </div>
                    </DialogActions>
                </Dialog>

                <h1 className='container' style={{ color: "#8fb339", fontWeight: 'bold',fontSize:'30px' }}>Welcome,<br></br><span><h4 style={{ color: 'black', fontWeight: 'normal',fontSize:'18px' }}>CREATE NEW ACCOUNT</h4></span></h1>

                <LocalForm >
                    <div style={{positionTop:'10px'}} className="container" >
                        <div className="row">
                            <div className="col">
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="fullName">Full Name *</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                        model=".fullName"
                                        placeholder="Full Name"
                                        className="form-control"
                                        value={fullName}
                                        onChange={(e) => { setfName(e.target.value) }}
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".fullName"
                                        show="touched"
                                        messages={{
                                            required: "Full name is required ",
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>
                            <div className="col">
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="userName">Username *</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                        model=".userName"
                                        placeholder="Username"
                                        className="form-control"
                                        value={userName}
                                        onChange={(e) => { setuserName(e.target.value) }}
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".userName"
                                        show="touched"
                                        messages={{
                                            required: "Last name is required "
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>
                            <div className='col'>
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="cnic">CNIC *</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339', }}
                                        model=".cnic"
                                        placeholder="99999-9999999-9"
                                        className="form-control"
                                        value={cnic}
                                        maxLength='13'
                                        onChange={(e) => { setCnic(e.target.value) }}
                                        validators={{
                                            required,
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".cnic"
                                        show="touched"
                                        messages={{
                                            required: "Cnic is required",
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>

                        </div>

                        <div className='row'>
                           

                            <div className='col'>
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="contact">Contact Number *</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                        model=".contact"
                                        placeholder="Contact Number"
                                        className="form-control"
                                        value={contact}
                                        maxLength='11'
                                        onChange={(e) => { setContact(e.target.value) }}
                                        validators={{
                                            required,
                                            length: Length(11),
                                            isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".contact"
                                        show="touched"
                                        messages={{
                                            required: "Contact number is required",
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>
                            <div className='col'>
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="email">Email Address*</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                        model=".email"
                                        placeholder="Email Address"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        validators={{
                                            required,
                                            validEmail,
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: "Email Address is required",
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="address">Address*</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                        model=".address"
                                        placeholder="Address"
                                        className="form-control"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}
                                        validators={{
                                            required,
                                            validEmail,
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

                        <div className='row'>
                            <div className='col'>
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor="password">Password*</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                        model=".password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={Password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password"
                                        validators={{
                                            required,
                                            validpassword
                                        }}

                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: "Password is required"
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>

                            <div className='col'>
                                <FormGroup md={10}>
                                    <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Confirm Password*</span>
                                    <Control.text style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                        model=".Confirm"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                        validators={{
                                            required
                                        }}

                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".Confirm"
                                        show="touched"
                                        messages={{
                                            required: "Confirm Password is required",
                                        }}
                                    ></Errors>
                                </FormGroup>
                            </div>
                            <div className='col'>
                                <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Gender *</span>
                                <select onChange={handleChangeGender} style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} class="form-select" aria-label="Default select example">
                                    <option selected>Select a gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className='row'>
                           
                            <div className='col'>
                                <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Divisions *</span>
                                <select  onChange={handleChangeDistrict}  style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} select class="form-select" aria-label="Default select example">
                                    {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                </select>
                            </div>
                            <div className='col'>
                                <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Districts *</span>
                                <select  onChange={handleChangeDistrict}  style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} select class="form-select" aria-label="Default select example">
                                    {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                </select>
                            </div>
                            <div className='col'>
                                <span style={{ color: "#8fb339" }} htmlFor=" Confirm">Tehsils *</span>
                                <select  onChange={handleChangeDistrict}  style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', }} select class="form-select" aria-label="Default select example">
                                    {options.map(({ value, label }, index) => <option value={value} >{label}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ paddingTop: '20px' }}>
                            <Button className='mx-auto d-block'
                                style={{
                                    width: '200px',
                                    background: '#8fb339',
                                    height: '40px',
                                    borderRadius: '10px',
                                    justifyContent: 'center',
                                    boxShadow: '0 0 0px #8fb339',
                                }}
                                onClick={() => { handleClickOpen(fullName, userName, cnic, contact, email,address, Password, confirmPassword,gender,district) }}
                                size='md'>
                                Signup
                            </Button>
                        </div>
                        <h6 style={{ position: 'relative', top: '5px', textAlign: 'center' }}>Already have an account? <a href='/login' style={{ color: '#8fb339' }}>Login</a></h6>
                    </div>
                </LocalForm>

            </div>
        </div>
    );
}

export default SignupComponent;