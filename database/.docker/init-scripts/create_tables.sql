CREATE DATABASE IF NOT EXISTS monitoring_service;

USE monitoring_service;

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS register (
	container_name VARCHAR(255) PRIMARY KEY,
    sidecar_url VARCHAR(255),
    service_id INT
);

CREATE TABLE IF NOT EXISTS containers (
    id INT PRIMARY KEY auto_increment,
    service_id INT,
    container_name VARCHAR(255),
    status VARCHAR(50),
    gold_status VARCHAR(50),
    exchange_status VARCHAR(50),
    cpu_percentage VARCHAR(50),
    memory_percentage VARCHAR(50),
    memory_usage VARCHAR(50),
    network_io VARCHAR(50),
    request_count INT,
    response_count INT,
    checked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (container_name) REFERENCES register(container_name)
);

INSERT INTO services (service_name) VALUES ('exchange_rate');
INSERT INTO services (service_name) VALUES ('gold_price');
INSERT INTO services (service_name) VALUES ('message_queue');

INSERT INTO register (container_name, sidecar_url, service_id) VALUES ('message_queue_service', 'http://127.0.0.1:5001','3');
