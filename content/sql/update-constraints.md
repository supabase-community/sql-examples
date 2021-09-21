---
title: "Update Constraint"
description: Template for updating a constraint.
author: zernonia
github: https://github.com/zernonia
---

```sql
alter table table_name
  drop constraint constraint_name,
  add constraint constraint_name check (constraint_name > 0);
```
