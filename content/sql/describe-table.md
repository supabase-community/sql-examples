---
title: "Describe Table"
description: Template to descibe a Table.
author: Kathirvel Chandrasekaran
github: https://github.com/KathirvelChandrasekaran
---

The `information_schema.columns` catalog contains the information on columns of all tables.

To get information on columns of a table, you query the `information_schema.columns` catalog

```sql
select
  table_name,
  column_name,
  data_type
from
  information_schema.columns
where
  TABLE_NAME = 'table_name';
```
