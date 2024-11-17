const { getFirstMemoryUnit } = require('../utils/memoryUtils');
const { getNetworkUnit } = require('../utils/networkUtils');
const db = require('./db');



async function getDistinctContainerNames(service_id) {
    const sql = `SELECT DISTINCT container_name FROM containers WHERE service_id = ?`;
    const result = await db.query(sql, [service_id]);
    const containerNames = result.map(row => row.container_name);
    console.log(`Distinct container names for service_id ${service_id} in the database: ${containerNames}`);
    return containerNames;
}

async function getGeneralInfo(service_id) {
    let containerNames = await getDistinctContainerNames(service_id);
    console.log('Number of containers:', containerNames.length);

    const data = [];
    for (const containerName of containerNames) {
        const sql = `SELECT * FROM containers 
                    WHERE service_id = ? AND container_name = ?
                    ORDER BY checked_at DESC
                    LIMIT 1;`;
        const exchange_data = await db.query(sql, [service_id, containerName]); // Wait for query to finish

        if (exchange_data.length != 0) {
            exchange_data.forEach(item => {
                const date = new Date(item.checked_at);
                const gmt7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);
                item.checked_at = gmt7Date.toISOString().slice(0, 19).replace('T', ' ');
            });
        }

        let memoryUsage = exchange_data[0].memory_usage.split(" / ");
        let networkIO = exchange_data[0].network_io.split(" / ");
        let memoryUnit = getFirstMemoryUnit(exchange_data[0].memory_usage);
        let networkUnit = getNetworkUnit(exchange_data[0].network_io);

        memoryUsage[0] = parseFloat(memoryUsage[0]);
        memoryUsage[1] = parseFloat(memoryUsage[1]);

        if (memoryUnit === 'MiB') {
            memoryUsage[0] = (memoryUsage[0] / 1024).toFixed(2);
        }
        memoryUsage[0] = parseFloat(memoryUsage[0]);

        networkIO[0] = parseFloat(networkIO[0]);
        networkIO[1] = parseFloat(networkIO[1]);


        data.push({
            containerID: { id: exchange_data[0].container_name },
            container: { status: exchange_data[0].status === "up" },
            api: { status: exchange_data[0].endpoint_status === "up" },
            cpu: { usage: parseFloat(exchange_data[0].cpu_percentage) },
            ram: {
                usage: parseFloat(exchange_data[0].memory_percentage),
                used: memoryUsage[0],
                max: memoryUsage[1],
                unit: 'GiB'
            },
            network: {
                in: networkIO[0],
                out: networkIO[1],
                unit: networkUnit
            }
        });
        // data.push({ service_name: service.container_name, data: exchange_data });
    }

    return data;
}

// async function getDetail(container_name) {
//     const query = `SELECT * FROM containers 
//                     WHERE service_id = 1 
//                     AND container_name = '` + container_name + `'
//                     ORDER BY timestamp DESC
//                     LIMIT 1;`;
// }


async function storeData(data, service_id) {
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
            checked_at,
            created_at
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    data.map(async (each) => {
        const params = [
            service_id,
            each.container_name,
            each.info.container.status,
            each.info.endpoint.status,
            each.info.live_stats.CPUPerc,
            each.info.live_stats.MemPerc,
            each.info.live_stats.MemUsage,
            each.info.live_stats.NetIO,
            each.checked_at,
            each.created_at,
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
    getGeneralInfo,
    storeData
}