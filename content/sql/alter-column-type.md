---
title: "Change Column Type"
description: Template to modify a column type. Make sure to change the name and type.
author: Mihai
github: https://github.com/mihaiandrei97
---

```sql
alter table table_name
    alter column column_name type new_data_type;

-- assuming the table name is "todos", and a column "page_count" with type int
-- this will set the "page_count" type to "text"

alter table todos
    alter column page_count type text;
```
