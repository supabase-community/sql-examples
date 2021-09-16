---
title: "List all table size"
description: List all table data size.
author: zernonia
github: https://github.com/zernonia
reference:
  - https://dataedo.com/kb/query/postgresql/list-of-tables-by-their-size
---

```sql
select schemaname as table_schema,
  relname as table_name,
  pg_size_pretty(pg_relation_size(relid)) as data_size
from pg_catalog.pg_statio_user_tables
where schemaname in ('public', 'storage')
  order by pg_relation_size(relid) desc and schemaname asc;
```
