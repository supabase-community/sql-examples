---
title: "List all constraints"
description: List all constraints and their tables.
author: zernonia
github: https://github.com/zernonia
reference:
  - https://dataedo.com/kb/query/postgresql/list-table-check-constraints
---

```sql
select tc.table_schema,
  tc.table_name,
  string_agg(col.column_name, ', ') as columns,
  tc.constraint_name,
  cc.check_clause
from information_schema.table_constraints tc
join information_schema.check_constraints cc
  on tc.constraint_schema = cc.constraint_schema
  and tc.constraint_name = cc.constraint_name
join pg_namespace nsp on nsp.nspname = cc.constraint_schema
join pg_constraint pgc on pgc.conname = cc.constraint_name
  and pgc.connamespace = nsp.oid
  and pgc.contype = 'c'
join information_schema.columns col
  on col.table_schema = tc.table_schema
  and col.table_name = tc.table_name
  and col.ordinal_position = ANY(pgc.conkey)
where tc.constraint_schema not in('pg_catalog', 'information_schema')
group by tc.table_schema,
  tc.table_name,
  tc.constraint_name,
  cc.check_clause
order by tc.table_schema,
  tc.table_name;
```
