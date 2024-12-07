const db = require('./db');

async function registerContainer(container_info) {
    try {
        console.log('Registering container:', container_info);

        const checkSql = `SELECT COUNT(*) as count FROM register WHERE container_name = ?`;
        const checkParams = [container_info.container_name];
        const result = await db.query(checkSql, checkParams);

        if (result[0].count === 0) {
            const insertSql = `INSERT INTO register (container_name, sidecar_url, service_id) VALUES (?, ?, ?)`;
            const insertParams = [container_info.container_name, container_info.sidecar_url, container_info.service_id];
            return await db.query(insertSql, insertParams);
        } else {
            console.log('Container already registered:', container_info.container_name);
            return null;
        }
    } catch (error) {
        console.error('Error registering container:', error);
        throw error;
    }
}

async function loadAllSidecars() {
    try {
        const sql = `SELECT sidecar_url, service_id FROM register`;
        let results = await db.query(sql);
        console.log('Loaded all sidecars:', results);

        if (results.length === 0) {
            return [];
        }

        const uniqueResults = [];
        const seenPairs = new Set();

        for (const row of results) {
            const pair = `${row.sidecar_url}-${row.service_id}`;
            if (!seenPairs.has(pair)) {
                seenPairs.add(pair);
                uniqueResults.push(row);
            }
        }

        results = uniqueResults;
        return results.map(row => ({
            url: row.sidecar_url,
            service_id: row.service_id
        }));
    } catch (error) {
        console.error('Error loading sidecars:', error);
        throw error;
    }
}

module.exports = {
    registerContainer,
    loadAllSidecars
}