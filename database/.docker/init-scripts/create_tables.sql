CREATE DATABASE IF NOT EXISTS monitoring_service;

USE monitoring_service;

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS containers (
    id INT PRIMARY KEY auto_increment,
    service_id INT,
    container_name VARCHAR(255),
    status VARCHAR(10),
    endpoint_status VARCHAR(10),
    cpu_percentage VARCHAR(50),
    memory_percentage VARCHAR(50),
    memory_usage VARCHAR(50),
    network_io VARCHAR(50),
    checked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id)
);

INSERT INTO services (service_name) VALUES ('exchange_rate');
INSERT INTO services (service_name) VALUES ('gold_price');
INSERT INTO services (service_name) VALUES ('message_queue');
