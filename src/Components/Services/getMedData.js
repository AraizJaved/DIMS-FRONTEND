import axios from "axios";


const object = {

    getMedData() {

        // debugger
        // const medData = null;
        return axios.post('http://localhost:3001/api/essentailDrugList');
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
    },

    saveDistributerData(distributerProfile) {
        return axios.post("http://localhost:3001/api/saveDistributerData", {
            distributerProfile: distributerProfile
        })
    },

    getDistributerData(licenseNo) {
        return axios.post("http://localhost:3001/api/getDistributerData", {
            licenseNo: licenseNo
        })
    },

    finilzeStockIn(drugInfos) {
        return axios.post("http://localhost:3001/api/finilizeStockIn", {
            values: drugInfos
        })
    },

    finilzeStockOut(drugInfos) {
        return axios.post("http://localhost:3001/api/finilizeStockOut", {
            drugInfos: drugInfos
        })
    },

    findBatchNo(productName){
        return axios.post("http://localhost:3001/api/batchNo", {
            productName: productName
        })
    },

    checkQuantity(productName,batch,qty){
        return axios.post("http://localhost:3001/api/checkQuantity", {
            productName:productName,
            batch:batch,
            qty: qty
        })
    }
}

export default object;