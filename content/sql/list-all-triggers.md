---
title: "List all triggers"
description: List all the triggers in (predefined/user-defined).
author: zernonia
github: https://github.com/zernonia
reference:
  - https://dataedo.com/kb/query/postgresql/list-table-triggers
---

```sql
select event_object_schema as table_schema,
  event_object_table as table_name,
  trigger_schema,
  trigger_name,
  string_agg(event_manipulation, ',') as event,
  action_timing as activation,
  action_condition as condition,
  action_statement as definition
from information_schema.triggers
group by 1,2,3,4,6,7,8
order by table_schema,
  table_name;
```
