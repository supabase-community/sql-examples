---
title: "Create function"
description: Template to create a simple function.
author: zernonia
github: https://github.com/zernonia
---

`i` and `j` are the parameters with type `integer`

```sql
create or replace function add (i integer, j integer)
  returns integer
  language plpgsql
  as
  $$
    begin
      return i + j;
    end;
  $$
```
