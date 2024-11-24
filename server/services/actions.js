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
            },
            userCapacity: {
                in: exchange_data[0].request_count,
                out: exchange_data[0].response_count
            },

        });
        // data.push({ service_name: service.container_name, data: exchange_data });
    }

    return data;
}

// Get detail of a container
async function getDetailCPU(container_name) {
    const query = `SELECT cpu_percentage, checked_at FROM containers 
                    WHERE container_name = '` + container_name + `'
                    ORDER BY checked_at DESC
                    LIMIT 10;`;

    const query_2 = `SELECT 
                        checked_at, cpu_percentage
                    FROM 
                        containers
                    WHERE 
                        cpu_percentage = (
                            SELECT MAX(CAST(SUBSTRING_INDEX(cpu_percentage, '%', 1) AS DECIMAL(5,2)))
                            FROM containers
                            WHERE container_name = '` + container_name + `'
                            AND checked_at >= CURDATE() - INTERVAL 5 DAY
                        )
                    ORDER BY 
                        cpu_percentage DESC
                    LIMIT 1;`;

    const query_3 = `SELECT 
                        AVG(CAST(SUBSTRING_INDEX(cpu_percentage, '%', 1) AS DECIMAL(5,2))) AS avg_cpu_percentage
                    FROM containers
                    WHERE container_name = '` + container_name + `' 
                    AND checked_at >= CURDATE() - INTERVAL 1 DAY;`;

    try {
        const cpu_data = await db.query(query);
        console.log('CPU data retrieved from database:', cpu_data);

        const max_cpu = await db.query(query_2);
        console.log('Max CPU data in the last 5 days retrieved from database:', max_cpu);

        const avg_cpu = await db.query(query_3);
        console.log('Average CPU data retrieved from database:', avg_cpu);

        const results = cpu_data.map(item => ({
            cpu_percentage: parseFloat(item.cpu_percentage),
            checked_at: new Date(new Date(item.checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(11, 19)
        }));

        const max_cpu_data = max_cpu.length > 0 && max_cpu[0].cpu_percentage ? {
            cpu_percentage: parseFloat(max_cpu[0].cpu_percentage.replace('%', '')),
            checked_at: new Date(new Date(max_cpu[0].checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
        } : 0;

        const avg_cpu_data = avg_cpu.length > 0 && avg_cpu[0].avg_cpu_percentage ? parseFloat(avg_cpu[0].avg_cpu_percentage) : 0;

        return {
            cpu_data: results.reverse(),
            max_cpu: max_cpu_data,
            avg_cpu: avg_cpu_data
        };
    } catch (err) {
        console.error('Error retrieving CPU data from database:', err);
    }
}

async function getDetailMemory(container_name) {
    const query = `SELECT memory_percentage, memory_usage, checked_at FROM containers 
                    WHERE container_name = '` + container_name + `'
                    ORDER BY checked_at DESC
                    LIMIT 10;`;

    const query_1 = `SELECT 
                        checked_at, 
                        memory_usage,
                        CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(memory_usage, 'MiB', 1), ' ', -1) AS DECIMAL(10,2)) AS used_memory_mb
                    FROM 
                        containers
                    WHERE 
                        container_name = '` + container_name + `'
                        AND checked_at >= CURDATE() - INTERVAL 5 DAY
                    ORDER BY 
                        used_memory_mb DESC
                    LIMIT 1;
                        `;

    const query_3 = `SELECT 
                    AVG(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(memory_usage, 'MiB', 1), ' ', -1) AS DECIMAL(5,2))) AS avg_memory_usage
                    FROM containers
                    WHERE container_name = '` + container_name + `'
                    AND checked_at >= CURDATE() - INTERVAL 1 DAY;`;

    try {
        const mem_data = await db.query(query);
        console.log('Memory data retrieved from database:', mem_data);

        const max_mem = await db.query(query_1);
        console.log('Max Memory data in the last 5 days retrieved from database:', max_mem);

        const avg_mem = await db.query(query_3);
        console.log('Average Memory data in day retrieved from database:', avg_mem);

        const results = mem_data.map(item => {
            let memoryUsage = item.memory_usage.split(" / ");
            let memoryUnit = getFirstMemoryUnit(item.memory_usage);

            memoryUsage[0] = parseFloat(memoryUsage[0]);
            memoryUsage[1] = parseFloat(memoryUsage[1]);

            if (memoryUnit === 'MiB') {
                memoryUsage[0] = (memoryUsage[0] / 1024).toFixed(2);
            }
            memoryUsage[0] = parseFloat(memoryUsage[0]);

            return {
                memory_percentage: parseFloat(item.memory_percentage),
                memory_usage: memoryUsage[0],
                memory_max: memoryUsage[1],
                unit: 'GiB',
                checked_at: new Date(new Date(item.checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(11, 19)

            };
        });

        const max_memory_data = max_mem.length > 0
            ? {
                memory_usage: parseFloat(max_mem[0].used_memory_mb) / 1024,
                checked_at: new Date(new Date(max_mem[0].checked_at).getTime() + 7 * 60 * 60 * 1000)
                    .toISOString()
                    .replace('T', ' ')
                    .slice(0, 19),
                unit: 'GiB',
            }
            : 0;

        const avg_memory_data = avg_mem.length > 0 && avg_mem[0].avg_memory_usage
            ? {
                memory_usage: parseFloat(avg_mem[0].avg_memory_usage) / 1024,
                unit: 'GiB',
            }
            : null;

        return {
            memory_data: results.reverse(),
            max_memory: max_memory_data,
            avg_memory: avg_memory_data,
        };
    } catch (err) {
        console.error('Error retrieving Memory data from database:', err);
    }
}

async function getDetailNetwork(container_name) {
    const query = `SELECT network_io, checked_at FROM containers 
                    WHERE container_name = '` + container_name + `'
                    ORDER BY checked_at DESC
                    LIMIT 10;`;

    const query_2 = `SELECT 
                    SUM(CAST(SUBSTRING_INDEX(network_io, '/', 1) AS DECIMAL(10,2)) * 
                        CASE
                            WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', 1), ' ', -1) LIKE '%kB' THEN 1
                            WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', 1), ' ', -1) LIKE '%MB' THEN 1024
                            WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', 1), ' ', -1) LIKE '%GB' THEN 1024 * 1024
                            ELSE 1
                        END
                    ) AS total_received,

                    SUM(CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', -1), ' ', -1) AS DECIMAL(10,2)) * 
                        CASE
                            WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', -1), ' ', -1) LIKE '%kB' THEN 1
                            WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', -1), ' ', -1) LIKE '%MB' THEN 1024
                            WHEN SUBSTRING_INDEX(SUBSTRING_INDEX(network_io, '/', -1), ' ', -1) LIKE '%GB' THEN 1024 * 1024
                            ELSE 1
                        END
                    ) AS total_sent
                FROM 
                    containers
                WHERE 
                    container_name = '` + container_name + `'
                    AND checked_at >= CURDATE() - INTERVAL 1 DAY
                    `;

    try {
        const network_data = await db.query(query);
        console.log('Network data retrieved from database:', network_data);

        const daily_io = await db.query(query_2);
        console.log('Daily Network data retrieved from database:', daily_io);

        const results = network_data.map(item => {
            let networkIO = item.network_io.split(" / ");
            let networkUnit = getNetworkUnit(item.network_io);

            networkIO[0] = parseFloat(networkIO[0]);
            networkIO[1] = parseFloat(networkIO[1]);

            return {
                network_in: networkIO[0],
                network_out: networkIO[1],
                unit: networkUnit,
                checked_at: new Date(new Date(item.checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(11, 19).replace('T', ' '),
            };
        });
        const daily_result = daily_io.length > 0
            ? {
                total_received: parseFloat(daily_io[0].total_received),
                total_sent: parseFloat(daily_io[0].total_sent),
                unit: 'kB',
            }
            : {
                total_received: 0,
                total_sent: 0,
            }

        return {
            network_data: results.reverse(),
            daily_io: daily_result,
        };
    } catch (err) {
        console.error('Error retrieving Memory data from database:', err);
    }
}

async function getContainerStatus(container_name) {
    const query_1 = `SELECT 
            DATE(checked_at) AS day,
            COUNT(*) AS down_count
            FROM (
                SELECT 
                    checked_at,
                    status,
                    LAG(status) OVER (ORDER BY checked_at) AS prev_status
                FROM 
                    containers
                WHERE 
                    container_name = '` + container_name + `'
                    AND checked_at >= NOW() - INTERVAL 10 DAY
            ) AS subquery
            WHERE 
                status = 'down' AND prev_status = 'up'
            GROUP BY 
                DATE(checked_at)
            ORDER BY 
                day DESC;
            `;
    const query_for_down = `SELECT checked_at
                FROM containers
                WHERE container_name = '` + container_name + `'
                AND status = 'down'
                ORDER BY checked_at DESC
                LIMIT 1;`;
    const query_for_created_at = `SELECT created_at
                FROM containers
                WHERE container_name = '` + container_name + `'
                ORDER BY created_at DESC
                LIMIT 1;`;

    try {
        const status_data = await db.query(query_1);
        console.log('Container Status data retrieved from database:', status_data);

        const down_status = await db.query(query_for_down);
        console.log('Down Status data retrieved from database:', down_status);

        const created_at = await db.query(query_for_created_at);
        console.log('Created At data retrieved from database:', created_at);

        status_through_time = status_data.map(item => ({
            day: new Date(new Date(item.day).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0],
            down_count: item.down_count
        }));

        results = {
            status_data: status_through_time.reverse(),
            created_at: new Date(new Date(created_at[0].created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' '), // Convert to GMT+7
            checked_at: down_status.length > 0 ? new Date(new Date(down_status[0].checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ') : ''
        };

        return results;
    } catch (err) {
        console.error('Error retrieving Container Status data from database:', err);
    }
}

async function getAPIStatus(container_name) {
    const query_for_gold_down = `SELECT checked_at
            FROM containers
            WHERE container_name = '` + container_name + `'
            AND gold_status = 'down'
            ORDER BY checked_at DESC
            LIMIT 1;`;

    const query_for_exchange_down = `SELECT checked_at
            FROM containers
            WHERE container_name = '` + container_name + `'
            AND exchange_status = 'down'
            ORDER BY checked_at DESC
            LIMIT 1;`;

    const query = `SELECT
            DATE(checked_at) AS day,
            SUM(CASE WHEN gold_status = 'down' AND prev_gold_status = 'up' THEN 1 ELSE 0 END) AS gold_down_count,
            SUM(CASE WHEN exchange_status = 'down' AND prev_exchange_status = 'up' THEN 1 ELSE 0 END) AS exchange_down_count
        FROM (
            SELECT
                checked_at,
                gold_status,
                LAG(gold_status) OVER (ORDER BY checked_at) AS prev_gold_status,
                exchange_status,
                LAG(exchange_status) OVER (ORDER BY checked_at) AS prev_exchange_status
            FROM
                containers
            WHERE
                container_name = '` + container_name + `'
                AND checked_at >= NOW() - INTERVAL 10 DAY
        ) AS subquery
        GROUP BY DATE(checked_at)
        ORDER BY day DESC;`;


    try {

        const gold_down_status = await db.query(query_for_gold_down);
        console.log('Last Gold Down Status data retrieved from database:', gold_down_status);

        const exchange_down_status = await db.query(query_for_exchange_down);
        console.log('Last Exchange Down Status data retrieved from database:', exchange_down_status);

        const status_data = await db.query(query);
        console.log('API Status data retrieved from database:', status_data);

        const results = {
            status_data: status_data.map(item => ({
                day: new Date(new Date(item.day).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0],
                gold_down_count: item.gold_down_count || 0,
                exchange_down_count: item.exchange_down_count || 0
            })),
            gold_down_at: gold_down_status.length > 0 ? new Date(new Date(gold_down_status[0].checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ') : '',
            exchange_down_at: exchange_down_status.length > 0 ? new Date(new Date(exchange_down_status[0].checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ') : ''
        };

        return results;
    } catch (err) {
        console.error('Error retrieving Container Status data from database:', err);
    }
}

async function getUserCapacity(container_name) {
    const query = `SELECT 
            request_count,
            response_count,
            checked_at
            FROM containers
            WHERE container_name = '` + container_name + `'
            ORDER BY checked_at DESC
            LIMIT 5;`;

    const query_2 = `SELECT 
                        request_count,
                        checked_at
                    FROM 
                        containers
                    WHERE 
                        container_name = '` + container_name + `'
                        AND DATE(checked_at) = CURDATE()
                    ORDER BY 
                        request_count DESC
                    LIMIT 1;
                        `;
    const query_3 = `SELECT
                        response_count,
                        checked_at
                    FROM 
                        containers
                    WHERE 
                        container_name = '` + container_name + `'
                        AND DATE(checked_at) = CURDATE()
                    ORDER BY 
                        response_count DESC
                    LIMIT 1;
                        `;

    try {
        const user_capacity = await db.query(query);
        console.log('User Capacity data retrieved from database:', user_capacity);

        const max_request = await db.query(query_2);
        console.log('Max Request data in the last 5 days retrieved from database:', max_request);

        const max_response = await db.query(query_3);
        console.log('Max Response data in the last 5 days retrieved from database:', max_response);

        const results = user_capacity.map(item => ({
            incoming_requests: item.request_count,
            outgoing_responses: item.response_count,
            checked_at: new Date(new Date(item.checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(11, 19)
        }));

        return {
            user_capacity: results.reverse(),
            max_request: max_request.length > 0 ? {
                incoming_requests: max_request[0].request_count,
                checked_at: new Date(new Date(max_request[0].checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
            } : {},
            max_response: max_response.length > 0 ? {
                outgoing_responses: max_response[0].response_count,
                checked_at: new Date(new Date(max_response[0].checked_at).getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')
            } : {},
        };
    } catch (err) {
        console.error('Error retrieving User Capacity data from database:', err);
    }
}
async function storeData(data, service_id) {
    const query = `
        INSERT INTO containers(
            service_id,
            container_name,
            status,
            gold_status,
            exchange_status,
            cpu_percentage,
            memory_percentage,
            memory_usage,
            network_io,
            request_count,
            response_count,
            checked_at,
            created_at
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    data.map(async (each) => {
        const params = [
            service_id,
            each.container_name,
            each.info.container.status,
            each.info.endpoint?.gold_status ?? 0,
            each.info.endpoint?.exchange_status ?? 0,
            each.info.live_stats.CPUPerc,
            each.info.live_stats.MemPerc,
            each.info.live_stats.MemUsage,
            each.info.live_stats.NetIO,
            each.info.user_capacity?.incoming_requests ?? 0,
            each.info.user_capacity?.outgoing_responses ?? 0,
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
    getDetailCPU,
    getDetailMemory,
    getDetailNetwork,
    getContainerStatus,
    getAPIStatus,
    getUserCapacity,
    storeData
}