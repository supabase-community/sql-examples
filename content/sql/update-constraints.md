---
title: "Update Constraint"
description: Template for updating a constraint.
author: zernonia
github: https://github.com/zernonia
---

Updating a constraint in PostgreSQL is not possible. In order to achive that, you need to [drop](drop-constraints) a constraint and [add](add-constraints) it again.

```sql
alter table table_name
  drop constraint constraint_name,
  add constraint constraint_name check (constraint_name > 0);
```

If you do not remember the constrain_name, you can find it by following [this](list-all-constraint).
