import axios from "axios";


const object = {

    getMedData(){

        debugger
        // const medData = null;
        return axios.post('http://localhost:3001/api/getMedData');
    },
    
    // function getMedicines(e){
    //     return axios.post('http://localhost:3001/api/getMedicines', {
    //             values: e
    //         })
    // }
    
    saveData(drugProfile) {
        debugger
        return axios.post('http://localhost:3001/api/saveMedData', {
            drugProfile: drugProfile
        })
    }
}

export default object;