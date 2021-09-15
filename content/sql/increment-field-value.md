---
title: "Increment field value"
description: Update a field with incrementing value using stored procedure.
author: supabase
github: https://github.com/supabase
---

```sql
create function increment (row_id int)
returns void as
$$
  update table_name
  set field_name = field_name + 1
  where id = row_id;
$$
language sql volatile;

-- you can call the function from your browser with supabase-js
-- const { data, error } = await supabase.rpc('increment', { row_id: 2 })
```
