const db = require('./db');

const exchange_service = [
    {
        container_name: 'exchange_rate_service_no1',
    },
    {
        container_name: 'exchange_rate_service_no2',
    }
]
async function getExchangeRate() {
    const data = []; 
    for (const service of exchange_service) {
        const sql = `SELECT * FROM containers 
                    WHERE service_id = 1 
                    AND container_name = '` + service.container_name + `'
                    ORDER BY timestamp DESC
                    LIMIT 5;`;
        const exchange_data = await db.query(sql); // Wait for query to finish

        if (exchange_data.length != 0) {
            exchange_data.forEach(item => {
                const date = new Date(item.timestamp);
                const gmt7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);
                item.timestamp = gmt7Date.toISOString().slice(0, 19).replace('T', ' ');
            });
        }

        data.push({ service_name: service.container_name, data: exchange_data });
    }

    return data; 
}

async function storeData(data) {
    const query = `
        INSERT INTO containers(
            service_id,
            container_name,
            status,
            endpoint_status,
            cpu_percentage,
            memory_percentage,
            memory_usage,
            network_io,
            request_count,
            timestamp
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    data.map(async (each) => {
        const params = [
            1,
            each.container_name,
            each.info.container.status,
            each.info.endpoint.status,
            each.info.live_stats.CPUPerc,
            each.info.live_stats.MemPerc,
            each.info.live_stats.MemUsage,
            each.info.live_stats.NetIO,
            0, // request_count
            each.timestamp
        ];

        try {
            const results = await db.query(query, params);
            console.log('Data saved to database:', results);
        } catch (err) {
            console.error('Error saving data to database:', err);
        }
    });
}

module.exports = {
    getExchangeRate,
    storeData
}