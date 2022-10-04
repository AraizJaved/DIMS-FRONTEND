import react from 'react'
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import '../../Components/style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from './Table/table';
const EssentialDrugList = () => {
    let history = useNavigate();
    return (
        <div>
            <Header />

            <ArrowBackIcon  />
            <button onClick={(() => { history("../dashboard", { replace: true }) })} 
            id="button-solid"
            
            >go back to Dashboard</button>
            <Table></Table>
        </div>
    )
}

export default EssentialDrugList;