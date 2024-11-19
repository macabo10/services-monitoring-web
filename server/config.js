const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'monitoring_service',
        port: 3307,
        waitForConnections: true,
        connectionLimit: 4, // Adjust the limit as needed
        queueLimit: 0
    }
};

module.exports = config;