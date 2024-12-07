const axios = require('axios');
const actions = require('../services/actions');
const mailing = require('../services/mailing');
const register = require('../services/register');

// Dont delete this code
// const sideCarInfo = [
//     { url: process.env.SIDECAR_EXCHANGE_RATE_API, service_id: 1 },
//     // { url: process.env.SIDECAR_GOLD_PRICE_API, service_id: 2 },
//     // { url: process.env.SIDECAR_MESSAGE_QUEUE, service_id: 3 }
// ];

let sideCarInfo = [];

const fetchDataFromSidecar = async (sidecar) => {
    try {
        console.log(`Attempting to fetch data from sidecar at ${sidecar.url}...`);
        const response = await axios.get(sidecar.url);
        await actions.storeData(response.data, sidecar.service_id);
        console.log(`Data fetched from sidecar ${sidecar.service_id}:`, response.data);
        mailing.checkContainerStatus();
    } catch (error) {
        console.error(`Error fetching data from sidecar ${sidecar.service_id}:`, error);
    }
};

const fetchAllSidecars = () => {
    sideCarInfo.forEach(fetchDataFromSidecar);
};


const storeAfterFetching = async () => {
    await updateSideCarInfo();
    setInterval(fetchAllSidecars, 5000);
}

// Đây là đoạn update các sidecar url ngay khi có container mới đăng ký
const updateSideCarInfo = async () => {
    try {
        sideCarInfo = await register.loadAllSidecars(); 
        console.log('Updated sideCarInfo:', sideCarInfo);
    } catch (error) {
        console.error('Error updating sideCarInfo:', error);
    }
};

const registerAndUpdateSidecarContainer = async (container_info) => {
    try {
        console.log('Registering new container:', container_info);
        await register.registerContainer(container_info);
        await updateSideCarInfo();
    } catch (error) {
        console.error('Error registering new container:', error);
    }
};

module.exports = {
    storeAfterFetching,
    registerAndUpdateSidecarContainer
}