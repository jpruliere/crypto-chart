## Installation

Vérifier qu'il ne manque pas d'info dans le .env (probablement le PGPASSWORD) :wink:

```shell
createdb cryptochart
sqitch deploy db:pg:cryptochart
npm run seed
```

Le seeding crée 100 comptes et insère 10k transactions, soit une moyenne de 100 transactions par compte, étalées sur les 2 dernières années.

## La requête

C'est pas optimisé mais ça pourrait ressembler à ça

```sql
WITH months AS (
	SELECT date_trunc('month', ts) ts
	FROM generate_series(now() - '2 years'::interval, now(), '1 month') gs(ts)
)
SELECT account.id account, months.ts "month", (
	SELECT SUM(amount)
	FROM transaction 
	WHERE account_id = account.id
	AND date < months.ts
) balance
FROM months, account
ORDER BY account.id, months.ts;
```

Là, les perfs sont pas chouettes mais la marge d'amélioration est grande (notamment avec le principe du WITH RECURSIVE).