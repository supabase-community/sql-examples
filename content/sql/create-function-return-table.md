---
title: "Create function that return table"
description: Template to create a function a function that return set of table.
author: zernonia
github: https://github.com/zernonia
---

```sql
create or replace function get_tags (tag text)
  returns setof products_view
  language plpgsql
  as
  $$
    begin
    return query
      select * from products_view where tag % any(categories);
    end;
  $$
```
