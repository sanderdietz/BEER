CREATE TABLE account_types(
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_type VARCHAR(255) NOT NULL
);

INSERT INTO account_types (account_type) VALUES
('meeloper'), ('lid'), ('oud-lid'), ('overig');

CREATE TABLE accounts(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    initiation_date DATE,
    account_type_id INT NOT NULL,
    CONSTRAINT fk_account_type FOREIGN KEY (account_type_id) REFERENCES account_types(id)
);

INSERT INTO accounts (name, balance, account_type_id) VALUES
('pennierekening', 0, 4),
('sjb_beer', 0, 4),
('overig', 0, 4),
('Felix', 0, 1);

INSERT INTO accounts (name, balance, initiation_date, account_type_id) VALUES
('Sander', 0, '2023-12-01', 2),
('Chef', 0, '2023-12-01', 2),
('Melle', 0, '2023-12-01', 2),
('Yordi', 0, '2023-12-01', 2),
('Krijn', 0, '2023-12-01', 2),
('Gijs', 0, '2024-11-01', 2),
('Kamil', 0, '2024-11-01', 2),
('Roald', 0, '2023-02-01', 2),
('Ilan', 0, '2023-02-01', 3),
('Marnix', 0, '2023-02-01', 2),
('Redouan', 0, '2025-11-22', 2),
('Bert', 0, '2025-11-22', 2),
('Deef', 0, '2025-11-22', 2),
('Duco', 0, '2025-11-22', 2);

CREATE TABLE transaction_participants(
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_id INT NOT NULL,
    share DECIMAL(10, 2) NOT NULL,
    account_id INT NOT NULL,
    factor INT,
    CONSTRAINT fk_account FOREIGN KEY (account_id) REFERENCES accounts(id),
    CONSTRAINT fk_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(id)
);

CREATE TABLE transaction_types(
    id INT PRIMARY KEY AUTO_INCREMENT,
    transaction_type VARCHAR(255) NOT NULL
);

INSERT INTO transaction_types (transaction_type) VALUES
('beer_betalen'), ('beer_spekken'), ('cadeau'), ('eten'), ('overig');

CREATE TABLE transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type_id INT NOT NULL,
    from_account_id INT NOT NULL,
    to_account_id INT NOT NULL,
    description VARCHAR(255),
    transaction_date DATE NOT NULL DEFAULT (CURDATE()),
    CONSTRAINT fk_from_account FOREIGN KEY (from_account_id) REFERENCES accounts(id),
    CONSTRAINT fk_to_account FOREIGN KEY (to_account_id) REFERENCES accounts(id),
    CONSTRAINT fk_transaction_type FOREIGN KEY (transaction_type_id) REFERENCES transaction_types(id)
);
