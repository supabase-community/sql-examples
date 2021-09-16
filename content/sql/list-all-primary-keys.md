---
title: "List all primary keys"
description: List all primary keys (PKs) and their columns.
author: zernonia
github: https://github.com/zernonia
reference:
  - https://dataedo.com/kb/query/postgresql/list-all-primary-keys-and-their-columns
---

```sql
select kcu.table_schema,
  kcu.table_name,
  tco.constraint_name,
  kcu.ordinal_position as position,
  kcu.column_name as key_column
from information_schema.table_constraints tco
join information_schema.key_column_usage kcu
  on kcu.constraint_name = tco.constraint_name
  and kcu.constraint_schema = tco.constraint_schema
  and kcu.constraint_name = tco.constraint_name
where tco.constraint_type = 'PRIMARY KEY'
order by kcu.table_schema,
  kcu.table_name,
  position;
```
