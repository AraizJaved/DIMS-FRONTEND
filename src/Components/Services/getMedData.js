import axios from "axios";


const object = {

    getMedData() {
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
    },

    getStockin(from,to){
        return axios.post("http://localhost:3001/api/getStockin",{
            from:from,
            to:to
        })
    },

    getStockout(from,to){
        return axios.post("http://localhost:3001/api/getStockout",{
            from:from,
            to:to
        })
    }
}

export default object;