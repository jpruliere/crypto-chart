-- Deploy crypto:tables to pg

BEGIN;

CREATE TABLE account (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_number TEXT NOT NULL,
    owner_name TEXT NOT NULL
);

CREATE TABLE "transaction" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id int NOT NULL REFERENCES account(id),
    "date" timestamptz NOT NULL,
    amount NUMERIC(5, 2) NOT NULL
);

COMMIT;
