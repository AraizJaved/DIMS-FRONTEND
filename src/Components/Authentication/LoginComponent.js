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
import '../../Components/style.css'

const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function LoginComponent() {
    useEffect(() => {
        document.body.style.backgroundImage = `linear-gradient(to left, #FFFFFF 50%, #8fb339 50%`;
        document.getElementById('one').style.marginTop=window.innerHeight/14+'px';
        sessionStorage.setItem('autherization',false)
    });
    let history = useNavigate();

    const [open, setOpen] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [showPassword] = useState("password");

    const handleClickOpen = (email, password) => {
        debugger
        if (email === "araiz_javed@gmail.com" && password === "Ucp@12345"){
            sessionStorage.setItem('autherization',true)
        } else {
            sessionStorage.setItem('autherization',false)
        }
        if (email === "") {
            setErrMsg("Please enter email")
            setOpen(true);
            return errMsg
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            setErrMsg("Please Enter Valid Email")
            setOpen(true);
            return errMsg
        }
        else if (password === "") {
            setErrMsg("Please Enter Password")
            setOpen(true);
            return errMsg
        }
        else if (email !== "araiz_javed@gmail.com" || password !== "Ucp@12345") {
            setErrMsg("Please Enter Correct Email/Password")
            setOpen(true);
            return errMsg
        }
        else {
            // <Navigate to={'/dashboard'}/>
            // <Dashboard/>
            history("../dashboard", { replace: true })
        }
    };

    const handleClose = () => {

        setOpen(false);
    };

    return (
        <div id='one' className=" d-flex justify-content-center" >
            <div className='card' style={{ width: '370px' }}>

                <div className="d-flex justify-content-center">
                    <img style={{ height: '100px' }} class="img-fluid" src={punjabLogo} alt={"not found"} />
                </div>

                <div className="p-3">



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
                            <DialogContentText style={{ textAlign: 'center',fontSize:'23px',color:'red' }} id="alert-dialog-description">
                                {errMsg}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <div class="container">
                                <div class="row">
                                    <div class="col text-center">
                                        <Button style={{backgroundColor:'#8fb339'}} onClick={() => { handleClose() }}>OK</Button>
                                    </div>
                                </div>
                            </div>
                        </DialogActions>
                    </Dialog>

                    <h1 style={{ color: "#8fb339", fontWeight: 'bold' }}>Welcome,<br></br><span><h4 style={{ color: 'black', fontWeight: 'normal' }}>LOGIN TO YOUR ACCOUNT</h4></span></h1>
                    <LocalForm>
                        <FormGroup md={10}>
                            <span style={{ color: "#8fb339" }} htmlFor="email">Email Address</span>
                            <Control.text
                                style={{ border: '1px solid #8fb339', borderRadius: '8px', height: '35px', boxShadow: '0 0 0px #8fb339' }}
                                model=".email"
                                placeholder="Email Address"
                                className="form-control"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                validators={{
                                    required,
                                    validEmail
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".email"
                                show="touched"
                                messages={{
                                    required: "Email is required"
                                }}

                            ></Errors>
                        </FormGroup>
                        <FormGroup md={10}>
                            <span style={{ color: "#8fb339" }} htmlFor="password">Password</span>
                            <Control.text style={{ border: '1px solid #8fb339', boxShadow: '0 0 0px #8fb339', borderRadius: '8px', height: '35px' }}
                                model=".author"
                                className="form-control"
                                placeholder="Password"
                                type={showPassword}
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                validators={{
                                    required,
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: "Password is required",
                                }}
                            ></Errors>
                        </FormGroup>
                                <a onClick={() => { history.push('/ForgotPassword') }} style={{ color: "#8fb339" }}>Forgot Password?</a>    
                    </LocalForm>

                    <div style={{ paddingTop: '30px' }}>
                        <Button className='mx-auto d-block'
                                style={{
                                    width: '200px',
                                    background: '#8fb339',
                                    height: '40px',
                                    borderRadius: '10px',
                                    justifyContent:'center',
                                    boxShadow: '0 0 0px #8fb339', 
                                }}
                            onClick={() => { handleClickOpen(email, Password) }}

                            size='md'>
                            Login
                        </Button>
                        {/* <Button onClick={() => { _toggle() }}>button</Button> */}
                    </div>
                    <h6 style={{ position: 'relative', top: '20px', textAlign: 'center' }}>Dont have any account? <a href={''} onClick={()=>{history("../signup", { replace: true })}} style={{ color: '#8fb339' }}>Signup</a></h6>
                    <br></br><br></br>
                </div>
            </div>
        </div >
    );
}

export default LoginComponent;