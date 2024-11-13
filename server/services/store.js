const axios = require('axios');
const actions = require('../services/actions');

const fetchDataFromSidecar = async () => {
    try {
        console.log('Attempting to fetch data from sidecar...');
        const response = await axios.get(`http://127.0.0.1:4006`);
        await actions.storeData(response.data);
        console.log('Data fetched from sidecar:', response.data);
    } catch (error) {
        console.error('Error fetching data from sidecar:', error);
    }
};

setInterval(() => {
    fetchDataFromSidecar();
}, 5000);
