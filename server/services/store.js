const axios = require('axios');
const actions = require('../services/actions');

const sideCarInfo = [
    { url: `http://127.0.0.1:4006`, service_id: 1 },
    { url: `http://127.0.0.1:4007`, service_id: 2 }
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

setInterval(fetchAllSidecars, 5000);
