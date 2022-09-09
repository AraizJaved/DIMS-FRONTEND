import react from 'react'
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const EssentialDrugList = () => {
    let history = useNavigate();
    return (
        <div>
            <Header />

            <ArrowBackIcon />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} class="button-solid">go back to Dashboard</button>
        </div>
    )
}

export default EssentialDrugList;