---
title: "List all foreign keys"
description: List all foreign keys (FKs) and their columns.
author: zernonia
github: https://github.com/zernonia
reference:
  - https://dataedo.com/kb/query/postgresql/list-of-foreign-keys-with-columns
---

```sql
select kcu.table_schema || '.' || kcu.table_name as foreign_table,
  '>-' as rel,
  rel_kcu.table_schema || '.' || rel_kcu.table_name as primary_table,
  kcu.ordinal_position as no,
  kcu.column_name as fk_column,
  '=' as join,
  rel_kcu.column_name as pk_column,
  kcu.constraint_name
from information_schema.table_constraints tco
join information_schema.key_column_usage kcu
  on tco.constraint_schema = kcu.constraint_schema
  and tco.constraint_name = kcu.constraint_name
join information_schema.referential_constraints rco
  on tco.constraint_schema = rco.constraint_schema
  and tco.constraint_name = rco.constraint_name
join information_schema.key_column_usage rel_kcu
  on rco.unique_constraint_schema = rel_kcu.constraint_schema
  and rco.unique_constraint_name = rel_kcu.constraint_name
  and kcu.ordinal_position = rel_kcu.ordinal_position
where tco.constraint_type = 'FOREIGN KEY'
order by kcu.table_schema,
  kcu.table_name,
  kcu.ordinal_position;
```
