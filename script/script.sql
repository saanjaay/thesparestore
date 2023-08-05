-- run the following script defore running the website in xampp


CREATE DATABASE IF NOT EXISTS customer_details;

USE customer_details;

CREATE TABLE customer_details_auth (
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(30) PRIMARY KEY,
    phone VARCHAR(10),
    dob DATE NULL,
    address VARCHAR(40) NULL,
    pin VARCHAR(7) NULL,
    password VARCHAR(16)
);
