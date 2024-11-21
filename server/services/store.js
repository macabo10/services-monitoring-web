const axios = require('axios');
const actions = require('../services/actions');

const sideCarInfo = [
    { url: process.env.SIDECAR_EXCHANGE_RATE_API, service_id: 1 },
    { url: process.env.SIDECAR_GOLD_PRICE_API, service_id: 2 }
];

const fetchDataFromSidecar = async (sidecar) => {
    try {
        console.log(`Attempting to fetch data from sidecar at ${sidecar.url}...`);
        const response = await axios.get(sidecar.url);
        await actions.storeData(response.data, sidecar.service_id);
        console.log(`Data fetched from sidecar ${sidecar.service_id}:`, response.data);
    } catch (error) {
        console.error(`Error fetching data from sidecar ${sidecar.service_id}:`, error);
    }
};

const fetchAllSidecars = () => {
    sideCarInfo.forEach(fetchDataFromSidecar);
};


const storeAfterFetching = async () => {
    setInterval(fetchAllSidecars, 5000);
}

module.exports = {
    storeAfterFetching
}