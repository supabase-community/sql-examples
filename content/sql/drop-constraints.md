---
title: "Drop Constraint"
description: Template for dropping / removing constraint.
author: zernonia
github: https://github.com/zernonia
---

```sql
alter table table_name
  drop constraint constraint_name;

-- assuming the table name is "todos", and the constraint_name is "unique_todo" you can run the following query
-- if you do not remember the constrain_name, you can check it by the link in the
alter table todos
  drop constraint unique_todo;
```

If you do not remember the constrain_name, you can find it by following [this](list-all-constraint).
