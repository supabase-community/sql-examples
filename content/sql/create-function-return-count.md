---
title: "Create function that return integer"
description: Template to create a function that return integer like count of rows.
author: zernonia
github: https://github.com/zernonia
---

Create a function that get the `count` of number of rows.

```sql
create or replace function get_count ()
  returns integer
  language plpgsql
  as
  $$
    begin
      return (select count(*) from my_table where tagging = 'anything');
    end;
  $$
```
