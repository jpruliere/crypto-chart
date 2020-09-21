-- Revert crypto:tables from pg

BEGIN;

DROP TABLE "transaction";

DROP TABLE account;

COMMIT;
